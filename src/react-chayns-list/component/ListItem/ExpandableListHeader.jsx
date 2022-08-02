/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'clsx';
import ListItemHeader from './ListItemHeader';

const ExpandableListHeader = ({
    title,
    subtitle,
    image,
    icon,
    onClick,
    hideIndicator,
    right,
    style,
    headerProps,
    open,
    headMultiline,
    className,
    ...props
}) => {
    const [wasOpen, setWasOpen] = useState(false);
    useEffect(() => {
        if (open) {
            setWasOpen(true);
        }
    }, [open]);
    return (
        <ListItemHeader
            title={title}
            subtitle={subtitle}
            onClick={onClick}
            image={image}
            icon={icon}
            right={right}
            left={
                !hideIndicator && (
                    <div className="list-item__indicator">
                        <div className="icon-wrapper">
                            <i className="ts-icon ts-angle-right" />
                        </div>
                    </div>
                )
            }
            style={style && style.head ? style.head : null}
            open={open}
            className={classNames(className, {
                'list-item__header--multiline': headMultiline && wasOpen, // wasOpen fixes jumping on first render
            })}
            {...props}
            {...headerProps}
        />
    );
};

ExpandableListHeader.propTypes = {
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
    onClick: PropTypes.func,
    hideIndicator: PropTypes.bool,
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    style: PropTypes.object,
    headerProps: PropTypes.object,
    open: PropTypes.bool,
    headMultiline: PropTypes.bool,
    className: PropTypes.string,
};

ExpandableListHeader.defaultProps = {
    image: null,
    icon: null,
    subtitle: null,
    onClick: null,
    hideIndicator: false,
    right: null,
    style: null,
    headerProps: null,
    open: null,
    headMultiline: false,
    className: null,
};

ExpandableListHeader.displayName = 'ExpandableListHeader';

export default ExpandableListHeader;
