import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ name }) => {
    return(
        <div className="divider">{name}</div>
    );
};

Divider.propTypes = {
    name: PropTypes.string.isRequired
};

export default Divider;
