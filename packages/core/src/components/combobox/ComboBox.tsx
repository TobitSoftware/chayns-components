import { useFunctions, useValues } from 'chayns-api';
import React, {
    FocusEventHandler,
    forwardRef,
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { calculateMaxComboBoxItemWidth } from '../../utils/calculate';
import { useIsTouch } from '../../utils/environment';
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
import { useElementSize } from '../../hooks/element';
import { ComboBoxProps, ComboBoxRef, ComboBoxSize, IComboBoxItem } from './ComboBox.types';

const ComboBox = forwardRef<ComboBoxRef, ComboBoxProps>(
    (
        {
            bodyWidth,
            direction = DropdownDirection.RIGHT,
            isDisabled = false,
            lists,
            maxHeight = 280,
            onSelect,
            placeholder,
            prefix,
            container,
            shouldCaptureEvents,
            selectedItem,
            onHide,
            onShow,
            shouldShowBigImage,
            shouldShowClearIcon,
            shouldShowRoundImage,
            onInputFocus,
            prefixMinWidth,
            size = ComboBoxSize.NORMAL,
            shouldUseFullWidth = false,
            onInputChange,
            shouldUseCurrentItemWidth = false,
            onInputBlur,
            shouldShowTransparentBackground = false,
            inputValue,
            shouldDropDownUseMaxItemWidth = false,
        },
        ref,
    ) => {
        // internalSelectedItem starts from controlled selectedItem when provided; otherwise can be set internally
        const [internalSelectedItem, setInternalSelectedItem] = useState<IComboBoxItem | undefined>(
            () => selectedItem,
        );
        const [isAnimating, setIsAnimating] = useState(false);
        // min widths are derived from lists/parent size; will compute via useMemo below (avoid setState in effects)
        const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

        const isInputFocused = useRef(false);

        const styledComboBoxElementRef = useRef<HTMLDivElement | null>(null);
        const contentRef = useRef<HTMLDivElement | null>(null);

        // Anchor element stored in state to avoid reading ref.current during render (rules-of-react)
        const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(null);

        const parentSize = useElementSize(styledComboBoxElementRef, {
            shouldUseParentElement: true,
        });

        const functions = useFunctions();
        const values = useValues();

        const isTouch = useIsTouch();

        const areaProvider = useContext(AreaContext);

        // parent size handled in width calculation memo below; avoid calling setState synchronously in effects

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

            let height = flatItems.reduce((value, item) => {
                const isBigItem =
                    shouldShowBigImage ||
                    (typeof item.subtext === 'string' && item.subtext.trim() !== '');

                return value + (isBigItem ? 56 : 38);
            }, 0);

            if (lists.length > 1) {
                height += lists.length * 38;
            }

            if (maxHeight < height) {
                height = maxHeight;
            }

            return height;
        }, [lists, maxHeight, shouldShowBigImage]);

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
            if (typeof onShow === 'function') {
                onShow();
            }

            setIsAnimating(true);
        }, [onShow]);

        const handleClose = useCallback(() => {
            if (typeof onHide === 'function') {
                onHide();
            }

            setIsAnimating(false);
        }, [onHide]);

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
                            handleClose();
                        });

                        return;
                    }
                }

                setInternalSelectedItem(itemToSelect);
                handleClose();
            },
            [handleClose, onSelect],
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
        const { computedMinWidth, computedBodyMinWidth } = useMemo(() => {
            const allItems = lists.flatMap((list) => list.list);

            let maxItemWidth = calculateMaxComboBoxItemWidth({
                list: [
                    ...allItems,
                    { text: placeholder, value: 'placeholder' },
                    ...(selectedItem ? [selectedItem] : []),
                ],
                functions,
                shouldShowBigImage,
                values,
            });

            if (shouldDropDownUseMaxItemWidth) {
                maxItemWidth += 20 + 2 + 1; // padding + border + puffer
                return { computedMinWidth: maxItemWidth, computedBodyMinWidth: maxItemWidth };
            }

            const parentWidth = parentSize?.width ?? 0;

            const paddingWidth = 20 + 2 + 40 + (shouldShowClearIcon ? 40 : 0) + 1;

            let prefixWidth = 0;
            if (prefix) {
                const prefixTextWidth = calculateMaxComboBoxItemWidth({
                    list: [{ text: prefix, value: 'prefix' }],
                    functions,
                    values,
                });

                prefixWidth = Math.max(prefixTextWidth + 5, 32);
            }

            const calculatedWidth = maxItemWidth + paddingWidth + prefixWidth;

            let tmpMinWidth = calculatedWidth;
            let tmpBodyMinWidth = calculatedWidth;

            if (shouldUseFullWidth) {
                tmpMinWidth = parentWidth;
                tmpBodyMinWidth =
                    parentWidth < calculatedWidth - 20 ? calculatedWidth - 20 : parentWidth;
            } else if (shouldUseCurrentItemWidth && internalSelectedItem) {
                const internalSelectedItemWidth = calculateMaxComboBoxItemWidth({
                    list: [internalSelectedItem],
                    functions,
                    shouldShowBigImage,
                    values,
                });

                const itemWidth = internalSelectedItemWidth + paddingWidth + prefixWidth;
                tmpMinWidth = itemWidth;
                tmpBodyMinWidth =
                    itemWidth < calculatedWidth - 20 ? calculatedWidth - 20 : itemWidth;
            }

            if (tmpMinWidth > parentWidth) tmpMinWidth = parentWidth;
            if (tmpBodyMinWidth > parentWidth) tmpBodyMinWidth = parentWidth;

            return {
                computedMinWidth: tmpMinWidth,
                computedBodyMinWidth: shouldUseCurrentItemWidth ? tmpMinWidth : tmpBodyMinWidth,
            };
        }, [
            functions,
            internalSelectedItem,
            lists,
            placeholder,
            prefix,
            selectedItem,
            shouldDropDownUseMaxItemWidth,
            shouldShowBigImage,
            shouldShowClearIcon,
            shouldUseCurrentItemWidth,
            shouldUseFullWidth,
            values,
            parentSize?.width,
        ]);

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

        useImperativeHandle(
            ref,
            () => ({
                hide: handleClose,
                show: handleOpen,
            }),
            [handleClose, handleOpen],
        );

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
                            <ComboBoxItem
                                key={`item-${item.text}`}
                                item={item}
                                isSelected={
                                    selectedItem ? item.value === selectedItem.value : false
                                }
                                onSelect={handleSetSelectedItem}
                                shouldShowBigImage={shouldShowBigImage}
                                shouldShowRoundImage={
                                    list.shouldShowRoundImage ?? shouldShowRoundImage
                                }
                            />
                        ))}
                    </Fragment>
                )),
            [handleSetSelectedItem, lists, selectedItem, shouldShowBigImage, shouldShowRoundImage],
        );

        return useMemo(
            () => (
                <StyledComboBox
                    ref={(node) => {
                        styledComboBoxElementRef.current = node;
                        setAnchorElement(node);
                    }}
                    $minWidth={computedMinWidth}
                    $shouldUseFullWidth={shouldUseFullWidth}
                    $shouldUseCurrentItemWidth={shouldUseCurrentItemWidth}
                >
                    <StyledComboBoxHeader
                        $direction={direction}
                        onClick={handleHeaderClick}
                        $isOpen={isAnimating}
                        $isTouch={isTouch}
                        $size={size}
                        $shouldShowTransparentBackground={shouldShowTransparentBackground}
                        $isDisabled={isDisabled}
                        $shouldChangeColor={shouldChangeColor}
                        $shouldShowBigImage={shouldShowBigImage}
                    >
                        <StyledComboBoxPrefixAndPlaceholderWrapper>
                            {prefix && (
                                <StyledComboBoxPrefix $prefixMinWidth={prefixMinWidth}>
                                    {prefix}
                                </StyledComboBoxPrefix>
                            )}
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
                            <StyledComboBoxClearIconWrapper
                                $isDisabled={isDisabled}
                                onClick={handleClear}
                            >
                                <Icon icons={['fa fa-times']} />
                            </StyledComboBoxClearIconWrapper>
                        )}
                        {!shouldDisableActions && (
                            <StyledComboBoxIconWrapper
                                $isDisabled={isDisabled}
                                $size={size}
                                $shouldShowBorderLeft={
                                    shouldShowClearIcon === true &&
                                    internalSelectedItem !== undefined
                                }
                            >
                                <Icon icons={['fa fa-chevron-down']} isDisabled={isDisabled} />
                            </StyledComboBoxIconWrapper>
                        )}
                    </StyledComboBoxHeader>
                    {anchorElement && (
                        <DropdownBodyWrapper
                            anchorElement={anchorElement}
                            bodyWidth={bodyWidth}
                            contentHeight={contentHeight}
                            shouldCaptureEvents={shouldCaptureEvents}
                            onClose={handleClose}
                            direction={direction}
                            container={container}
                            shouldShowDropdown={isAnimating}
                            minBodyWidth={bodyWidth ?? computedBodyMinWidth}
                            maxHeight={maxHeight}
                        >
                            <StyledComboBoxBody
                                $shouldUseCurrentItemWidth={shouldUseCurrentItemWidth}
                                $maxHeight={maxHeight}
                                $minWidth={bodyWidth ?? computedBodyMinWidth}
                                className="chayns-scrollbar"
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
                computedMinWidth,
                shouldUseFullWidth,
                shouldUseCurrentItemWidth,
                direction,
                handleHeaderClick,
                isAnimating,
                isTouch,
                size,
                shouldShowTransparentBackground,
                isDisabled,
                shouldChangeColor,
                shouldShowBigImage,
                prefix,
                prefixMinWidth,
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
                shouldCaptureEvents,
                handleClose,
                container,
                computedBodyMinWidth,
                maxHeight,
                comboBoxGroups,
                anchorElement,
            ],
        );
    },
);

ComboBox.displayName = 'ComboBox';

export default ComboBox;
