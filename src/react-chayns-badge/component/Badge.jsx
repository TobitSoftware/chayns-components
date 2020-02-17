import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Badge extends PureComponent {
    componentDidMount() {
        this.ref.style['min-width'] = `${this.ref.getBoundingClientRect().height}px`;
    }

    render() {
        const {
            children, className, badgeRef, ...other
        } = this.props;

        return (
            <div
                className={classNames(className, 'badge')}
                ref={(ref) => {
                    this.ref = ref;
                    if (badgeRef) {
                        badgeRef(ref);
                    }
                }}
                {...other}
            >
                {children}
            </div>
        );
    }
}

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    badgeRef: PropTypes.func,
};

Badge.defaultProps = {
    className: '',
    badgeRef: null,
};
