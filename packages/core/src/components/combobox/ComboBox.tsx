import { useDevice, useFunctions, useValues } from 'chayns-api';
import React, {
    ChangeEventHandler,
    type CSSProperties,
    FC,
    FocusEventHandler,
    Fragment,
    ReactHTML,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { BrowserName } from '../../types/chayns';
import { calculateContentWidth, getMaxHeightInPixels } from '../../utils/calculate';
import { getIsTouch } from '../../utils/environment';
import { AreaContext } from '../area-provider/AreaContextProvider';
import Icon from '../icon/Icon';
import ComboBoxItem from './combobox-item/ComboBoxItem';
import {
    StyledComboBox,
    StyledComboBoxBody,
    StyledComboBoxClearIconWrapper,
    StyledComboBoxHeader,
    StyledComboBoxIconWrapper,
    StyledComboBoxInput,
    StyledComboBoxPlaceholder,
    StyledComboBoxPlaceholderImage,
    StyledComboBoxPlaceholderText,
    StyledComboBoxPrefix,
    StyledComboBoxPrefixAndPlaceholderWrapper,
    StyledComboBoxTopic,
} from './ComboBox.styles';
import DropdownBodyWrapper from '../dropdown-body-wrapper/DropdownBodyWrapper';
import { DropdownDirection } from '../../types/dropdown';

export interface IComboBoxItems {
    groupName?: string;
    list: Array<IComboBoxItem>;
    shouldShowRoundImage?: boolean;
}

export interface ComboBoxTextStyles {
    tagName?: keyof ReactHTML;
    styles?: CSSProperties;
}

export interface IComboBoxItem {
    icons?: string[];
    imageBackground?: CSSProperties['background'];
    imageUrl?: string;
    isDisabled?: boolean;
    rightElement?: ReactNode;
    subtext?: string;
    suffixElement?: ReactNode;
    text: string;
    value: string | number;
    textStyles?: ComboBoxTextStyles;
}

export type ComboBoxProps = {
    bodyWidth?: number;
    /**
     * The element where the content of the `ComboBox` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The direction in which the combobox should open.
     */
    direction?: DropdownDirection;
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
    maxHeight?: number;
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
     * Function that should be executed when an item is selected. If the function returns false, the item will not be selected.
     */
    onSelect?: (comboboxItem?: IComboBoxItem) => Promise<boolean> | boolean | void;
    /**
     * A text that should be displayed when no item is selected.
     */
    placeholder: string;
    /**
     * A prefix that should be displayed before the placeholder.
     */
    prefix?: string;
    /**
     * An item that should be preselected.
     */
    selectedItem?: IComboBoxItem;
    /**
     * If true, the images of the items are displayed in a bigger shape. This prop will automatically be set to true if the subtext of an item is given.
     */
    shouldShowBigImage?: boolean;
    /**
     * If true, a clear icon is displayed at the end of the combo box if an item is selected.
     */
    shouldShowClearIcon?: boolean;
    /**
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
    /**
     * Whether the width of the ComboBox should be the width of the current item.
     */
    shouldUseCurrentItemWidth?: boolean;
    /**
     * Whether the width of the 'ComboBox' should be the width of the parent or of the widest item.
     */
    shouldUseFullWidth?: boolean;
};

const ComboBox: FC<ComboBoxProps> = ({
    bodyWidth,
    direction = DropdownDirection.RIGHT,
    isDisabled = false,
    lists,
    maxHeight = 280,
    onSelect,
    placeholder,
    prefix,
    container,
    selectedItem,
    shouldShowBigImage,
    shouldShowClearIcon,
    shouldShowRoundImage,
    onInputFocus,
    shouldUseFullWidth = false,
    onInputChange,
    shouldUseCurrentItemWidth = false,
    onInputBlur,
    inputValue,
}) => {
    const [internalSelectedItem, setInternalSelectedItem] = useState<IComboBoxItem>();
    const [isAnimating, setIsAnimating] = useState(false);
    const [minWidth, setMinWidth] = useState<number | undefined>(undefined);
    const [bodyMinWidth, setBodyMinWidth] = useState(0);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const isInputFocused = useRef(false);

    const styledComboBoxElementRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const functions = useFunctions();
    const values = useValues();

    const isTouch = getIsTouch();

    const { browser } = useDevice();

    const areaProvider = useContext(AreaContext);

    const shouldChangeColor = useMemo(
        () => areaProvider.shouldChangeColor ?? false,
        [areaProvider.shouldChangeColor],
    );

    const shouldDisableActions = useMemo(() => {
        if (!selectedItem) {
            return false;
        }

        const combinedLists = lists.flatMap((list) => list.list);

        return (
            combinedLists.length === 1 &&
            combinedLists.some((item) => item.value === selectedItem.value)
        );
    }, [lists, selectedItem]);

    const contentHeight = useMemo(() => {
        const flatItems = lists.flatMap((list) => list.list);

        let result = flatItems.length * 36;

        if (lists.length > 1) {
            result += lists.length * 36;
        }

        // ToDo: Implement a better solution to also work with percentage values or other units
        if (maxHeight.toString().includes('px')) {
            const maxHeightValue = parseInt(maxHeight.toString().replace('px', ''), 10);

            if (maxHeightValue < result) {
                result = maxHeightValue;
            }
        }

        return result;
    }, [lists, maxHeight]);

    const handleInputFocus: FocusEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            isInputFocused.current = true;
            onInputFocus?.(event);
        },
        [onInputFocus],
    );

    const handleInputBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            isInputFocused.current = false;
            onInputBlur?.(event);
        },
        [onInputBlur],
    );

    const handleOpen = useCallback(() => {
        setIsAnimating(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsAnimating(false);
    }, []);

    /**
     * This function sets the selected item
     */
    const handleSetSelectedItem = useCallback(
        (itemToSelect?: IComboBoxItem) => {
            if (typeof onSelect === 'function') {
                const onSelectResult = onSelect(itemToSelect);

                if (onSelectResult === false) {
                    return;
                }

                if (onSelectResult instanceof Promise) {
                    void onSelectResult.then((shouldPreventSelection) => {
                        if (shouldPreventSelection) return;

                        setInternalSelectedItem(itemToSelect);
                        setIsAnimating(false);
                    });

                    return;
                }
            }

            setInternalSelectedItem(itemToSelect);
            setIsAnimating(false);
        },
        [onSelect],
    );

    const handleClear = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            handleSetSelectedItem(undefined);
        },
        [handleSetSelectedItem],
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isAnimating) return;

            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();

                const children = contentRef.current?.children;

                if (!children || children.length === 0) return;

                const stepDirection = e.key === 'ArrowUp' ? -1 : 1;

                let newIndex = focusedIndex ?? -1;

                let attempts = 0;

                do {
                    newIndex = (newIndex + stepDirection + children.length) % children.length;

                    const newElement = children[newIndex] as HTMLDivElement;

                    let shouldSkip = false;

                    if (
                        newElement.id.startsWith('combobox-group--') ||
                        newElement.id.endsWith('--disabled-item')
                    ) {
                        shouldSkip = true;
                    }

                    if (!shouldSkip) break;

                    attempts++;
                } while (attempts < children.length);

                if (focusedIndex !== null) {
                    const prevElement = children[focusedIndex] as HTMLDivElement;

                    prevElement.tabIndex = -1;
                }

                setFocusedIndex(newIndex);

                const focusedElement = children[newIndex] as HTMLDivElement;

                focusedElement.tabIndex = 0;

                focusedElement.focus();
            } else if (e.key === 'Enter' && focusedIndex !== null) {
                const element = contentRef.current?.children[focusedIndex];

                if (!element) return;

                const { id } = element;

                let newSelectedItem: IComboBoxItem | undefined;

                lists.some((list) => {
                    newSelectedItem = list.list.find(
                        ({ value }) => String(value) === id.replace('combobox-item__', ''),
                    );

                    return !!newSelectedItem;
                });

                if (newSelectedItem) {
                    handleSetSelectedItem(newSelectedItem);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [focusedIndex, handleSetSelectedItem, isAnimating, lists]);

    /**
     * This function calculates the greatest width
     */
    useEffect(() => {
        const allItems = lists.flatMap((list) => list.list);
        const hasImage = [selectedItem, ...allItems].some((item) => item?.imageUrl);
        const hasIcon = [selectedItem, ...allItems].some((item) => item?.icons);

        const parentWidth =
            styledComboBoxElementRef.current?.parentElement?.getBoundingClientRect().width ?? 0;

        const paddingWidth = 20 + 2 + 40 + 40; // padding + border + arrow icon + optional clear icon
        const imageWidth = hasImage ? 32 : 0; // image width + gap if images present
        const iconWidth = hasIcon ? 40 : 0; // icon width + gap if icons present

        let prefixWidth = 0;

        if (prefix) {
            const prefixTextWidth =
                calculateContentWidth([{ text: prefix, value: 'prefix' }], functions, values) + 5;

            prefixWidth = Math.max(prefixTextWidth, 32);
        }

        const baseWidth = calculateContentWidth(
            [
                ...allItems,
                { text: placeholder, value: 'placeholder' },
                ...(selectedItem ? [selectedItem] : []),
            ],
            functions,
            values,
        );

        const calculatedWidth = baseWidth + paddingWidth + imageWidth + iconWidth + prefixWidth;

        let tmpMinWidth = calculatedWidth;
        let tmpBodyMinWidth = calculatedWidth;

        // Full width settings
        if (shouldUseFullWidth) {
            tmpMinWidth = parentWidth;

            tmpBodyMinWidth =
                parentWidth < calculatedWidth - 20 ? calculatedWidth - 20 : parentWidth;
        }

        // Current item width settings
        else if (shouldUseCurrentItemWidth && internalSelectedItem) {
            const itemWidth =
                calculateContentWidth([internalSelectedItem], functions, values) +
                paddingWidth +
                imageWidth +
                iconWidth +
                prefixWidth;

            tmpMinWidth = itemWidth;

            tmpBodyMinWidth = itemWidth < calculatedWidth - 20 ? calculatedWidth - 20 : itemWidth;
        }

        if (tmpMinWidth > parentWidth) {
            tmpMinWidth = parentWidth;
        }

        if (tmpBodyMinWidth > parentWidth) {
            tmpBodyMinWidth = parentWidth;
        }

        setMinWidth(tmpMinWidth);
        setBodyMinWidth(shouldUseCurrentItemWidth ? tmpMinWidth : tmpBodyMinWidth);
    }, [
        lists,
        placeholder,
        shouldUseFullWidth,
        shouldUseCurrentItemWidth,
        internalSelectedItem,
        prefix,
        selectedItem,
        functions,
        values,
    ]);

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

    const shouldShowRoundPlaceholderImage = useMemo(() => {
        const selectedItemList = lists.find((list) =>
            list.list.some(
                ({ value }) => value === (selectedItem?.value ?? internalSelectedItem?.value),
            ),
        );

        return selectedItemList?.shouldShowRoundImage ?? shouldShowRoundImage;
    }, [internalSelectedItem?.value, lists, selectedItem?.value, shouldShowRoundImage]);

    /**
     * This function opens the content of the combobox
     */
    const handleHeaderClick = useCallback(() => {
        if (!isDisabled && !isInputFocused.current) {
            if (isAnimating) {
                handleClose();
            } else {
                handleOpen();
            }
        }
    }, [handleClose, handleOpen, isAnimating, isDisabled]);

    const comboBoxGroups = useMemo(
        () =>
            lists.map((list) => (
                <Fragment key={list.groupName ?? 'default-group'}>
                    {list.groupName && lists.length > 1 && (
                        <StyledComboBoxTopic id={`combobox-group--${list.groupName}`}>
                            {list.groupName}
                        </StyledComboBoxTopic>
                    )}
                    {list.list.map((item) => (
                        // ToDo: Cleanup this - item should be given as a prop to avoid full spreading
                        <ComboBoxItem
                            icons={item.icons}
                            id={item.value}
                            imageBackground={item.imageBackground}
                            imageUrl={item.imageUrl}
                            isDisabled={item.isDisabled}
                            isSelected={selectedItem ? item.value === selectedItem.value : false}
                            key={item.value}
                            onSelect={handleSetSelectedItem}
                            rightElement={item.rightElement}
                            shouldShowBigImage={shouldShowBigImage}
                            shouldShowRoundImage={list.shouldShowRoundImage ?? shouldShowRoundImage}
                            subtext={item.subtext}
                            suffixElement={item.suffixElement}
                            text={item.text}
                            value={item.value}
                            textStyles={item.textStyles}
                        />
                    ))}
                </Fragment>
            )),
        [handleSetSelectedItem, lists, selectedItem, shouldShowBigImage, shouldShowRoundImage],
    );

    return useMemo(
        () => (
            <StyledComboBox
                ref={styledComboBoxElementRef}
                $minWidth={minWidth}
                $shouldUseFullWidth={shouldUseFullWidth}
                $shouldUseCurrentItemWidth={shouldUseCurrentItemWidth}
            >
                <StyledComboBoxHeader
                    $direction={direction}
                    onClick={handleHeaderClick}
                    $isOpen={isAnimating}
                    $isTouch={isTouch}
                    $isDisabled={isDisabled}
                    $shouldChangeColor={shouldChangeColor}
                    $shouldShowBigImage={shouldShowBigImage}
                >
                    <StyledComboBoxPrefixAndPlaceholderWrapper>
                        {prefix && <StyledComboBoxPrefix>{prefix}</StyledComboBoxPrefix>}
                        <StyledComboBoxPlaceholder
                            $shouldReduceOpacity={!selectedItem && !internalSelectedItem}
                        >
                            {placeholderImageUrl && (
                                <StyledComboBoxPlaceholderImage
                                    src={placeholderImageUrl}
                                    $shouldShowBigImage={shouldShowBigImage}
                                    $shouldShowRoundImage={shouldShowRoundPlaceholderImage}
                                />
                            )}
                            {placeholderIcon && <Icon icons={placeholderIcon} />}
                            {typeof inputValue === 'string' ? (
                                <StyledComboBoxInput
                                    disabled={isDisabled}
                                    value={inputValue}
                                    onChange={onInputChange}
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    placeholder={placeholderText}
                                />
                            ) : (
                                <StyledComboBoxPlaceholderText>
                                    {placeholderText}
                                </StyledComboBoxPlaceholderText>
                            )}
                            {internalSelectedItem &&
                                internalSelectedItem.suffixElement &&
                                internalSelectedItem.suffixElement}
                        </StyledComboBoxPlaceholder>
                    </StyledComboBoxPrefixAndPlaceholderWrapper>
                    {shouldShowClearIcon && internalSelectedItem && (
                        <StyledComboBoxClearIconWrapper onClick={handleClear}>
                            <Icon icons={['fa fa-times']} />
                        </StyledComboBoxClearIconWrapper>
                    )}
                    {!shouldDisableActions && (
                        <StyledComboBoxIconWrapper
                            $shouldShowBorderLeft={
                                shouldShowClearIcon === true && internalSelectedItem !== undefined
                            }
                        >
                            <Icon icons={['fa fa-chevron-down']} />
                        </StyledComboBoxIconWrapper>
                    )}
                </StyledComboBoxHeader>
                {styledComboBoxElementRef.current && (
                    <DropdownBodyWrapper
                        anchorElement={styledComboBoxElementRef.current}
                        bodyWidth={bodyWidth}
                        contentHeight={contentHeight}
                        onClose={handleClose}
                        direction={direction}
                        container={container}
                        shouldShowDropdown={isAnimating}
                        minBodyWidth={bodyWidth ?? bodyMinWidth}
                        maxHeight={maxHeight}
                    >
                        <StyledComboBoxBody
                            $shouldUseCurrentItemWidth={shouldUseCurrentItemWidth}
                            $maxHeight={maxHeight}
                            $minWidth={bodyWidth ?? bodyMinWidth}
                            $browser={browser?.name as BrowserName}
                            ref={contentRef}
                            tabIndex={0}
                        >
                            {comboBoxGroups}
                        </StyledComboBoxBody>
                    </DropdownBodyWrapper>
                )}
            </StyledComboBox>
        ),
        [
            minWidth,
            shouldUseFullWidth,
            shouldUseCurrentItemWidth,
            direction,
            handleHeaderClick,
            isAnimating,
            isTouch,
            isDisabled,
            shouldChangeColor,
            shouldShowBigImage,
            prefix,
            selectedItem,
            internalSelectedItem,
            placeholderImageUrl,
            shouldShowRoundPlaceholderImage,
            placeholderIcon,
            inputValue,
            onInputChange,
            handleInputBlur,
            handleInputFocus,
            placeholderText,
            shouldShowClearIcon,
            handleClear,
            shouldDisableActions,
            bodyWidth,
            contentHeight,
            handleClose,
            container,
            bodyMinWidth,
            maxHeight,
            browser?.name,
            comboBoxGroups,
        ],
    );
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
