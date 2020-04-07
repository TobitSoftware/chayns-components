import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useState } from 'react';

const Badge = forwardRef(({ children, className, ...other }, ref) => {
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
            }}
            style={{ minWidth }}
            {...other}
        >
            {children}
        </div>
    );
});

export default Badge;

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Badge.defaultProps = {
    className: '',
};

Badge.displayName = 'Badge';
