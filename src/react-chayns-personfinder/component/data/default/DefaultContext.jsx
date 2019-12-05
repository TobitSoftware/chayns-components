import React, { createContext, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { reducer as DefaultReducer, initialState } from './DefaultReducer';
import { fetchUsers } from './DefaultApi';

const ObjectMapping = {
    showName: 'displayName',
    identifier: 'email',
    search: ['email', 'displayName', 'shortHand'],
    imageUrl: 'imageUrl',
};

const DefaultDataContext = createContext({
    value: null,
});

const DefaultStateProvider = ({ children, take }) => {
    const [data, dispatch] = useReducer(DefaultReducer, initialState);

    const onLoadMore = useCallback(async (value, skip) => {
        dispatch({ type: 'REQUEST_DATA', showWaitCursor: true });
        const users = await fetchUsers(value, skip, take);
        if (users) {
            dispatch({
                type: 'RECEIVE_DATA',
                data: users,
                hasMore: users.length >= take,
            });
        }
    }, []);

    const onChange = useCallback(
        debounce(async (value) => {
            dispatch({ type: 'REQUEST_DATA', showWaitCursor: true, clear: true });
            const users = await fetchUsers(value, 0, take);
            if (users) {
                dispatch({
                    type: 'RECEIVE_DATA',
                    data: users,
                    value,
                    hasMore: users.length >= take,
                });
            }
        }, 400),
        [],
    );

    return (
        <DefaultDataContext.Provider
            value={{
                ...data,
                dispatch,
                onLoadMore,
                onChange,
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
