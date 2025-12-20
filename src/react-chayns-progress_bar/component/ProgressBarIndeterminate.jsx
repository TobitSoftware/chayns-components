import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

const ProgressBarIndeterminate = ({ className }) => (
    <div className={clsx('cc__progress-bar__track', className)}>
        <div className="cc__progress-bar__indicator" />
    </div>
);

ProgressBarIndeterminate.propTypes = {
    className: PropTypes.string,
};

ProgressBarIndeterminate.displayName = 'ProgressBarIndeterminate';

export default ProgressBarIndeterminate;
