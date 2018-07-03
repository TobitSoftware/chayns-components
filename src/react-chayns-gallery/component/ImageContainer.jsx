import React from 'react';
import PropTypes from 'prop-types';


const ImageContainer = ({ className, url, onClick, children }) => {
    return(
        <div className={className}>
            <div
                className='gallery_item_inner'
                style={{ backgroundImage: `url(${url})` }}
                onClick={onClick}
            >{children}</div>
        </div>
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
