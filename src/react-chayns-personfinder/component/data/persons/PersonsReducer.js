export const initialState = {
    data: {
        personsUnrelated: [],
        personsRelated: [],
        sites: [],
        friends: [],
        groups: [],
        knownPersons: [],
        uacPersons: [],
    },
    showWaitCursor: {
        personsRelated: false,
        sites: false,
        personsUnrelated: false,
        groups: false,
        knownPersons: false,
        uacPersons: false,
    },
    isLoading: {
        personsRelated: false,
        sites: false,
        personsUnrelated: false,
        groups: false,
        knownPersons: false,
        uacPersons: false,
    },
    hasMore: {
        personsRelated: true,
        sites: true,
        personsUnrelated: false,
        groups: false,
        knownPersons: false,
        uacPersons: false,
    },
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_PERSONS':
            return {
                ...state,
                data: action.clear
                    ? {
                          ...state.data,
                          personsRelated: [],
                          personsUnrelated: [],
                      }
                    : state.data,
                showWaitCursor: {
                    ...state.showWaitCursor,
                    ...action.showWaitCursor,
                },
                isLoading: { ...state.isLoading, ...action.isLoading },
            };
        case 'REQUEST_SITES':
            return {
                ...state,
                data: action.clear ? { ...state.data, sites: [] } : state.data,
                showWaitCursor: {
                    ...state.showWaitCursor,
                    sites: action.showWaitCursor,
                },
                isLoading: { ...state.isLoading, sites: true },
            };
        case 'REQUEST_FRIENDS': {
            return {
                ...state,
                data: action.clear
                    ? { ...state.data, friends: [] }
                    : state.data,
                showWaitCursor: {
                    ...state.showWaitCursor,
                    friends: action.showWaitCursor,
                },
                isLoading: { ...state.isLoading, friends: true },
            };
        }
        case 'REQUEST_KNOWN_PERSONS':
            return {
                ...state,
                data: action.clear
                    ? { ...state.data, knownPersons: [] }
                    : state.data,
                showWaitCursor: {
                    ...state.showWaitCursor,
                    knownPersons: action.showWaitCursor,
                },
                isLoading: { ...state.isLoading, knownPersons: true },
            };
        case 'REQUEST_UAC_PERSONS':
            return {
                ...state,
                data: action.clear
                    ? { ...state.data, uacPersons: [] }
                    : state.data,
                showWaitCursor: {
                    ...state.showWaitCursor,
                    uacPersons: action.showWaitCursor,
                },
                isLoading: { ...state.isLoading, uacPersons: true },
            };
        case 'RECEIVE_PERSONS':
            return {
                ...state,
                data: {
                    ...state.data,
                    personsRelated: [
                        ...state.data.personsRelated,
                        ...action.data.personsRelated,
                    ],
                    personsUnrelated: [
                        ...state.data.personsUnrelated,
                        ...action.data.personsUnrelated,
                    ],
                },
                showWaitCursor: {
                    ...state.showWaitCursor,
                    personsRelated: false,
                    personsUnrelated: false,
                },
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
        case 'RECEIVE_GROUPS':
            return {
                ...state,
                data: {
                    ...state.data,
                    groups: action.data,
                },
                showWaitCursor: { ...state.showWaitCursor, groups: false },
                isLoading: { ...state.isLoading, groups: false },
                hasMore: { ...state.hasMore, groups: false },
            };
        case 'RECEIVE_KNOWN_PERSONS':
            return {
                ...state,
                data: {
                    ...state.data,
                    knownPersons: [...state.data.knownPersons, ...action.data],
                },
                showWaitCursor: {
                    ...state.showWaitCursor,
                    knownPersons: false,
                },
                isLoading: { ...state.isLoading, knownPersons: false },
                hasMore: { ...state.hasMore, knownPersons: action.hasMore },
            };
        case 'RECEIVE_UAC_PERSONS':
            return {
                ...state,
                data: {
                    ...state.data,
                    uacPersons: [...state.data.uacPersons, ...action.data],
                },
                showWaitCursor: {
                    ...state.showWaitCursor,
                    uacPersons: false,
                },
                isLoading: { ...state.isLoading, uacPersons: false },
                hasMore: { ...state.hasMore, uacPersons: action.hasMore },
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
                    friends: state.data.friends.filter(
                        (friend) => friend.personId !== action.data.personId
                    ),
                },
            };
        default:
            return state;
    }
};
