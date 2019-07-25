import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarIndeterminate = () => {
    return (
        <div
            className="cc__progress-bar__track chayns__background-color--headline"
        >
            <div
                className="cc__progress-bar__indicator chayns__background-color--108"
            />
        </div>
    );
};

ProgressBarIndeterminate.propTypes = {
};

ProgressBarIndeterminate.defaultProps = {
};

export default ProgressBarIndeterminate;
