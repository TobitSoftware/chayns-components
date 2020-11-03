/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

/**
 * A small circular loading indicator.
 */
export default class SmallWaitCursor extends PureComponent {
    render() {
        const { show, style, showBackground, inline, className } = this.props;

        if (showBackground) {
            return (
                <div
                    className={classNames('wait-cursor', className, {
                        hidden: !show,
                    })}
                    style={style}
                >
                    <div className="wait-cursor__spinner" />
                </div>
            );
        }
        return (
            <div
                className={classNames('wait-cursor__spinner', className, {
                    'wait-cursor__spinner--inline': inline,
                    hidden: !show,
                })}
            />
        );
    }
}

SmallWaitCursor.propTypes = {
    /**
     * Wether the wait cursor should be shown.
     */
    show: PropTypes.bool,

    /**
     * A React style object that will be applied to the wrapper.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * Wether a background should be shown behind the spinner.
     */
    showBackground: PropTypes.bool,

    /**
     * Wether the spinner should be rendered with `display: inline-block;`. This
     * does not work when `showBackground` is `true`
     */
    inline: PropTypes.bool,

    /**
     * A classname sring that will be applied to the container element of the
     * spinner.
     */
    className: PropTypes.string,
};

SmallWaitCursor.defaultProps = {
    show: false,
    style: null,
    showBackground: true,
    inline: false,
    className: null,
};

SmallWaitCursor.displayName = 'SmallWaitCursor';
