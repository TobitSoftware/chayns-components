/**
 * @component
 */

import classnames from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import AutoProgressBar from './AutoProgressBar';

/**
 * An animated progress bar that can show an actions progress or an
 * indeterminate state like a loading spinner.
 */
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
    /**
     * The progress in percent (`0` - `100`).
     */
    value: PropTypes.number,

    /**
     * A label that is shown beneath the progress bar.
     */
    children: PropTypes.node,

    /**
     * When toggled on it will hide the progress bar in an animated transition
     * and only show its children.
     */
    ready: PropTypes.bool,
};

ProgressBar.defaultProps = {
    value: null,
    children: null,
    ready: false,
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
