/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SmallWaitCursor extends PureComponent {
    render() {
        const {
            show,
            style,
            showBackground,
            inline,
            className,
        } = this.props;

        if (showBackground) {
            return (
                <div
                    className={classNames('wait-cursor', className, {
                        hidden: !show,
                    })}
                    style={style}
                >
                    <div className="wait-cursor__spinner"/>
                </div>
            );
        }
        return (
            <div
                className={classNames('wait-cursor__spinner', {
                    'wait-cursor__spinner--inline': inline,
                    hidden: !show,
                })}
            />
        );
    }
}

SmallWaitCursor.propTypes = {
    show: PropTypes.bool,
    style: PropTypes.object,
    showBackground: PropTypes.bool,
    inline: PropTypes.bool,
    className: PropTypes.string,
};

SmallWaitCursor.defaultProps = {
    show: false,
    style: null,
    showBackground: true,
    inline: false,
    className: null,
};
