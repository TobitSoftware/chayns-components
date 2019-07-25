import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarIndeterminate = ({ children }) => {
    return (
        <div
            style={{
                borderRadius: 2,
                height: 10,
                display: 'block',
                position: 'relative',
            }}
        >
            <div
                className="chayns__background-color--108"
                style={{

                }}
            />
            <div
                className="chayns__background-color--headline"
                style={{ flex: '1 1 auto' }}
            />
        </div>
    );
};

ProgressBarIndeterminate.propTypes = {
    children: PropTypes.node,
};

ProgressBarIndeterminate.defaultProps = {
    children: null,
};

export default ProgressBarIndeterminate;
