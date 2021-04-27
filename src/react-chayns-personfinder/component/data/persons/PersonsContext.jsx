/* eslint-disable no-console */
import React, {
    createContext,
    useEffect,
    useReducer,
    useCallback,
    useContext,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { reducer as PersonsReducer, initialState } from './PersonsReducer';
import {
    fetchPersons,
    fetchUacPersons,
    fetchSites,
    fetchKnownPersons,
} from './PersonsApi';
import { fetchGroups } from '../uacGroups/UacGroupApi';
import {
    convertKnownPerson,
    convertPerson,
    convertPersons,
    convertSites,
} from './PersonsConverter';
import FriendsHelper from './FriendsHelper';

const ObjectMapping = {
    groups: [
        {
            key: 'friends',
            lang: {
                de: 'Freunde',
                en: 'friends',
            },
            roundIcons: true,
            show: (value) => !value,
        },
        {
            key: 'personsRelated',
            lang: {
                de: 'Personen',
                en: 'persons',
            },
            roundIcons: true,
            show: (value) => value && value.length >= 3,
        },
        {
            key: 'sites',
            lang: {
                de: 'Sites',
                en: 'friends',
            },
            roundIcons: false,
            show: (value) => value && value.length >= 3,
        },
        {
            key: 'personsUnrelated',
            lang: {
                de: 'Weitere Personen',
                en: 'further friends',
            },
            roundIcons: true,
            show: (value) => value && value.length >= 3,
        },
        {
            key: 'groups',
            lang: {
                de: 'Gruppen',
                en: 'groups',
            },
            filter: (inputValue) => (e) =>
                e.name &&
                e.name
                    .toLowerCase()
                    .startsWith((inputValue || '').toLowerCase()),
        },
        {
            key: 'knownPersons',
            lang: {
                de: 'Bekannte Personen',
                en: 'known persons',
            },
            roundIcons: true,
        },
    ],
    showName: 'name',
    identifier: 'id',
    search: ['fullName', 'firstName', 'lastName', 'personId'],
    relations: 'relations',
    imageUrl: 'imageUrl',
    verified: 'verificationState',
};

const PersonFinderContext = createContext({
    ...initialState,
    dispatch: () =>
        console.warn(
            '[chayns components] PersonsContext: dispatch: no context provided'
        ),
    onChange: () =>
        console.warn(
            '[chayns components] PersonsContext: onChange: no context provided'
        ),
    onLoadMore: () =>
        console.warn(
            '[chayns components] PersonsContext: onLoadMore: no context provided'
        ),
    setFriend: () =>
        console.warn(
            '[chayns components] PersonsContext: setFriend: no context provided'
        ),
    isFriend: () =>
        console.warn(
            '[chayns components] PersonsContext: isFriend: no context provided'
        ),
});

const PersonFinderStateProvider = ({
    children,
    take,
    enablePersons,
    enableSites,
    enableFriends,
    enableUacGroups,
    enableKnownPersons,
    includeOwn,
    locationId,
    uacId,
    reducerFunction,
}) => {
    const [state, dispatch] = useReducer(PersonsReducer, initialState);
    const skipPersons =
        state.data.personsUnrelated.length + state.data.personsRelated.length;
    const skipSites = state.data.sites.length;
    const skipKnownPersons = state.data.knownPersons.length;
    const knownPersonsInitialized = useRef(false);
    const uacGroupsInitialized = useRef(false);

    useEffect(() => {
        if (!enableFriends) return undefined;

        FriendsHelper.init();

        // Use event listener to update all contexts if friends change
        const friendsListener = () =>
            dispatch({
                type: 'RECEIVE_FRIENDS',
                data: [],
            });
        friendsListener(FriendsHelper.getFriendsList());
        FriendsHelper.addUpdateListener(friendsListener);

        return () => FriendsHelper.removeUpdateListener(friendsListener);
    }, [enableFriends]);

    useEffect(() => {
        (async () => {
            if (!enableUacGroups || uacGroupsInitialized.current) return;

            let groups = await fetchGroups();
            groups = groups.map(({ id, showName }) => ({
                type: 'GROUP',
                id,
                name: showName,
                imageUrl: `https://sub60.tobit.com/l/${chayns.env.site.id}?size=100`,
            }));
            dispatch({
                type: 'RECEIVE_GROUPS',
                data: groups,
            });
            uacGroupsInitialized.current = true;
        })();
    }, [enableUacGroups]);

    const loadPersons = useCallback(
        async (inputValue, clear = false) => {
            const value = inputValue.trim();
            if (value.length < 3 || !enablePersons || uacId) return;

            dispatch({
                type: 'REQUEST_PERSONS',
                showWaitCursor: {
                    personsRelated: state.hasMore.personsRelated,
                    personsUnrelated: !state.hasMore.personsRelated,
                },
                clear,
            });

            const persons = await fetchPersons(value, skipPersons, take);
            const convertedPersons = convertPersons(persons);
            if (value.match(/^[0-9]{3}-[0-9]{5}$/g)) {
                const user = convertPerson(
                    await chayns.getUser({ personId: value })
                );
                if (user.id !== null) {
                    convertedPersons.personsRelated = [
                        user,
                        ...convertedPersons.personsRelated,
                    ];
                }
            }
            const hasMore = {
                personsRelated: convertedPersons.personsRelated.length === take,
                personsUnrelated: persons.length === take,
            };

            // not optimal performance-wise but reduces redundant code
            const [ownUser] = convertPersons([
                {
                    type: 'PERSON',
                    name: chayns.env.user.fullName,
                    id: chayns.env.user.personId,
                    fullName: chayns.env.user.fullName,
                    firstName: chayns.env.user.firstName,
                    lastName: chayns.env.user.lastName,
                    personId: chayns.env.user.personId,
                    userId: chayns.env.user.id,
                },
            ]).personsRelated;

            // prepend own user when prop is used, user is logged in and name matches
            if (
                includeOwn &&
                clear &&
                chayns.env.user.isAuthenticated &&
                ownUser.fullName &&
                ownUser.fullName.toLowerCase().startsWith(value.toLowerCase())
            ) {
                convertedPersons.personsRelated.unshift(ownUser);
            }

            dispatch({
                type: 'RECEIVE_PERSONS',
                data: convertedPersons,
                hasMore,
            });
        },
        [
            enablePersons,
            uacId,
            state.hasMore.personsRelated,
            skipPersons,
            take,
            includeOwn,
        ]
    );

    const loadUacPersons = useCallback(
        async (value, clear = false) => {
            if (value.length < 3 || !uacId) return;

            dispatch({
                type: 'REQUEST_PERSONS',
                showWaitCursor: {
                    personsRelated: state.hasMore.personsRelated,
                    personsUnrelated: !state.hasMore.personsRelated,
                },
                clear,
            });

            const persons = await fetchUacPersons(uacId, locationId)(
                value,
                skipPersons,
                take
            );
            const convertedPersons = convertPersons(persons);
            const hasMore = {
                personsRelated: false,
                personsUnrelated: false,
            };

            dispatch({
                type: 'RECEIVE_PERSONS',
                data: convertedPersons,
                hasMore,
            });
        },
        [uacId, state.hasMore.personsRelated, locationId, skipPersons, take]
    );

    const loadSites = useCallback(
        async (value, clear = false) => {
            if (value.length < 3 || !enableSites) return;

            dispatch({
                type: 'REQUEST_SITES',
                showWaitCursor: true,
                clear,
            });

            const sites = await fetchSites(value, skipSites, take);

            dispatch({
                type: 'RECEIVE_SITES',
                data: convertSites(sites),
                hasMore: sites.length === take,
            });
        },
        [skipSites, take, enableSites]
    );

    const loadKnownPersons = useCallback(
        async (value, clear = false) => {
            if (!enableKnownPersons) return;

            dispatch({
                type: 'REQUEST_KNOWN_PERSONS',
                showWaitCursor: true,
                clear,
            });

            const persons = await fetchKnownPersons(
                value,
                skipKnownPersons,
                take
            );

            dispatch({
                type: 'RECEIVE_KNOWN_PERSONS',
                data: convertKnownPerson(persons),
                hasMore: persons.length === take,
            });
        },
        [skipKnownPersons, take, enableKnownPersons]
    );

    useEffect(() => {
        if (knownPersonsInitialized.current) return;

        loadKnownPersons('');
        knownPersonsInitialized.current = true;
    }, [loadKnownPersons]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChange = useCallback(
        debounce(async (value) => {
            await Promise.all([
                loadPersons(value, true),
                loadUacPersons(value, true),
                loadSites(value, true),
                loadKnownPersons(value, true),
            ]);
        }, 500),
        [
            take,
            enableKnownPersons,
            enableFriends,
            enablePersons,
            enableSites,
            enableUacGroups,
            enableKnownPersons,
        ]
    );

    const onLoadMore = useCallback(
        async (type, value) => {
            const promises = [];
            if (!type || (type !== 'sites' && type !== 'knownPersons'))
                promises.push(loadPersons(value));
            if (!type || type === 'sites') promises.push(loadSites(value));
            if (
                !type ||
                type === 'knownPersons' ||
                (!enablePersons && type === 'default')
            )
                promises.push(loadKnownPersons(value));
            await Promise.all(promises);
        },
        [loadPersons, loadSites, loadKnownPersons, enablePersons]
    );

    const unreducedData = {
        ...state.data,
        friends: enableFriends ? FriendsHelper.getFriendsList() : [],
    };

    const data =
        typeof reducerFunction === 'function'
            ? reducerFunction(unreducedData)
            : unreducedData;

    return (
        <PersonFinderContext.Provider
            value={{
                ...state,
                data,
                autoLoading:
                    !enableUacGroups &&
                    !enableSites &&
                    ((enablePersons && !enableKnownPersons) ||
                        (!enablePersons && enableKnownPersons)),
                dispatch,
                onLoadMore,
                onChange,
                setFriend: FriendsHelper.setFriend,
                isFriend: FriendsHelper.isFriend,
            }}
        >
            {children}
        </PersonFinderContext.Provider>
    );
};

PersonFinderStateProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    take: PropTypes.number,
    enablePersons: PropTypes.bool,
    enableSites: PropTypes.bool,
    enableFriends: PropTypes.bool,
    enableUacGroups: PropTypes.bool,
    enableKnownPersons: PropTypes.bool,
    includeOwn: PropTypes.bool,
    locationId: PropTypes.number,
    uacId: PropTypes.number,
    reducerFunction: PropTypes.func,
};

PersonFinderStateProvider.defaultProps = {
    children: null,
    take: 20,
    enablePersons: true,
    enableSites: false,
    enableFriends: true,
    enableUacGroups: false,
    enableKnownPersons: false,
    includeOwn: false,
    locationId: null,
    uacId: null,
    reducerFunction: null,
};

export default {
    Consumer: PersonFinderContext.Consumer,
    Provider: PersonFinderStateProvider,
    ObjectMapping,
    ValueConverter: convertPerson,
};

export const useStateValue = () => useContext(PersonFinderContext);
