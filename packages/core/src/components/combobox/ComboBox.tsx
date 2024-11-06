import { useDevice } from 'chayns-api';
import { AnimatePresence } from 'framer-motion';
import React, {
    FC,
    ReactPortal,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
    ChangeEventHandler,
    FocusEventHandler,
} from 'react';
import { createPortal } from 'react-dom';
import { ComboBoxDirection } from '../../types/comboBox';
import { calculateContentWidth, getMaxHeightInPixels } from '../../utils/calculate';
import { getIsTouch } from '../../utils/environment';
import type { ContextMenuCoordinates } from '../context-menu/ContextMenu';
import Icon from '../icon/Icon';
import ComboBoxItem from './combobox-item/ComboBoxItem';
import {
    StyledComboBox,
    StyledComboBoxHeader,
    StyledComboBoxIconWrapper,
    StyledComboBoxInput,
    StyledComboBoxPlaceholder,
    StyledComboBoxPlaceholderImage,
    StyledComboBoxTopic,
    StyledMotionComboBoxBody,
} from './ComboBox.styles';

export interface IComboBoxItems {
    groupName?: string;
    list: Array<IComboBoxItem>;
}

export interface IComboBoxItem {
    icons?: string[];
    imageUrl?: string;
    isDisabled?: boolean;
    rightElement?: ReactNode;
    subtext?: string;
    suffixElement?: ReactNode;
    text: string;
    value: string | number;
}

export type ComboBoxProps = {
    /**
     * The element where the content of the `ComboBox` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The direction in which the combobox should open.
     */
    direction?: ComboBoxDirection;
    /**
     * The value of the optional input.
     */
    inputValue?: string;
    /**
     * Whether the combobox should be disabled.
     */
    isDisabled?: boolean;
    /**
     * The list of the items that should be displayed.
     */
    lists: IComboBoxItems[];
    /**
     * The maximum height of the combobox content.
     */
    maxHeight?: CSSProperties['maxHeight'];
    /**
     * Function to be executed when the value of the optional input is changed.
     */
    onInputChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when the optional input lost its focus.
     */
    onInputBlur?: FocusEventHandler<HTMLInputElement> /**
     * Function to be executed when the optional input gets its focus.
     */;
    onInputFocus?: FocusEventHandler<HTMLInputElement>;
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
     * If true, the images of the items are displayed in a bigger shape. This prop will automatically be set to true if the subtext of an item is given.
     */
    shouldShowBigImage?: boolean;
    /**
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
    /**
     * Whether the width of the 'ComboBox' should be the width of the parent or of the widest item.
     */
    shouldUseFullWidth?: boolean;
};

const ComboBox: FC<ComboBoxProps> = ({
    direction = ComboBoxDirection.BOTTOM,
    isDisabled = false,
    lists,
    maxHeight = '280px',
    onSelect,
    placeholder,
    container = document.body,
    selectedItem,
    shouldShowBigImage,
    shouldShowRoundImage,
    onInputFocus,
    shouldUseFullWidth = false,
    onInputChange,
    onInputBlur,
    inputValue,
}) => {
    const [internalSelectedItem, setInternalSelectedItem] = useState<IComboBoxItem>();
    const [isAnimating, setIsAnimating] = useState(false);
    const [minWidth, setMinWidth] = useState(0);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [overflowY, setOverflowY] = useState<CSSProperties['overflowY']>('hidden');
    const [portal, setPortal] = useState<ReactPortal>();
    const [internalCoordinates, setInternalCoordinates] = useState<ContextMenuCoordinates>({
        x: 0,
        y: 0,
    });

    const styledComboBoxElementRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const { browser } = useDevice();

    const isTouch = getIsTouch();

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (
                styledComboBoxElementRef.current &&
                !styledComboBoxElementRef.current.contains(event.target as Node) &&
                contentRef.current &&
                !contentRef.current.contains(event.target as Node)
            ) {
                setIsAnimating(false);
            }
        },
        [styledComboBoxElementRef],
    );

    const handleOpen = useCallback(() => {
        if (styledComboBoxElementRef.current) {
            const {
                left: comboBoxLeft,
                top: comboBoxTop,
                height,
            } = styledComboBoxElementRef.current.getBoundingClientRect();
            const { left: containerLeft, top: containerTop } = container.getBoundingClientRect();

            const x = comboBoxLeft - containerLeft + container.scrollLeft;
            const y = comboBoxTop - containerTop + container.scrollTop;

            setInternalCoordinates({
                x,
                y: direction === ComboBoxDirection.TOP ? y : y + height,
            });

            setIsAnimating(true);
        }
    }, [container, direction]);

    const handleClose = useCallback(() => {
        setIsAnimating(false);
    }, []);

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
            setInternalSelectedItem(itemToSelect);
            setIsAnimating(false);

            if (onSelect) {
                onSelect(itemToSelect);
            }
        },
        [onSelect],
    );

    useEffect(() => {
        const currentContent = contentRef.current;

        if (portal && isAnimating && currentContent) {
            const scrollHeight = currentContent.scrollHeight ?? 0;

            const maxHeightInPixels = getMaxHeightInPixels(
                maxHeight,
                styledComboBoxElementRef.current ?? document.body,
            );

            setOverflowY(scrollHeight > maxHeightInPixels ? 'scroll' : 'hidden');
        }
    }, [isAnimating, maxHeight, portal]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isAnimating) {
                return;
            }

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

                let newSelectedItem: IComboBoxItem | undefined;

                lists.some((list) => {
                    newSelectedItem = list.list.find(
                        ({ value }) => String(value) === id.replace('combobox-item__', ''),
                    );
                    return !!newSelectedItem;
                });

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
    }, [focusedIndex, handleSetSelectedItem, isAnimating, lists]);

    /**
     * This function calculates the greatest width
     */
    useEffect(() => {
        const allItems = lists.flatMap((list) => list.list);

        const isAtLeastOneItemWithImageGiven = allItems.some(({ imageUrl }) => imageUrl);
        const isAtLeastOneItemWithIconGiven = allItems.some(({ icons }) => icons);

        const width =
            styledComboBoxElementRef.current?.parentElement?.getBoundingClientRect().width ?? 0;

        // 45px = padding left + padding right + border left + border right + arrow icon width + arrow icon margin left
        // 32px = image width + flex gap
        // 40px = icon width + flex gap
        setMinWidth(
            shouldUseFullWidth
                ? width
                : calculateContentWidth([
                      ...allItems,
                      { text: placeholder, value: 'placeholder' },
                  ]) +
                      45 +
                      (isAtLeastOneItemWithImageGiven ? 32 : 0) +
                      (isAtLeastOneItemWithIconGiven ? 40 : 0),
        );
    }, [lists, maxHeight, placeholder, shouldUseFullWidth]);

    /**
     * This function sets the external selected item
     */
    useEffect(() => {
        setIsAnimating(false);
        setInternalSelectedItem(selectedItem);
    }, [selectedItem]);

    const placeholderImageUrl = useMemo(() => {
        if (selectedItem) {
            return selectedItem.imageUrl;
        }

        if (internalSelectedItem) {
            return internalSelectedItem.imageUrl;
        }

        return undefined;
    }, [internalSelectedItem, selectedItem]);

    const placeholderIcon = useMemo(() => {
        if (selectedItem) {
            return selectedItem.icons;
        }

        if (internalSelectedItem) {
            return internalSelectedItem.icons;
        }

        return undefined;
    }, [internalSelectedItem, selectedItem]);

    /**
     * This function resets the placeholder
     */
    const placeholderText = useMemo(() => {
        let text = placeholder;

        if (selectedItem) {
            text = selectedItem.text;
        } else if (internalSelectedItem) {
            text = internalSelectedItem.text;
        }

        return text;
    }, [internalSelectedItem, placeholder, selectedItem]);

    /**
     * This function opens the content of the combobox
     */
    const handleHeaderClick = useCallback(() => {
        if (!isDisabled) {
            if (isAnimating) {
                handleClose();
            } else {
                handleOpen();
            }
        }
    }, [handleClose, handleOpen, isAnimating, isDisabled]);

    const comboBoxGroups = useMemo(
        () =>
            lists.map(({ groupName, list }) => (
                <div key={groupName ?? 'default-group'}>
                    {groupName && lists.length > 1 && (
                        <StyledComboBoxTopic>{groupName}</StyledComboBoxTopic>
                    )}
                    {list.map((item) => (
                        // ToDo: Cleanup this - item should be given as a prop to avoid full spreading
                        <ComboBoxItem
                            icons={item.icons}
                            id={item.value}
                            imageUrl={item.imageUrl}
                            isDisabled={item.isDisabled}
                            isSelected={selectedItem ? item.value === selectedItem.value : false}
                            key={item.value}
                            onSelect={handleSetSelectedItem}
                            rightElement={item.rightElement}
                            shouldShowBigImage={shouldShowBigImage}
                            shouldShowRoundImage={shouldShowRoundImage}
                            subtext={item.subtext}
                            suffixElement={item.suffixElement}
                            text={item.text}
                            value={item.value}
                        />
                    ))}
                </div>
            )),
        [handleSetSelectedItem, lists, selectedItem, shouldShowBigImage, shouldShowRoundImage],
    );

    const bodyStyles = useMemo(() => {
        let styles: CSSProperties = { left: internalCoordinates.x, top: internalCoordinates.y };

        if (direction === ComboBoxDirection.TOP) {
            styles = { ...styles, transform: 'translateY(-100%)' };
        }

        return styles;
    }, [direction, internalCoordinates.x, internalCoordinates.y]);

    useEffect(() => {
        setPortal(() =>
            createPortal(
                <AnimatePresence initial={false}>
                    {isAnimating && (
                        <StyledMotionComboBoxBody
                            $browser={browser?.name}
                            animate={{ height: 'fit-content', opacity: 1 }}
                            $overflowY={overflowY}
                            initial={{ height: 0, opacity: 0 }}
                            exit={{ height: 0, opacity: 0 }}
                            $maxHeight={maxHeight}
                            $minWidth={minWidth}
                            style={bodyStyles}
                            $direction={direction}
                            transition={{ duration: 0.2 }}
                            tabIndex={0}
                            ref={contentRef}
                        >
                            {comboBoxGroups}
                        </StyledMotionComboBoxBody>
                    )}
                </AnimatePresence>,
                container,
            ),
        );
    }, [
        bodyStyles,
        browser?.name,
        comboBoxGroups,
        container,
        direction,
        isAnimating,
        maxHeight,
        minWidth,
        overflowY,
    ]);

    return useMemo(
        () => (
            <StyledComboBox
                ref={styledComboBoxElementRef}
                $shouldUseFullWidth={shouldUseFullWidth}
                $minWidth={minWidth}
            >
                <StyledComboBoxHeader
                    $direction={direction}
                    onClick={handleHeaderClick}
                    $isOpen={isAnimating}
                    $isTouch={isTouch}
                    $isDisabled={isDisabled}
                >
                    {typeof inputValue === 'string' ? (
                        <StyledComboBoxInput
                            disabled={isDisabled}
                            value={inputValue}
                            onChange={onInputChange}
                            onBlur={onInputBlur}
                            onFocus={onInputFocus}
                            placeholder={placeholderText}
                        />
                    ) : (
                        <StyledComboBoxPlaceholder
                            $shouldReduceOpacity={!selectedItem && !internalSelectedItem}
                        >
                            {placeholderImageUrl && (
                                <StyledComboBoxPlaceholderImage
                                    src={placeholderImageUrl}
                                    shouldShowRoundImage={shouldShowRoundImage}
                                />
                            )}
                            {placeholderIcon && <Icon icons={placeholderIcon} />}
                            {placeholderText}
                            {internalSelectedItem &&
                                internalSelectedItem.suffixElement &&
                                internalSelectedItem.suffixElement}
                        </StyledComboBoxPlaceholder>
                    )}
                    <StyledComboBoxIconWrapper>
                        <Icon icons={['fa fa-chevron-down']} />
                    </StyledComboBoxIconWrapper>
                </StyledComboBoxHeader>
                {portal}
            </StyledComboBox>
        ),
        [
            shouldUseFullWidth,
            minWidth,
            direction,
            handleHeaderClick,
            isAnimating,
            isTouch,
            isDisabled,
            inputValue,
            onInputChange,
            onInputBlur,
            onInputFocus,
            placeholderText,
            selectedItem,
            internalSelectedItem,
            placeholderImageUrl,
            shouldShowRoundImage,
            placeholderIcon,
            portal,
        ],
    );
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
