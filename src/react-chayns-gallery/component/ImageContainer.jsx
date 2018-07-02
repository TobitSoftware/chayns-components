import React from 'react';
import PropTypes from 'prop-types';


const ImageContainer = ({ className, url, onClick, children }) => {
    return(
        <div
            className={className}
            style={{ backgroundImage: `url(${url})` }}
            onClick={onClick}
        >{children}</div>
    );
};

ImageContainer.propTypes = {
    className: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element
};

ImageContainer.defaultProps = {
    children: undefined
}

export default ImageContainer;
