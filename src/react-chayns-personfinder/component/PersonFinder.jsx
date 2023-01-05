/**
 * @component {./docs.md}
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PersonsContext from './data/persons/PersonsContext';
import MultiplePersonFinder from './MultiplePersonFinder';
import SimplePersonFinder from './SimplePersonFinder';

/**
 * An autocomplete search for persons that can be customized to work with
 * arbitrary data.
 */
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
    /**
     * The placeholder to show when the input field is empty.
     */
    placeholder: PropTypes.string,

    /**
     * Wether the `PersonFinder` should allow multiple persons or sites to be
     * put in.
     */
    multiple: PropTypes.bool,

    /**
     * Wether the `PersonFinder` should show persons in its autocomplete window.
     */
    showPersons: PropTypes.bool,

    /**
     * Wether the `PersonFinder` should show sites in its autocomplete window.
     */
    showSites: PropTypes.bool,

    /**
     * Whether the `PersonFinder` should show uac groups of the current site
     */
    showUacGroups: PropTypes.bool,

    /**
     * Whether the `PersonFinder` should show known users of the current site
     */
    showKnownPersons: PropTypes.bool,

    /**
     * The id of a UAC group to search persons in.
     */
    uacId: PropTypes.number,

    /**
     * The locationId of a UAC group to search persons in.
     */
    locationId: PropTypes.number,

    /**
     * A function to reduce the results.
     */
    reducerFunction: PropTypes.func,

    /**
     * The context of the PersonFinder. Take a look at the
     * [Custom Finder](#custom-finder) paragraph.
     */
    context: PropTypes.shape({
        Provider: PropTypes.func,
        // eslint-disable-next-line react/forbid-prop-types
        Consumer: PropTypes.object,
    }),

    /**
     * This callback is invoked when a person is selected, removed or the
     * `PersonFinder` is cleared.
     */
    onChange: PropTypes.func,

    /**
     * Wether the display of friends with an empty input should be disabled.
     */
    disableFriends: PropTypes.bool,

    /**
     * A classname string that will be applied to the wrapper `<div>`-element.
     */
    className: PropTypes.string,

    /**
     * The default value of the input field. Can be a string or a
     * person/location specified with an object.
     */
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

    /**
     * The default values of the input field if `multiple` is `true`. Can be
     * strings or an array of persons/locations specified with an object.
     */
    defaultValues: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            siteId: PropTypes.string,
            personId: PropTypes.string,
        })
    ),

    /**
     * A callback that is invoked when a person is added to the `PersonFinder`.
     * Only works when `multiple` is `true`
     */
    onAdd: PropTypes.func,

    /**
     * A callback that is invoked when a person is removed from the
     * `PersonFinder`. Only works when `multiple` is `true`
     */
    onRemove: PropTypes.func,

    /**
     * The `onInput`-callback for the `<input>` element of the `PersonFinder`.
     */
    onInput: PropTypes.func,

    /**
     * Props for the context.
     */

    contextProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types

    /**
     * The maximum amount of people selected at once. Only has an effect when
     * `multiple` is `true`.
     */
    max: PropTypes.number,

    /**
     * The currently selected values when `multiple` is `true`.
     */

    values: PropTypes.array, // eslint-disable-line react/forbid-prop-types

    /**
     * The value for the
     */
    value: PropTypes.string,

    /**
     * Adds a small chevron icon to show / hide the results
     */
    hasOpenCloseIcon: PropTypes.bool,
    /**
     * Removes already selected entries from search results
     */
    filterSelected: PropTypes.bool,
    /**
     * Hides the extra icon for verified accounts
     */
    hideVerifiedIcon: PropTypes.bool,
};

PersonFinder.defaultProps = {
    placeholder: '',
    multiple: false,
    showPersons: true,
    disableFriends: false,
    className: null,
    showSites: false,
    showUacGroups: false,
    showKnownPersons: false,
    uacId: null,
    locationId: null,
    reducerFunction: null,
    context: PersonsContext,
    onChange: null,
    defaultValue: null,
    defaultValues: [],
    onAdd: null,
    onRemove: null,
    onInput: null,
    contextProps: null,
    max: null,
    values: null,
    value: null,
    hasOpenCloseIcon: false,
    filterSelected: false,
    hideVerifiedIcon: false,
};

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
