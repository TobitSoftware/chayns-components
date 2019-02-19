import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimplePersonFinder from './SimplePersonFinder';
import MultiplePersonFinder from './MultiplePersonFinder';

export default class PersonFinder extends Component {
    static propTypes = {
        multiple: PropTypes.bool,
    };

    static defaultProps = {
        multiple: false,
    };

    personFinder = React.createRef();

    clear = () => {
        if (this.personFinder.current) {
            this.personFinder.current.clear();
        }
    };

    render() {
        const { multiple } = this.props;

        if (multiple) {
            return (
                <MultiplePersonFinder
                    {...this.props}
                />
            );
        }

        return (
            <SimplePersonFinder
                ref={this.personFinder}
                {...this.props}
            />
        );
    }
}
