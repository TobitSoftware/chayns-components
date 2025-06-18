import { setRefreshScrollEnabled } from 'chayns-api';
import { AnimatePresence, useAnimate } from 'motion/react';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useElementSize } from '../../hooks/element';
import { PopupRef } from '../../types/popup';
import type { SliderButtonItem } from '../../types/slider-button';
import { calculateBiggestWidth } from '../../utils/calculate';
import { getNearestPoint, getThumbPosition } from '../../utils/sliderButton';
import Icon from '../icon/Icon';
import Popup from '../popup/Popup';
import {
    StyledMotionSliderButtonThumb,
    StyledSliderButton,
    StyledSliderButtonButtonsWrapper,
    StyledSliderButtonItem,
    StyledSliderButtonPopupContent,
    StyledSliderButtonPopupContentItem,
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
    const [dragRange, setDragRange] = useState({ left: 0, right: 0 });
    const [shownItemsCount, setShownItemsCount] = useState(items.length);
    const [sliderSize, setSliderSize] = useState({ width: 0 });
    const [currentId, setCurrentId] = useState('');
    const [currentPopupId, setCurrentPopupId] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderButtonRef = useRef<HTMLDivElement>(null);
    const sliderButtonWrapperRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<PopupRef>(null);

    const [scope, animate] = useAnimate();

    const initialItemWidth = useMemo(() => calculateBiggestWidth(items), [items]);
    const elementSize = useElementSize(sliderButtonRef);

    useEffect(() => {
        if (elementSize) setSliderSize(elementSize);
    }, [elementSize]);

    const setPopupId = useCallback(
        (selectedId: string) => {
            const ids = items.slice(shownItemsCount - 1).map(({ id }) => id);

            const newId = ids.find((id) => id === selectedId);

            if (newId) {
                setCurrentId('more');
                setCurrentPopupId(newId);

                return;
            }

            setCurrentId(selectedId);
        },
        [items, shownItemsCount],
    );

    const isSliderBigger = useMemo(
        () => sliderSize && Math.floor(sliderSize.width / initialItemWidth) < items.length - 1,
        [initialItemWidth, items.length, sliderSize],
    );

    const maxShownItemsCount = useMemo(() => {
        let totalWidth = 0;
        let count = 0;

        while (count < items.length) {
            const visibleItems = items.slice(0, count + 1);
            const currentMaxWidth = calculateBiggestWidth(visibleItems) + 8;

            if (totalWidth + currentMaxWidth > sliderSize.width) break;

            totalWidth += currentMaxWidth;
            count++;
        }

        return count;
    }, [items, sliderSize.width]);

    const itemWidth = useMemo(() => {
        const sliderWidth = sliderSize?.width || 0;
        const itemCount = items.length || 1;

        setShownItemsCount(isSliderBigger ? maxShownItemsCount : itemCount);

        return sliderWidth / (isSliderBigger ? maxShownItemsCount : itemCount);
    }, [isSliderBigger, items.length, maxShownItemsCount, sliderSize?.width]);

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

    const setItemPosition = useCallback(
        (index: number) => {
            setCurrentIndex(index);

            void animation(itemWidth * index);
        },
        [animation, itemWidth],
    );

    useEffect(() => {
        if (typeof selectedButtonId === 'string') {
            let index = items.findIndex(({ id }) => id === selectedButtonId);

            setCurrentId(selectedButtonId);

            setPopupId(selectedButtonId);

            if (items.length > shownItemsCount && index > shownItemsCount - 1) {
                index = shownItemsCount - 1;
            }

            if (index >= 0) {
                setItemPosition(index);
            }
        }
    }, [
        animation,
        dragRange.right,
        isSliderBigger,
        itemWidth,
        items,
        selectedButtonId,
        setItemPosition,
        setPopupId,
        shownItemsCount,
    ]);

    const handleClick = useCallback(
        (id: string, index: number) => {
            if (isDisabled) {
                return;
            }

            setPopupId(id);

            if (typeof onChange === 'function' && id !== 'more') {
                onChange(id);
            }

            if (popupRef.current) {
                if (id === 'more') {
                    popupRef.current.show();
                } else {
                    popupRef.current.hide();
                }
            }

            setItemPosition(index);
        },
        [isDisabled, onChange, setItemPosition, setPopupId],
    );

    const buttons = useMemo(() => {
        if (items.length > shownItemsCount) {
            const newItems = items.slice(0, shownItemsCount - 1);
            const otherItems = items.slice(shownItemsCount - 1);

            const elements = newItems.map(({ id, text }, index) => (
                <StyledSliderButtonItem
                    $width={itemWidth}
                    key={`slider-button-${id}`}
                    onClick={() => handleClick(id, index)}
                >
                    {text}
                </StyledSliderButtonItem>
            ));

            const popupContent = otherItems.map(({ id, text }) => (
                <StyledSliderButtonPopupContentItem
                    key={`slider-button-${id}`}
                    onClick={() => handleClick(id, newItems.length)}
                    $isSelected={id === currentPopupId}
                >
                    {text}
                </StyledSliderButtonPopupContentItem>
            ));

            const id = 'more';

            elements.push(
                <StyledSliderButtonItem $width={itemWidth} key={`slider-button-${id}`}>
                    <Popup
                        ref={popupRef}
                        content={
                            <StyledSliderButtonPopupContent>
                                {popupContent}
                            </StyledSliderButtonPopupContent>
                        }
                    >
                        <Icon icons={['fa fa-ellipsis']} color="white" />
                    </Popup>
                </StyledSliderButtonItem>,
            );

            return elements;
        }
        return items.map(({ id, text }) => (
            <StyledSliderButtonItem $width={itemWidth} key={`slider-button-${id}`}>
                {text}
            </StyledSliderButtonItem>
        ));
    }, [currentPopupId, handleClick, itemWidth, items, shownItemsCount]);

    const pseudoButtons = useMemo(() => {
        if (items.length > shownItemsCount) {
            const newItems = items.slice(0, shownItemsCount - 1);

            const elements = newItems.map(({ id, text }, index) => (
                <StyledSliderButtonItem
                    $width={itemWidth}
                    key={`pseudo-slider-button-${id}`}
                    onClick={() => handleClick(id, index)}
                >
                    {text}
                </StyledSliderButtonItem>
            ));

            const id = 'more';

            elements.push(
                <StyledSliderButtonItem
                    $width={itemWidth}
                    key={`pseudo-slider-button-${id}`}
                    onClick={() => handleClick(id, newItems.length)}
                >
                    <Icon icons={['fa fa-ellipsis']} />
                </StyledSliderButtonItem>,
            );

            return elements;
        }
        return items.map(({ id, text }, index) => (
            <StyledSliderButtonItem
                $width={itemWidth}
                key={`pseudo-slider-button-${id}`}
                onClick={() => handleClick(id, index)}
            >
                {text}
            </StyledSliderButtonItem>
        ));
    }, [handleClick, itemWidth, items, shownItemsCount]);

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

    const handleDragStart = useCallback(() => {
        void setRefreshScrollEnabled(false);
    }, []);

    const handleDragEnd = useCallback(() => {
        void setRefreshScrollEnabled(true);

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

            let id;

            if (nearestIndex === shownItemsCount - 1) {
                id = 'more';
            } else {
                id = items[nearestIndex]?.id;
            }

            if (popupRef.current) {
                if (id === 'more') {
                    popupRef.current.show();
                } else {
                    popupRef.current.hide();
                }
            }

            if (typeof onChange === 'function' && id && id !== 'more') {
                onChange(id);
            }
        }
    }, [animation, itemWidth, items, onChange, scope, shownItemsCount, snapPoints]);

    return useMemo(
        () => (
            <StyledSliderButton $isDisabled={isDisabled} ref={sliderButtonRef}>
                <StyledSliderButtonButtonsWrapper $isInvisible>
                    {pseudoButtons}
                </StyledSliderButtonButtonsWrapper>
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
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    onClick={() => handleClick(currentId, currentIndex)}
                />
                <StyledSliderButtonWrapper
                    $isDisabled={isDisabled}
                    $width={!isSliderBigger ? dragRange.right + itemWidth : dragRange.right}
                    ref={sliderButtonWrapperRef}
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
            currentId,
            currentIndex,
            dragRange,
            handleClick,
            handleDragEnd,
            handleDragStart,
            isDisabled,
            isSliderBigger,
            itemWidth,
            pseudoButtons,
            scope,
        ],
    );
};

SliderButton.displayName = 'SliderButton';

export default SliderButton;
