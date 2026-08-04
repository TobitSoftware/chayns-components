import { isHex } from '@chayns/colors';
import React, {
    KeyboardEvent,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactElement,
} from 'react';

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
    shouldEnableKeyboardHighlighting?: boolean;
}

const PresetColors = ({
    presetColors,
    onPresetColorRemove,
    onPresetColorAdd,
    shouldUseSiteColors,
    shouldHideDefaultPresetColors,
    shouldEnableKeyboardHighlighting,
}: PresetColorsProps) => {
    const { selectedColor } = useContext(ColorPickerContext);

    const [siteColors, setSiteColors] = useState<IPresetColor[] | undefined>(undefined);
    const [focusedPresetIndex, setFocusedPresetIndex] = useState(0);

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

        combinedColors.forEach(({ color, id }, index) => {
            items.push(
                <PresetColor
                    key={`preset-color__${id}`}
                    color={color}
                    isKeyboardFocusable={index === focusedPresetIndex}
                    onFocus={() => setFocusedPresetIndex(index)}
                    presetIndex={index}
                    shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                />,
            );
        });

        return items;
    }, [combinedColors, focusedPresetIndex, shouldEnableKeyboardHighlighting]);

    const handlePresetColorsKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const currentPreset =
                event.target instanceof HTMLElement
                    ? event.target.closest<HTMLElement>('[data-preset-color-index]')
                    : null;

            if (!currentPreset) {
                return;
            }

            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                return;
            }

            event.preventDefault();

            const currentIndex = Number(currentPreset.dataset.presetColorIndex);
            const presets = Array.from(
                currentPreset.parentElement?.querySelectorAll<HTMLElement>(
                    '[data-preset-color-index]',
                ) ?? [],
            );
            const currentRect = currentPreset.getBoundingClientRect();
            let nextPreset: HTMLElement | undefined;

            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                nextPreset = presets[currentIndex + (event.key === 'ArrowLeft' ? -1 : 1)];
            } else {
                const rowDirection = event.key === 'ArrowUp' ? -1 : 1;
                const targetTop = currentRect.top + rowDirection * currentRect.height;

                nextPreset = presets
                    .filter((preset) => {
                        const { top } = preset.getBoundingClientRect();
                        return rowDirection < 0 ? top < currentRect.top : top > currentRect.top;
                    })
                    .sort((left, right) => {
                        const leftRect = left.getBoundingClientRect();
                        const rightRect = right.getBoundingClientRect();
                        const leftDistance =
                            Math.abs(leftRect.top - targetTop) * 1000 +
                            Math.abs(leftRect.left - currentRect.left);
                        const rightDistance =
                            Math.abs(rightRect.top - targetTop) * 1000 +
                            Math.abs(rightRect.left - currentRect.left);
                        return leftDistance - rightDistance;
                    })[0];
            }

            const nextIndex = Number(nextPreset?.dataset.presetColorIndex);

            if (!Number.isFinite(nextIndex) || nextIndex === currentIndex) {
                return;
            }

            setFocusedPresetIndex(nextIndex);
            nextPreset?.focus();
        },
        [combinedColors.length],
    );

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
        <StyledPresetColors onKeyDown={handlePresetColorsKeyDown}>
            {content}
            {!shouldHideDefaultPresetColors && (
                <PresetButton
                    id={currentPresetColor?.id}
                    isCustom={currentPresetColor?.isCustom}
                    isKeyboardFocusable={focusedPresetIndex === combinedColors.length}
                    onAdd={handleAddColor}
                    onFocus={() => setFocusedPresetIndex(combinedColors.length)}
                    onRemove={handleRemoveColor}
                    presetIndex={combinedColors.length}
                    shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                />
            )}
        </StyledPresetColors>
    );
};

PresetColors.displayName = 'PresetColors';

export default PresetColors;
