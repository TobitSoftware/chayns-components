import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ProgressBarDeterminate from './ProgressBarDeterminate';
import ProgressBarIndeterminate from './ProgressBarIndeterminate';

const ProgressBar = ({ children, value }) => {
    return (
        <div
            className={classnames('cc__progress-bar', {
                'cc__progress-bar--determinate': chayns.utils.isNumber(value),
                'cc__progress-bar--indeterminate': !chayns.utils.isNumber(value),
            })}
        >
            {chayns.utils.isNumber(value) ? (<ProgressBarDeterminate value={value} />) : (<ProgressBarIndeterminate />)}
            <div
                className="chayns__color--headline"
                style={{ fontSize: '85%' }}
            >
                {children}
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    value: PropTypes.number,
    children: PropTypes.node,
};

ProgressBar.defaultProps = {
    value: null,
    children: null,
};

export default ProgressBar;
