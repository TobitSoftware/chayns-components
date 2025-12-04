import { isHex } from '@chayns/colors';
import React, { useContext, useEffect, useMemo, useState, type ReactElement } from 'react';

import { putSiteColors } from '../../../api/color/get';
import { getSiteColors } from '../../../api/color/put';
import { PRESETCOLORS } from '../../../constants/color';
import type { IPresetColor } from '../../../types/colorPicker';
import { extractRgbValues, hexToRgb, rgbToHex } from '../../../utils/color';
import { ColorPickerContext } from '../../ColorPickerProvider';
import PresetButton from './preset-button/PresetButton';
import PresetColor from './preset-color/PresetColor';
import { StyledPresetColors } from './PresetColors.styles';

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

    const loadSiteColors = async (presetColorId?: IPresetColor['id']) => {
        const colors = await getSiteColors();

        setSiteColors((prevColors) => {
            const newColors = colors.value.map((color) => {
                const { r, g, b, a } = hexToRgb(color);

                const newColor = `rgba(${r},${g},${b},${a})`;

                return {
                    color: newColor,
                    id: Math.random().toString(),
                    isCustom: true,
                };
            });

            if (!presetColorId) {
                return newColors;
            }

            const deletedColor = prevColors?.find(({ id }) => id === presetColorId)?.color;

            if (!deletedColor) {
                return newColors;
            }

            const filteredColors = newColors?.filter(({ color }) => color !== deletedColor);

            const formattedColors = filteredColors?.map(({ color }) => {
                const rgbValues = extractRgbValues(color);

                return rgbToHex(rgbValues);
            });

            void putSiteColors(formattedColors ?? []);

            return filteredColors;
        });
    };

    useEffect(() => {
        if (!shouldUseSiteColors) {
            setSiteColors(undefined);

            return;
        }

        void loadSiteColors();
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

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        combinedColors.forEach(({ color, id }) => {
            items.push(<PresetColor key={`preset-color__${id}`} color={color} />);
        });

        return items;
    }, [combinedColors]);

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
        void loadSiteColors(presetColorId);

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
