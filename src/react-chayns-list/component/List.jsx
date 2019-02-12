import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const List = ({ className, children }) => (
    <div className={classnames('component-list', className)}>
        {children}
    </div>
);

List.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
};

List.defaultProps = {
    className: null,
    children: null,
};

export default List;
