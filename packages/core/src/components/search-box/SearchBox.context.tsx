import React, {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import type { FinderContext, LoadingState } from '../finder/Finder.types';
import type { Tag } from '../../types/tagInput';
import type { ISearchBoxItem, ISearchBoxItems } from '../../types/searchBox';
import { searchList } from '../../utils/searchBox';
import SearchBoxItem from './search-box-item/SearchBoxItem';
import { StyledSearchBoxHintText, StyledSearchBoxLeftWrapper } from './SearchBox.styles';
import Icon from '../icon/Icon';
import { StyledSearchBoxItemImage } from './search-box-item/SearchBoxItem.styles';

type SearchBoxTagInputSettings = {
    onAdd?: (tag: Tag) => Promise<boolean> | boolean | void;
    onRemove?: (id: string) => void;
    shouldAllowMultiple?: boolean;
    tags?: Tag[];
};

export type SearchBoxProviderProps = PropsWithChildren<{
    customFilter?: (item: ISearchBoxItem) => boolean;
    hintText?: string;
    leftIcons?: string[];
    lists: ISearchBoxItems[];
    onSelect?: (item: ISearchBoxItem) => void;
    presetValue?: string;
    selectedId?: string;
    shouldAddInputToList: boolean;
    shouldHideFilterButtons?: boolean;
    shouldShowContentOnEmptyInput?: boolean;
    shouldShowRoundImage?: boolean;
    tagInputSettings?: SearchBoxTagInputSettings;
}>;

export type SearchBoxEntry = ISearchBoxItem & {
    plainText: string;
    shouldUseInputValueAsId?: boolean;
};

export type SearchBoxContextValue = FinderContext<SearchBoxEntry> & {
    leftIcons?: string[];
    selectedImageUrl?: string;
    shouldShowRoundImage?: boolean;
};

export const SearchBoxContext = createContext<SearchBoxContextValue | null>(null);

const DEFAULT_GROUP_KEY = '__default__';
const INPUT_VALUE_ID = '__input-value__';
const stripHighlightTags = (value: string) => value.replace(/<\/?b>/g, '');

const getGroupKey = (groupName: string | undefined, index: number) =>
    groupName ? `group-${groupName}` : `${DEFAULT_GROUP_KEY}-${index}`;

const findSelectedItem = (lists: ISearchBoxItems[], selectedId?: string) =>
    lists.flatMap(({ list }) => list).find(({ id }) => id === selectedId);

export const SearchBoxLeftElement: FC<{ leftIcons?: string[] }> = ({ leftIcons }) => {
    const context = React.useContext(SearchBoxContext);

    if (!context) {
        return null;
    }

    const { selectedImageUrl, shouldShowRoundImage } = context;

    if (!leftIcons && !selectedImageUrl) {
        return null;
    }

    return (
        <StyledSearchBoxLeftWrapper>
            {leftIcons && <Icon icons={leftIcons} />}
            {selectedImageUrl && (
                <StyledSearchBoxItemImage
                    src={selectedImageUrl}
                    $shouldShowRoundImage={shouldShowRoundImage}
                />
            )}
        </StyledSearchBoxLeftWrapper>
    );
};

const SearchBoxProvider: FC<SearchBoxProviderProps> = ({
    children,
    customFilter,
    hintText,
    leftIcons,
    lists,
    onSelect,
    presetValue,
    selectedId,
    shouldAddInputToList,
    shouldHideFilterButtons = false,
    shouldShowContentOnEmptyInput = true,
    shouldShowRoundImage,
    tagInputSettings,
}) => {
    const [activeFilter, setActiveFilter] = useState<string[]>([]);
    const [searchString, setSearchStringState] = useState(presetValue ?? '');
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>();
    const [resetInputSignal, setResetInputSignal] = useState(0);
    const [closeDropdownSignal, setCloseDropdownSignal] = useState(0);

    const filter = useMemo(
        () =>
            lists
                .map(({ groupName }) => groupName)
                .filter((groupName): groupName is string => typeof groupName === 'string')
                .map((groupName) => ({ key: `group-${groupName}`, label: groupName })),
        [lists],
    );

    const updateSearchString = useCallback<FinderContext<SearchBoxEntry>['setSearchString']>(
        (value) => {
            setSearchStringState(value);
            setSelectedImageUrl(undefined);
        },
        [],
    );

    const removeTag = useCallback(
        (id: string) => {
            if (typeof tagInputSettings?.onRemove === 'function') {
                tagInputSettings.onRemove(id);
            }
        },
        [tagInputSettings],
    );

    const visibleLists = useMemo(
        () =>
            activeFilter.length === 0
                ? lists
                : lists.filter(({ groupName }, index) =>
                      activeFilter.includes(getGroupKey(groupName, index)),
                  ),
        [activeFilter, lists],
    );

    const data = useMemo<FinderContext<SearchBoxEntry>['data']>(() => {
        if (!shouldShowContentOnEmptyInput && searchString.trim() === '') {
            return {};
        }

        const nextData: FinderContext<SearchBoxEntry>['data'] = {};

        visibleLists.forEach(({ groupName, list }, index) => {
            const matchingEntries = searchList({
                items: list,
                searchString,
            }).filter((item) => (customFilter ? customFilter(item) : true));

            if (matchingEntries.length === 0) {
                return;
            }

            nextData[getGroupKey(groupName, index)] = {
                count: matchingEntries.length,
                entries: matchingEntries.map((item) => ({
                    ...item,
                    plainText: stripHighlightTags(item.text),
                })),
                searchString,
                skip: matchingEntries.length,
            };
        });

        const normalizedSearchString = searchString.trim();
        const hasRegularEntries = Object.values(nextData).some(({ entries }) => entries.length > 0);

        if (
            shouldAddInputToList &&
            normalizedSearchString !== '' &&
            !(hintText && !hasRegularEntries)
        ) {
            const inputEntry: SearchBoxEntry = {
                id: INPUT_VALUE_ID,
                imageUrl: undefined,
                plainText: normalizedSearchString,
                shouldUseInputValueAsId: true,
                text: `<b>${normalizedSearchString}</b>`,
            };

            const targetKey =
                Object.keys(nextData)[Object.keys(nextData).length - 1] ??
                getGroupKey(visibleLists[0]?.groupName, 0);
            const existingGroup = nextData[targetKey];
            const existingEntries = existingGroup?.entries ?? [];
            const deduplicatedEntries = [...existingEntries, inputEntry].reduce<SearchBoxEntry[]>(
                (entries, entry) => {
                    const existingEntryIndex = entries.findIndex(
                        ({ id }) => String(id) === String(entry.id),
                    );

                    if (existingEntryIndex >= 0) {
                        entries.splice(existingEntryIndex, 1);
                    }

                    entries.push(entry);

                    return entries;
                },
                [],
            );

            nextData[targetKey] = {
                count: deduplicatedEntries.length,
                entries: deduplicatedEntries,
                searchString,
                skip: deduplicatedEntries.length,
            };
        }

        return nextData;
    }, [
        customFilter,
        hintText,
        searchString,
        shouldAddInputToList,
        shouldShowContentOnEmptyInput,
        visibleLists,
    ]);

    const handleSelect = useCallback(
        (item: SearchBoxEntry) => {
            const text = stripHighlightTags(item.plainText || item.text);
            const nextItem = {
                id: item.shouldUseInputValueAsId ? text : String(item.id),
                imageUrl: item.imageUrl,
                text,
            };

            if (tagInputSettings) {
                setSearchStringState('');
                setResetInputSignal((currentSignal) => currentSignal + 1);
            } else {
                setSearchStringState(text);
            }

            setSelectedImageUrl(item.imageUrl);
            setCloseDropdownSignal((currentSignal) => currentSignal + 1);

            if (typeof onSelect === 'function') {
                onSelect(nextItem);
            }
        },
        [onSelect, tagInputSettings],
    );

    const itemRenderer = useCallback(
        (item: SearchBoxEntry) => (
            <SearchBoxItem
                key={`search-box-item-${item.id}`}
                id={String(item.id)}
                imageUrl={item.imageUrl}
                onSelect={handleSelect}
                shouldShowRoundImage={shouldShowRoundImage}
                text={item.text}
            />
        ),
        [handleSelect, shouldShowRoundImage],
    );

    useEffect(() => {
        const selectedItem = findSelectedItem(lists, selectedId);

        if (selectedItem) {
            setSearchStringState(selectedItem.text);
            setSelectedImageUrl(selectedItem.imageUrl);

            return;
        }

        if (!selectedId && !presetValue) {
            setSearchStringState('');
            setSelectedImageUrl(undefined);
        }
    }, [lists, presetValue, selectedId]);

    useEffect(() => {
        if (typeof presetValue === 'string' && presetValue !== '') {
            setSearchStringState(presetValue);
        }
    }, [presetValue]);

    const shouldShowContent = useMemo(() => {
        const hasEntries = Object.values(data).some(
            (singleData) => Array.isArray(singleData?.entries) && singleData.entries.length > 0,
        );

        return (
            (searchString.trim() !== '' || shouldShowContentOnEmptyInput) &&
            (hasEntries || !!hintText)
        );
    }, [data, hintText, searchString, shouldShowContentOnEmptyInput]);

    const loadingState = useMemo<{ [key: string]: LoadingState }>(() => ({}), []);

    const providerValue = useMemo<SearchBoxContextValue>(
        () => ({
            activeFilter,
            closeDropdownSignal,
            data,
            emptyStateRenderer: hintText
                ? () => (
                      <StyledSearchBoxHintText>
                          {hintText.replace('##value##', searchString)}
                      </StyledSearchBoxHintText>
                  )
                : undefined,
            filter,
            itemRenderer,
            leftIcons,
            loadMore: () => undefined,
            loadingState,
            removeTag,
            resetInputSignal,
            searchString,
            selectedImageUrl,
            setActiveFilter,
            setSearchString: updateSearchString,
            setTags: () => undefined,
            shouldHideFilterButtons,
            shouldShowContent,
            shouldShowRoundImage,
            tags: tagInputSettings?.tags ?? [],
            updateData: () => undefined,
        }),
        [
            activeFilter,
            closeDropdownSignal,
            data,
            filter,
            hintText,
            itemRenderer,
            leftIcons,
            loadingState,
            removeTag,
            resetInputSignal,
            searchString,
            selectedImageUrl,
            shouldHideFilterButtons,
            shouldShowContent,
            shouldShowRoundImage,
            tagInputSettings?.tags,
            updateSearchString,
        ],
    );

    return <SearchBoxContext.Provider value={providerValue}>{children}</SearchBoxContext.Provider>;
};

SearchBoxProvider.displayName = 'SearchBoxProvider';

export default SearchBoxProvider;
