import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const AbstractList = ({ className, children }) => (
    <div className={classnames('cc__list', className)}>
        {children}
    </div>
);

AbstractList.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
};

AbstractList.defaultProps = {
    className: null,
    children: null,
};

export default AbstractList;
