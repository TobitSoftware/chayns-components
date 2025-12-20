import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const ProgressBarDeterminate = ({ value, className }) => (
    <div className={clsx('cc__progress-bar__track', className)}>
        <div
            className="cc__progress-bar__indicator"
            style={{ width: `${value}%` }}
        />
    </div>
);

ProgressBarDeterminate.propTypes = {
    value: PropTypes.number.isRequired,
    className: PropTypes.string,
};

ProgressBarDeterminate.displayName = 'ProgressBarDeterminate';

export default ProgressBarDeterminate;
