import { getDevice } from 'chayns-api';
import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from 'react';
import { ComboBoxDirection } from '../../types/comboBox';
import {
    calculateContentHeight,
    calculateContentWidth,
    getMaxHeightInPixels,
} from '../../utils/calculate';
import { getIsTouch } from '../../utils/environment';
import Icon from '../icon/Icon';
import ComboBoxItem from './combobox-item/ComboBoxItem';
import {
    StyledComboBox,
    StyledComboBoxHeader,
    StyledComboBoxIconWrapper,
    StyledComboBoxPlaceholder,
    StyledComboBoxPlaceholderImage,
    StyledMotionComboBoxBody,
} from './ComboBox.styles';

export interface IComboBoxItem {
    imageUrl?: string;
    suffixElement?: ReactNode;
    text: string;
    value: string | number;
}

export type ComboBoxProps = {
    /**
     * The direction in which the combobox should open.
     */
    direction?: ComboBoxDirection;
    /**
     * Whether the combobox should be disabled.
     */
    isDisabled?: boolean;
    /**
     * The list of the items that should be displayed.
     */
    list: IComboBoxItem[];
    /**
     * The maximum height of the combobox content.
     */
    maxHeight?: CSSProperties['maxHeight'];
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
    /**
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
};

const ComboBox: FC<ComboBoxProps> = ({
    direction = ComboBoxDirection.BOTTOM,
    isDisabled = false,
    list,
    maxHeight = '280px',
    onSelect,
    placeholder,
    selectedItem,
    shouldShowRoundImage,
}) => {
    const [item, setItem] = useState<IComboBoxItem>();
    const [isAnimating, setIsAnimating] = useState(false);
    const [minWidth, setMinWidth] = useState(0);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [overflowY, setOverflowY] = useState<CSSProperties['overflowY']>('hidden');

    const styledComboBoxElementRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const { browser } = getDevice();

    const isTouch = getIsTouch();

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (
                styledComboBoxElementRef.current &&
                !styledComboBoxElementRef.current.contains(event.target as Node)
            ) {
                setIsAnimating(false);
            }
        },
        [styledComboBoxElementRef],
    );

    /**
     * This function adds an event listener to the document to close the combobox when the user clicks outside of it
     */
    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick, styledComboBoxElementRef]);

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
        [onSelect],
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                const children = contentRef.current?.children;
                if (children && children.length > 0) {
                    const newIndex =
                        focusedIndex !== null
                            ? (focusedIndex + (e.key === 'ArrowUp' ? -1 : 1) + children.length) %
                              children.length
                            : 0;

                    if (focusedIndex !== null) {
                        const prevElement = children[focusedIndex] as HTMLDivElement;
                        prevElement.tabIndex = -1;
                    }

                    setFocusedIndex(newIndex);

                    const newElement = children[newIndex] as HTMLDivElement;
                    newElement.tabIndex = 0;
                    newElement.focus();
                }
            } else if (e.key === 'Enter' && focusedIndex !== null) {
                const element = contentRef.current?.children[focusedIndex];

                if (!element) {
                    return;
                }

                const { id } = element;

                const newSelectedItem = list.find(
                    ({ value }) => String(value) === id.replace('combobox-item__', ''),
                );

                if (!newSelectedItem) {
                    return;
                }

                handleSetSelectedItem(newSelectedItem);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusedIndex, handleSetSelectedItem, list]);

    /**
     * This function calculates the greatest width
     */
    useEffect(() => {
        const isAtLeastOneItemWithImageGiven = list.some(({ imageUrl }) => imageUrl);

        const textArray = list.map(({ text }) => text);

        const contentHeight = calculateContentHeight(textArray);

        const maxHeightInPixels = getMaxHeightInPixels(
            maxHeight,
            styledComboBoxElementRef.current ?? document.body,
        );

        setOverflowY(contentHeight > maxHeightInPixels ? 'scroll' : 'hidden');

        textArray.push(placeholder);

        // 45px = padding left + padding right + border left + border right + arrow icon width + arrow icon margin left
        // 32px = image width + flex gap
        setMinWidth(
            calculateContentWidth([...list, { text: placeholder, value: 'placeholder' }]) +
                45 +
                (isAtLeastOneItemWithImageGiven ? 32 : 0),
        );
    }, [list, maxHeight, placeholder]);

    /**
     * This function sets the external selected item
     */
    useEffect(() => {
        setIsAnimating(false);
        setItem(selectedItem);
    }, [selectedItem]);

    const placeholderImageUrl = useMemo(() => {
        if (selectedItem) {
            return selectedItem.imageUrl;
        }

        if (item) {
            return item.imageUrl;
        }

        return undefined;
    }, [item, selectedItem]);

    /**
     * This function resets the placeholder
     */
    const placeholderText = useMemo(() => {
        let text = placeholder;

        if (selectedItem) {
            text = selectedItem.text;
        } else if (item) {
            text = item.text;
        }

        return text;
    }, [item, placeholder, selectedItem]);

    /**
     * This function opens the content of the combobox
     */
    const handleHeaderClick = useCallback(() => {
        if (!isDisabled) {
            setIsAnimating((prevState) => !prevState);
        }
    }, [isDisabled]);

    const comboBoxBody = useMemo(() => {
        const items = list.map(({ imageUrl, suffixElement, text, value }) => (
            <ComboBoxItem
                imageUrl={imageUrl}
                isSelected={selectedItem ? value === selectedItem.value : false}
                key={value}
                id={value}
                onSelect={handleSetSelectedItem}
                shouldShowRoundImage={shouldShowRoundImage}
                suffixElement={suffixElement}
                text={text}
                value={value}
            />
        ));

        const animate = isAnimating
            ? { height: 'fit-content', opacity: 1 }
            : { height: 0, opacity: 0 };

        const style =
            direction === ComboBoxDirection.TOP ? { transform: 'translateY(-100%)' } : undefined;

        return (
            <StyledMotionComboBoxBody
                $browser={browser?.name}
                animate={animate}
                $overflowY={overflowY}
                initial={{ height: 0, opacity: 0 }}
                $maxHeight={maxHeight}
                $minWidth={minWidth}
                style={style}
                $direction={direction}
                transition={{ duration: 0.2 }}
                tabIndex={0}
                ref={contentRef}
            >
                {items}
            </StyledMotionComboBoxBody>
        );
    }, [
        browser?.name,
        direction,
        handleSetSelectedItem,
        isAnimating,
        list,
        maxHeight,
        minWidth,
        overflowY,
        selectedItem,
        shouldShowRoundImage,
    ]);

    return useMemo(
        () => (
            <StyledComboBox ref={styledComboBoxElementRef}>
                {direction === ComboBoxDirection.TOP && comboBoxBody}
                <StyledComboBoxHeader
                    $direction={direction}
                    $minWidth={minWidth}
                    onClick={handleHeaderClick}
                    $isOpen={isAnimating}
                    $isTouch={isTouch}
                    $isDisabled={isDisabled}
                >
                    <StyledComboBoxPlaceholder>
                        {placeholderImageUrl && (
                            <StyledComboBoxPlaceholderImage
                                src={placeholderImageUrl}
                                shouldShowRoundImage={shouldShowRoundImage}
                            />
                        )}
                        {placeholderText}
                        {item && item.suffixElement && item.suffixElement}
                    </StyledComboBoxPlaceholder>
                    <StyledComboBoxIconWrapper>
                        <Icon icons={['fa fa-chevron-down']} />
                    </StyledComboBoxIconWrapper>
                </StyledComboBoxHeader>
                {direction === ComboBoxDirection.BOTTOM && comboBoxBody}
            </StyledComboBox>
        ),
        [
            comboBoxBody,
            direction,
            handleHeaderClick,
            isAnimating,
            isDisabled,
            isTouch,
            item,
            minWidth,
            placeholderImageUrl,
            placeholderText,
            shouldShowRoundImage,
        ],
    );
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
