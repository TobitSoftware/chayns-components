import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarDeterminate = ({ value }) => (
    <div
        className="cc__progress-bar__track chayns__background-color--headline"
    >
        <div
            className="cc__progress-bar__indicator chayns__background-color--108"
            style={{ flexBasis: `${value}%` }}
        />
        <div
            className="cc__progress-bar__spacer"
        />
    </div>
);

ProgressBarDeterminate.propTypes = {
    value: PropTypes.number.isRequired,
};

ProgressBarDeterminate.defaultProps = {
};

export default ProgressBarDeterminate;
