import React from 'react';
import SmallWaitCursor from '../../react-chayns-smallwaitcursor/component/SmallWaitCursor';

const WaitCursor = () => {
    return (
        <div
            className="cc__person-finder__wait-cursor"
            style={{
                textAlign: 'center',
                padding: '5px 5px 0px 5px',
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

export default WaitCursor;
