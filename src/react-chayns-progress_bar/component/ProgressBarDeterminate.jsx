import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarDeterminate = ({ value }) => (
    <div
        className="cc__progress-bar__track"
    >
        <div
            className="cc__progress-bar__indicator"
            style={{ width: `${value}%` }}
        />
    </div>
);

ProgressBarDeterminate.propTypes = {
    value: PropTypes.number.isRequired,
};

ProgressBarDeterminate.defaultProps = {
};

export default ProgressBarDeterminate;
