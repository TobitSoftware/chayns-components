import React from 'react';
import PropTypes from 'prop-types';
import ProgressBarDeterminate from './ProgressBarDeterminate';
import ProgressBarIndeterminate from './ProgressBarIndeterminate';
import { isNumber } from '../../utils/is';

const AutoProgressBar = ({ value, className }) => {
    if (isNumber(value)) {
        return <ProgressBarDeterminate value={value} className={className} />;
    }

    return <ProgressBarIndeterminate className={className} />;
};

AutoProgressBar.propTypes = {
    value: PropTypes.number,
    className: PropTypes.string,
};

AutoProgressBar.displayName = 'AutoProgressBar';

export default AutoProgressBar;
