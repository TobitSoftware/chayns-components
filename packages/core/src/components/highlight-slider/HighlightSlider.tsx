import React, { FC, useCallback, useMemo } from 'react';
import { StyledHighlightSlider } from './HighlightSlider.styles';
import HighlightSliderItem, {
    HighlightSliderItemColors,
} from './highlight-slider-item/HighlightSliderItem';

const DEFAULT_HIGHLIGHT_SLIDER_COLORS: HighlightSliderItemColors = {
    backgroundColor: '#E0E0E0',
    fillColor: '#808080',
};

export type HighlightSliderProps = {
    /**
     * The Colors of the slider.
     */
    colors?: HighlightSliderItemColors;
    /**
     * The total number of sections, that should be displayed.
     */
    count: number;
    /**
     * The current index.
     */
    currentIndex: number;
    /**
     * The duration of the animation of a single item in seconds.
     */
    duration?: number;
    /**
     * Function to be executed if the index has changed.
     */
    onIndexChange?: (index: number) => void;
};

const HighlightSlider: FC<HighlightSliderProps> = ({
    count,
    colors = DEFAULT_HIGHLIGHT_SLIDER_COLORS,
    onIndexChange,
    currentIndex,
    duration = 10,
}) => {
    const handleFinish = useCallback(
        (index: number) => {
            if (typeof onIndexChange === 'function') {
                onIndexChange(index >= count - 1 ? 0 : index + 1);
            }
        },
        [count, onIndexChange],
    );

    const handleClick = useCallback(
        (index: number) => {
            if (typeof onIndexChange === 'function') {
                onIndexChange(index);
            }
        },
        [onIndexChange],
    );

    const content = useMemo(
        () =>
            Array.from({ length: count }).map((value, index) => (
                <HighlightSliderItem
                    key={`highlight-slider-item--${value as number}`}
                    index={index}
                    duration={duration}
                    colors={colors}
                    isActive={currentIndex === index}
                    isFinished={currentIndex > index}
                    onClick={handleClick}
                    onFinish={handleFinish}
                />
            )),
        [colors, count, currentIndex, duration, handleClick, handleFinish],
    );

    return <StyledHighlightSlider>{content}</StyledHighlightSlider>;
};

HighlightSlider.displayName = 'HighlightSlider';

export default HighlightSlider;
