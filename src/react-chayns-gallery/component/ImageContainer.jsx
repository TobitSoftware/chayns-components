import React from 'react';
import PropTypes from 'prop-types';


const ImageContainer = ({ className, url, onClick, child }) => {
    return(
        <div
            className={className}
            style={{ backgroundImage: `url(${url})` }}
            onClick={onClick}
        >{child}</div>
    );
};

ImageContainer.propTypes = {
    className: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    child: PropTypes.element
};

export default ImageContainer;
