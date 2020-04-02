import React from 'react';
import PropTypes from 'prop-types';
import SmallWaitCursor from '../../react-chayns-smallwaitcursor/component/SmallWaitCursor';

const WaitCursor = ({ style }) => (
    <div
        className="cc__person-finder__wait-cursor"
        style={{
            textAlign: 'center',
            padding: '5px 5px 0px 5px',
            ...style,
        }}
    >
        <SmallWaitCursor
            showBackground={false}
            show
            inline
        />
    </div>
);

WaitCursor.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
};

WaitCursor.defaultProps = {
    style: null,
};

WaitCursor.displayName = 'WaitCursor';

export default WaitCursor;
