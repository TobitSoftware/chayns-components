import { AnimatePresence } from 'framer-motion';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    FocusEvent,
    FocusEventHandler,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { calculateContentHeight } from '../../utils/calculate';
import Input from '../input/Input';
import SearchBoxItem from './search-box-item/SearchBoxItem';
import { StyledMotionSearchBoxBody, StyledSearchBox } from './SearchBox.styles';
import type { ISearchBoxItem } from './types';
import { searchList } from './utils';

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
     * Function to be executed when an item is selected.
     */
    onSelect?: (item: ISearchBoxItem) => void;
};

const SearchBox: FC<SearchBoxProps> = ({ placeholder, list, onChange, onBlur, onSelect }) => {
    const [matchingItems, setMatchingItems] = useState<ISearchBoxItem[]>([]);
    const [value, setValue] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [height, setHeight] = useState<number>(0);

    const boxRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    /**
     * This function closes the list of items
     */
    const handleOutsideClick = useCallback(
        (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setIsAnimating(false);
            }
        },
        [boxRef]
    );

    /**
     * This hook listens for clicks
     */
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [handleOutsideClick, boxRef]);

    /**
     * This hook calculates the greatest width
     */
    useEffect(() => {
        const textArray = list.map(({ text }) => text);

        setHeight(calculateContentHeight(textArray));
    }, [list, placeholder]);

    /**
     * This function handles changes of the input
     */
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const searchedItems = searchList({ items: list, searchString: event.target.value });

            setMatchingItems(searchedItems);
            setIsAnimating(searchedItems.length !== 0);
            setValue(event.target.value);

            if (typeof onChange === 'function') {
                onChange(event);
            }
        },
        [list, onChange]
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
        [onBlur]
    );

    /**
     * This function handles the item selection
     */
    const handleSelect = useCallback(
        (item: ISearchBoxItem) => {
            setValue(item.text);
            setIsAnimating(false);

            if (typeof onSelect === 'function') {
                onSelect(item);
            }
        },
        [onSelect]
    );

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        matchingItems.sort((a, b) => a.text.localeCompare(b.text));

        matchingItems.forEach(({ id, text }) => {
            items.push(<SearchBoxItem key={id} text={text} id={id} onSelect={handleSelect} />);
        });

        return items;
    }, [handleSelect, matchingItems]);

    return useMemo(
        () => (
            <StyledSearchBox ref={boxRef}>
                <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    value={value}
                />
                <AnimatePresence initial={false}>
                    <StyledMotionSearchBoxBody
                        key="content"
                        height={height}
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
                    >
                        <div ref={contentRef}>{content}</div>
                    </StyledMotionSearchBoxBody>
                </AnimatePresence>
            </StyledSearchBox>
        ),
        [content, handleBlur, handleChange, height, isAnimating, placeholder, value]
    );
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
