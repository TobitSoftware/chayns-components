import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimplePersonFinder from './SimplePersonFinder';
import MultiplePersonFinder from './MultiplePersonFinder';
import PersonsContext from './data/persons/PersonsContext';

class PersonFinder extends Component {
    personFinder = React.createRef();

    clear = () => {
        if (this.personFinder.current) {
            this.personFinder.current.clear();
        }
    };

    render() {
        const { multiple, showPersons, showSites } = this.props;

        const PersonFinderComponent = multiple
            ? MultiplePersonFinder
            : SimplePersonFinder;

        return (
            <PersonFinderComponent
                ref={this.personFinder}
                {...this.props}
                autoLoading={!showPersons || !showSites}
            />
        );
    }
}

PersonFinder.propTypes = {
    multiple: PropTypes.bool,
    showPersons: PropTypes.bool,
    showSites: PropTypes.bool,
    uacId: PropTypes.number,
    locationId: PropTypes.number,
    reducerFunction: PropTypes.func,
    context: PropTypes.shape({
        Provider: PropTypes.func,
        Consumer: PropTypes.object,
    }),
};

PersonFinder.defaultProps = {
    multiple: false,
    showPersons: true,
    showSites: false,
    uacId: null,
    locationId: null,
    reducerFunction: null,
    context: PersonsContext,
};

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
