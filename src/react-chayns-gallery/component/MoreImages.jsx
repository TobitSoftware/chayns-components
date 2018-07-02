import React from 'react';
import PropTypes from 'prop-types';


const MoreImages = ({ count, onlyIcon }) => {
    const text = `${count} weitere Bilder`;
    return(
        <div className="more-images">
            <div className="more-images__container">
                <div className="more-image__text__wrapper">
                    <i className="more-image__icon fa fa-plus"/>
                    {onlyIcon ? '' :
                        <div className="more-image__text">{text}</div>
                    }
                </div>
            </div>
        </div>
    );
};

MoreImages.propTypes = {
    count: PropTypes.number.isRequired,
    onlyIcon: PropTypes.bool
};



export default MoreImages;
