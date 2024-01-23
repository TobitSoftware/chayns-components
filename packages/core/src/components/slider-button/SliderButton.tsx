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
import { AnimatePresence, useAnimate } from 'framer-motion';
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

    useEffect(() => {}, []);

    const handleClick = useCallback(
        (event: MouseEvent, id: string, index: number) => {
            setSelectedButton(id);

            if (typeof onChange === 'function') {
                onChange(id);
            }

            const animation = async (x: number) => {
                await animate(
                    scope.current,
                    { x },
                    {
                        type: 'tween',
                        duration: 0.2,
                    },
                );
            };

            void animation(itemWidth * index);
        },
        [animate, itemWidth, onChange, scope],
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
                    >
                        {thumbText}
                    </StyledMotionSliderButtonThumb>
                </AnimatePresence>
            </StyledSliderButton>
        ),
        [buttons, dragRange, isDisabled, itemWidth, scope, thumbText],
    );
};

SliderButton.displayName = 'SliderButton';

export default SliderButton;
