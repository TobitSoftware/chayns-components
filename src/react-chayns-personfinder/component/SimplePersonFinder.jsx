import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isString } from '../../utils/is';
import MultiplePersonFinder from './MultiplePersonFinder';

class SimplePersonFinder extends Component {
    constructor(props) {
        super(props);

        if (isString(props.defaultValue)) {
            // eslint-disable-next-line no-console
            console.warn('[chayns components] PersonFinder: defaultValue is a String. Please consider using an object for defaultValue.');
        }

        this.multipleFinder = React.createRef();

        this.clear = this.clear.bind(this);
    }

    clear() {
        this.multipleFinder.current.clear();
    }

    render() {
        const {
            defaultValue,
            value,
            onChange,
            ...props
        } = this.props;

        let defaultValues = [];
        if (isString(defaultValue)) {
            defaultValues = [{ fullName: defaultValue }];
        } else if (defaultValue) {
            defaultValues = [defaultValue];
        }

        if (isString(value)) {
            props.value = value;
        } else if (value) {
            props.values = [value];
        }

        return (
            <MultiplePersonFinder
                ref={this.multipleFinder}
                defaultValues={defaultValues}
                onChange={(values) => {
                    if (onChange) {
                        onChange(values.length > 0 ? values[0] : null);
                    }
                }}
                {...props}
                max={1}
            />
        );
    }
}

SimplePersonFinder.propTypes = {
    onChange: PropTypes.func,
    showPersons: PropTypes.bool,
    showSites: PropTypes.bool,
    disableFriends: PropTypes.bool,
    showId: PropTypes.bool,
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.shape({
            name: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            siteId: PropTypes.string,
            personId: PropTypes.string,
        }),
        PropTypes.string,
    ]),
    customData: PropTypes.bool,
    onInput: PropTypes.func,
    context: PropTypes.shape({
        Provider: PropTypes.func,
        Consumer: PropTypes.object,
        ObjectMapping: PropTypes.shape({
            identifier: PropTypes.string,
            showName: PropTypes.string,
        }),
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    contextProps: PropTypes.object,
    removeIcon: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

SimplePersonFinder.defaultProps = {
    onChange: null,
    showPersons: true,
    showSites: false,
    disableFriends: false,
    defaultValue: null,
    className: null,
    showId: false,
    onInput: null,
    customData: false,
    contextProps: null,
    removeIcon: false,
    value: null,
};

SimplePersonFinder.displayName = 'SimplePersonFinder';

export default SimplePersonFinder;
