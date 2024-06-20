/**
 * @component
 */

import classnames from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import AutoProgressBar from './AutoProgressBar';
import { isNumber } from '../../utils/is';

/**
 * An animated progress bar that can show an actions progress or an
 * indeterminate state like a loading spinner.
 */
const ProgressBar = ({ children = null, value, ready = false }) => {
    const className = useMemo(
        () =>
            classnames('cc__progress-bar', {
                'cc__progress-bar--determinate': isNumber(value),
                'cc__progress-bar--indeterminate': isNumber(value),
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

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
