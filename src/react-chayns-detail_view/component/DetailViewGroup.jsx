import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import OrientationHelper from '../../utils/OrientationHelper';

OrientationHelper.update();

const DetailViewGroup = ({ children, className, ...props }) => {
    const classNames = classnames('cc__detail-view__group', {
        [className]: className
    });

    return (
        <div
            className={classNames}
            {...props}
        >
            {children}
        </div>
    );
};

DetailViewGroup.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    className: PropTypes.string,
};

DetailViewGroup.defaultProps = {
    className: '',
};

export default DetailViewGroup;
