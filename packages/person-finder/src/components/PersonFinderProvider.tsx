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
import { PersonFinderEntry, PersonFinderFilterTypes } from '../types/personFinder';
import { getFriends } from '../api/friends/get';
import { postFriends } from '../api/friends/post';
import { deleteFriends } from '../api/friends/delete';

interface IPersonFinderContext {
    data?: { [key: string]: PersonFinderEntry[] };
    friends?: string[];
    addFriend?: (personId: string) => void;
    removeFriend?: (personId: string) => void;
    activeFilter?: PersonFinderFilterTypes[];
    updateActiveFilter?: (filter: PersonFinderFilterTypes[]) => void;
}

export const PersonFinderContext = createContext<IPersonFinderContext>({
    data: undefined,
    friends: undefined,
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
    const [friends, setFriends] = useState<string[]>();
    const [activeFilter, setActiveFilter] = useState<IPersonFinderContext['activeFilter']>();

    const updateActiveFilter = useCallback((filter: IPersonFinderContext['activeFilter']) => {
        setActiveFilter(filter);
    }, []);

    const addFriend = useCallback((personId: string) => {
        void postFriends(personId).then((wasSuccessful) => {
            if (wasSuccessful) {
                setFriends((prev) => [...(prev ?? []), personId]);
            }
        });
    }, []);

    const removeFriend = useCallback((personId: string) => {
        void deleteFriends(personId).then((wasSuccessful) => {
            if (wasSuccessful) {
                setFriends((prev) => prev?.filter((id) => id !== personId));
            }
        });
    }, []);

    useEffect(() => {
        void getFriends().then((result) => {
            if (result) {
                setFriends(result.map(({ personId }) => personId));
            }
        });
    }, []);

    useEffect(() => {
        setData({
            person: [
                {
                    id: 'MIC-HAEL1',
                    firstName: 'Michael',
                    lastName: 'Gesenhues',
                    commonSites: 35,
                },
                { id: 'JAN-NIK96', firstName: 'Jannik', lastName: 'Weise', commonSites: 35 },
                {
                    id: '131-31077',
                    firstName: 'Jegor',
                    lastName: 'Schweizer',
                    commonSites: 35,
                },
                { id: '134-19756', firstName: 'Gizem', lastName: 'Türkmen', commonSites: 35 },
            ],
            site: [
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                { id: '70261-16480', url: 'https://artwork.chayns.site/', name: 'Artwork' },
                {
                    id: '70261-16480',
                    url: 'https://artwork.chayns.site/',
                    name: 'Artwork',
                },
            ],
        });
    }, []);

    const providerValue = useMemo<IPersonFinderContext>(
        () => ({
            data,
            activeFilter,
            updateActiveFilter,
            friends,
            addFriend,
            removeFriend,
        }),
        [activeFilter, addFriend, data, friends, removeFriend, updateActiveFilter],
    );

    return (
        <PersonFinderContext.Provider value={providerValue}>
            {children}
        </PersonFinderContext.Provider>
    );
};

PersonFinderProvider.displayName = 'PersonFinderProvider';

export default PersonFinderProvider;
