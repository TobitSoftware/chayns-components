import { useDevice } from 'chayns-api';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    FocusEvent,
    FocusEventHandler,
    forwardRef,
    KeyboardEventHandler,
    ReactElement,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useTheme } from 'styled-components';
import type { IFilterButtonItem } from '../../types/filterButtons';
import type { ISearchBoxItem, ISearchBoxItems } from '../../types/searchBox';
import { calculateContentHeight } from '../../utils/calculate';
import { searchList, sortSearchBoxItems } from '../../utils/searchBox';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import Icon from '../icon/Icon';
import Input, { type InputProps } from '../input/Input';
import GroupName from './group-name/GroupName';
import SearchBoxBody from './search-box-body/SearchBoxBody';
import SearchBoxItem from './search-box-item/SearchBoxItem';
import { StyledSearchBoxItemImage } from './search-box-item/SearchBoxItem.styles';
import {
    StyledSearchBox,
    StyledSearchBoxHintText,
    StyledSearchBoxIcon,
    StyledSearchBoxLeftWrapper,
} from './SearchBox.styles';
import { useUuid } from '../../hooks/uuid';
import DropdownBodyWrapper from '../dropdown-body-wrapper/DropdownBodyWrapper';
import TagInput, { TagInputProps, TagInputRef } from '../tag-input/TagInput';
import type { DropdownDirection } from '../../types/dropdown';

export interface SearchBoxRef {
    clear: VoidFunction;
}

export interface TagInputSettings {
    onAdd?: TagInputProps['onAdd'];
    onRemove?: TagInputProps['onRemove'];
    shouldAllowMultiple?: TagInputProps['shouldAllowMultiple'];
    tags?: TagInputProps['tags'];
}

const filterSearchBoxItems = ({
    customFilter,
    items,
    searchString,
    shouldUseCustomFilterOnly,
}: {
    customFilter?: (item: ISearchBoxItem) => boolean;
    items: ISearchBoxItem[];
    searchString: string;
    shouldUseCustomFilterOnly?: boolean;
}) => {
    if (typeof customFilter !== 'function') {
        return searchList({ items, searchString });
    }

    if (shouldUseCustomFilterOnly) {
        const filteredItems = items.filter(customFilter);

        return sortSearchBoxItems({ items: filteredItems, searchString });
    }

    return searchList({ items, searchString }).filter(customFilter);
};

const getDropdownSearchString = ({
    selectedId,
    shouldKeepSelectedItemPosition,
    value,
}: {
    selectedId?: string;
    shouldKeepSelectedItemPosition?: boolean;
    value: string;
}) => (shouldKeepSelectedItemPosition && selectedId ? '' : value);

export type SearchBoxProps = {
    /**
     * The element where the content of the `ComboBox` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * An optional callback function to filter the elements to be displayed
     */
    customFilter?: (item: ISearchBoxItem) => boolean;
    /**
     * If true, the custom filter replaces the built-in text search instead of narrowing its results.
     */
    shouldUseCustomFilterOnly?: boolean;
    /**
     * The direction in which the dropdown should be displayed. By default, it is displayed below the input.
     */
    dropdownDirection?: DropdownDirection;
    /**
     * If true, the input field is marked as invalid
     */
    isInvalid?: boolean;
    /**
     * An optional icon that is displayed inside the left side of the input.
     */
    leftIcons?: string[];
    /**
     * Props that are passed to the underlying Input component.
     */
    inputProps?: InputProps;
    /**
     * List of groups with items that can be searched. It is possible to give only one list; if multiple lists are provided, the 'group name' parameter becomes mandatory.
     */
    lists: ISearchBoxItems[];
    /**
     * The maximum height of the dropdown body in pixels.
     */
    maxHeight?: number;
    /**
     * Function to be executed when the input lost focus.
     */
    onBlur?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when the input is changed.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when a letter is pressed
     */
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when an item is selected.
     */
    onSelect?: (item: ISearchBoxItem) => void;
    /**
     * The placeholder that should be displayed.
     */
    placeholder?: string;
    /**
     * Set an input for the search box - it is not an item of a list, just a string.
     */
    presetValue?: string;
    /**
     * Control the selected item. If you use this prop, make sure to update it when the user selects an item.
     */
    selectedId?: string;
    /**
     * If true, the selected item keeps its original position in the dropdown list.
     */
    shouldKeepSelectedItemPosition?: boolean;
    /**
     * If true, the value in the Input is displayed in the list.
     */
    shouldAddInputToList: boolean;
    /**
     * If true, the filter buttons are hidden.
     */
    shouldHideFilterButtons?: boolean;
    /**
     * Whether the full list of items should be displayed if the input is empty.
     */
    shouldShowContentOnEmptyInput?: boolean;
    /**
     * If true, the dropdown items are displayed more compactly.
     */
    shouldShowSmallItems?: boolean;
    /**
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
    /**
     * Whether the icon to open and close the list should be displayed.
     */
    shouldShowToggleIcon?: boolean;
    /**
     * Settings for the TagInput.
     */
    tagInputSettings?: TagInputSettings;
    /**
     * Enables keyboard-only focus highlighting.
     */
    shouldEnableKeyboardHighlighting?: boolean;
    /**
     * A text that should be displayed if no results are found.
     */
    hintText?: string;
};

const SearchBox: FC<SearchBoxProps> = forwardRef<SearchBoxRef, SearchBoxProps>(
    (
        {
            container,
            customFilter,
            dropdownDirection,
            inputProps,
            isInvalid = false,
            leftIcons,
            lists,
            maxHeight = 300,
            onBlur,
            onChange,
            onKeyDown,
            onSelect,
            placeholder,
            presetValue,
            hintText,
            selectedId,
            shouldAddInputToList = true,
            shouldKeepSelectedItemPosition = false,
            shouldUseCustomFilterOnly = false,
            shouldHideFilterButtons = false,
            shouldShowContentOnEmptyInput = true,
            shouldShowSmallItems = false,
            shouldShowRoundImage,
            shouldShowToggleIcon = false,
            tagInputSettings,
            shouldEnableKeyboardHighlighting,
        },
        ref,
    ) => {
        const [matchingListsItems, setMatchingListsItems] = useState<ISearchBoxItems[]>(lists);
        const [selectedImage, setSelectedImage] = useState<ReactElement>();
        const [internalValue, setInternalValue] = useState(
            typeof presetValue === 'string' && presetValue !== '' ? presetValue : '',
        );
        const inputValue = inputProps?.value;
        const value = inputValue ?? internalValue;
        const setValue = useCallback(
            (nextValue: string) => {
                if (typeof inputValue !== 'string') {
                    setInternalValue(nextValue);
                }
            },
            [inputValue],
        );
        const [height, setHeight] = useState<number>(0);
        const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
        const [hasMultipleGroups, setHasMultipleGroups] = useState<boolean>(lists.length > 1);
        const [filteredChildrenArray, setFilteredChildrenArray] = useState<Element[]>();
        const [inputToListValue, setInputToListValue] = useState<string>('');
        const [groups, setGroups] = useState<string[]>(['all']);
        const [shouldShowBody, setShouldShowBody] = useState(false);

        const uuid = useUuid();

        const boxRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement | null>(null);
        const tagInputRef = useRef<TagInputRef>(null);

        const hasFocusRef = useRef<boolean>(false);
        const isAnimatingRef = useRef<boolean>(false);
        const shouldShowPresetValue = useRef<boolean>(
            typeof presetValue === 'string' && presetValue !== '',
        );

        const theme = useTheme() as Theme;
        const dropdownSearchString = getDropdownSearchString({
            selectedId,
            shouldKeepSelectedItemPosition,
            value,
        });

        const { isTouch } = useDevice();

        /**
         * Checks if there are multiple groups in the lists
         */
        useEffect(() => {
            setHasMultipleGroups(lists.length > 1);
        }, [lists]);

        const filterButtons = useMemo(() => {
            const items: IFilterButtonItem[] = [];

            if (lists.length <= 1) {
                return items;
            }

            lists.forEach(({ groupName }) => {
                if (groupName) {
                    items.push({
                        id: groupName,
                        text: groupName,
                    });
                }
            });

            return items;
        }, [lists]);

        /**
         * Filters the lists by the FilterButtons
         */
        const activeList = useMemo(() => {
            let newLists: ISearchBoxItems[] = [];

            if (groups[0] === 'all') {
                newLists = lists;
            } else {
                lists.forEach((list) => {
                    if (list.groupName && groups.includes(list.groupName)) {
                        newLists.push(list);
                    }
                });
            }

            const newMatchingItems: ISearchBoxItems[] = [];

            newLists.forEach(({ list, groupName }) => {
                const newList = filterSearchBoxItems({
                    customFilter,
                    items: list,
                    searchString: dropdownSearchString,
                    shouldUseCustomFilterOnly,
                });

                if (newList.length > 0) {
                    newMatchingItems.push({
                        groupName,
                        list: newList,
                    });
                }
            });

            if (newMatchingItems.length === 0 && shouldAddInputToList) {
                newMatchingItems.push({
                    groupName: undefined,
                    list: [],
                });
            }

            const filteredMatchingListItems = newMatchingItems.map(({ list, groupName }) => ({
                groupName,
                list: list.filter((item) => {
                    if (typeof customFilter === 'function' && shouldUseCustomFilterOnly) {
                        return true;
                    }

                    return !(newMatchingItems.length === 1 && item.text === dropdownSearchString);
                }),
            }));

            setMatchingListsItems(filteredMatchingListItems);

            return newLists;
        }, [
            groups,
            lists,
            customFilter,
            dropdownSearchString,
            shouldAddInputToList,
            shouldUseCustomFilterOnly,
        ]);

        const handleOpen = useCallback(() => {
            setShouldShowBody(true);
        }, []);

        const handleClose = useCallback(() => {
            setShouldShowBody(false);
        }, []);

        const handleFilterButtonsGroupSelect = (keys: string[]) => {
            setGroups(keys.length === 0 ? ['all'] : keys);
        };

        /**
         * This hook calculates the height
         */
        useEffect(() => {
            const textArray: string[] = [];

            activeList.forEach(({ list, groupName }) => {
                list.forEach(({ text }) => textArray.push(text));
                if (!groupName) {
                    return;
                }
                textArray.push(groupName);
            });

            if (shouldAddInputToList && inputToListValue !== '') {
                textArray.push(inputToListValue);
            }

            setHeight(calculateContentHeight(textArray));
        }, [inputToListValue, activeList, placeholder, shouldAddInputToList]);

        useEffect(() => {
            if (selectedId) {
                activeList.forEach(({ list }) => {
                    const selectedItem = list.find(({ id }) => id === selectedId);
                    if (selectedItem) {
                        setValue(selectedItem.text);

                        if (selectedItem.imageUrl) {
                            setSelectedImage(
                                <StyledSearchBoxItemImage
                                    src={selectedItem.imageUrl}
                                    $shouldShowRoundImage={shouldShowRoundImage}
                                />,
                            );
                        }
                    }
                });
            }
        }, [activeList, selectedId, shouldShowRoundImage]);

        /**
         * This hook resets the value if the selectedId changes to undefined. This is an own useEffect because the value
         * should not be reset if the list changes and the selectedId is still undefined.
         */
        useEffect(() => {
            if (!selectedId && !shouldShowPresetValue.current) {
                setValue('');
            }
        }, [selectedId]);

        useEffect(() => {
            isAnimatingRef.current = shouldShowBody;
        }, [shouldShowBody]);

        useEffect(() => {
            if (
                (matchingListsItems.length !== 0 || hintText) &&
                !isAnimatingRef.current &&
                hasFocusRef.current
            ) {
                handleOpen();
            }
        }, [handleOpen, hintText, matchingListsItems.length]);

        /**
         * This function handles the focus event of the input and opens the dropdown if the input
         * should show content on an empty input
         */
        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                hasFocusRef.current = true;

                if (typeof inputProps?.onFocus === 'function') {
                    inputProps.onFocus(event);
                }

                if (shouldShowContentOnEmptyInput) {
                    const newMatchingItems: ISearchBoxItems[] = [];

                    activeList.forEach(({ list, groupName }) => {
                        const newList = filterSearchBoxItems({
                            customFilter,
                            items: list,
                            searchString: dropdownSearchString,
                            shouldUseCustomFilterOnly,
                        });

                        if (newList.length > 0) {
                            newMatchingItems.push({
                                groupName,
                                list: newList,
                            });
                        }
                    });

                    if (newMatchingItems.length === 0 && shouldAddInputToList) {
                        newMatchingItems.push({
                            groupName: undefined,
                            list: [],
                        });
                    }

                    const filteredMatchingListItems = newMatchingItems.map(
                        ({ list, groupName }) => ({
                            groupName,
                            list: list.filter((item) => {
                                if (
                                    typeof customFilter === 'function' &&
                                    shouldUseCustomFilterOnly
                                ) {
                                    return true;
                                }

                                return !(
                                    newMatchingItems.length === 1 &&
                                    item.text === dropdownSearchString
                                );
                            }),
                        }),
                    );

                    setMatchingListsItems(filteredMatchingListItems);

                    if (filteredMatchingListItems.length !== 0 || hintText) {
                        handleOpen();
                    }
                }
            },
            [
                shouldShowContentOnEmptyInput,
                activeList,
                shouldAddInputToList,
                hintText,
                dropdownSearchString,
                customFilter,
                shouldUseCustomFilterOnly,
                handleOpen,
                inputProps,
            ],
        );

        const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
            (event) => {
                if (typeof onKeyDown === 'function') {
                    onKeyDown(event);
                }

                if (typeof inputProps?.onKeyDown === 'function') {
                    inputProps.onKeyDown(event);
                }
            },
            [inputProps, onKeyDown],
        );

        /**
         * This function filters the lists by input
         */

        useEffect(() => {
            const newMatchingItems: ISearchBoxItems[] = [];

            activeList.forEach(({ list, groupName }) => {
                const newList = filterSearchBoxItems({
                    customFilter,
                    items: list,
                    searchString: dropdownSearchString,
                    shouldUseCustomFilterOnly,
                });

                if (newList.length > 0) {
                    newMatchingItems.push({
                        groupName,
                        list: newList,
                    });
                }
            });

            if (newMatchingItems.length === 0 && shouldAddInputToList) {
                newMatchingItems.push({
                    groupName: undefined,
                    list: [],
                });
            }

            if (shouldAddInputToList && inputToListValue !== '') {
                newMatchingItems.forEach(({ list }) => {
                    list.forEach(({ text }) => {
                        if (text.toLowerCase() === inputToListValue.toLowerCase()) {
                            setInputToListValue('');
                        }
                    });
                });
            }
        }, [
            inputToListValue,
            activeList,
            shouldAddInputToList,
            shouldShowContentOnEmptyInput,
            dropdownSearchString,
            customFilter,
            shouldUseCustomFilterOnly,
        ]);

        const handleClick = useCallback(() => {
            if (shouldShowBody) {
                handleClose();
            } else {
                handleOpen();
            }
        }, [handleClose, handleOpen, shouldShowBody]);

        const rightElement = useMemo(() => {
            if (!shouldShowToggleIcon) {
                return undefined;
            }

            return (
                <StyledSearchBoxIcon onClick={handleClick}>
                    <Icon icons={['fa fa-chevron-down']} color={theme['006'] as string} />
                </StyledSearchBoxIcon>
            );
        }, [handleClick, shouldShowToggleIcon, theme]);

        const leftElement = useMemo(
            () =>
                (leftIcons || selectedImage) && (
                    <StyledSearchBoxLeftWrapper>
                        {leftIcons && <Icon icons={leftIcons} />}
                        {selectedImage && selectedImage}
                    </StyledSearchBoxLeftWrapper>
                ),
            [leftIcons, selectedImage],
        );

        /**
         * This function handles changes of the input
         */
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const filteredLists: ISearchBoxItems[] = [];
                shouldShowPresetValue.current = false;

                activeList.forEach(({ list, groupName }) => {
                    const newList = filterSearchBoxItems({
                        customFilter,
                        items: list,
                        searchString: event.target.value,
                        shouldUseCustomFilterOnly,
                    });

                    if (newList.length > 0) {
                        filteredLists.push({
                            groupName,
                            list: newList,
                        });
                    }
                });

                if (filteredLists.length === 0 && shouldAddInputToList) {
                    filteredLists.push({
                        groupName: undefined,
                        list: [],
                    });
                }

                setSelectedImage(undefined);

                if (!shouldShowContentOnEmptyInput && !event.target.value) {
                    setMatchingListsItems([]);
                } else {
                    setMatchingListsItems(filteredLists);
                }

                if (filteredLists.length !== 0) {
                    handleOpen();
                }

                setValue(event.target.value);
                setInputToListValue(event.target.value);

                if (typeof onChange === 'function') {
                    onChange(event);
                }

                if (typeof inputProps?.onChange === 'function') {
                    inputProps.onChange(event);
                }
            },
            [
                activeList,
                customFilter,
                handleOpen,
                inputProps,
                onChange,
                shouldAddInputToList,
                shouldShowContentOnEmptyInput,
                shouldUseCustomFilterOnly,
            ],
        );

        /**
         * This function handles the blur event of the input
         */
        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                hasFocusRef.current = false;

                if (typeof onBlur === 'function') {
                    onBlur(event);
                }

                if (typeof inputProps?.onBlur === 'function') {
                    inputProps.onBlur(event);
                }
            },
            [inputProps, onBlur],
        );

        const handleDropdownOutsideClick = useCallback(() => {
            tagInputRef.current?.blur();

            return hasFocusRef.current && isTouch;
        }, [isTouch]);

        const handleContainerBlur = useCallback(
            (event: React.FocusEvent<HTMLDivElement>) => {
                const nextFocusedElement = event.relatedTarget as Node | null;
                const currentContainer = event.currentTarget as HTMLElement;

                // Check if focus is moving outside the SearchBox container
                // Also check the dropdown content (contentRef) since it's rendered in a portal
                if (
                    !nextFocusedElement ||
                    (!currentContainer.contains(nextFocusedElement) &&
                        !contentRef.current?.contains(nextFocusedElement))
                ) {
                    handleClose();
                }
            },
            [handleClose],
        );

        /**
         * This function handles the item selection
         */
        const handleSelect = useCallback(
            (item: ISearchBoxItem) => {
                const newItem = {
                    ...item,
                    text: item.text.replace('<b>', '').replace('</b>', '').replace('</b', ''),
                };

                if (tagInputSettings) {
                    setValue('');
                    setInputToListValue('');
                    tagInputRef.current?.resetValue();
                } else {
                    setValue(newItem.text);
                }

                handleClose();

                setSelectedImage(
                    newItem.imageUrl ? (
                        <StyledSearchBoxItemImage
                            src={newItem.imageUrl}
                            $shouldShowRoundImage={shouldShowRoundImage}
                        />
                    ) : undefined,
                );

                setMatchingListsItems([]);

                if (typeof onSelect === 'function') {
                    onSelect(newItem);
                }
            },
            [handleClose, onSelect, shouldShowRoundImage, tagInputSettings],
        );

        const content = useMemo(() => {
            if (hintText && matchingListsItems.length === 0) {
                return (
                    <StyledSearchBoxHintText>
                        {hintText.replace('##value##', value)}
                    </StyledSearchBoxHintText>
                );
            }

            const items: ReactElement[] = [];

            matchingListsItems.forEach(({ groupName, list }, index) => {
                if (hasMultipleGroups) {
                    if (list.length <= 0) {
                        return;
                    }

                    if (index !== 0) {
                        items.push(<GroupName key={groupName} name={groupName ?? ''} />);
                    }
                }

                list.forEach(({ id, text, imageUrl }, listIndex) => {
                    items.push(
                        <SearchBoxItem
                            key={`${id}_${groupName ?? ''}`}
                            id={id}
                            text={text}
                            imageUrl={imageUrl}
                            shouldShowSmallItems={shouldShowSmallItems}
                            shouldShowRoundImage={shouldShowRoundImage}
                            onSelect={handleSelect}
                            groupName={groupName}
                            tabIndex={index === 0 && listIndex === 0 ? 0 : -1}
                        />,
                    );
                });
            });

            if (shouldAddInputToList && inputToListValue !== '') {
                items.push(
                    <SearchBoxItem
                        id="input-value"
                        onSelect={handleSelect}
                        shouldShowSmallItems={shouldShowSmallItems}
                        text={`<b>${inputToListValue}</b`}
                        tabIndex={items.length === 0 ? 0 : -1}
                    />,
                );
            }

            return items;
        }, [
            hintText,
            matchingListsItems,
            shouldAddInputToList,
            inputToListValue,
            value,
            hasMultipleGroups,
            shouldShowSmallItems,
            shouldShowRoundImage,
            handleSelect,
        ]);

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (!shouldShowBody || matchingListsItems.length === 0) {
                    return;
                }

                const children = contentRef.current?.children;

                if (!children) {
                    return;
                }

                const childrenArray = Array.from(children);

                const newChildren = childrenArray.find((child) =>
                    child.id.startsWith('searchBoxContent__'),
                )?.children;

                if (!(newChildren && newChildren.length > 0)) {
                    return;
                }

                const filteredChildren = Array.from(newChildren).filter(
                    (child) => (child as HTMLElement).dataset.isgroupname !== 'true',
                );

                setFilteredChildrenArray(filteredChildren);

                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();

                    if (newChildren && newChildren.length > 0) {
                        const newIndex =
                            focusedIndex !== null
                                ? (focusedIndex +
                                      (e.key === 'ArrowUp' ? -1 : 1) +
                                      filteredChildren.length) %
                                  filteredChildren.length
                                : 0;

                        if (focusedIndex !== null) {
                            const prevElement = filteredChildren[focusedIndex] as HTMLDivElement;
                            prevElement.tabIndex = -1;
                        }

                        setFocusedIndex(newIndex);

                        const newElement = filteredChildren[newIndex] as HTMLDivElement;

                        newElement.tabIndex = 0;
                    }
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();

                    if (filteredChildren) {
                        const element = filteredChildren[focusedIndex ?? 0];

                        if (!element) {
                            return;
                        }

                        const { id, textContent } = element;

                        let imageUrl: string | undefined;

                        // Just Ignore, it works
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        if (element.children[0]?.attributes.src) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            imageUrl = element.children[0]?.attributes.src.nodeValue as string;
                        }

                        const newId = id.replace('search-box-item__', '');

                        handleSelect({
                            id: newId === 'input-value' ? textContent : newId,
                            text: textContent ?? '',
                            imageUrl,
                        });
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [
            filteredChildrenArray,
            focusedIndex,
            handleSelect,
            matchingListsItems.length,
            shouldShowBody,
        ]);

        const handleKeyPress = useCallback((event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                setMatchingListsItems([]);
            }
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                clear: () => setValue(''),
            }),
            [setValue],
        );

        useEffect(() => {
            document.addEventListener('keydown', handleKeyPress);

            return () => {
                document.addEventListener('keydown', handleKeyPress);
            };
        }, [handleKeyPress]);

        /**
         * Update the value if preset value changes
         */
        useEffect(() => {
            if (presetValue) {
                setValue(presetValue);
            }
        }, [presetValue, setValue]);

        const shouldShowDropdown =
            shouldShowBody &&
            (matchingListsItems.length !== 0 || !!hintText) &&
            (value.trim() !== '' || shouldShowContentOnEmptyInput);

        return useMemo(
            () => (
                <StyledSearchBox
                    ref={boxRef}
                    key={`search-box-${uuid}`}
                    onBlur={handleContainerBlur}
                >
                    <div id={`search_box_input${uuid}`}>
                        {tagInputSettings ? (
                            <TagInput
                                leftElement={leftElement}
                                onAdd={tagInputSettings.onAdd}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onRemove={tagInputSettings.onRemove}
                                placeholder={placeholder}
                                ref={tagInputRef}
                                shouldAllowMultiple={tagInputSettings.shouldAllowMultiple}
                                shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                                shouldPreventEnter
                                tags={tagInputSettings.tags}
                            />
                        ) : (
                            <Input
                                /* eslint-disable-next-line react/jsx-props-no-spreading */
                                {...inputProps}
                                isInvalid={isInvalid}
                                leftElement={leftElement}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                ref={inputRef}
                                rightElement={rightElement}
                                shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                                value={value}
                            />
                        )}
                    </div>
                    {boxRef.current && (
                        <DropdownBodyWrapper
                            anchorElement={boxRef.current}
                            container={container}
                            direction={dropdownDirection}
                            onClose={handleClose}
                            onOutsideClick={handleDropdownOutsideClick}
                            shouldShowDropdown={shouldShowDropdown}
                        >
                            <SearchBoxBody
                                filterButtons={filterButtons}
                                height={height}
                                maxHeight={maxHeight}
                                shouldShow={shouldShowDropdown}
                                key={`search-box-body-${uuid}`}
                                onGroupSelect={handleFilterButtonsGroupSelect}
                                ref={contentRef}
                                selectedGroups={groups}
                                shouldHideFilterButtons={shouldHideFilterButtons}
                            >
                                {content}
                            </SearchBoxBody>
                        </DropdownBodyWrapper>
                    )}
                </StyledSearchBox>
            ),
            [
                container,
                content,
                dropdownDirection,
                filterButtons,
                groups,
                handleBlur,
                handleChange,
                handleClose,
                handleDropdownOutsideClick,
                handleFocus,
                handleKeyDown,
                height,
                inputProps,
                isInvalid,
                leftElement,
                maxHeight,
                onKeyDown,
                placeholder,
                rightElement,
                shouldHideFilterButtons,
                shouldShowDropdown,
                shouldEnableKeyboardHighlighting,
                tagInputSettings,
                uuid,
                value,
            ],
        );
    },
);

SearchBox.displayName = 'SearchBox';

export default SearchBox;
