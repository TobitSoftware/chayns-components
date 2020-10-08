import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import AutoProgressBar from './AutoProgressBar';

const ProgressBar = ({ children, value, ready }) => {
    const className = useMemo(
        () =>
            classnames('cc__progress-bar', {
                'cc__progress-bar--determinate': chayns.utils.isNumber(value),
                'cc__progress-bar--indeterminate': !chayns.utils.isNumber(
                    value
                ),
            }),
        [value]
    );

    return (
        <div className={className}>
            <CSSTransition
                timeout={300}
                classNames="cc__progress-bar--animation-1"
                in={!ready}
                unmountOnExit
            >
                <AutoProgressBar value={value} />
            </CSSTransition>
            <CSSTransition
                timeout={300}
                classNames="cc__progress-bar--animation-2"
                in={ready}
            >
                <div className="cc__progress-bar__text">{children}</div>
            </CSSTransition>
        </div>
    );
};

ProgressBar.propTypes = {
    value: PropTypes.number,
    children: PropTypes.node,
    ready: PropTypes.bool,
};

ProgressBar.defaultProps = {
    value: null,
    children: null,
    ready: false,
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
