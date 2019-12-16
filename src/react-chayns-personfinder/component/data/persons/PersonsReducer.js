export const initialState = {
    data: {
        personsUnrelated: [],
        personsRelated: [],
        sites: [],
        friends: [],
    },
    showWaitCursor: {
        personsRelated: false,
        sites: false,
        personsUnrelated: false,
    },
    isLoading: {
        personsRelated: false,
        sites: false,
        personsUnrelated: false,
    },
    hasMore: {
        personsRelated: true,
        sites: true,
        personsUnrelated: false,
    },
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'REQUEST_PERSONS':
        return {
            ...state,
            data: action.clear ? { ...state.data, personsRelated: [], personsUnrelated: [] } : state.data,
            showWaitCursor: { ...state.showWaitCursor, ...action.showWaitCursor },
            isLoading: { ...state.isLoading, ...action.isLoading },
        };
    case 'REQUEST_SITES':
        return {
            ...state,
            data: action.clear ? { ...state.data, sites: [] } : state.data,
            showWaitCursor: { ...state.showWaitCursor, sites: action.showWaitCursor },
            isLoading: { ...state.isLoading, sites: true },
        };
    case 'REQUEST_FRIENDS': {
        return {
            ...state,
            data: action.clear ? { ...state.data, friends: [] } : state.data,
            showWaitCursor: { ...state.showWaitCursor, friends: action.showWaitCursor },
            isLoading: { ...state.isLoading, friends: true },
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
            showWaitCursor: { ...state.showWaitCursor, personsRelated: false, personsUnrelated: false },
            isLoading: { ...state.isLoading, ...action.isLoading },
            hasMore: { ...state.hasMore, ...action.hasMore },
        };
    case 'RECEIVE_SITES':
        return {
            ...state,
            data: {
                ...state.data,
                sites: [...state.data.sites, ...action.data],
            },
            showWaitCursor: { ...state.showWaitCursor, sites: false },
            isLoading: { ...state.isLoading, sites: false },
            hasMore: { ...state.hasMore, sites: action.hasMore },
        };
    case 'RECEIVE_FRIENDS':
        return {
            ...state,
            data: {
                ...state.data,
                friends: [...state.data.friends, ...action.data],
            },
            showWaitCursor: { ...state.showWaitCursor, friends: false },
            isLoading: { ...state.isLoading, friends: false },
            hasMore: { ...state.hasMore, friends: false },
        };
    case 'ADD_FRIEND':
        return {
            ...state,
            data: {
                ...state.data,
                friends: [...state.data.friends, action.data],
            },
        };
    case 'REMOVE_FRIEND':
        return {
            ...state,
            data: {
                ...state.data,
                friends: state.data.friends.filter(friend => friend.personId !== action.data.personId),
            },
        };
    default:
        return state;
    }
};
