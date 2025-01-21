import { getDevice } from 'chayns-api';
import { AnimatePresence } from 'framer-motion';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    FocusEvent,
    FocusEventHandler,
    forwardRef,
    KeyboardEventHandler,
    ReactElement,
    ReactPortal,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from 'styled-components';
import type { IFilterButtonItem } from '../../types/filterButtons';
import type { ISearchBoxItem, ISearchBoxItems } from '../../types/searchBox';
import { calculateContentHeight } from '../../utils/calculate';
import { searchList } from '../../utils/searchBox';
import type { ContextMenuCoordinates } from '../context-menu/ContextMenu';
import Icon from '../icon/Icon';
import Input from '../input/Input';
import GroupName from './group-name/GroupName';
import SearchBoxBody from './search-box-body/SearchBoxBody';
import SearchBoxItem from './search-box-item/SearchBoxItem';
import { StyledSearchBoxItemImage } from './search-box-item/SearchBoxItem.styles';
import {
    StyledSearchBox,
    StyledSearchBoxIcon,
    StyledSearchBoxLeftWrapper,
} from './SearchBox.styles';

export type SearchBoxRef = {
    clear: VoidFunction;
};

export type SearchBoxProps = {
    /**
     * The element where the content of the `ComboBox` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * An optional icon that is displayed inside the left side of the input.
     */
    leftIcons?: string[];
    /**
     * List of groups with items that can be searched. It is possible to give only one list; if multiple lists are provided, the 'group name' parameter becomes mandatory.
     */
    lists: ISearchBoxItems[];
    /**
     * The placeholder that should be displayed.
     */
    placeholder?: string;
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
     * Control the selected item. If you use this prop, make sure to update it when the user selects an item.
     */
    selectedId?: string;
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
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
    /**
     * Whether the icon to open and close the list should be displayed.
     */
    shouldShowToggleIcon?: boolean;
};

const SearchBox: FC<SearchBoxProps> = forwardRef<SearchBoxRef, SearchBoxProps>(
    (
        {
            placeholder,
            leftIcons,
            lists,
            onChange,
            onBlur,
            onSelect,
            onKeyDown,
            selectedId,
            container,
            shouldHideFilterButtons = false,
            shouldShowRoundImage,
            shouldShowContentOnEmptyInput = true,
            shouldAddInputToList = true,
            shouldShowToggleIcon = false,
        },
        ref,
    ) => {
        const [matchingListsItems, setMatchingListsItems] = useState<ISearchBoxItems[]>(lists);
        const [selectedImage, setSelectedImage] = useState<ReactElement>();
        const [value, setValue] = useState('');
        const [isAnimating, setIsAnimating] = useState(false);
        const [height, setHeight] = useState<number>(0);
        const [width, setWidth] = useState(0);
        const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
        const [hasMultipleGroups, setHasMultipleGroups] = useState<boolean>(lists.length > 1);
        const [filteredChildrenArray, setFilteredChildrenArray] = useState<Element[]>();
        const [inputToListValue, setInputToListValue] = useState<string>('');
        const [groups, setGroups] = useState<string[]>(['all']);
        const [portal, setPortal] = useState<ReactPortal>();
        const [internalCoordinates, setInternalCoordinates] = useState<ContextMenuCoordinates>({
            x: 0,
            y: 0,
        });
        const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);

        const boxRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement | null>(null);

        const theme = useTheme();

        const { browser } = getDevice();

        useEffect(() => {
            if (boxRef.current && !container) {
                const el = boxRef.current as HTMLElement;

                const element = el.closest('.dialog-inner') || el.closest('body');

                setNewContainer(element);
            }
        }, [container]);

        useEffect(() => {
            if (container instanceof Element) {
                setNewContainer(container);
            }
        }, [container]);

        useEffect(() => {
            if (boxRef.current) {
                const { x, y } = boxRef.current.getBoundingClientRect();

                setInternalCoordinates({
                    x,
                    y,
                });
            }
        }, []);

        /**
         * Checks if Lists are smaller then 1
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
                const newList = searchList({ items: list, searchString: value });

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
                list: list.filter(
                    (item) => !(newMatchingItems.length === 1 && item.text === value),
                ),
            }));

            setMatchingListsItems(filteredMatchingListItems);

            return newLists;
        }, [groups, lists, shouldAddInputToList, value]);

        const handleOpen = useCallback(() => {
            if (boxRef.current) {
                const { x, y, height: bodyHeight } = boxRef.current.getBoundingClientRect();

                setInternalCoordinates({
                    x,
                    y: y + bodyHeight,
                });

                setIsAnimating(true);
            }
        }, []);

        const handleClose = useCallback(() => {
            setIsAnimating(false);
        }, []);

        const handleFilterButtonsGroupSelect = (keys: string[]) => {
            setGroups(keys.length === 0 ? ['all'] : keys);
        };

        /**
         * This function closes the list of items
         */
        const handleOutsideClick = useCallback(
            (event: MouseEvent) => {
                if (
                    boxRef.current &&
                    !boxRef.current.contains(event.target as Node) &&
                    contentRef.current &&
                    !contentRef.current.contains(event.target as Node)
                ) {
                    handleClose();
                }
            },
            [handleClose],
        );

        /**
         * This hook listens for clicks
         */
        useEffect(() => {
            document.addEventListener('click', handleOutsideClick);
            window.addEventListener('blur', () => handleClose());

            return () => {
                document.removeEventListener('click', handleOutsideClick);
                window.addEventListener('blur', () => handleClose());
            };
        }, [handleOutsideClick, boxRef, handleClose]);

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

        /**
         * This hook calculates the width
         */
        useEffect(() => {
            const input = document.getElementById('search_box_input');

            const getInputWidth = () => {
                if (input) {
                    setWidth(input.offsetWidth);
                }
            };

            if (input) {
                new ResizeObserver(getInputWidth).observe(input);
            }
        }, []);

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
            if (!selectedId) {
                setValue('');
            }
        }, [selectedId]);

        /**
         * This function sets the items on focus if shouldShowContentOnEmptyInput
         */
        const handleFocus = useCallback(() => {
            if (shouldShowContentOnEmptyInput) {
                const newMatchingItems: ISearchBoxItems[] = [];

                activeList.forEach(({ list, groupName }) => {
                    const newList = searchList({ items: list, searchString: value });

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
                    list: list.filter(
                        (item) => !(newMatchingItems.length === 1 && item.text === value),
                    ),
                }));

                setMatchingListsItems(filteredMatchingListItems);
            }
        }, [activeList, shouldAddInputToList, shouldShowContentOnEmptyInput, value]);

        /**
         * This function filters the lists by input
         */

        useEffect(() => {
            const newMatchingItems: ISearchBoxItems[] = [];

            activeList.forEach(({ list, groupName }) => {
                const newList = searchList({ items: list, searchString: value });

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
            value,
        ]);

        const handleClick = useCallback(() => {
            if (isAnimating) {
                handleClose();
            } else {
                handleOpen();
            }
        }, [handleClose, handleOpen, isAnimating]);

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
            () => (
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

                activeList.forEach(({ list, groupName }) => {
                    const newList = searchList({ items: list, searchString: event.target.value });

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

                setValue(event.target.value);
                setInputToListValue(event.target.value);

                if (typeof onChange === 'function') {
                    onChange(event);
                }
            },
            [activeList, onChange, shouldAddInputToList, shouldShowContentOnEmptyInput],
        );

        /**
         * This function handles the blur event of the input
         */
        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                if (typeof onBlur === 'function') {
                    onBlur(event);
                }
            },
            [onBlur],
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

                setValue(newItem.text);
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
            [handleClose, onSelect, shouldShowRoundImage],
        );

        const content = useMemo(() => {
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

                list.forEach(({ id, text, imageUrl }) => {
                    items.push(
                        <SearchBoxItem
                            key={`${id}_${groupName ?? ''}`}
                            id={id}
                            text={text}
                            imageUrl={imageUrl}
                            shouldShowRoundImage={shouldShowRoundImage}
                            onSelect={handleSelect}
                            groupName={groupName}
                        />,
                    );
                });
            });

            if (shouldAddInputToList && inputToListValue !== '') {
                items.push(
                    <SearchBoxItem
                        id="input-value"
                        onSelect={handleSelect}
                        text={`<b>${inputToListValue}</b`}
                    />,
                );
            }

            return items;
        }, [
            matchingListsItems,
            shouldAddInputToList,
            inputToListValue,
            hasMultipleGroups,
            shouldShowRoundImage,
            handleSelect,
        ]);

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (!isAnimating || matchingListsItems.length === 0) {
                    return;
                }

                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const children = contentRef.current?.children;

                    if (!children) {
                        return;
                    }

                    const childrenArray = Array.from(children);

                    const newChildren = childrenArray.find((child) =>
                        child.id.startsWith('searchbox-content__'),
                    )?.children;

                    if (newChildren && newChildren.length > 0) {
                        const filteredChildren = Array.from(newChildren).filter(
                            (child) => (child as HTMLElement).dataset.isgroupname !== 'true',
                        );
                        setFilteredChildrenArray(filteredChildren);

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
                        newElement.focus();
                    }
                } else if (e.key === 'Enter' && focusedIndex !== null) {
                    if (filteredChildrenArray) {
                        const element = filteredChildrenArray[focusedIndex];

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

                        handleSelect({
                            id: id.replace('search-box-item__', ''),
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
            isAnimating,
            matchingListsItems.length,
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
            [],
        );

        useEffect(() => {
            document.addEventListener('keydown', handleKeyPress);

            return () => {
                document.addEventListener('keydown', handleKeyPress);
            };
        }, [handleKeyPress]);

        useEffect(() => {
            if (!newContainer) {
                return;
            }

            setPortal(() =>
                createPortal(
                    <AnimatePresence initial={false}>
                        {isAnimating && matchingListsItems.length !== 0 && (
                            <SearchBoxBody
                                filterButtons={filterButtons}
                                selectedGroups={groups}
                                width={width}
                                coordinates={internalCoordinates}
                                browser={browser?.name}
                                height={height}
                                ref={contentRef}
                                onGroupSelect={handleFilterButtonsGroupSelect}
                                shouldHideFilterButtons={shouldHideFilterButtons}
                            >
                                {content}
                            </SearchBoxBody>
                        )}
                    </AnimatePresence>,
                    newContainer,
                ),
            );
        }, [
            browser?.name,
            newContainer,
            content,
            filterButtons,
            groups,
            height,
            internalCoordinates,
            isAnimating,
            width,
            shouldHideFilterButtons,
            matchingListsItems.length,
        ]);

        return useMemo(
            () => (
                <StyledSearchBox ref={boxRef}>
                    <div id="search_box_input">
                        <Input
                            ref={inputRef}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            placeholder={placeholder}
                            onKeyDown={onKeyDown}
                            leftElement={leftElement}
                            rightElement={rightElement}
                            value={value}
                        />
                    </div>
                    {portal}
                </StyledSearchBox>
            ),
            [
                handleBlur,
                handleChange,
                handleFocus,
                leftElement,
                onKeyDown,
                placeholder,
                portal,
                rightElement,
                value,
            ],
        );
    },
);

SearchBox.displayName = 'SearchBox';

export default SearchBox;
