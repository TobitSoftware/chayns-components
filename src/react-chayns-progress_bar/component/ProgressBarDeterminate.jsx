import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarDeterminate = ({ children, value }) => {
    return (
        <div
            className="cc__progress-bar__track"
            style={{ borderRadius: 2, height: 10, display: 'flex' }}
        >
            <div
                className="chayns__background-color--108"
                style={{ flexBasis: `${value}%`, transition: 'flex-basis .3s' }}
            />
            <div
                className="chayns__background-color--headline"
                style={{ flex: '1 1 auto' }}
            />
        </div>
    );
};

ProgressBarDeterminate.propTypes = {
    children: PropTypes.node,
    value: PropTypes.number.isRequired,
};

ProgressBarDeterminate.defaultProps = {
    children: null,
};

export default ProgressBarDeterminate;
