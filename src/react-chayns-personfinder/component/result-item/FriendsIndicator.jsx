import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../../react-chayns-icon/component/Icon';
import { useStateValue } from '../data/persons/PersonsContext';

const FriendsIndicator = ({ personId, userId, name }) => {
    const { isFriend, setFriend } = useStateValue();

    const handleClick = (event) => {
        event.stopPropagation();

        setFriend(personId, userId, name, !isFriend(personId));
    };

    return (
        <div className="friends">
            <Icon
                icon={isFriend(personId) ? 'fas fa-star' : 'far fa-star'}
                onClick={handleClick}
                className={
                    isFriend(personId)
                        ? 'chayns__color--yellow-3i'
                        : 'chayns__color--004i'
                }
            />
        </div>
    );
};

FriendsIndicator.propTypes = {
    personId: PropTypes.string.isRequired,
    userId: PropTypes.number,
    name: PropTypes.string.isRequired,
};

FriendsIndicator.defaultProps = {
    userId: null,
};

FriendsIndicator.displayName = 'FriendsIndicator';

export default FriendsIndicator;
