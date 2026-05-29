import React, { createContext, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    type FinderContext,
    type FinderFilter,
    LoadingState,
    type Tag,
} from '@chayns-components/core';
import {
    LoadingStateMap,
    PersonEntry,
    PersonFinderContextValue,
    PersonFinderData,
    PersonFinderDataMap,
    PersonFinderEntry,
    PersonFinderFilter,
    PersonFinderFilterTypes,
    PersonFinderProviderProps,
    Priority,
    RelationMode,
    ThrottledFunction,
    UACEntry,
} from './PersonFinder.types';
import { postFriends } from '../../api/friends/post';
import { deleteFriends } from '../../api/friends/delete';
import { getFriends } from '../../api/friends/get';
import throttle from 'lodash.throttle';
import { getUACGroups, getUsersByGroups } from '../../utils/uac';
import { TextstringProvider } from '@chayns-components/textstring';
import { PERSON_FINDER_TEXTSTRING_LIBRARY_NAME } from '../../constants/textStrings';
import PersonFinderSmallItem from './person-finder-small-item/PersonFinderSmallItem';
import PersonFinderItem from './person-finder-item/PersonFinderItem';
import { filterDataByKeys, getGroupName, loadData } from './PersonFinder.utils';

export const PersonFinderContext = createContext<PersonFinderContextValue | null>(null);

const THROTTLE_INTERVAL = 500;

const isPersonFinderFilterType = (key: string): key is PersonFinderFilterTypes =>
    Object.values(PersonFinderFilterTypes).includes(key as PersonFinderFilterTypes);

const normalizeFilterKeys = (filterKeys: FinderFilter['key'][]): PersonFinderFilterTypes[] =>
    filterKeys.filter(isPersonFinderFilterType);

const getTagText = (entry: PersonFinderEntry): string => {
    if ('name' in entry) {
        return entry.name;
    }

    return [entry.firstName, entry.lastName].filter(Boolean).join(' ').trim();
};

const findEntryById = (data: PersonFinderDataMap, id: string): PersonFinderEntry | undefined =>
    Object.values(data)
        .flatMap(({ entries }) => entries)
        .find((entry) => String(entry.id) === id);

const PersonFinderProvider: FC<PersonFinderProviderProps> = ({
    children,
    friendsPriority,
    filterTypes,
    defaultEntries,
    excludedEntryIds,
    maxEntries = Infinity,
    onAdd,
    onRemove,
    shouldShowOwnUser = false,
    shouldHideResultsOnAdd,
    uacFilter,
    entries,
    relationMode,
}) => {
    const [data, setData] = useState<PersonFinderDataMap>({});
    const [friends, setFriends] = useState<PersonEntry[]>();
    const [uacUsers, setUacUsers] = useState<PersonEntry[]>();
    const [activeFilter, setActiveFilter] = useState<
        FinderContext<PersonFinderEntry>['activeFilter']
    >([]);
    const [searchString, setSearchString] = useState('');
    const [tags, setTagsState] = useState<Tag[]>(
        defaultEntries?.map(({ id, name }) => ({ id, text: name })) ?? [],
    );
    const [loadingState, setLoadingState] = useState<LoadingStateMap>({
        [PersonFinderFilterTypes.PERSON]: LoadingState.None,
        [PersonFinderFilterTypes.SITE]: LoadingState.None,
        [PersonFinderFilterTypes.UAC]: LoadingState.None,
    });

    const dataRef = useRef<PersonFinderDataMap>({});

    const updateActiveFilter = useCallback<FinderContext<PersonFinderEntry>['setActiveFilter']>(
        (filter) => {
            setActiveFilter(filter);
        },
        [],
    );

    const normalizedActiveFilter = useMemo(() => normalizeFilterKeys(activeFilter), [activeFilter]);

    const setTags = useCallback<FinderContext<PersonFinderEntry>['setTags']>((nextTags) => {
        setTagsState(nextTags);
    }, []);

    const updateSearch = useCallback<FinderContext<PersonFinderEntry>['setSearchString']>(
        (value) => {
            setSearchString(value);
        },
        [],
    );

    const handleRemove = useCallback(
        (id: string) => {
            const nextTags = tags.filter((tag) => tag.id !== id);

            if (nextTags.length === tags.length) {
                return;
            }

            setTags(nextTags);
            onRemove?.(id);
        },
        [onRemove, setTags, tags],
    );

    const handleAdd = useCallback(
        (id: string) => {
            const selectedEntry = findEntryById(data, id);

            if (!selectedEntry || tags.some((tag) => tag.id === id) || tags.length >= maxEntries) {
                return;
            }

            setTags([
                ...tags,
                {
                    id,
                    text: getTagText(selectedEntry),
                },
            ]);

            onAdd?.(selectedEntry);

            void shouldHideResultsOnAdd;
        },
        [data, maxEntries, onAdd, setTags, shouldHideResultsOnAdd, tags],
    );

    const itemRenderer = useCallback(
        (entry: PersonFinderEntry) =>
            typeof entry.id === 'number' ? (
                <PersonFinderSmallItem
                    key={`person-finder-entry--${entry.id}`}
                    entry={entry}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
            ) : (
                <PersonFinderItem
                    key={`person-finder-entry--${entry.id}`}
                    entry={entry}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
            ),
        [handleAdd, handleRemove],
    );

    const updateData = useCallback<FinderContext<PersonFinderEntry>['updateData']>(
        (key, newData) => {
            if (!isPersonFinderFilterType(key)) {
                return;
            }

            setData((prevState) => ({ ...prevState, [key]: newData }));
        },
        [],
    );

    const appendData = useCallback((key: PersonFinderFilterTypes, newData: PersonFinderData) => {
        setData((prevState) => {
            const oldEntries = prevState && prevState[key]?.entries ? prevState[key]?.entries : [];

            return {
                ...prevState,
                [key]: {
                    ...newData,
                    entries: [...oldEntries, ...newData.entries],
                },
            };
        });
    }, []);

    const updateLoadingState = useCallback((key: PersonFinderFilterTypes, state: LoadingState) => {
        setLoadingState((prev) => ({
            ...prev,
            [key]: state,
        }));
    }, []);

    const loadMore = useCallback<FinderContext<PersonFinderEntry>['loadMore']>(
        (key) => {
            if (!isPersonFinderFilterType(key)) {
                return;
            }

            updateLoadingState(key, LoadingState.Pending);

            const current = data[key];

            if (!current) {
                updateLoadingState(key, LoadingState.Error);

                return;
            }

            void loadData({
                searchString,
                filter: [key],
                skipMap: { [key]: current.skip },
                relationMode,
            })
                .then((result) => {
                    const newData = result?.[key];

                    if (newData) {
                        appendData(key, newData);
                    }
                })
                .finally(() => {
                    updateLoadingState(key, LoadingState.Success);
                });
        },
        [updateLoadingState, data, searchString, relationMode, appendData],
    );

    const addFriend = useCallback((personId: string) => {
        void postFriends(personId).then((result) => {
            if (result) {
                const { firstName, lastName, verificationState } = result;

                setFriends((prev) => [
                    ...(prev ?? []),
                    {
                        id: personId,
                        isVerified: verificationState === 1,
                        commonSites: 0,
                        firstName,
                        lastName,
                        type: PersonFinderFilterTypes.PERSON,
                    },
                ]);
            }
        });
    }, []);

    const removeFriend = useCallback((personId: string) => {
        void deleteFriends(personId).then((wasSuccessful) => {
            if (wasSuccessful) {
                setFriends((prev) => prev?.filter(({ id }) => id !== personId));
            }
        });
    }, []);

    useEffect(() => {
        if (!filterTypes.includes(PersonFinderFilterTypes.PERSON)) {
            return;
        }

        void getFriends().then((result) => {
            if (result) {
                setFriends(
                    result.map(({ personId, firstName, lastName, verificationState }) => ({
                        lastName,
                        firstName,
                        id: personId,
                        commonSites: 0,
                        isVerified: verificationState === 1,
                        type: PersonFinderFilterTypes.PERSON,
                    })),
                );
            }
        });
    }, [filterTypes]);

    const latestArgsRef = useRef<{ search: string; filter: PersonFinderFilterTypes[] } | null>(
        null,
    );
    const latestHandledRequestRef = useRef<number>(0);

    const throttledRequest = useRef<ThrottledFunction<() => void>>(
        throttle(
            async () => {
                const args = latestArgsRef.current;

                if (!args) return;

                const { search: requestSearchString, filter } = args;
                const requestTimestamp = Date.now();

                filter.forEach((key) => {
                    updateLoadingState(key, LoadingState.Pending);
                });

                const result = await loadData({
                    searchString: requestSearchString,
                    filter,
                    skipMap: {},
                    relationMode,
                });

                if (requestTimestamp < latestHandledRequestRef.current) {
                    return;
                }

                latestHandledRequestRef.current = requestTimestamp;

                if (!result) return;

                Object.entries(result).forEach(([keyString, value]) => {
                    const key = keyString as PersonFinderFilterTypes;

                    if (
                        key === PersonFinderFilterTypes.PERSON &&
                        friendsPriority === Priority.HIGH &&
                        friends
                    ) {
                        const friendIds = new Set(friends.map((f) => f.id));
                        const serverFriendEntries = value.entries.filter((entry) =>
                            friendIds.has(entry.id as string),
                        );
                        const serverFriendIds = new Set(serverFriendEntries.map((f) => f.id));

                        const missingFriends = friends
                            .filter((f) => !serverFriendIds.has(f.id))
                            .filter(
                                (f) =>
                                    f.firstName
                                        ?.toLowerCase()
                                        .includes(requestSearchString.toLowerCase()) ||
                                    f.lastName
                                        ?.toLowerCase()
                                        .includes(requestSearchString.toLowerCase()),
                            );

                        const otherEntries = value.entries.filter(
                            (entry) => !friendIds.has(entry.id as string),
                        );

                        updateData(key, {
                            ...value,
                            entries: [...serverFriendEntries, ...missingFriends, ...otherEntries],
                        });
                    } else {
                        updateData(key, value);
                    }

                    updateLoadingState(
                        key,
                        value.entries.length === 0 ? LoadingState.Error : LoadingState.Success,
                    );
                });
            },
            THROTTLE_INTERVAL,
            { leading: false, trailing: true },
        ),
    ).current;

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    const searchData = useCallback(
        ({ filter }: { filter: PersonFinderFilterTypes[] }) => {
            const tmpData = dataRef.current;

            filter.forEach((key) => {
                updateLoadingState(key, LoadingState.Pending);

                if (tmpData && tmpData[key]) {
                    // Add all Types that are not searched by a request
                    const uacEntries = tmpData[key].entries as UACEntry[];

                    const filteredEntries = uacEntries.filter(({ name }) =>
                        name.toLowerCase().includes(searchString.toLowerCase()),
                    );

                    updateData(key, {
                        entries: filteredEntries,
                        searchString,
                        count: filteredEntries.length,
                        skip: filteredEntries.length,
                    });

                    updateLoadingState(
                        key,
                        filteredEntries.length === 0 ? LoadingState.Error : LoadingState.Success,
                    );
                }
            });
        },
        [searchString, updateData, updateLoadingState],
    );

    const searchLocal = useCallback(() => {
        if (searchString.length < 3) {
            return;
        }

        updateLoadingState(PersonFinderFilterTypes.PERSON, LoadingState.Pending);

        const searchedUsers: PersonEntry[] = [];

        const entriesToSearch = entries ?? uacUsers;

        entriesToSearch?.forEach((entry) => {
            if (
                entry.firstName?.toLowerCase().includes(searchString.toLowerCase()) ||
                entry.lastName?.toLowerCase().includes(searchString.toLowerCase()) ||
                [entry.firstName, entry.lastName]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()
                    .trim()
                    .includes(searchString.toLowerCase().trim()) ||
                entry.id.toLowerCase().includes(searchString.toLowerCase())
            ) {
                searchedUsers.push(entry);
            }
        });

        updateData(PersonFinderFilterTypes.PERSON, {
            entries: searchedUsers,
            searchString,
            count: searchedUsers.length,
            skip: searchedUsers.length,
        });

        updateLoadingState(
            PersonFinderFilterTypes.PERSON,
            searchedUsers.length === 0 ? LoadingState.Error : LoadingState.Success,
        );
    }, [entries, searchString, uacUsers, updateData, updateLoadingState]);

    useEffect(() => {
        if (!searchString) {
            return;
        }

        const active = normalizedActiveFilter.length > 0 ? normalizedActiveFilter : filterTypes;

        if (uacFilter || entries) {
            searchLocal();
        } else if (active.includes(PersonFinderFilterTypes.UAC)) {
            searchData({ filter: [PersonFinderFilterTypes.UAC] });
        } else {
            latestArgsRef.current = { search: searchString, filter: active };

            throttledRequest();
        }
    }, [
        filterTypes,
        searchString,
        activeFilter,
        normalizedActiveFilter,
        friends,
        friendsPriority,
        updateData,
        updateLoadingState,
        throttledRequest,
        searchData,
        uacFilter,
        searchLocal,
        entries,
    ]);

    useEffect(
        () => () => {
            throttledRequest.cancel();
        },
        [throttledRequest],
    );

    // load initial data
    useEffect(() => {
        if (entries) {
            return;
        }

        if (
            relationMode === RelationMode.SITE &&
            filterTypes.includes(PersonFinderFilterTypes.PERSON)
        ) {
            void getUsersByGroups([{ groupId: -1 }]).then((users) => {
                setData({
                    person: {
                        entries: users,
                        searchString: '',
                        skip: users.length,
                        count: users.length,
                    },
                });
            });
        }

        if (uacFilter) {
            void getUsersByGroups(uacFilter).then((users) => {
                setUacUsers(users);
            });

            return;
        }

        if (filterTypes.includes(PersonFinderFilterTypes.UAC) && searchString === '') {
            void getUACGroups().then((result) => {
                setData({
                    uac: {
                        entries: result,
                        searchString: '',
                        skip: result.length,
                        count: result.length,
                    },
                });
            });
        }

        if (
            friendsPriority === Priority.HIGH &&
            filterTypes.includes(PersonFinderFilterTypes.PERSON) &&
            friends &&
            searchString === ''
        ) {
            setData({
                person: {
                    entries: friends,
                    searchString: '',
                    skip: friends.length,
                    count: friends.length,
                },
            });
        }
    }, [entries, filterTypes, friends, friendsPriority, relationMode, searchString, uacFilter]);

    const filter = useMemo<PersonFinderFilter[]>(
        () => filterTypes.map((key) => ({ key, label: getGroupName(key) })),
        [filterTypes],
    );

    const providerValue = useMemo<PersonFinderContextValue>(
        () => ({
            data: filterDataByKeys(data, normalizedActiveFilter, {
                excludedEntryIds,
                shouldShowOwnUser: uacFilter ? false : shouldShowOwnUser,
            }),
            updateData,
            filter,
            activeFilter,
            setActiveFilter: updateActiveFilter,
            searchString,
            setSearchString: updateSearch,
            loadMore,
            loadingState,
            itemRenderer,
            friends,
            addFriend,
            removeFriend,
            setTags,
            tags,
        }),
        [
            activeFilter,
            addFriend,
            data,
            excludedEntryIds,
            filter,
            friends,
            itemRenderer,
            loadMore,
            loadingState,
            normalizedActiveFilter,
            removeFriend,
            searchString,
            shouldShowOwnUser,
            tags,
            uacFilter,
            updateActiveFilter,
            updateData,
            updateSearch,
            setTags,
        ],
    );

    return (
        <PersonFinderContext.Provider value={providerValue}>
            <TextstringProvider libraryName={PERSON_FINDER_TEXTSTRING_LIBRARY_NAME}>
                {children}
            </TextstringProvider>
        </PersonFinderContext.Provider>
    );
};

PersonFinderProvider.displayName = 'PersonFinderProvider';

export default PersonFinderProvider;
