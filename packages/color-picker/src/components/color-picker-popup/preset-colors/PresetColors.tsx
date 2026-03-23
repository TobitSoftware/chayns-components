import { isHex } from '@chayns/colors';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { PRESETCOLORS } from '../../../constants/color';
import type { IPresetColor } from '../../../types/colorPicker';
import { extractRgbValues, hexToRgb, rgbToHex } from '../../../utils/color';
import { ColorPickerContext } from '../../ColorPickerProvider';
import PresetButton from './preset-button/PresetButton';
import PresetColor from './preset-color/PresetColor';
import { StyledPresetColors } from './PresetColors.styles';
import { getSiteColors } from '../../../api/color/get';
import { putSiteColors } from '../../../api/color/put';
import { v4 } from 'uuid';

interface PresetColorsProps {
    presetColors?: IPresetColor[];
    onPresetColorAdd?: (presetColor: IPresetColor) => void;
    onPresetColorRemove?: (presetColorId: IPresetColor['id']) => void;
    shouldUseSiteColors: boolean;
    shouldHideDefaultPresetColors: boolean;
}

const PresetColors = ({
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldUseSiteColors,
    shouldHideDefaultPresetColors,
}: PresetColorsProps) => {
    const { selectedColor } = useContext(ColorPickerContext);

    const [siteColors, setSiteColors] = useState<IPresetColor[] | undefined>(undefined);

    const removeSiteColor = async (presetColorId: IPresetColor['id']) => {
        const deletedColor = siteColors?.find(({ id }) => id === presetColorId)?.color;

        if (!deletedColor) return;

        const filteredColors = siteColors?.filter(({ color }) => color !== deletedColor);

        const formattedColors = filteredColors?.map(({ color }) => {
            const rgbValues = extractRgbValues(color);

            return rgbToHex(rgbValues);
        });

        await putSiteColors(formattedColors ?? []);
        setSiteColors(filteredColors);
    };

    const loadSiteColors = async () => {
        const colors = await getSiteColors();

        return colors.value.map((color) => {
            const { r, g, b, a } = hexToRgb(color);

            const newColor = `rgba(${r},${g},${b},${a})`;

            return {
                color: newColor,
                id: v4(),
                isCustom: true,
            };
        });
    };

    useEffect(() => {
        async function fetchSiteColors() {
            if (!shouldUseSiteColors) return;
            const result = await loadSiteColors();
            if (!ignore) setSiteColors(result);
        }

        let ignore = false;

        void fetchSiteColors();

        return () => {
            ignore = true;
        };
    }, [shouldUseSiteColors]);

    const combinedColors = useMemo(() => {
        const tmp = (presetColors ?? []).map(({ color, isCustom, id }) => {
            let newColor = color;

            if (isHex(color)) {
                const { r, g, b, a } = hexToRgb(color);

                newColor = `rgba(${r},${g},${b},${a})`;
            }

            return {
                id,
                isCustom,
                color: newColor,
            };
        });

        if (shouldHideDefaultPresetColors) {
            return tmp;
        }

        return [...PRESETCOLORS, ...(siteColors ?? []), ...tmp];
    }, [presetColors, shouldHideDefaultPresetColors, siteColors]);

    const content = combinedColors.map(({ color, id }) => (
        <PresetColor key={`preset-color__${id}`} color={color} />
    ));

    const currentPresetColor = useMemo(
        () => combinedColors.find(({ color }) => color === selectedColor),
        [combinedColors, selectedColor],
    );

    const handleAddColor = (presetColor: IPresetColor) => {
        if (typeof onPresetColorAdd === 'function') {
            onPresetColorAdd(presetColor);
        }

        setSiteColors((prevColors) => {
            const colors = [...(prevColors ?? []), presetColor];

            const newColors = colors?.map(({ color }) => {
                const rgbValues = extractRgbValues(color);

                return rgbToHex(rgbValues);
            });

            void putSiteColors(newColors);

            return colors;
        });
    };

    const handleRemoveColor = (presetColorId: IPresetColor['id']) => {
        void removeSiteColor(presetColorId);

        if (typeof onPresetColorRemove === 'function') {
            onPresetColorRemove(presetColorId);
        }
    };

    return (
        <StyledPresetColors>
            {content}
            {!shouldHideDefaultPresetColors && (
                <PresetButton
                    id={currentPresetColor?.id}
                    isCustom={currentPresetColor?.isCustom}
                    onAdd={handleAddColor}
                    onRemove={handleRemoveColor}
                />
            )}
        </StyledPresetColors>
    );
};

PresetColors.displayName = 'PresetColors';

export default PresetColors;
