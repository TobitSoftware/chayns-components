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
    onClick,
    className,
    left,
    right,
    style,
}) => (
    <div
        className={classnames('list-item__header', className)}
        onClick={onClick}
        style={style}
    >
        {left}
        {image && (
            <div
                className="list-item__image"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            />
        )}
        {icon && (
            <Icon
                className="list-item__icon chayns__background-color--102 chayns__color--headline"
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
    onClick: PropTypes.func,
    left: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    style: PropTypes.object,
};

ListItemHeader.defaultProps = {
    subtitle: null,
    image: null,
    icon: null,
    className: null,
    onClick: null,
    left: null,
    right: null,
    style: null,
};

export default ListItemHeader;
