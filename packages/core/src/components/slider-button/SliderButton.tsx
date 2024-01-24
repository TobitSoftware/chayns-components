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
import {
    AnimatePresence,
    type PanInfo,
    useAnimate,
    useMotionValue,
    useTransform,
} from 'framer-motion';
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

    const handleDragEnd = useCallback(
        (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            if (!scope.current) {
                return;
            }

            const { transform } = (scope.current as HTMLElement).style;
            let position;

            if (transform === 'none') {
                position = 0;
            } else {
                const match = transform.match(/translateX\(([-\d.]+)px\)/);

                if (match && match[1]) {
                    position = parseFloat(match[1]);
                }
            }

            if (!position) {
                return;
            }

            const leftOffset = position + itemWidth / 2;

            const snapPoints = [0];

            for (let i = 1; i < items.length; i++) {
                snapPoints.push(itemWidth * i);
            }

            console.log('snapPoints', snapPoints);

            const sortedArray = snapPoints.sort(
                (a, b) => Math.abs(leftOffset - a) - Math.abs(leftOffset - b),
            );

            // Die erste Zahl im sortierten Array ist die nächste Zahl zur Zielzahl
            const closestSnap = sortedArray[0];

            // const closestSnap = snapPoints.reduce(
            //     (prev, snap) =>
            //         Math.abs(info.point.x - leftOffset - snap) <
            //         Math.abs(info.point.x - leftOffset - (prev ?? 0))
            //             ? snap
            //             : prev,
            //     snapPoints[0],
            // );

            console.log('mitte', leftOffset);
            console.log('closestSnap', closestSnap);

            if (closestSnap) {
                void animation(closestSnap);
            }
        },
        [animation, itemWidth, items.length, scope],
    );

    const handleWhileDrag = useCallback(
        (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            if (!scope.current) {
                return;
            }

            const { transform } = (scope.current as HTMLElement).style;
            let position;

            if (transform === 'none') {
                position = 0;
            } else {
                const match = transform.match(/translateX\(([-\d.]+)px\)/);

                if (match && match[1]) {
                    position = parseFloat(match[1]);
                }
            }

            // if (!position) {
            //     return;
            // }
        },
        [scope],
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
                        // onDrag={handleWhileDrag}
                        onDragEnd={handleDragEnd}
                    >
                        {thumbText}
                    </StyledMotionSliderButtonThumb>
                </AnimatePresence>
            </StyledSliderButton>
        ),
        [buttons, dragRange, handleDragEnd, isDisabled, itemWidth, scope, thumbText],
    );
};

SliderButton.displayName = 'SliderButton';

export default SliderButton;
