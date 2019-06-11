import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import classnames from 'classnames';

import { PERSON_RELATION, LOCATION_RELATION } from '../constants/relationTypes';
import makeCancelable from '../utils/makeCancelable';
import findRelations from '../utils/findRelations';
import PersonFinderResults from './PersonFinderResults';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import WaitCursor from './WaitCursor';
import getCurrentUserInformation from '../utils/getCurrentUserInformation';

const WAIT_CURSOR_TIMEOUT = 500;
const LAZY_LOADING_SPACE = 100;

const ALL_RELATIONS = 'ALL';

export default class PersonFinderData extends Component {
    static propTypes = {
        take: PropTypes.number,
        persons: PropTypes.bool,
        sites: PropTypes.bool,
        onSelect: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        selectedValue: PropTypes.bool,
        includeOwn: PropTypes.bool,
        inputComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
        showId: PropTypes.bool,
        autoLoading: PropTypes.bool,
        boxClassName: PropTypes.string,
        uacId: PropTypes.number,
        locationId: PropTypes.number,
    };

    static defaultProps = {
        take: 20,
        persons: true,
        sites: false,
        value: '',
        selectedValue: false,
        includeOwn: false,
        showId: false,
        autoLoading: true,
        boxClassName: null,
        uacId: null,
        locationId: null,
    };

    resultList = null;

    state = {
        value: null,
        friends: [],
        persons: { related: [], unrelated: [] },
        sites: { related: [], unrelated: [] },
        showWaitCursor: false,
        lazyLoading: false,
    };

    promises = {
        [PERSON_RELATION]: null,
        [LOCATION_RELATION]: null,
    };

    skip = {
        [PERSON_RELATION]: 0,
        [LOCATION_RELATION]: 0,
    };

    loadMore = {
        [PERSON_RELATION]: true,
        [LOCATION_RELATION]: true,
    };

    constructor(props) {
        super(props);

        this.take = props.take;

        this.setValue = debounce(this.setValue.bind(this), 500);
        this.fetchPersonRelations = this.fetchPersonRelations.bind(this);
        this.fetchSiteRelations = this.fetchRelations.bind(this, LOCATION_RELATION);
        this.handleLazyLoad = this.handleLazyLoad.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
    }

    componentDidUpdate() {
        const { value, selectedValue } = this.props;
        const { value: stateValue } = this.state;

        if (!selectedValue && stateValue !== value) {
            this.setValue('');
            this.setValue(value);
        }
    }

    setValue(value) {
        this.setState({
            value,
        });

        if (value === '') {
            this.setState({
                persons: { related: [], unrelated: [] },
                sites: { related: [], unrelated: [] },
            });

            return;
        }

        this.fetchData(value);
    }

    handleLoadMore = (type) => {
        const { value } = this.state;
        this.fetchData(value, false, type);
    };

    handleOnFocus() {
        const { friends } = this.state;
        const { persons, uacId, value } = this.props;
        if (friends.length === 0 && persons === true && !uacId && (!value || value.trim() === '')) {
            this.setState({ showWaitCursor: true });
            this.fetchFriends().then((result) => {
                this.setState({ friends: result, showWaitCursor: false });
            });
        }
    }

    showWaitCursor() {
        const { lazyLoading } = this.state;
        clearTimeout(this.waitCursorTimeout);

        this.waitCursorTimeout = window.setTimeout(() => {
            this.setState({
                showWaitCursor: true,
            });
        }, lazyLoading ? WAIT_CURSOR_TIMEOUT : 0);
    }

    hideWaitCursor() {
        clearTimeout(this.waitCursorTimeout);

        this.setState({
            showWaitCursor: false,
        });
    }

    async handleLazyLoad() {
        if (!this.resultList) return;

        const { autoLoading } = this.props;
        const { value, lazyLoading } = this.state;
        const { scrollTop, offsetHeight, scrollHeight } = this.resultList;

        if (autoLoading && !lazyLoading && (scrollHeight - scrollTop - offsetHeight) <= LAZY_LOADING_SPACE) {
            this.setState({
                lazyLoading: true,
            });
            await this.fetchData(value, false);
            this.setState({
                lazyLoading: false,
            });
        }
    }

    async fetchData(value, clear = true, type = ALL_RELATIONS) {
        if (clear || value === '') {
            this.skip[LOCATION_RELATION] = 0;
            this.skip[PERSON_RELATION] = 0;
            this.loadMore[LOCATION_RELATION] = true;
            this.loadMore[PERSON_RELATION] = true;

            if (this.resultList) {
                this.resultList.scrollTop = 0;
            }
        }

        const {
            persons: enablePersons, sites: enableSites, includeOwn, uacId, locationId,
        } = this.props;

        const promises = [];

        const loadPersons = enablePersons && this.loadMore[PERSON_RELATION] && (type === ALL_RELATIONS || type === PERSON_RELATION);
        const loadSites = enableSites && this.loadMore[LOCATION_RELATION] && (type === ALL_RELATIONS || type === LOCATION_RELATION);

        if (uacId) {
            promises.push(loadPersons ? this.fetchUacPersons(value, uacId, locationId) : Promise.resolve(false));
        } else {
            promises.push(loadPersons ? this.fetchPersonRelations(value, includeOwn) : Promise.resolve(false));
        }
        promises.push(loadSites ? this.fetchSiteRelations(value) : Promise.resolve(false));

        try {
            this.showWaitCursor();
            const [personResults, siteResults] = await Promise.all(promises);
            this.hideWaitCursor();

            const { persons: personsState, sites: sitesState, lazyLoading } = this.state;

            let persons = clear ? { related: [], unrelated: [] } : personsState;
            let sites = clear ? { related: [], unrelated: [] } : sitesState;

            if (personResults) {
                this.skip[PERSON_RELATION] += (personResults.related.length + personResults.unrelated.length);

                persons.related.push(...personResults.related);
                persons.unrelated.push(...personResults.unrelated);

                if (personResults.related.length + personResults.unrelated.length === 0
                    || personResults.related.length + personResults.unrelated.length < this.take) {
                    this.loadMore[PERSON_RELATION] = false;
                }

                persons = { ...persons }; // Forces rerendering
            }

            if (siteResults) {
                this.skip[LOCATION_RELATION] += (siteResults.related.length + siteResults.unrelated.length);

                sites.related.push(...siteResults.related);
                sites.unrelated.push(...siteResults.unrelated);

                if (siteResults.related.length + siteResults.unrelated.length === 0
                    || siteResults.related.length + siteResults.unrelated.length < this.take) {
                    this.loadMore[LOCATION_RELATION] = false;
                }

                sites = { ...sites }; // Forces rerendering
            }

            this.setState({
                persons,
                sites,
                lazyLoading: clear ? false : lazyLoading,
            });
        } catch (ex) {
            if (!ex || !ex.isCanceled) {
                throw ex;
            }
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async fetchUacPersons(value, uacId, locationId) {
        const config = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
            },
            mode: 'cors',
        };

        const response = await fetch(`https://sub50.tobit.com/backend/${locationId || chayns.env.site.locationId}/usergroup/${uacId}/users?filter=${value}`, config);
        if (response.status === 200) {
            const json = await response.json();

            const result = { related: [], unrelated: [], type: PERSON_RELATION };
            json.forEach((item) => {
                result.related.push({
                    firstName: item.firstname,
                    lastName: item.lastname,
                    personId: item.personId,
                    relationCount: 0,
                    relations: [],
                    score: 0,
                    userId: item.id,
                });
            });

            return Promise.resolve(result);
        }
        return Promise.resolve(null);
    }

    async fetchPersonRelations(value, canFindOwn = false) {
        const fetchPromise = this.fetchRelations(PERSON_RELATION, value);

        if (canFindOwn && (chayns.env.user.name).toLowerCase().indexOf(value.toLowerCase()) === 0) {
            const user = await getCurrentUserInformation();

            const data = await fetchPromise;

            data.related.unshift(user);

            return data;
        }
        return fetchPromise;
    }

    async fetchRelations(type, value) {
        if (this.promises[type]) {
            this.promises[type].cancel();
        }

        this.promises[type] = makeCancelable(findRelations(type, value, this.skip[type], this.take));

        return this.promises[type].promise;
    }

    // eslint-disable-next-line class-methods-use-this
    async fetchFriends() {
        const config = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
            },
            mode: 'cors',
        };

        const response = await fetch('https://webapi.tobit.com/AccountService/v1.0/chayns/friends', config);
        if (response.status === 200) {
            const json = await response.json();
            return Promise.resolve(json);
        }
        return Promise.resolve([]);
    }

    hasEntries() {
        const { persons, sites, friends } = this.state;

        return persons.related.length > 0 || persons.unrelated.length > 0 || sites.related.length > 0 || sites.unrelated.length > 0 || friends.length > 0;
    }

    renderChildren() {
        const {
            onSelect,
            selectedValue,
            showId,
            persons: showPersons,
            sites: showSites,
        } = this.props;

        const {
            persons,
            sites,
            friends,
            showWaitCursor,
            lazyLoading,
            value,
        } = this.state;

        const hasEntries = this.hasEntries();
        const showSeparators = showPersons && showSites;

        if (!selectedValue && hasEntries) {
            const hasUnrelated = !!(persons && persons.unrelated && persons.unrelated.length);
            const results = (
                <PersonFinderResults
                    key="results"
                    showId={showId}
                    persons={{ ...persons, friends }}
                    sites={sites}
                    onSelect={onSelect}
                    showSeparators={showSeparators}
                    onLoadMore={this.handleLoadMore}
                    showWaitCursor={showWaitCursor}
                    moreRelatedPersons={this.loadMore[PERSON_RELATION] && !hasUnrelated}
                    moreRelatedSites={this.loadMore[LOCATION_RELATION]}
                    moreUnrelatedPersons={this.loadMore[PERSON_RELATION] && hasUnrelated}
                    showFriends={!value || value.trim() === ''}
                />
            );

            if (lazyLoading) {
                return [
                    results,
                    showWaitCursor && (<WaitCursor key="wait-cursor" />),
                ];
            }

            return [
                showWaitCursor && (<WaitCursor key="wait-cursor" />),
                results,
            ];
        }

        if (showWaitCursor) {
            return (
                <WaitCursor key="wait-cursor" />
            );
        }

        return null;
    }

    render() {
        const {
            onSelect,
            selectedValue,
            value,
            persons: enablePersons,
            sites: enableSites,
            inputComponent,
            boxClassName,
            ...props
        } = this.props;

        return (
            <InputBox
                parent={document.querySelector('.tapp')}
                key="single"
                inputComponent={inputComponent}
                value={value}
                onChange={this.handleOnChange}
                onFocus={this.handleOnFocus}
                boxClassName={classnames('cc__person-finder__overlay', boxClassName)}
                overlayProps={{
                    ref: (ref) => {
                        this.resultList = ref;
                    },
                    onScroll: this.handleLazyLoad,
                }}
                {...props}
            >
                {this.renderChildren()}
            </InputBox>
        );
    }
}
