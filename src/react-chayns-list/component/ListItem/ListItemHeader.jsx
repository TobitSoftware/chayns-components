import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ListItemHeader = ({
    title,
    subtitle,
    image,
    onClick,
    className,
    left,
    right,
}) => (
    <div
        className={classnames('list-item__header', className)}
        onClick={onClick}
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
        <div className="list-item__spacer" />
        {right && (
            <div className="list-item__right">
                {right}
            </div>
        )}
    </div>
);

ListItemHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    image: PropTypes.string,
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
};

ListItemHeader.defaultProps = {
    subtitle: null,
    image: null,
    className: null,
    onClick: null,
    left: null,
    right: null,
};

export default ListItemHeader;
