import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { splitRgb } from '../../../utils/color';
import { HueSlider } from '../../index';
import OpacitySlider from '../../opacity-slider/OpacitySlider';
import ColorArea from './color-area/ColorArea';
import ColorPresent from './color-present/ColorPresent';
import {
    StyledColorPickerColorPreview,
    StyledColorPickerContent,
    StyledColorPickerContentPresentWrapper,
    StyledColorPickerContentSliders,
    StyledColorPickerContentSliderSelect,
} from './ColorPickerContent.styles';

export type ColorPickerContentProps = {
    onChange: (color: CSSProperties['color']) => void;
    color: CSSProperties['color'];
    internalColor: CSSProperties['color'];
    shouldShowColorPrefix?: boolean;
};

const ColorPickerContent: FC<ColorPickerContentProps> = ({
    color,
    internalColor,
    onChange,
    shouldShowColorPrefix,
}) => {
    const [hueColor, setHueColor] = useState<CSSProperties['color']>();
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>(color);
    const [opacity, setOpacity] = useState<number>(1);
    const [externalColor, setExternalColor] = useState<CSSProperties['color']>();

    const colorPresents = useMemo(
        () => [
            { id: 0, color: 'rgb(0, 0, 0)' },
            { id: 1, color: 'rgb(67, 67, 67)' },
            { id: 2, color: 'rgb(102, 102, 102)' },
            { id: 3, color: 'rgb(153, 153, 153)' },
            { id: 4, color: 'rgb(183, 183, 183)' },
            { id: 5, color: 'rgb(204, 204, 204)' },
            { id: 6, color: 'rgb(217, 217, 217)' },
            { id: 7, color: 'rgb(239, 239, 239)' },
            { id: 8, color: 'rgb(243, 243, 243)' },
            { id: 9, color: 'rgb(255, 255, 255)' },
            { id: 10, color: 'rgb(244, 67, 54)' },
            { id: 11, color: 'rgb(255, 152, 0)' },
            { id: 12, color: 'rgb(255, 235, 59)' },
            { id: 13, color: 'rgb(0, 150, 136)' },
            { id: 14, color: 'rgb(121, 85, 72)' },
            { id: 15, color: 'rgb(139, 195, 74)' },
            { id: 16, color: 'rgb(76, 175, 80)' },
            { id: 17, color: 'rgb(156, 39, 176)' },
            { id: 18, color: 'rgb(63, 81, 181)' },
            { id: 19, color: 'rgb(3, 169, 244)' },
        ],
        []
    );

    useEffect(() => {
        if (color) {
            setExternalColor(color);
        }
    }, [color]);

    useEffect(() => {
        if (color) {
            const rgba = splitRgb(color);

            if (rgba && rgba.a) {
                setOpacity(rgba.a);
            }
        }
    }, [color]);

    const handleHueColorChange = useCallback((selectedHueColor: CSSProperties['color']) => {
        setHueColor(selectedHueColor);
    }, []);

    const handleColorChange = useCallback((newColor: CSSProperties['color']) => {
        setSelectedColor(newColor);
    }, []);

    const handleOpacityChange = useCallback((opacityColor: CSSProperties['color']) => {
        const rgba = splitRgb(opacityColor);

        if (rgba && rgba.a) {
            setOpacity(rgba.a);
        }
    }, []);

    const handlePresentSelect = useCallback(
        (selectedPresentColor: CSSProperties['color']) => {
            const rgb = splitRgb(selectedPresentColor);

            if (rgb) {
                setExternalColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`);
                // onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`);
            }
        },
        [opacity]
    );

    useEffect(() => {
        const rgb = splitRgb(selectedColor);

        if (rgb) {
            onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`);
        }
    }, [onChange, opacity, selectedColor]);

    return useMemo(
        () => (
            <StyledColorPickerContent>
                <ColorArea onChange={handleColorChange} color={internalColor} hueColor={hueColor} />
                <StyledColorPickerContentSliderSelect>
                    <StyledColorPickerContentSliders>
                        <HueSlider onChange={handleHueColorChange} color={externalColor} />
                        <OpacitySlider color={selectedColor} onChange={handleOpacityChange} />
                    </StyledColorPickerContentSliders>
                    <StyledColorPickerColorPreview color={internalColor} />
                </StyledColorPickerContentSliderSelect>
                {shouldShowColorPrefix && (
                    <StyledColorPickerContentPresentWrapper>
                        {colorPresents.map(({ color: presentColor, id }) => (
                            <ColorPresent
                                id={id}
                                color={presentColor}
                                onClick={handlePresentSelect}
                            />
                        ))}
                    </StyledColorPickerContentPresentWrapper>
                )}
            </StyledColorPickerContent>
        ),
        [
            colorPresents,
            externalColor,
            handleColorChange,
            handleHueColorChange,
            handleOpacityChange,
            handlePresentSelect,
            hueColor,
            internalColor,
            selectedColor,
            shouldShowColorPrefix,
        ]
    );
};

ColorPickerContent.displayName = 'ColorPickerContent';

export default ColorPickerContent;
