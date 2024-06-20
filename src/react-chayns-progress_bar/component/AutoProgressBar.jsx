import React from 'react';
import PropTypes from 'prop-types';
import ProgressBarDeterminate from './ProgressBarDeterminate';
import ProgressBarIndeterminate from './ProgressBarIndeterminate';
import { isNumber } from '../../utils/is';

const AutoProgressBar = ({ value }) => {
    if (isNumber(value)) {
        return <ProgressBarDeterminate value={value} />;
    }

    return <ProgressBarIndeterminate />;
};

AutoProgressBar.propTypes = {
    value: PropTypes.number,
};

AutoProgressBar.displayName = 'AutoProgressBar';

export default AutoProgressBar;
