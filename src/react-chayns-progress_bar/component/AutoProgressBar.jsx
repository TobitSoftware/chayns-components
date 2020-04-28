import React from 'react';
import PropTypes from 'prop-types';
import ProgressBarDeterminate from './ProgressBarDeterminate';
import ProgressBarIndeterminate from './ProgressBarIndeterminate';

const AutoProgressBar = ({ value }) => {
    if (chayns.utils.isNumber(value)) {
        return <ProgressBarDeterminate value={value}/>;
    }

    return <ProgressBarIndeterminate/>;
};

AutoProgressBar.propTypes = {
    value: PropTypes.number,
};

AutoProgressBar.defaultProps = {
    value: null,
};

AutoProgressBar.displayName = 'AutoProgressBar';

export default AutoProgressBar;
