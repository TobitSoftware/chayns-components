import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons/faStar';

import Icon from '../../../react-chayns-icon/component/Icon';
import FriendsContext from '../data/friends/FriendsContext';
import { COLOR_YELLOW_3 } from '../../../constants/colors';

const FriendsIndicator = ({ personId }) => {
    const { isFriend, setFriend } = useContext(FriendsContext);

    const handleClick = useCallback((event) => {
        event.stopPropagation();

        setFriend(personId, !isFriend(personId));
    }, [personId, isFriend, setFriend]);

    return (
        <div className="friends">
            <Icon
                icon={isFriend(personId) ? faStarSolid : faStar}
                onClick={handleClick}
                className={isFriend(personId) ? COLOR_YELLOW_3 : null}
            />
        </div>
    );
};

FriendsIndicator.propTypes = {
    personId: PropTypes.string.isRequired,
};

export default FriendsIndicator;
