import React, {
    FC,
    MouseEvent,
    type ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    StyledMotionSliderButtonThumb,
    StyledSliderButton,
    StyledSliderButtonItem,
} from './SliderButton.styles';
import type { SliderButtonItem } from '../../types/slider-button';
import { AnimatePresence, type PanInfo, useAnimate, useMotionValue } from 'framer-motion';
import { calculateBiggestWidth } from '../../utils/calculate';

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

    useEffect(() => {
        if (selectedButtonId) {
            setSelectedButton(selectedButtonId);
        } else {
            setSelectedButton(items[0]?.id);
        }
    }, [items, selectedButtonId]);

    const itemWidth = useMemo(() => calculateBiggestWidth(items), [items]);

    useEffect(() => {
        if (sliderButtonRef.current) {
            setDragRange({ left: 0, right: sliderButtonRef.current.offsetWidth - itemWidth });
        }
    }, [itemWidth]);

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

    const handleClick = useCallback(
        (event: MouseEvent, id: string, index: number) => {
            setSelectedButton(id);

            if (typeof onChange === 'function') {
                onChange(id);
            }

            void animation(itemWidth * index);
        },
        [animation, itemWidth, onChange],
    );

    const buttons = useMemo(() => {
        const list: ReactElement[] = [];

        items.forEach(({ id, text }, index) => {
            list.push(
                <StyledSliderButtonItem
                    width={itemWidth}
                    key={`slider-button-${id}`}
                    onClick={(event) => handleClick(event, id, index)}
                    isSelected={id === selectedButton}
                >
                    {text}
                </StyledSliderButtonItem>,
            );
        });

        return list;
    }, [handleClick, itemWidth, items, selectedButton]);

    const thumbText = useMemo(() => {
        const selectedItem = items.find(({ id }) => id === selectedButton);

        return selectedItem ? selectedItem.text : '';
    }, [items, selectedButton]);

    // const handleDragEnd = useCallback(
    //     (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    //         if (!sliderButtonRef.current) {
    //             return;
    //         }
    //
    //         const leftOffset = sliderButtonRef.current.offsetLeft;
    //
    //         const snapPoints = [0];
    //
    //         for (let i = 1; i < items.length; i++) {
    //             snapPoints.push(itemWidth * i);
    //         }
    //
    //         console.log(snapPoints);
    //         console.log(info, event);
    //
    //         const closestSnap = snapPoints.reduce(
    //             (prev, snap) =>
    //                 Math.abs(info.point.x - leftOffset - snap) <
    //                 Math.abs(info.point.x - leftOffset - (prev ?? 0))
    //                     ? snap
    //                     : prev,
    //             snapPoints[0],
    //         );
    //
    //         console.log(closestSnap);
    //
    //         if (closestSnap) {
    //             void animation(closestSnap);
    //         }
    //     },
    //     [animation, itemWidth, items.length],
    // );

    const handleWhileDrag = useCallback(
        (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            console.log(info, event);
        },
        [],
    );

    return useMemo(
        () => (
            <StyledSliderButton isDisabled={isDisabled} ref={sliderButtonRef}>
                <AnimatePresence>
                    {buttons}
                    <StyledMotionSliderButtonThumb
                        ref={scope}
                        drag="x"
                        dragElastic={0}
                        dragConstraints={{ ...dragRange }}
                        width={itemWidth}
                        onDrag={handleWhileDrag}
                        // onDragEnd={handleDragEnd}
                    >
                        {thumbText}
                    </StyledMotionSliderButtonThumb>
                </AnimatePresence>
            </StyledSliderButton>
        ),
        [buttons, dragRange, handleWhileDrag, isDisabled, itemWidth, scope, thumbText],
    );
};

SliderButton.displayName = 'SliderButton';

export default SliderButton;
