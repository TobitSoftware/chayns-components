import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DetailViewItem from './DetailViewItem';

class DetailViewHeader extends Component {
    render() {
        const {
            children,
            className,
            open,
            ...props
        } = this.props;

        const classNames = classnames('cc__detail-view__header', className, {
            'cc__detail-view__header--open': open,
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
    }
}

DetailViewHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    className: PropTypes.string,
    open: PropTypes.bool,
};

DetailViewHeader.defaultProps = {
    className: '',
    open: false,
};

export default DetailViewHeader;
