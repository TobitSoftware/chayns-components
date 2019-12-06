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
    enableSite,
    enableFriends,
}) => {
    const [data, dispatch] = useReducer(PersonsReducer, initialState);
    const skipPersons = data.data.personsUnrelated.length + data.data.personsRelated.length;
    const skipSites = data.data.sites.length;

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
            showWaitCursor: true,
            clear: true,
        });
        dispatch({
            type: 'REQUEST_SITES',
            showWaitCursor: true,
            clear: true,
        });
        const [persons, sites] = await Promise.all([
            fetchPersons(value, 0, take),
            fetchSites(value, 0, take),
        ]);
        dispatch({
            type: 'RECEIVE_PERSONS',
            data: convertPersons(persons),
            hasMore: persons.length === take,
        });
        dispatch({
            type: 'RECEIVE_SITES',
            data: convertSites(sites),
            hasMore: sites.length === take,
        });
    }, 500), [take]);

    const onLoadMore = useCallback(async (value) => {
        if (value.length < 3) return;
        dispatch({
            type: 'REQUEST_PERSONS',
            showWaitCursor: true,
        });
        dispatch({
            type: 'REQUEST_SITES',
            showWaitCursor: true,
        });

        const [persons, sites] = await Promise.all([
            fetchPersons(value, skipPersons, take),
            fetchSites(value, skipSites, take),
        ]);

        dispatch({
            type: 'RECEIVE_PERSONS',
            data: convertPersons(persons),
            hasMore: persons.length === take,
        });
        dispatch({
            type: 'RECEIVE_SITES',
            data: convertSites(sites),
            hasMore: sites.length === take,
        });
    }, [skipPersons, skipSites, take]);

    const setFriend = useCallback(async (personId, name, friend = true) => {
        const success = await setFriendApi(personId, friend);
        if (success) {
            // const user = await chayns.getUser({ personId });
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
                ...data,
                data: {
                    ...data.data,
                    friends: enableFriends ? data.data.friends : [],
                },
                dispatch,
                onLoadMore,
                onChange,
                setFriend,
                isFriend: personId => data.data.friends.findIndex(person => person.personId === personId) > -1,
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
};

DefaultStateProvider.defaultProps = {
    children: null,
    take: 20,
};

export default {
    Consumer: DefaultDataContext.Consumer,
    Provider: DefaultStateProvider,
    ObjectMapping,
};

export const useStateValue = () => useContext(DefaultDataContext);
