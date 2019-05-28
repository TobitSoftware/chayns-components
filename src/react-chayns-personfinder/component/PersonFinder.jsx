import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimplePersonFinder from './SimplePersonFinder';
import MultiplePersonFinder from './MultiplePersonFinder';

export default class PersonFinder extends Component {
    static propTypes = {
        multiple: PropTypes.bool,
        showPersons: PropTypes.bool,
        showSites: PropTypes.bool,
        uacId: PropTypes.number,
        locationId: PropTypes.number,
    };

    static defaultProps = {
        multiple: false,
        showPersons: true,
        showSites: false,
        uacId: null,
        locationId: null,
    };

    personFinder = React.createRef();

    clear = () => {
        if (this.personFinder.current) {
            this.personFinder.current.clear();
        }
    };

    render() {
        const { multiple, showPersons, showSites } = this.props;

        if (multiple) {
            return (
                <MultiplePersonFinder
                    {...this.props}
                    autoLoading={!showPersons || !showSites}
                />
            );
        }

        return (
            <SimplePersonFinder
                ref={this.personFinder}
                {...this.props}
                autoLoading={!showPersons || !showSites}
            />
        );
    }
}
