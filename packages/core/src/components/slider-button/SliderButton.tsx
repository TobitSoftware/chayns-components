import { AnimatePresence, useAnimate } from 'framer-motion';
import React, { FC, UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useElementSize } from '../../hooks/useElementSize';
import type { SliderButtonItem } from '../../types/slider-button';
import { calculateBiggestWidth } from '../../utils/calculate';
import { getNearestPoint, getThumbPosition } from '../../utils/sliderButton';
import {
    StyledMotionSliderButtonThumb,
    StyledSliderButton,
    StyledSliderButtonButtonsWrapper,
    StyledSliderButtonItem,
    StyledSliderButtonWrapper,
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
    const sliderButtonWrapperRef = useRef<HTMLDivElement>(null);
    const timeout = useRef<number>();
    const preventHandleScroll = useRef(false);

    const [scope, animate] = useAnimate();

    const itemWidth = useMemo(() => calculateBiggestWidth(items), [items]);

    const sliderSize = useElementSize(sliderButtonRef);

    const isSliderBigger = useMemo(
        () => sliderSize && sliderSize.width < itemWidth * (items.length - 1),
        [itemWidth, items.length, sliderSize],
    );

    useEffect(() => {
        if (sliderSize) {
            const sliderWidth = itemWidth * (items.length - 1);

            const count = Math.floor(sliderSize.width / itemWidth);

            setDragRange({ left: 0, right: isSliderBigger ? itemWidth * count : sliderWidth });
        }
    }, [isSliderBigger, itemWidth, items.length, sliderSize]);

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

            if (!isSliderBigger) {
                void animation(itemWidth * index);

                return;
            }

            const count = dragRange.right / itemWidth;

            if (items.length - count >= index) {
                void animation(0);
            } else {
                void animation(itemWidth * (count - (items.length - index)));
            }

            if (sliderButtonWrapperRef.current) {
                sliderButtonWrapperRef.current.scrollLeft = itemWidth * index;
            }
        },
        [animation, dragRange.right, isDisabled, isSliderBigger, itemWidth, items.length, onChange],
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

        const { middle, left } = position;

        let scrollLeft = 0;

        if (sliderButtonWrapperRef.current) {
            scrollLeft = sliderButtonWrapperRef.current.scrollLeft;

            sliderButtonWrapperRef.current.scrollLeft = getNearestPoint({
                snapPoints,
                position: middle,
                scrollLeft: scrollLeft - left,
            }).nearestPoint;
        }

        const { nearestIndex } = getNearestPoint({
            snapPoints,
            position: middle,
            scrollLeft,
        });

        const { nearestPoint } = getNearestPoint({
            snapPoints,
            position: middle,
            scrollLeft: 0,
        });

        if (nearestPoint >= 0 && nearestIndex >= 0) {
            void animation(nearestPoint);

            const id = items[nearestIndex]?.id;

            setSelectedButton(id);

            if (typeof onChange === 'function' && id) {
                onChange(id);
            }
        }

        preventHandleScroll.current = false;
    }, [animation, itemWidth, items, onChange, scope, snapPoints]);

    const handleWhileDrag = useCallback(() => {
        preventHandleScroll.current = true;

        const position = getThumbPosition({ scope, itemWidth });

        if (!position) {
            return;
        }

        const { right, left, middle } = position;

        let scrollLeft = 0;

        const scrollSpeed = 3;

        if (sliderButtonWrapperRef.current) {
            if (right >= dragRange.right) {
                sliderButtonWrapperRef.current.scrollLeft += scrollSpeed;
            }

            if (left <= dragRange.left) {
                sliderButtonWrapperRef.current.scrollLeft -= scrollSpeed;
            }

            scrollLeft = sliderButtonWrapperRef.current.scrollLeft;
        }

        const { nearestIndex } = getNearestPoint({ snapPoints, position: middle, scrollLeft });

        if (nearestIndex >= 0) {
            setSelectedButton(items[nearestIndex]?.id);
        }
    }, [dragRange, itemWidth, items, scope, snapPoints]);

    // With this, the handleScroll works before the thumb is moved the first time.
    useEffect(() => {
        void animation(1);
        void animation(0);
    }, [animation]);

    const handleScroll = useCallback(
        (event: UIEvent<HTMLElement>) => {
            if (preventHandleScroll.current) {
                return;
            }

            const position = getThumbPosition({ scope, itemWidth });

            if (!position) {
                return;
            }

            const { middle } = position;

            const { scrollLeft } = event.target as HTMLDivElement;

            const { nearestIndex } = getNearestPoint({ snapPoints, position: middle, scrollLeft });

            if (nearestIndex >= 0) {
                setSelectedButton(items[nearestIndex]?.id);
            }

            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            timeout.current = window.setTimeout(() => {
                handleDragEnd();
            }, 200);
        },
        [handleDragEnd, itemWidth, items, scope, snapPoints],
    );

    return useMemo(
        () => (
            <StyledSliderButton $isDisabled={isDisabled} ref={sliderButtonRef}>
                <StyledMotionSliderButtonThumb
                    ref={scope}
                    drag={isDisabled ? false : 'x'}
                    dragElastic={0}
                    dragConstraints={
                        isSliderBigger
                            ? { ...dragRange, right: dragRange.right - itemWidth }
                            : { ...dragRange }
                    }
                    $width={itemWidth}
                    onDrag={handleWhileDrag}
                    onDragEnd={handleDragEnd}
                >
                    {thumbText}
                </StyledMotionSliderButtonThumb>
                <StyledSliderButtonWrapper
                    $width={!isSliderBigger ? dragRange.right + itemWidth : dragRange.right}
                    ref={sliderButtonWrapperRef}
                    onScroll={handleScroll}
                >
                    <AnimatePresence>
                        <StyledSliderButtonButtonsWrapper>
                            {buttons}
                        </StyledSliderButtonButtonsWrapper>
                    </AnimatePresence>
                </StyledSliderButtonWrapper>
            </StyledSliderButton>
        ),
        [
            buttons,
            dragRange,
            handleDragEnd,
            handleScroll,
            handleWhileDrag,
            isDisabled,
            isSliderBigger,
            itemWidth,
            scope,
            thumbText,
        ],
    );
};

SliderButton.displayName = 'SliderButton';

export default SliderButton;
