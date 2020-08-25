/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../../../react-chayns-icon/component/Icon';

const ListItemHeader = ({
    title,
    subtitle,
    image,
    icon,
    className,
    left,
    right,
    circle,
    ...otherProps
}) => (
    <div
        className={classnames('list-item__header', className)}
        {...otherProps}
    >
        {left}
        {image && (
            <div
                className={classnames('list-item__image', {
                    'list-item__image--circle': circle,
                })}
                style={{
                    backgroundImage: `url(${image})`,
                }}
            />
        )}
        {icon && (
            <Icon
                className={classnames('list-item__icon chayns__background-color--102 chayns__color--headline', {
                    'list-item__icon--circle': circle,
                })}
                icon={icon}
            />
        )}
        {(title || subtitle) && (
            <div className="list-item__titles">
                {title && (
                    <div className="list-item__title ellipsis">
                        {title}
                    </div>
                )}
                {subtitle && (
                    <div className="list-item__subtitle ellipsis">
                        {subtitle}
                    </div>
                )}
            </div>
        )}
        <div className="list-item__spacer"/>
        {right && (
            <div className="list-item__right">
                {right}
            </div>
        )}
    </div>
);

ListItemHeader.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    subtitle: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    image: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    left: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    circle: PropTypes.bool,
};

ListItemHeader.defaultProps = {
    subtitle: null,
    image: null,
    icon: null,
    className: null,
    left: null,
    right: null,
    circle: false,
};

ListItemHeader.displayName = 'ListItemHeader';

export default ListItemHeader;
