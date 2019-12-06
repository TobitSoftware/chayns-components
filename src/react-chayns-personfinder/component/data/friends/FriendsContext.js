import React from 'react';

const FriendsContext = React.createContext({
    isFriend: () => console.warn('isFriend: no context provided'),
    friends: [],
    fetchFriends: () => console.warn('fetchFriends: no context provided'),
    setFriend: () => console.warn('setFriend: no context provided'),
});

export default FriendsContext;
