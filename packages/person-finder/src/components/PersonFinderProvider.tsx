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
import {
    LoadingState,
    LoadingStateMap,
    PersonEntry,
    PersonFinderData,
    PersonFinderFilterTypes,
    Priority,
} from '../types/personFinder';
import { getFriends } from '../api/friends/get';
import { postFriends } from '../api/friends/post';
import { deleteFriends } from '../api/friends/delete';
import { filterDataByKeys, loadData } from '../utils/personFinder';
import { Tag } from '@chayns-components/core/lib/types/types/tagInput';

const ALL_FILTERS: PersonFinderFilterTypes[] = [
    PersonFinderFilterTypes.PERSON,
    PersonFinderFilterTypes.SITE,
];

const THROTTLE_INTERVAL = 300;

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

interface PersonFinderProviderProps {
    children: ReactNode;
    friendsPriority: Priority;
}

const PersonFinderProvider: FC<PersonFinderProviderProps> = ({ children, friendsPriority }) => {
    const [data, setData] = useState<IPersonFinderContext['data']>();
    const [friends, setFriends] = useState<PersonEntry[]>();
    const [activeFilter, setActiveFilter] = useState<IPersonFinderContext['activeFilter']>();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingStateMap>({
        [PersonFinderFilterTypes.PERSON]: LoadingState.None,
        [PersonFinderFilterTypes.SITE]: LoadingState.None,
    });

    const lastExecutionRef = useRef(0);
    const latestRequestRef = useRef(0);

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
                skipMap: { [key]: current.skip + current.entries.length },
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
                    })),
                );
            }
        });
    }, []);

    useEffect(() => {
        const now = Date.now();

        if (!search) return;

        if (now - lastExecutionRef.current < THROTTLE_INTERVAL) {
            return;
        }

        const requestTimestamp = now;

        lastExecutionRef.current = now;

        void (async () => {
            (activeFilter ?? ALL_FILTERS).forEach((key) => {
                updateLoadingState(key, LoadingState.Pending);
            });

            const result = await loadData({
                searchString: search,
                filter: activeFilter ?? ALL_FILTERS,
                skipMap: {},
            });

            if (result && requestTimestamp > latestRequestRef.current) {
                Object.entries(result).forEach(([key, value]) => {
                    updateData(key as PersonFinderFilterTypes, value);

                    if (value.entries.length === 0) {
                        updateLoadingState(key as PersonFinderFilterTypes, LoadingState.Error);
                    } else {
                        updateLoadingState(key as PersonFinderFilterTypes, LoadingState.Success);
                    }
                });

                latestRequestRef.current = requestTimestamp;
            }
        })();
    }, [search, activeFilter, updateData, updateLoadingState]);

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
            data: filterDataByKeys(data, activeFilter),
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
