import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import getText from '../utils/getText';
import Button from '../../react-chayns-button/component/Button';

const LoadMore = ({ onClick, type }) => {
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick(type);
        }
    }, [onClick, type]);

    return (
        <div
            className="load-more"
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px 0',
            }}
        >
            <Button
                onClick={handleClick}
            >
                {getText('LOAD_MORE')}
            </Button>
        </div>
    );
};

LoadMore.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};

export default LoadMore;
