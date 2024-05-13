import { AnimatePresence, useAnimate } from 'framer-motion';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SliderButtonItem } from '../../types/slider-button';
import { calculateBiggestWidth } from '../../utils/calculate';
import { getNearestPoint, getThumbPosition } from '../../utils/sliderButton';
import {
    StyledMotionSliderButtonThumb,
    StyledSliderButton,
    StyledSliderButtonItem,
} from './SliderButton.styles';

export type SliderButtonProps = {
    /**
     * Whether the button is disabled.
     */
    isDisabled?: boolean;
    /**
     * Function to be executed when a button is selected.
     * @param id
     */
    onChange?: (id: string) => void;
    /**
     * The buttons that are slidable.
     */
    items: SliderButtonItem[];
    /**
     * The id of a button that should be selected.
     */
    selectedButtonId?: string;
};

const SliderButton: FC<SliderButtonProps> = ({ selectedButtonId, isDisabled, items, onChange }) => {
    const [selectedButton, setSelectedButton] = useState<string | undefined>(undefined);
    const [dragRange, setDragRange] = useState({ left: 0, right: 0 });

    const sliderButtonRef = useRef<HTMLDivElement>(null);

    const [scope, animate] = useAnimate();

    const itemWidth = useMemo(() => calculateBiggestWidth(items), [items]);

    useEffect(() => {
        setDragRange({ left: 0, right: itemWidth * (items.length - 1) });
    }, [itemWidth, items.length]);

    const animation = useCallback(
        async (x: number) => {
            await animate(
                scope.current,
                { x },
                {
                    type: 'tween',
                    duration: 0.2,
                },
            );
        },
        [animate, scope],
    );

    useEffect(() => {
        if (selectedButtonId) {
            setSelectedButton(selectedButtonId);

            const index = items.findIndex(({ id }) => id === selectedButtonId);

            if (index >= 0) {
                void animation(itemWidth * index);
            }
        } else {
            setSelectedButton(items[0]?.id);
        }
    }, [animation, itemWidth, items, selectedButtonId]);

    const handleClick = useCallback(
        (id: string, index: number) => {
            if (isDisabled) {
                return;
            }

            setSelectedButton(id);

            if (typeof onChange === 'function') {
                onChange(id);
            }

            void animation(itemWidth * index);
        },
        [animation, isDisabled, itemWidth, onChange],
    );

    const buttons = useMemo(
        () =>
            items.map(({ id, text }, index) => (
                <StyledSliderButtonItem
                    $width={itemWidth}
                    key={`slider-button-${id}`}
                    onClick={() => handleClick(id, index)}
                    $isSelected={id === selectedButton}
                >
                    {text}
                </StyledSliderButtonItem>
            )),
        [handleClick, itemWidth, items, selectedButton],
    );

    const thumbText = useMemo(() => {
        const selectedItem = items.find(({ id }) => id === selectedButton);

        return selectedItem ? selectedItem.text : '';
    }, [items, selectedButton]);

    /**
     * Creates an array with the snap points relative to the width of the items
     */
    const snapPoints = useMemo(() => {
        const points = [0];

        for (let i = 1; i < items.length; i++) {
            points.push(itemWidth * i);
        }

        return points;
    }, [itemWidth, items.length]);

    const handleDragEnd = useCallback(() => {
        const position = getThumbPosition({ scope, itemWidth });

        if (!position) {
            return;
        }

        const { nearestPoint, nearestIndex } = getNearestPoint({ snapPoints, position });

        if (nearestPoint >= 0 && nearestIndex >= 0) {
            void animation(nearestPoint);

            const id = items[nearestIndex]?.id;

            if (typeof onChange === 'function' && id) {
                onChange(id);
            }
        }
    }, [animation, itemWidth, items, onChange, scope, snapPoints]);

    const handleWhileDrag = useCallback(() => {
        const position = getThumbPosition({ scope, itemWidth });

        if (!position) {
            return;
        }

        if (sliderButtonRef.current) {
            sliderButtonRef.current.scrollLeft = (position - itemWidth / 2) / 1.1;
        }

        const { nearestIndex } = getNearestPoint({ snapPoints, position });

        if (nearestIndex >= 0) {
            setSelectedButton(items[nearestIndex]?.id);
        }
    }, [itemWidth, items, scope, snapPoints]);

    return useMemo(
        () => (
            <StyledSliderButton $isDisabled={isDisabled} ref={sliderButtonRef}>
                <AnimatePresence>
                    {buttons}
                    <StyledMotionSliderButtonThumb
                        ref={scope}
                        drag={isDisabled ? false : 'x'}
                        dragElastic={0}
                        dragConstraints={{ ...dragRange }}
                        $width={itemWidth}
                        onDrag={handleWhileDrag}
                        onDragEnd={handleDragEnd}
                    >
                        {thumbText}
                    </StyledMotionSliderButtonThumb>
                </AnimatePresence>
            </StyledSliderButton>
        ),
        [
            buttons,
            dragRange,
            handleDragEnd,
            handleWhileDrag,
            isDisabled,
            itemWidth,
            scope,
            thumbText,
        ],
    );
};

SliderButton.displayName = 'SliderButton';

export default SliderButton;
