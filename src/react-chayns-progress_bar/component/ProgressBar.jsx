/**
 * @component
 */

import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useTransitionState } from 'react-transition-state';
import { mapStatusToClass } from '../../utils/mapStatusToClass';
import AutoProgressBar from './AutoProgressBar';
import { isNumber } from '../../utils/is';

/**
 * An animated progress bar that can show an actions progress or an
 * indeterminate state like a loading spinner.
 */
const ProgressBar = ({ children = null, value, ready = false }) => {
    const [
        { status: progressStatus, isMounted: progressMounted },
        toggleProgress,
    ] = useTransitionState({
        timeout: 300,
        mountOnEnter: true,
        unmountOnExit: true,
        preEnter: true,
    });

    const [{ status: textStatus }, toggleText] = useTransitionState({
        timeout: 300,
        mountOnEnter: true,
        unmountOnExit: true,
        preEnter: true,
    });

    const className = useMemo(
        () =>
            clsx('cc__progress-bar', {
                'cc__progress-bar--determinate': isNumber(value),
                'cc__progress-bar--indeterminate': !isNumber(value),
            }),
        [value]
    );

    useEffect(() => {
        toggleProgress(!ready);
        toggleText(ready);
    }, [ready, toggleProgress, toggleText]);

    return (
        <div className={className}>
            {progressMounted && (
                <AutoProgressBar
                    value={value}
                    className={mapStatusToClass(
                        progressStatus,
                        'cc__progress-bar--animation-1'
                    )}
                />
            )}
            <div
                className={clsx(
                    'cc__progress-bar__text',
                    mapStatusToClass(
                        textStatus,
                        'cc__progress-bar--animation-2'
                    )
                )}
            >
                {children}
            </div>
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
