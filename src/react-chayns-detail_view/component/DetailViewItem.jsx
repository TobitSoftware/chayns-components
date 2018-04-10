import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DetailViewItem = ({ children, className, ...props }) => {
    const classNames = classnames('cc__detail-view__item', className);

    return (
        <div
            className={classNames}
            {...props}
        >
            {children}
        </div>
    );
};

DetailViewItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    className: PropTypes.string,
};

DetailViewItem.defaultProps = {
    className: '',
};

export default DetailViewItem;
