/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useState } from 'react';

/**
 * Badges are small, circular containers used to decorate other components with
 * glancable information.
 */
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
    /**
     * A React node that is displayed inside of the Badge.
     */
    children: PropTypes.node.isRequired,

    /**
     * A classname that is applied to the Badge `<div>`-element.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be applied to the Badge `<div>`-element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * Retrieves the ref to the Badge `<div>`-element.
     */
    badgeRef: PropTypes.func,
};

Badge.defaultProps = {
    className: '',
    style: undefined,
    badgeRef: undefined,
};

Badge.displayName = 'Badge';
