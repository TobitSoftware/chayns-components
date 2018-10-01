import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SmallWaitCursor extends PureComponent {
    static propTypes = {
        show: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        show: false,
        style: null,
    };

    render() {
        const { show, style } = this.props;

        return (
            <div
                className={classNames('wait-cursor', {
                    hidden: !show
                })}
                style={style}
            >
                <div className="wait-cursor__spinner"/>
            </div>
        );
    }
}
