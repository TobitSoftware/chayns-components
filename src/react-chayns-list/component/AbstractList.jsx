import classnames from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const AbstractList = ({ className, children }) => (
    <div className={classnames('cc__list', className)}>{children}</div>
);

AbstractList.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

AbstractList.defaultProps = {
    className: null,
    children: null,
};

AbstractList.displayName = 'AbstractList';

export default AbstractList;
