import React from 'react';
import PropTypes from 'prop-types';

const ExampleContainer = ({ headline, children }) => {
    return (
        <div className="content__card">
            <h1>{headline}</h1>
            {children}
        </div>
    );
};

ExampleContainer.propTypes = {
    headline: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default ExampleContainer;
