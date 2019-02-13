import React from 'react';
import PropTypes from 'prop-types';

import ListItemHeader from './ListItemHeader';

const ExpandableListHeader = ({
    title,
    subtitle,
    image,
    onClick,
    hideIndicator,
    right,
}) => {
    return (
        <ListItemHeader
            title={title}
            subtitle={subtitle}
            onClick={onClick}
            image={image}
            right={right}
            left={!hideIndicator && (
                <div className="list-item__indicator">
                    <div className="icon-wrapper">
                        <i className="ts-icon ts-angle-right" />
                    </div>
                </div>
            )}
        />
    );
};

ExpandableListHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
    hideIndicator: PropTypes.bool,
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

ExpandableListHeader.defaultProps = {
    image: null,
    subtitle: null,
    onClick: null,
    hideIndicator: false,
    right: null,
};

export default ExpandableListHeader;
