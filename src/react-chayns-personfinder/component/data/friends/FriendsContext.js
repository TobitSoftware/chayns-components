import React from 'react';

const FriendsContext = React.createContext({
    value: null,
    isFriend: () => {},
});

export default FriendsContext;
