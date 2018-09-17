/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isDescendant from '../../utils/isDescendant';

export default class PersonFinder extends Component {
    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        showPersons: PropTypes.bool,
        showSites: PropTypes.bool,
    };

    static defaultProps = {
        className: null,
        placeholder: '',
        defaultValue: null,
        onChange: null,
        showPersons: true,
        showSites: false
    };

    constructor(props) {
        super();
        const { showPersons, showSites, defaultValue } = props;

        this.state = {
            persons: [],
            sites: [],
            showPopup: false,
            value: defaultValue
        };

        if (defaultValue.length === 0) {
            return;
        }

        Promise.all([
            showPersons ? chayns.findPerson(defaultValue) : Promise.resolve({ Value: [] }),
            showSites ? chayns.findSite(defaultValue) : Promise.resolve({ Value: [] })
        ]).then(([persons, sites]) => {
            this.setState({
                persons: persons.Value || [],
                sites: sites.Value || []
            });
        });
    }

    componentDidMount() {
        document.addEventListener('click', this.handleBlur);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleBlur);
    }

    handleOnChange = (event) => {
        const { value } = event.target;

        this.setState({
            value
        });

        if (value.length < 3) {
            return;
        }

        const { showPersons, showSites } = this.props;
        Promise.all([
            showPersons ? chayns.findPerson(value) : Promise.resolve({ Value: [] }),
            showSites ? chayns.findSite(value) : Promise.resolve({ Value: [] })
        ]).then(([persons, sites]) => {
            this.setState({
                persons: persons.Value || [],
                sites: sites.Value || []
            });
        });
    };

    handleFocus = () => {
        this.setState({
            showPopup: true
        });
    };

    handleBlur = (e) => {
        if (isDescendant(this.ref, e.target) || e.target === this.input) {
            return;
        }

        this.setState({
            showPopup: false
        });
    };

    handleItemClick = (r) => {
        this.setState({
            showPopup: false,
            value: r.name || r.appstoreName
        });

        const { onChange } = this.props;
        if (onChange) {
            onChange(r);
        }
    };

    render() {
        const { className, showPersons, showSites, ...props } = this.props;
        const { persons, sites, showPopup, value } = this.state;

        const classNames = classnames('input', className);

        return (
            <div className="person-finder">
                <input
                    type="text"
                    className={classNames}
                    value={value}
                    {...props}
                    ref={ref => this.input = ref}
                    onChange={this.handleOnChange}
                    onFocus={this.handleFocus}
                    defaultValue={undefined}
                />
                {showPopup && (persons.length > 0 || sites.length > 0) ? (
                    <div className="person-finder__results scrollbar" ref={ref => this.ref = ref}>
                        {showPersons && persons.map(r => (
                            <div key={r.personId} className="result" onClick={() => this.handleItemClick(r)}>
                                <div className="img">
                                    <img
                                        src={`https://sub60.tobit.com/u/${r.personId}?size=40`}
                                        onError={(e) => {
                                            e.target.onError = () => {};
                                                e.target.src = '//sub60.tobit.com/Content/unknown_user.png';
                                        }}
                                    />
                                </div>
                                <div className="text">
                                    <div className="name">
                                        {r.name}
                                    </div>
                                    <div className="person-id">
                                        {`chayns® ID: ${r.personId}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {showSites && sites.map(r => (
                            <div key={r.siteId} className="result" onClick={() => this.handleItemClick(r)}>
                                <div className="img">
                                    <img
                                        src={`https://sub60.tobit.com/l/${r.siteId}?size=40`}
                                        onError={(e) => {
                                            e.target.onError = () => {};
                                            e.target.src = `//graph.facebook.com/${r.facebookId}/picture`;
                                        }}
                                    />
                                </div>
                                <div className="text">
                                    <div className="name">
                                        {r.appstoreName}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : false}
            </div>
        );
    }
}
