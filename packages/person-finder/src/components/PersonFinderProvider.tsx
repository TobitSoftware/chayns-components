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
    ThrottledFunction,
    UACEntry,
} from '../types/personFinder';
import { getFriends } from '../api/friends/get';
import { postFriends } from '../api/friends/post';
import { deleteFriends } from '../api/friends/delete';
import { filterDataByKeys, loadData } from '../utils/personFinder';
import { Tag } from '@chayns-components/core/lib/types/types/tagInput';
import { getUACGroups } from '../utils/uac';

const THROTTLE_INTERVAL = 500;

interface IPersonFinderContext {
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
};

const PersonFinderProvider: FC<PersonFinderProviderProps> = ({
    children,
    friendsPriority,
    filterTypes,
    defaultEntries,
    excludedEntryIds,
    shouldShowOwnUser = false,
}) => {
    const [data, setData] = useState<IPersonFinderContext['data']>();
    const [friends, setFriends] = useState<PersonEntry[]>();
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

            void loadData({
                searchString: search ?? '',
                filter: [key],
                skipMap: { [key]: current.skip },
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
        [updateLoadingState, data, search, appendData],
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

                const { search: searchString, filter } = args;
                const requestTimestamp = Date.now();

                filter.forEach((key) => {
                    updateLoadingState(key, LoadingState.Pending);
                });

                const result = await loadData({
                    searchString,
                    filter,
                    skipMap: {},
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
                    const entries = tmpData[key].entries as UACEntry[];

                    const filteredEntries = entries.filter(({ name }) =>
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

    useEffect(() => {
        if (!search) return;

        const active = activeFilter ?? filterTypes;

        if (active?.includes(PersonFinderFilterTypes.UAC)) {
            searchData({ filter: [PersonFinderFilterTypes.UAC] });
        } else {
            latestArgsRef.current = { search, filter: active };

            throttledRequest();
        }
    }, [
        filterTypes,
        search,
        activeFilter,
        friends,
        friendsPriority,
        updateData,
        updateLoadingState,
        throttledRequest,
        searchData,
    ]);

    useEffect(
        () => () => {
            throttledRequest.cancel();
        },
        [throttledRequest],
    );

    // load initial data
    useEffect(() => {
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
    }, [filterTypes, friends, friendsPriority, search]);

    const providerValue = useMemo<IPersonFinderContext>(
        () => ({
            data: filterDataByKeys(data, activeFilter, { excludedEntryIds, shouldShowOwnUser }),
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
            updateActiveFilter,
            updateData,
            updateLoadingState,
            updateSearch,
        ],
    );

    return (
        <PersonFinderContext.Provider value={providerValue}>
            {children}
        </PersonFinderContext.Provider>
    );
};

PersonFinderProvider.displayName = 'PersonFinderProvider';

export default PersonFinderProvider;
