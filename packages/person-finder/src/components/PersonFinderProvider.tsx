import React, {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import throttle from 'lodash.throttle';
import {
    DefaultEntry,
    LoadingState,
    LoadingStateMap,
    PersonEntry,
    PersonFinderData,
    PersonFinderEntry,
    PersonFinderFilterTypes,
    Priority,
    RelationMode,
    ThrottledFunction,
    UACEntry,
    UACFilter,
} from '../types/personFinder';
import { getFriends } from '../api/friends/get';
import { postFriends } from '../api/friends/post';
import { deleteFriends } from '../api/friends/delete';
import { filterDataByKeys, loadData } from '../utils/personFinder';
import { Tag } from '@chayns-components/core/lib/types/types/tagInput';
import { getUACGroups, getUsersByGroups } from '../utils/uac';
import { TextstringProvider } from '@chayns-components/textstring';
import { PERSON_FINDER_TEXTSTRING_LIBRARY_NAME } from '../constants/textStrings';

const THROTTLE_INTERVAL = 500;
const PAGE_SIZE = 20;

type GetUsersByGroupsResult = {
    users: PersonEntry[];
    count: number;
};

export interface IPersonFinderContext {
    // Data
    data?: { [key: string]: PersonFinderData };
    updateData?: (key: PersonFinderFilterTypes, personFinderData: PersonFinderData) => void;

    // Tags
    tags?: Tag[];
    setTags?: Dispatch<SetStateAction<Tag[]>>;

    // Friends
    friends?: PersonEntry[];
    addFriend?: (personId: string) => void;
    removeFriend?: (personId: string) => void;

    // Filter
    activeFilter?: PersonFinderFilterTypes[];
    updateActiveFilter?: (filter: PersonFinderFilterTypes[]) => void;

    // Search
    search?: string;
    updateSearch?: (value: string) => void;

    // Loading
    loadMore?: (key: PersonFinderFilterTypes) => void;
    loadingState?: LoadingStateMap;
    updateLoadingState?: (key: PersonFinderFilterTypes, state: LoadingState) => void;

    relationMode?: RelationMode;
}

export const PersonFinderContext = createContext<IPersonFinderContext>({
    data: undefined,
    updateData: undefined,
    friends: undefined,
    addFriend: undefined,
    removeFriend: undefined,
    activeFilter: undefined,
    updateActiveFilter: undefined,
    search: undefined,
    updateSearch: undefined,
    loadMore: undefined,
    loadingState: undefined,
    updateLoadingState: undefined,
    tags: undefined,
    setTags: undefined,
    relationMode: undefined,
});

PersonFinderContext.displayName = 'PersonFinderContext';

export const usePersonFinder = () => useContext(PersonFinderContext);

type PersonFinderProviderProps = {
    children: ReactNode;
    friendsPriority: Priority;
    filterTypes: PersonFinderFilterTypes[];
    defaultEntries?: DefaultEntry[];
    excludedEntryIds?: PersonFinderEntry['id'][];
    shouldShowOwnUser?: boolean;
    uacFilter?: UACFilter[];
    entries?: PersonEntry[];
    relationMode?: RelationMode;
};

const PersonFinderProvider: FC<PersonFinderProviderProps> = ({
    children,
    friendsPriority,
    filterTypes,
    defaultEntries,
    excludedEntryIds,
    shouldShowOwnUser = false,
    uacFilter,
    entries,
    relationMode,
}) => {
    const getPagedUsersByGroups = useCallback(
        getUsersByGroups as unknown as (
            uacFilter: UACFilter[],
            options?: { skip?: number; take?: number },
        ) => Promise<GetUsersByGroupsResult>,
        [],
    );

    const [data, setData] = useState<IPersonFinderContext['data']>();
    const [friends, setFriends] = useState<PersonEntry[]>();
    const [uacUsers, setUacUsers] = useState<PersonEntry[]>();
    const [activeFilter, setActiveFilter] = useState<IPersonFinderContext['activeFilter']>();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState<Tag[]>(
        defaultEntries?.map(({ id, name }) => ({ id, text: name })) ?? [],
    );
    const [loadingState, setLoadingState] = useState<LoadingStateMap>({
        [PersonFinderFilterTypes.PERSON]: LoadingState.None,
        [PersonFinderFilterTypes.SITE]: LoadingState.None,
    });

    const dataRef = useRef<IPersonFinderContext['data']>();

    const updateActiveFilter = useCallback((filter: IPersonFinderContext['activeFilter']) => {
        setActiveFilter(filter);
    }, []);

    const updateData = useCallback((key: PersonFinderFilterTypes, newData: PersonFinderData) => {
        setData((prevState) => ({ ...prevState, [key]: newData }));
    }, []);

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

    const updateSearch = useCallback((value: string) => {
        setSearch(value);
    }, []);

    const loadMore = useCallback(
        (key: PersonFinderFilterTypes) => {
            updateLoadingState(key, LoadingState.Pending);

            const current = data?.[key];

            if (!current) {
                updateLoadingState(key, LoadingState.Error);

                return;
            }

            if (
                relationMode === RelationMode.SITE &&
                key === PersonFinderFilterTypes.PERSON &&
                search === ''
            ) {
                void getPagedUsersByGroups([{ groupId: -1 }], {
                    skip: current.skip,
                    take: PAGE_SIZE,
                })
                    .then((result: GetUsersByGroupsResult) => {
                        const { users, count } = result;

                        if (users.length > 0) {
                            appendData(key, {
                                entries: users,
                                searchString: '',
                                skip: current.skip + users.length,
                                count,
                            });
                        }
                    })
                    .finally(() => {
                        updateLoadingState(key, LoadingState.Success);
                    });

                return;
            }

            void loadData({
                searchString: search ?? '',
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
        [appendData, data, getPagedUsersByGroups, relationMode, search, updateLoadingState],
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
    const searchLocalRef = useRef<() => void>(() => {});
    const searchDataRef = useRef<({ filter }: { filter: PersonFinderFilterTypes[] }) => void>(
        () => {},
    );

    const throttledRequest = useRef<ThrottledFunction<() => void>>(
        throttle(
            async () => {
                const args = latestArgsRef.current;

                if (!args) return;

                const { search: searchString, filter } = args;
                const requestTimestamp = Date.now();

                filter.forEach((key) => {
                    updateLoadingState(key, LoadingState.Pending);
                });

                const result = await loadData({
                    searchString,
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
                                        .includes(searchString.toLowerCase()) ||
                                    f.lastName?.toLowerCase().includes(searchString.toLowerCase()),
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
    );

    const searchData = useCallback(
        ({ filter }: { filter: PersonFinderFilterTypes[] }) => {
            const tmpData = dataRef.current;

            filter.forEach((key) => {
                updateLoadingState(key, LoadingState.Pending);

                if (tmpData && tmpData[key]) {
                    // Add all Types that are not searched by a request
                    const uacEntries = tmpData[key].entries as UACEntry[];

                    const filteredEntries = uacEntries.filter(({ name }) =>
                        name.toLowerCase().includes(search.toLowerCase()),
                    );

                    updateData(key, {
                        entries: filteredEntries,
                        searchString: search,
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
        [search, updateData, updateLoadingState],
    );

    const searchLocal = useCallback(() => {
        if (search.length < 3) {
            return;
        }

        updateLoadingState(PersonFinderFilterTypes.PERSON, LoadingState.Pending);

        const searchedUsers: PersonEntry[] = [];

        const entriesToSearch = entries ?? uacUsers;

        entriesToSearch?.forEach((entry) => {
            if (
                entry.firstName?.toLowerCase().includes(search.toLowerCase()) ||
                entry.lastName?.toLowerCase().includes(search.toLowerCase()) ||
                [entry.firstName, entry.lastName]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()
                    .trim()
                    .includes(search.toLowerCase().trim()) ||
                entry.id.toLowerCase().includes(search.toLowerCase())
            ) {
                searchedUsers.push(entry);
            }
        });

        updateData(PersonFinderFilterTypes.PERSON, {
            entries: searchedUsers,
            searchString: search,
            count: searchedUsers.length,
            skip: searchedUsers.length,
        });

        updateLoadingState(
            PersonFinderFilterTypes.PERSON,
            searchedUsers.length === 0 ? LoadingState.Error : LoadingState.Success,
        );
    }, [entries, search, uacUsers, updateData, updateLoadingState]);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(() => {
        searchLocalRef.current = searchLocal;
    }, [searchLocal]);

    useEffect(() => {
        searchDataRef.current = searchData;
    }, [searchData]);

    useEffect(() => {
        if (!search) return;

        const active = activeFilter && activeFilter.length > 0 ? activeFilter : filterTypes;
        const currentData = dataRef.current;

        if (uacFilter || entries) {
            searchLocalRef.current();
        } else if (active?.includes(PersonFinderFilterTypes.UAC)) {
            searchDataRef.current({ filter: [PersonFinderFilterTypes.UAC] });
        } else {
            // Only load filters that don't have data for this search yet
            const filtersToLoad = active.filter((filter) => {
                const filterData = currentData?.[filter];
                return !filterData || filterData.searchString !== search;
            });

            // If we have filters to load, use them; otherwise use all active filters
            const filterList = filtersToLoad.length > 0 ? filtersToLoad : active;

            latestArgsRef.current = { search, filter: filterList };

            throttledRequest.current();
        }
    }, [search, uacFilter, entries]);

    // Handle filter changes - load missing data for newly selected filters
    useEffect(() => {
        if (!search) return;

        const active = activeFilter && activeFilter.length > 0 ? activeFilter : filterTypes;
        const currentData = dataRef.current;

        // Check which filters need to be loaded (don't have data for current search)
        const missingFilters = active.filter((filter) => {
            const filterData = currentData?.[filter];
            // If no data or data is from a different search, we need to load it
            return !filterData || filterData.searchString !== search;
        });

        if (missingFilters.length === 0) return;
        if (uacFilter || entries) return;
        if (active?.includes(PersonFinderFilterTypes.UAC)) return;

        // Load only the missing filters
        latestArgsRef.current = { search, filter: missingFilters };
        throttledRequest.current();
    }, [activeFilter, search, uacFilter, entries, filterTypes]);

    useEffect(
        () => () => {
            throttledRequest.current?.cancel();
        },
        [],
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
            void getPagedUsersByGroups([{ groupId: -1 }], { skip: 0, take: PAGE_SIZE }).then(
                (result: GetUsersByGroupsResult) => {
                    const { users, count } = result;

                    setData({
                        person: {
                            entries: users,
                            searchString: '',
                            skip: users.length,
                            count,
                        },
                    });
                },
            );
        }

        if (uacFilter) {
            void getPagedUsersByGroups(uacFilter).then((result: GetUsersByGroupsResult) => {
                const { users } = result;

                setUacUsers(users);
            });

            return;
        }

        if (filterTypes.includes(PersonFinderFilterTypes.UAC) && search === '') {
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
            search === ''
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
    }, [
        entries,
        filterTypes,
        friends,
        friendsPriority,
        getPagedUsersByGroups,
        relationMode,
        search,
        uacFilter,
    ]);

    const providerValue = useMemo<IPersonFinderContext>(
        () => ({
            data: filterDataByKeys(data, activeFilter, {
                excludedEntryIds,
                shouldShowOwnUser: uacFilter ? false : shouldShowOwnUser,
            }),
            updateData,
            activeFilter,
            updateActiveFilter,
            friends,
            addFriend,
            removeFriend,
            search,
            updateSearch,
            loadMore,
            loadingState,
            updateLoadingState,
            setTags,
            tags,
            relationMode,
        }),
        [
            activeFilter,
            addFriend,
            data,
            excludedEntryIds,
            friends,
            loadMore,
            loadingState,
            removeFriend,
            search,
            shouldShowOwnUser,
            tags,
            uacFilter,
            updateActiveFilter,
            updateData,
            updateLoadingState,
            updateSearch,
            relationMode,
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
