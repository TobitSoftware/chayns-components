import React from 'react';
import PropTypes from 'prop-types';

const MoreImages = ({ count }) => {
    const text = `+${count}`;
    return(
        <div className="more-images" data-more={text}/>
    );
};

MoreImages.propTypes = {
    count: PropTypes.number.isRequired
};

export default MoreImages;
