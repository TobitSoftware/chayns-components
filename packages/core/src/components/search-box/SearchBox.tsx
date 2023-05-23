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
import { StyledMotionComboBoxBody } from '../combobox/ComboBox.styles';
import { calculateContentHeight } from '../combobox/utils';
import Input from '../input/Input';
import type { ISearchBoxItem } from './interface';
import SearchBoxItem from './search-box-item/SearchBoxItem';
import { StyledSearchBox } from './SearchBox.styles';
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
};

const SearchBox: FC<SearchBoxProps> = ({ placeholder, list, onChange, onBlur }) => {
    const [matchingItems, setMatchingItems] = useState<ISearchBoxItem[]>([]);
    const [value, setValue] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [height, setHeight] = useState<number>(0);

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
     * This function calculates the greatest width
     */
    useEffect(() => {
        const textArray = list.map(({ text }) => text);

        setHeight(calculateContentHeight(textArray));
    }, [list, placeholder]);

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

    const handleBlur = useCallback(
        (event: FocusEvent<HTMLInputElement>) => {
            if (typeof onBlur === 'function') {
                onBlur(event);
            }
        },
        [onBlur]
    );

    const handleSelect = (item: ISearchBoxItem) => {
        setValue(item.text);
        setIsAnimating(false);
    };

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        matchingItems.forEach(({ id, text }) => {
            items.push(<SearchBoxItem key={id} text={text} id={id} onSelect={handleSelect} />);
        });

        return items;
    }, [matchingItems]);

    return useMemo(
        () => (
            <StyledSearchBox ref={ref}>
                <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    value={value}
                />
                <StyledMotionComboBoxBody
                    height={height}
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
            </StyledSearchBox>
        ),
        [content, handleBlur, handleChange, height, isAnimating, placeholder, value]
    );
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
