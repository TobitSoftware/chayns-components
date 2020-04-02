import React from 'react';
import PropTypes from 'prop-types';

const AccordionIntro = ({ children }) => (
    <div className="accordion__intro">
        {children}
    </div>
);

AccordionIntro.propTypes = {
    children: PropTypes.node.isRequired,
};

AccordionIntro.displayName = 'AccordionIntro';

export default AccordionIntro;
