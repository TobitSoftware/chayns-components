export const initialState = {
    data: [],
    showWaitCursor: false,
    isLoading: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_DATA':
            return {
                ...state,
                data: action.clear ? [] : state.data,
                showWaitCursor: !!action.showWaitCursor,
                isLoading: true,
            };
        case 'RECEIVE_DATA':
            return {
                ...state,
                data: [...state.data, ...action.data],
                showWaitCursor: false,
                isLoading: false,
                hasMore: action.hasMore,
            };
        default:
            return state;
    }
};
