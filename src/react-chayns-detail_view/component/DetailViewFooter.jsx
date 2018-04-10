import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import DetailViewItem from './DetailViewItem';

const DetailViewFooter = ({ children, className, ...props }) => {
    return (
        <DetailViewItem
            className="cc__detail-view__footer"
            {...props}
        >
            {children}
        </DetailViewItem>
    );
};

DetailViewFooter.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    className: PropTypes.string,
};

DetailViewFooter.defaultProps = {
    className: '',
};

export default DetailViewFooter;
