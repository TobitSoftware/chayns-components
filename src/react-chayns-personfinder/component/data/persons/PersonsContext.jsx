import React, {
    createContext, useEffect, useReducer, useCallback,
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
import { convertFriends, convertPersons, convertSites } from './PersonsConverter';

const ObjectMapping = {
    groups: ['friends', 'personsRelated', 'sites', 'personsUnrelated'],
    showName: 'name',
    identifier: 'id',
    search: ['name'],
    imageUrl: 'imageUrl',
};

const DefaultDataContext = createContext({
    value: null,
});

const DefaultStateProvider = ({ children, take }) => {
    const [data, dispatch] = useReducer(PersonsReducer, initialState);
    const skipPersons = data.data.personsUnrelated.length + data.data.personsRelated.length;
    const skipSites = data.data.sites.length;

    useEffect(() => {
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
    }, []);

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

    const setFriend = useCallback(async (personId, friend = true) => {
        const success = await setFriendApi(personId, friend);
        if (success) {
            dispatch({
                type: friend ? 'ADD_FRIEND' : 'REMOVE_FRIEND',
                personId,
            });
        } else {
            // TODO: error handling
        }
    }, []);

    return (
        <DefaultDataContext.Provider
            value={{
                ...data,
                dispatch,
                onLoadMore,
                onChange,
                setFriend,
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
