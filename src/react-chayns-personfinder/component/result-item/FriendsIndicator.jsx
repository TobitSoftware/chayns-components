import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { faStar } from '@fortawesome/free-regular-svg-icons/faStar';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons/faStar';

import Icon from '../../../react-chayns-icon/component/Icon';
import { COLOR_004, COLOR_YELLOW_3 } from '../../../constants/colors';
import { useStateValue } from '../data/persons/PersonsContext';

const FriendsIndicator = ({ personId, name }) => {
    const { isFriend, setFriend } = useStateValue();

    const handleClick = useCallback((event) => {
        event.stopPropagation();

        setFriend(personId, name, !isFriend(personId));
    }, [personId, isFriend, setFriend]);

    return (
        <div className="friends">
            <Icon
                icon={isFriend(personId) ? faStarSolid : faStar}
                onClick={handleClick}
                className={isFriend(personId) ? COLOR_YELLOW_3 : COLOR_004}
            />
        </div>
    );
};

FriendsIndicator.propTypes = {
    personId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default FriendsIndicator;
