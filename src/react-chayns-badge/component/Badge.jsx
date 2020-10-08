import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useState } from 'react';

const Badge = forwardRef(
    ({ children, className, style, badgeRef, ...other }, ref) => {
        const [minWidth, setMinWidth] = useState();

        const measureRef = useCallback((node) => {
            if (node) {
                setMinWidth(node.getBoundingClientRect().height);
            }
        }, []);

        return (
            <div
                className={classNames(className, 'badge')}
                ref={(node) => {
                    measureRef(node);
                    if (ref) {
                        ref(node);
                    }
                    if (badgeRef) {
                        badgeRef(node);
                    }
                }}
                style={{ minWidth, ...style }}
                {...other}
            >
                {children}
            </div>
        );
    }
);

export default Badge;

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    badgeRef: PropTypes.func,
};

Badge.defaultProps = {
    className: '',
    style: undefined,
    badgeRef: undefined,
};

Badge.displayName = 'Badge';
