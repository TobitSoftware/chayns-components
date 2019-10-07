import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import FriendsContext from './FriendsContext';
import FriendsData from './FriendsData';

const FriendsDataContainer = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const fetchFriends = useCallback(async (noCache = false) => {
        const fetchedFriends = await FriendsData.fetch(noCache);

        setFriends(fetchedFriends);

        return fetchedFriends;
    }, []);

    const setFriend = useCallback(async (personId, friendship) => {
        await FriendsData.setFriend(personId, friendship);

        return fetchFriends(true);
    }, [fetchFriends]);

    const friendsUpdate = useCallback((friendsList) => {
        setFriends(friendsList);
    }, [setFriends]);

    useEffect(() => {
        FriendsData.addUpdateListener(friendsUpdate);

        return () => {
            FriendsData.removeUpdateListener(friendsUpdate);
        };
    }, [friendsUpdate]);

    return (
        <FriendsContext.Provider
            value={{
                isFriend: FriendsData.isFriend,
                friends,
                fetchFriends,
                setFriend,
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};

FriendsDataContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FriendsDataContainer;
