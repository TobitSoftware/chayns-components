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
import { searchList } from '../../utils/searchBox';
import Icon from '../icon/Icon';
import Input from '../input/Input';
import GroupName from './group-name/GroupName';
import SearchBoxBody from './search-box-body/SearchBoxBody';
import SearchBoxItem from './search-box-item/SearchBoxItem';
import { StyledSearchBoxItemImage } from './search-box-item/SearchBoxItem.styles';
import { StyledSearchBox, StyledSearchBoxIcon } from './SearchBox.styles';

export type SearchBoxRef = {
    clear: VoidFunction;
};

export type SearchBoxProps = {
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
            lists,
            onChange,
            onBlur,
            onSelect,
            onKeyDown,
            selectedId,
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
        const [isAnimating, setIsAnimating] = useState(true);
        const [height, setHeight] = useState<number>(0);
        const [width, setWidth] = useState(0);
        const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
        const [hasMultipleGroups, setHasMultipleGroups] = useState<boolean>(lists.length > 1);
        const [filteredChildrenArray, setFilteredChildrenArray] = useState<Element[]>();
        const [inputToListValue, setInputToListValue] = useState<string>('');
        const [groups, setGroups] = useState<string[]>([]);

        const boxRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement | null>(null);
        const inputRef = useRef<HTMLInputElement | null>(null);

        const theme = useTheme();

        const { browser } = getDevice();

        /**
         * Checks if Lists are smaller then 1
         */
        useEffect(() => {
            setHasMultipleGroups(lists.length > 1);
        }, [lists]);

        const filterbuttons = useMemo(() => {
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
            if (groups.length === 0) {
                return lists;
            }

            const newLists: ISearchBoxItems[] = [];

            lists.forEach((list) => {
                if (list.groupName && groups.includes(list.groupName)) {
                    newLists.push(list);
                }
            });

            const newMatchingItems = newLists.map(({ list, groupName }) => ({
                groupName,
                list: searchList({ items: list, searchString: value }),
            }));

            const filteredMatchingListItems = newMatchingItems.map(({ list, groupName }) => ({
                groupName,
                list: list.filter(
                    (item) => !(newMatchingItems.length === 1 && item.text === value),
                ),
            }));

            setMatchingListsItems(filteredMatchingListItems);

            return newLists;
        }, [groups, lists]);

        const handleFilterButtonsGroupSelect = (keys: string[]) => {
            setGroups(keys);
        };

        /**
         * This function closes the list of items
         */
        const handleOutsideClick = useCallback(
            (event: MouseEvent) => {
                if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                    setIsAnimating(false);
                }
            },
            [boxRef],
        );

        /**
         * This hook listens for clicks
         */
        useEffect(() => {
            document.addEventListener('click', handleOutsideClick);
            window.addEventListener('blur', () => setIsAnimating(false));

            return () => {
                document.removeEventListener('click', handleOutsideClick);
                window.addEventListener('blur', () => setIsAnimating(false));
            };
        }, [handleOutsideClick, boxRef]);

        useEffect(() => {}, []);

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
                const newMatchingItems = activeList.map(({ list, groupName }) => ({
                    groupName,
                    list: searchList({ items: list, searchString: value }),
                }));

                const filteredMatchingListItems = newMatchingItems.map(({ list, groupName }) => ({
                    groupName,
                    list: list.filter(
                        (item) => !(newMatchingItems.length === 1 && item.text === value),
                    ),
                }));

                setMatchingListsItems(filteredMatchingListItems);
                setIsAnimating(filteredMatchingListItems.length !== 0);
            }
        }, [activeList, shouldShowContentOnEmptyInput, value]);

        /**
         * This function filters the lists by input
         */

        useEffect(() => {
            const newMatchingItems = activeList.map(({ list, groupName }) => ({
                groupName,
                list: searchList({ items: list, searchString: value }),
            }));

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

        const rightElement = useMemo(() => {
            if (!shouldShowToggleIcon) {
                return undefined;
            }

            return (
                <StyledSearchBoxIcon onClick={() => setIsAnimating((prevState) => !prevState)}>
                    <Icon icons={['fa fa-chevron-down']} color={theme['006'] as string} />
                </StyledSearchBoxIcon>
            );
        }, [shouldShowToggleIcon, theme]);

        /**
         * This function handles changes of the input
         */
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const filteredLists = activeList.map(({ list, groupName }) => ({
                    groupName,
                    list: searchList({ items: list, searchString: event.target.value }),
                }));

                setSelectedImage(undefined);

                if (!shouldShowContentOnEmptyInput && !event.target.value) {
                    setMatchingListsItems([]);
                } else {
                    setMatchingListsItems(filteredLists);
                    setIsAnimating(filteredLists.length !== 0);
                }

                setValue(event.target.value);
                setInputToListValue(event.target.value);

                if (typeof onChange === 'function') {
                    onChange(event);
                }
            },
            [activeList, onChange, shouldShowContentOnEmptyInput],
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
                setIsAnimating(false);

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
            [onSelect, shouldShowRoundImage],
        );

        console.log(matchingListsItems);

        const content = useMemo(() => {
            const items: ReactElement[] = [];

            matchingListsItems.forEach(({ groupName, list }) => {
                if (hasMultipleGroups) {
                    if (list.length <= 0) {
                        return;
                    }

                    items.push(<GroupName key={groupName} name={groupName ?? ''} />);
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
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const children = contentRef.current?.children;

                    if (children && children.length > 0) {
                        const filteredChildren = Array.from(children).filter(
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
        }, [filteredChildrenArray, focusedIndex, handleSelect]);

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
                            leftElement={selectedImage}
                            rightElement={rightElement}
                            value={value}
                        />
                    </div>
                    <AnimatePresence initial={false}>
                        {isAnimating && (
                            <SearchBoxBody
                                groups={filterbuttons}
                                width={width}
                                browser={browser?.name}
                                height={height}
                                currentGroupName="Essbar"
                                ref={contentRef}
                                onGroupSelect={handleFilterButtonsGroupSelect}
                            >
                                {content}
                            </SearchBoxBody>
                        )}
                        {/* <StyledMotionSearchBoxBody */}
                        {/*   $browser={browser?.name} */}
                        {/*   key="content" */}
                        {/*   $height={height} */}
                        {/*   $width={width} */}
                        {/*   initial={{ height: 0, opacity: 0 }} */}
                        {/*   animate={ */}
                        {/*       isAnimating */}
                        {/*           ? { height: 'fit-content', opacity: 1 } */}
                        {/*           : { height: 0, opacity: 0 } */}
                        {/*   } */}
                        {/*   transition={{ */}
                        {/*       duration: 0.2, */}
                        {/*       type: 'tween', */}
                        {/*   }} */}
                        {/*   ref={contentRef} */}
                        {/*   tabIndex={0} */}
                        {/* > */}
                        {/*   {content} */}
                        {/* </StyledMotionSearchBoxBody> */}
                    </AnimatePresence>
                </StyledSearchBox>
            ),
            [
                browser?.name,
                content,
                filterbuttons,
                handleBlur,
                handleChange,
                handleFocus,
                height,
                isAnimating,
                onKeyDown,
                placeholder,
                rightElement,
                selectedImage,
                value,
                width,
            ],
        );
    },
);

SearchBox.displayName = 'SearchBox';

export default SearchBox;
