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
import type { ISearchBoxItem } from '../../types/searchBox';
import { calculateContentHeight } from '../../utils/calculate';
import { searchList } from '../../utils/searchBox';
import Input from '../input/Input';
import SearchBoxItem from './search-box-item/SearchBoxItem';
import { StyledMotionSearchBoxBody, StyledSearchBox } from './SearchBox.styles';

export type SearchBoxRef = {
    clear: VoidFunction;
};

export type SearchBoxProps = {
    /**
     * A list of items that can be searched.
     */
    list: ISearchBoxItem[];
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
     * Whether the full list of items should be displayed if the input is empty.
     */
    shouldShowContentOnEmptyInput?: boolean;
    /**
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
};

const SearchBox: FC<SearchBoxProps> = forwardRef<SearchBoxRef, SearchBoxProps>(
    (
        {
            placeholder,
            list,
            onChange,
            onBlur,
            onSelect,
            onKeyDown,
            selectedId,
            shouldShowRoundImage,
            shouldShowContentOnEmptyInput = true,
        },
        ref,
    ) => {
        const [matchingItems, setMatchingItems] = useState<ISearchBoxItem[]>([]);
        const [value, setValue] = useState('');
        const [isAnimating, setIsAnimating] = useState(false);
        const [height, setHeight] = useState<number>(0);
        const [width, setWidth] = useState(0);
        const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

        const boxRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement | null>(null);
        const inputRef = useRef<HTMLInputElement | null>(null);

        const { browser } = getDevice();

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

        /**
         * This hook calculates the height
         */
        useEffect(() => {
            const textArray = list.map(({ text }) => text);

            setHeight(calculateContentHeight(textArray));
        }, [list, placeholder]);

        /**
         * This hook calculates the width
         */
        useEffect(() => {
            const input = document.getElementById('search_box_input');

            if (input) {
                setWidth(input.offsetWidth);
            }
        }, []);

        useEffect(() => {
            if (selectedId) {
                const selectedItem = list.find(({ id }) => id === selectedId);

                if (selectedItem) {
                    setValue(selectedItem.text);
                }
            }
        }, [list, selectedId]);

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
                const newMatchingItems = searchList({ items: list, searchString: value });

                if (newMatchingItems.length === 1 && newMatchingItems[0]?.text === value) {
                    return;
                }

                setMatchingItems(newMatchingItems);
                setIsAnimating(true);
            }
        }, [list, shouldShowContentOnEmptyInput, value]);

        useEffect(() => {
            if (list) {
                const newMatchingItems = searchList({ items: list, searchString: value });

                if (newMatchingItems.length === 1 && newMatchingItems[0]?.text === value) {
                    return;
                }

                if (shouldShowContentOnEmptyInput || value !== '') {
                    setMatchingItems(newMatchingItems);
                    setIsAnimating(newMatchingItems.length !== 0);
                }
            }
        }, [list, shouldShowContentOnEmptyInput, value]);

        /**
         * This function handles changes of the input
         */
        const handleChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const searchedItems = searchList({ items: list, searchString: event.target.value });

                if (
                    (!shouldShowContentOnEmptyInput && !event.target.value) ||
                    (searchedItems.length === 1 && searchedItems[0]?.text === event.target.value)
                ) {
                    setMatchingItems([]);
                } else {
                    setMatchingItems(searchedItems);
                    setIsAnimating(searchedItems.length !== 0);
                }

                setValue(event.target.value);

                if (typeof onChange === 'function') {
                    onChange(event);
                }
            },
            [list, onChange, shouldShowContentOnEmptyInput],
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
                setValue(item.text);
                setIsAnimating(false);
                setMatchingItems([]);

                if (typeof onSelect === 'function') {
                    onSelect(item);
                }
            },
            [onSelect],
        );

        const content = useMemo(() => {
            const items: ReactElement[] = [];

            matchingItems.sort((a, b) => a.text.localeCompare(b.text));

            matchingItems.forEach(({ id, text, imageUrl }) => {
                items.push(
                    <SearchBoxItem
                        key={id}
                        text={text}
                        imageUrl={imageUrl}
                        id={id}
                        shouldShowRoundImage={shouldShowRoundImage}
                        onSelect={handleSelect}
                    />,
                );
            });

            return items;
        }, [shouldShowRoundImage, handleSelect, matchingItems]);

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const children = contentRef.current?.children;
                    if (children && children.length > 0) {
                        const newIndex =
                            focusedIndex !== null
                                ? (focusedIndex +
                                      (e.key === 'ArrowUp' ? -1 : 1) +
                                      children.length) %
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

                    const { id, textContent } = element;

                    handleSelect({
                        id: id.replace('search-box-item__', ''),
                        text: textContent ?? '',
                    });
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [focusedIndex, handleSelect]);

        const handleKeyPress = useCallback((event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                setMatchingItems([]);
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
                            value={value}
                        />
                    </div>
                    <AnimatePresence initial={false}>
                        <StyledMotionSearchBoxBody
                            $browser={browser?.name}
                            key="content"
                            $height={height}
                            $width={width}
                            initial={{ height: 0, opacity: 0 }}
                            animate={
                                isAnimating
                                    ? { height: 'fit-content', opacity: 1 }
                                    : { height: 0, opacity: 0 }
                            }
                            transition={{
                                duration: 0.2,
                                type: 'tween',
                            }}
                            ref={contentRef}
                            tabIndex={0}
                        >
                            {content}
                        </StyledMotionSearchBoxBody>
                    </AnimatePresence>
                </StyledSearchBox>
            ),
            [
                browser?.name,
                content,
                handleBlur,
                handleChange,
                handleFocus,
                height,
                isAnimating,
                placeholder,
                value,
                width,
            ],
        );
    },
);

SearchBox.displayName = 'SearchBox';

export default SearchBox;
