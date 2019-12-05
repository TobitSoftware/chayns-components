export const initialState = {
    data: {
        personsUnrelated: [],
        personsRelated: [],
        sites: [],
        friends: [],
    },
    showWaitCursor: false,
    isLoadingPersons: false,
    isLoadingSites: false,
    isLoadingFriends: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'REQUEST_PERSONS':
        return {
            ...state,
            data: action.clear ? { ...state.data, personsRelated: [], personsUnrelated: [] } : state.data,
            showWaitCursor: action.showWaitCursor || state.showWaitCursor,
            isLoadingPersons: true,
        };
    case 'REQUEST_SITES':
        return {
            ...state,
            data: action.clear ? { ...state.data, sites: [] } : state.data,
            showWaitCursor: action.showWaitCursor || state.showWaitCursor,
            isLoadingSites: true,
        };
    case 'REQUEST_FRIENDS': {
        return {
            ...state,
            data: action.clear ? { ...state.data, friends: [] } : state.data,
            showWaitCursor: action.showWaitCursor || state.showWaitCursor,
            isLoadingFriends: true,
        };
    }
    case 'RECEIVE_PERSONS':
        return {
            ...state,
            data: {
                ...state.data,
                personsRelated: [...state.data.personsRelated, ...action.data.personsRelated],
                personsUnrelated: [...state.data.personsUnrelated, ...action.data.personsUnrelated],
            },
            showWaitCursor: false,
            isLoadingPersons: false,
            hasMore: action.hasMore,
        };
    case 'RECEIVE_SITES':
        return {
            ...state,
            data: {
                ...state.data,
                sites: [...state.data.sites, ...action.data],
            },
            showWaitCursor: false,
            isLoadingSites: false,
        };
    case 'RECEIVE_FRIENDS':
        return {
            ...state,
            data: {
                ...state.data,
                friends: [...state.data.friends, ...action.data],
            },
            showWaitCursor: false,
            isLoadingSites: false,
        };
    default:
        return state;
    }
};
