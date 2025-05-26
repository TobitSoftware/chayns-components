import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { PersonEntry, PersonFinderData, PersonFinderFilterTypes } from '../types/personFinder';
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
}

export const PersonFinderContext = createContext<IPersonFinderContext>({
    data: undefined,
    updateData: undefined,
    friends: undefined,
    addFriend: undefined,
    removeFriend: undefined,
    activeFilter: undefined,
    updateActiveFilter: undefined,
});

PersonFinderContext.displayName = 'PersonFinderContext';

export const usePersonFinder = () => useContext(PersonFinderContext);

interface PersonFinderProviderProps {
    children: ReactNode;
}

const PersonFinderProvider: FC<PersonFinderProviderProps> = ({ children }) => {
    const [data, setData] = useState<IPersonFinderContext['data']>();
    const [friends, setFriends] = useState<PersonEntry[]>();
    const [activeFilter, setActiveFilter] = useState<IPersonFinderContext['activeFilter']>();

    const updateActiveFilter = useCallback((filter: IPersonFinderContext['activeFilter']) => {
        setActiveFilter(filter);
    }, []);

    const updateData = useCallback((key: PersonFinderFilterTypes, newData: PersonFinderData) => {
        setData((prevState) => ({ ...prevState, [key]: newData }));
    }, []);

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
        void (async () => {
            const result = await loadData({
                searchString: 'Michael',
                filter: ALL_FILTERS,
                skipMap: {},
            });

            setData(result);
        })();
    }, []);

    const providerValue = useMemo<IPersonFinderContext>(
        () => ({
            data: filterDataByKeys(data, activeFilter),
            updateData,
            activeFilter,
            updateActiveFilter,
            friends,
            addFriend,
            removeFriend,
        }),
        [activeFilter, addFriend, data, friends, removeFriend, updateActiveFilter, updateData],
    );

    return (
        <PersonFinderContext.Provider value={providerValue}>
            {children}
        </PersonFinderContext.Provider>
    );
};

PersonFinderProvider.displayName = 'PersonFinderProvider';

export default PersonFinderProvider;
