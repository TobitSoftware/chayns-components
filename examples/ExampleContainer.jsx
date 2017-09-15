import React from 'react';
import PropTypes from 'prop-types';

const ExampleContainer = ({ headline, children, ...props }) => {
    return (
        <div className="content__card dark" {...props} style={{ margin: '20px 0' }}>
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
