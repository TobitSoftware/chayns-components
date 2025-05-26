import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    PersonEntry,
    PersonFinderData,
    PersonFinderFilterTypes,
    Priority,
} from '../types/personFinder';
import { getFriends } from '../api/friends/get';
import { postFriends } from '../api/friends/post';
import { deleteFriends } from '../api/friends/delete';
import { filterDataByKeys, loadData } from '../utils/personFinder';

const ALL_FILTERS: PersonFinderFilterTypes[] = [
    PersonFinderFilterTypes.PERSON,
    PersonFinderFilterTypes.SITE,
];

interface IPersonFinderContext {
    // Data
    data?: { [key: string]: PersonFinderData };
    updateData?: (key: PersonFinderFilterTypes, personFinderData: PersonFinderData) => void;

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

    loadMore?: (key: PersonFinderFilterTypes) => void;
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

    const latestRequestRef = useRef<number>(0);

    const updateActiveFilter = useCallback((filter: IPersonFinderContext['activeFilter']) => {
        setActiveFilter(filter);
    }, []);

    const updateData = useCallback((key: PersonFinderFilterTypes, newData: PersonFinderData) => {
        setData((prevState) => ({ ...prevState, [key]: newData }));
    }, []);

    const updateSearch = useCallback((value: string) => {
        setSearch(value);
    }, []);

    const loadMore = useCallback(
        (key: PersonFinderFilterTypes) => {
            const current = data?.[key];

            if (!current) return;

            void loadData({
                searchString: search ?? '',
                filter: [key],
                skipMap: { [key]: current.skip + current.entries.length },
            }).then((result) => {
                const newData = result?.[key];

                if (newData) {
                    updateData(key, newData);
                }
            });
        },
        [data, search, updateData],
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
        const handler = setTimeout(() => {
            if (!search) return;

            const requestTimestamp = Date.now();

            void (async () => {
                const result = await loadData({
                    searchString: search,
                    filter: activeFilter ?? ALL_FILTERS,
                    skipMap: {},
                });

                if (result && requestTimestamp > latestRequestRef.current) {
                    Object.entries(result).forEach(([key, value]) => {
                        updateData(key as PersonFinderFilterTypes, value);
                    });

                    latestRequestRef.current = requestTimestamp;
                }
            })();
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search, activeFilter, updateData]);

    // load initial data
    useEffect(() => {
        if (friendsPriority === Priority.HIGH && friends) {
            setData({
                person: {
                    entries: friends,
                    searchString: '',
                    skip: friends.length,
                    count: friends.length,
                },
            });
        }
    }, [friends, friendsPriority]);

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
        }),
        [
            activeFilter,
            addFriend,
            data,
            friends,
            removeFriend,
            search,
            updateActiveFilter,
            updateData,
            updateSearch,
            loadMore,
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
