import React from 'react';
import PropTypes from 'prop-types';

import SimplePersonFinder from './SimplePersonFinder';
import MultiplePersonFinder from './MultiplePersonFinder';

const PersonFinder = (props) => {
    const { multiple } = props;

    if (multiple) {
        return (
            <MultiplePersonFinder {...props} />
        );
    }

    return (
        <SimplePersonFinder {...props} />
    );
};

PersonFinder.propTypes = {
    multiple: PropTypes.bool,
};

PersonFinder.defaultProps = {
    multiple: false,
};

export default PersonFinder;
