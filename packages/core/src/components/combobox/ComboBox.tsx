import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { calculateContentHeight, calculateContentWidth } from '../../utils/calculate';
import Icon from '../icon/Icon';
import ComboBoxItem from './combobox-item/ComboBoxItem';
import {
    StyledComboBox,
    StyledComboBoxHeader,
    StyledComboBoxIconWrapper,
    StyledComboBoxPlaceholder,
    StyledMotionComboBoxBody,
} from './ComboBox.styles';

export interface IComboBoxItem {
    text: string;
    value: string | number;
}

export type ComboBoxProps = {
    /**
     * The list of the items that should be displayed.
     */
    list: IComboBoxItem[];
    /**
     * Function that should be executed when an item is selected.
     */
    onSelect?: (comboboxItem: IComboBoxItem) => void;
    /**
     * A text that should be displayed when no item is selected.
     */
    placeholder: string;
    /**
     * An item that should be preselected.
     */
    selectedItem?: IComboBoxItem;
};

const ComboBox: FC<ComboBoxProps> = ({ placeholder, list, onSelect, selectedItem }) => {
    const [item, setItem] = useState<IComboBoxItem>();
    const [isAnimating, setIsAnimating] = useState(false);
    const [minWidth, setMinWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsAnimating(false);
            }
        },
        [ref]
    );

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick, ref]);

    /**
     * This function sets the selected item
     */
    const handleSetSelectedItem = useCallback(
        (itemToSelect: IComboBoxItem) => {
            setItem(itemToSelect);
            setIsAnimating(false);

            if (onSelect) {
                onSelect(itemToSelect);
            }
        },
        [onSelect]
    );

    /**
     * This function calculates the greatest width
     */
    useEffect(() => {
        const textArray = list.map(({ text }) => text);

        setHeight(calculateContentHeight(textArray));

        textArray.push(placeholder);

        setMinWidth(calculateContentWidth(textArray) + 45);
    }, [list, placeholder]);

    /**
     * This function sets the external selected item
     */
    useEffect(() => {
        if (selectedItem) {
            setItem(selectedItem);
            setIsAnimating(false);
        }
    }, [selectedItem]);

    /**
     * Function that renders the combobox items
     */
    const content = useMemo(() => {
        const items: ReactNode[] = [];

        list.forEach(({ text, value }) => {
            items.push(
                <ComboBoxItem
                    key={value}
                    value={value}
                    text={text}
                    onSelect={handleSetSelectedItem}
                />
            );
        });

        return items;
    }, [handleSetSelectedItem, list]);

    /**
     * This function resets the placeholder
     */
    const placeholderText = useMemo(() => {
        let text = placeholder;

        if (!selectedItem) {
            text = placeholder;
        } else if (item?.text) {
            text = item.text;
        }

        return text;
    }, [item?.text, placeholder, selectedItem]);

    /**
     * This function opens the content of the combobox
     */
    const handleHeaderClick = () => {
        setIsAnimating((prevState) => !prevState);
    };

    return useMemo(
        () => (
            <StyledComboBox ref={ref}>
                <StyledComboBoxHeader
                    minWidth={minWidth}
                    onClick={handleHeaderClick}
                    isOpen={isAnimating}
                >
                    <StyledComboBoxPlaceholder>{placeholderText}</StyledComboBoxPlaceholder>
                    <StyledComboBoxIconWrapper>
                        <Icon icons={['fa fa-chevron-down']} />
                    </StyledComboBoxIconWrapper>
                </StyledComboBoxHeader>
                <StyledMotionComboBoxBody
                    height={height}
                    minWidth={minWidth}
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                        isAnimating
                            ? { height: 'fit-content', opacity: 1 }
                            : { height: 0, opacity: 0 }
                    }
                    transition={{
                        duration: 0.2,
                    }}
                >
                    {content}
                </StyledMotionComboBoxBody>
            </StyledComboBox>
        ),
        [content, height, isAnimating, minWidth, placeholderText]
    );
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
