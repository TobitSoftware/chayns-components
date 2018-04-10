import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DetailViewItem from './DetailViewItem';

const DetailViewHeader = ({
    children,
    className,
    expanded,
    ...props
}) => {
    const classNames = classnames('cc__detail-view__header', className, {
        'cc__detail-view__header--expanded': expanded,
    });

    return (
        <DetailViewItem
            className={classNames}
            {...props}
        >
            <div className="cc__detail-view__header__wrapper">
                {children}
            </div>
        </DetailViewItem>
    );
};

DetailViewHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    className: PropTypes.string,
    expanded: PropTypes.bool,
};

DetailViewHeader.defaultProps = {
    className: '',
    expanded: false,
};

export default DetailViewHeader;
