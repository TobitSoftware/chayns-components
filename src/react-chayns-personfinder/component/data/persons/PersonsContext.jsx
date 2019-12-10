import React, {
    createContext, useEffect, useReducer, useCallback, useContext,
} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { reducer as PersonsReducer, initialState } from './PersonsReducer';
import {
    fetchFriends,
    fetchPersons,
    fetchSites,
    setFriend as setFriendApi,
} from './PersonsApi';
import {
    convertFriend, convertFriends, convertPersons, convertSites,
} from './PersonsConverter';

const ObjectMapping = {
    groups: [
        { key: 'friends', lang: { de: 'Freunde', en: 'friends' }, show: value => !value },
        { key: 'personsRelated', lang: { de: 'Personen', en: 'persons' } },
        { key: 'sites', lang: { de: 'Sites', en: 'friends' } },
        { key: 'personsUnrelated', lang: { de: 'Weitere Personen', en: 'further friends' } },
    ],
    showName: 'name',
    identifier: 'id',
    search: ['name'],
    relations: 'relations',
    imageUrl: 'imageUrl',
};

const DefaultDataContext = createContext({
    ...initialState,
    dispatch: () => console.warn('dispatch: no context provided'),
    onChange: () => console.warn('onChange: no context provided'),
    onLoadMore: () => console.warn('onLoadMore: no context provided'),
    setFriend: () => console.warn('setFriend: no context provided'),
    isFriend: () => console.warn('isFriend: no context provided'),
});

const DefaultStateProvider = ({
    children,
    take,
    enablePersons,
    enableSites,
    enableFriends,
}) => {
    const [state, dispatch] = useReducer(PersonsReducer, initialState);
    const skipPersons = state.data.personsUnrelated.length + state.data.personsRelated.length;
    const skipSites = state.data.sites.length;

    useEffect(() => {
        if (!enableFriends) return;

        (async () => {
            dispatch({ type: 'REQUEST_FRIENDS', showWaitCursor: true, clear: true });
            const users = await fetchFriends();
            if (users) {
                dispatch({
                    type: 'RECEIVE_FRIENDS',
                    data: convertFriends(users),
                    hasMore: false,
                });
            }
        })();
    }, [enableFriends]);

    const onChange = useCallback(debounce(async (value) => {
        if (value.length < 3) return;
        dispatch({
            type: 'REQUEST_PERSONS',
            showWaitCursor: { personsRelated: true, personsUnrelated: false },
            clear: true,
        });
        dispatch({
            type: 'REQUEST_SITES',
            showWaitCursor: true,
            clear: true,
        });
        const [persons, sites] = await Promise.all([
            enablePersons && fetchPersons(value, 0, take),
            enableSites && fetchSites(value, 0, take),
        ]);
        const convertedPersons = persons ? convertPersons(persons) : { personsRelated: [], personsUnrelated: [] };
        dispatch({
            type: 'RECEIVE_PERSONS',
            data: convertedPersons,
            hasMore: { personsRelated: convertedPersons.personsRelated.length === take, personsUnrelated: persons.length === take },
        });
        dispatch({
            type: 'RECEIVE_SITES',
            data: sites ? convertSites(sites) : [],
            hasMore: sites.length === take,
        });
    }, 500), [take]);

    const loadMorePersons = useCallback(async (value) => {
        if (value.length < 3 || !enablePersons) return;

        dispatch({
            type: 'REQUEST_PERSONS',
            showWaitCursor: {
                personsRelated: state.hasMore.personsRelated,
                personsUnrelated: !state.hasMore.personsRelated,
            },
        });

        const persons = await fetchPersons(value, skipPersons, take);
        const convertedPersons = convertPersons(persons);

        dispatch({
            type: 'RECEIVE_PERSONS',
            data: convertedPersons,
            hasMore: { personsRelated: convertedPersons.personsRelated.length === take, personsUnrelated: persons.length === take },
        });
    }, [skipPersons, take, enablePersons]);

    const loadMoreSites = useCallback(async (value) => {
        if (value.length < 3 || !enableSites) return;

        dispatch({
            type: 'REQUEST_SITES',
            showWaitCursor: true,
        });

        const sites = await fetchSites(value, skipSites, take);

        dispatch({
            type: 'RECEIVE_SITES',
            data: convertSites(sites),
            hasMore: sites.length === take,
        });
    }, [skipSites, take, enableSites]);

    const onLoadMore = useCallback(async (type, value) => {
        const promises = [];
        if (!type || type === 'PERSON') promises.push(loadMorePersons(value));
        if (!type || type === 'LOCATION') promises.push(loadMoreSites(value));
        await Promise.all(promises);
    }, [loadMorePersons, loadMoreSites]);

    const setFriend = useCallback(async (personId, name, friend = true) => {
        const success = await setFriendApi(personId, friend);
        if (success) {
            dispatch({
                type: friend ? 'ADD_FRIEND' : 'REMOVE_FRIEND',
                data: convertFriend({
                    personId,
                    fullName: name,
                }),
            });
        } else {
            // TODO: error handling
        }
    }, []);

    return (
        <DefaultDataContext.Provider
            value={{
                ...state,
                data: {
                    ...state.data,
                    friends: enableFriends ? state.data.friends : [],
                },
                autoLoading: !enableSites && enablePersons,
                dispatch,
                onLoadMore,
                onChange,
                setFriend,
                isFriend: personId => state.data.friends.findIndex(person => person.personId === personId) > -1,
            }}
        >
            {children}
        </DefaultDataContext.Provider>
    );
};

DefaultStateProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    take: PropTypes.number,
    enablePersons: PropTypes.bool,
    enableSites: PropTypes.bool,
    enableFriends: PropTypes.bool,
};

DefaultStateProvider.defaultProps = {
    children: null,
    take: 20,
    enablePersons: true,
    enableSites: false,
    enableFriends: true,
};

export default {
    Consumer: DefaultDataContext.Consumer,
    Provider: DefaultStateProvider,
    ObjectMapping,
};

export const useStateValue = () => useContext(DefaultDataContext);
