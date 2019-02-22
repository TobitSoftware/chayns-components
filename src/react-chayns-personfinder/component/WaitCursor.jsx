import React from 'react';
import PropTypes from 'prop-types';
import SmallWaitCursor from '../../react-chayns-smallwaitcursor/component/SmallWaitCursor';

const WaitCursor = ({ style }) => {
    return (
        <div
            className="cc__person-finder__wait-cursor"
            style={{
                textAlign: 'center',
                padding: '5px 5px 0px 5px',
                ...style
            }}
        >
            <SmallWaitCursor
                showBackground={false}
                show
                inline
            />
        </div>
    );
};

WaitCursor.propTypes = {
    style: PropTypes.object,
};

WaitCursor.defaultProps = {
    style: null,
};

export default WaitCursor;
