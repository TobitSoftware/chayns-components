import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer as DefaultReducer, initialState } from './UacGroupReducer';
import { fetchGroups } from './UacGroupApi';

const ObjectMapping = {
    showName: 'showName',
    identifier: 'id',
    search: ['showName', 'name'],
    imageUrl: null,
};

const DefaultDataContext = createContext({
    value: null,
});

const DefaultStateProvider = ({ children }) => {
    const [data, dispatch] = useReducer(DefaultReducer, initialState);

    useEffect(() => {
        (async () => {
            dispatch({ type: 'REQUEST_DATA', showWaitCursor: true, clear: true });
            const users = await fetchGroups();
            if (users) {
                dispatch({
                    type: 'RECEIVE_DATA',
                    data: users,
                    hasMore: false,
                });
            }
        })();
    }, []);

    return (
        <DefaultDataContext.Provider
            value={{
                data,
                dispatch,
                onLoadMore: null,
                onChange: () => undefined,
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
};

DefaultStateProvider.defaultProps = {
    children: null,
};

export default {
    Consumer: DefaultDataContext.Consumer,
    Provider: DefaultStateProvider,
    ObjectMapping,
};
