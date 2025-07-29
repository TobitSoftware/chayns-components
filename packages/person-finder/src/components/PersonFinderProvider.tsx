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
} from '../types/personFinder';
import { getFriends } from '../api/friends/get';
import { postFriends } from '../api/friends/post';
import { deleteFriends } from '../api/friends/delete';
import { filterDataByKeys, loadData } from '../utils/personFinder';
import { Tag } from '@chayns-components/core/lib/types/types/tagInput';

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
};

const PersonFinderProvider: FC<PersonFinderProviderProps> = ({
    children,
    friendsPriority,
    filterTypes,
    defaultEntries,
    excludedEntryIds,
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
    }, []);

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
                            friendIds.has(entry.id),
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
                            (entry) => !friendIds.has(entry.id),
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
        if (!search) return;

        const active = activeFilter ?? filterTypes;

        latestArgsRef.current = { search, filter: active };

        throttledRequest();
    }, [
        filterTypes,
        search,
        activeFilter,
        friends,
        friendsPriority,
        updateData,
        updateLoadingState,
        throttledRequest,
    ]);

    useEffect(
        () => () => {
            throttledRequest.cancel();
        },
        [throttledRequest],
    );

    // load initial data
    useEffect(() => {
        if (friendsPriority === Priority.HIGH && friends && search === '') {
            setData({
                person: {
                    entries: friends,
                    searchString: '',
                    skip: friends.length,
                    count: friends.length,
                },
            });
        }
    }, [friends, friendsPriority, search]);

    const providerValue = useMemo<IPersonFinderContext>(
        () => ({
            data: filterDataByKeys(data, activeFilter, excludedEntryIds),
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
            data,
            activeFilter,
            excludedEntryIds,
            updateData,
            updateActiveFilter,
            friends,
            addFriend,
            removeFriend,
            search,
            updateSearch,
            loadMore,
            loadingState,
            updateLoadingState,
            tags,
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
