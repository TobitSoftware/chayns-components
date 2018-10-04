import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SmallWaitCursor extends PureComponent {
    static propTypes = {
        show: PropTypes.bool,
        style: PropTypes.object,
        showBackground: PropTypes.bool,
    };

    static defaultProps = {
        show: false,
        style: null,
        showBackground: true,
    };

    render() {
        const { show, style, showBackground } = this.props;

        if (showBackground) {
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
        return (<div className="wait-cursor__spinner"/>);
    }
}
