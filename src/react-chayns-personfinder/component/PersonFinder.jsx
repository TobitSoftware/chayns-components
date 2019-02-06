/* eslint-disable no-return-assign, jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import isDescendant from '../../utils/isDescendant';

export default class PersonFinder extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        showPersons: PropTypes.bool,
        showSites: PropTypes.bool,
        stopPropagation: PropTypes.bool,
        parent: PropTypes.node,
    };

    static defaultProps = {
        className: null,
        style: null,
        placeholder: '',
        defaultValue: '',
        onChange: null,
        showPersons: true,
        showSites: false,
        stopPropagation: false,
        parent: document.getElementsByClassName('tapp')[0],
    };

    constructor(props) {
        super();
        const { showPersons, showSites, defaultValue } = props;

        this.state = {
            persons: [],
            sites: [],
            showPopup: false,
            value: defaultValue,
            personsStatusCode: 0,
            sitesStatusCode: 0,
        };

        if (defaultValue.length === 0) {
            return;
        }

        Promise.all([
            showPersons ? chayns.findPerson(defaultValue) : Promise.resolve({ Value: [] }),
            showSites ? chayns.findSite(defaultValue) : Promise.resolve({ Value: [] })
        ])
            .then(([persons, sites]) => {
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

    clear = () => {
        this.setState({
            persons: [],
            sites: [],
            showPopup: false,
            value: '',
            personsStatusCode: 0,
            sitesStatusCode: 0,
        });

        const { onChange } = this.props;
        if (onChange) {
            onChange(null);
        }
    };

    handleOnChange = (event) => {
        const { value } = event.target;

        this.setState({
            value
        });

        if (value.length === 0) {
            this.clear();
            return;
        }

        if (value.length < 3) {
            return;
        }

        const { showPersons, showSites } = this.props;
        Promise.all([
            showPersons ? chayns.findPerson(value) : Promise.resolve({
                Value: [],
                Status: {}
            }),
            showSites ? chayns.findSite(value) : Promise.resolve({
                Value: [],
                Status: {}
            })
        ])
            .then(([persons, sites]) => {
                this.setState({
                    persons: persons.Value || [],
                    sites: sites.Value || [],
                    personsStatusCode: persons.Status.ResultCode,
                    sitesStatusCode: sites.Status.ResultCode,
                    showPopup: true,
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

    handleItemClick = (r, e) => {
        const { onChange, stopPropagation } = this.props;

        this.setState({
            showPopup: false,
            value: r.name || r.appstoreName
        });

        if (onChange) onChange(r);
        if (stopPropagation) e.stopPropagation();
    };

    render() {
        const {
            className, showPersons, showSites, style, stopPropagation, parent, ...props
        } = this.props;
        const {
            persons, sites, showPopup, value, personsStatusCode, sitesStatusCode,
        } = this.state;
        const rect = this.input && this.input.getBoundingClientRect();

        return [
            createPortal(showPopup && (persons.length > 0 || sites.length > 0 || personsStatusCode > 0 || sitesStatusCode > 0) && rect && value
                ? (
                    <div
                        className="person-finder__results scrollbar"
                        style={this.input ? {
                            width: `${rect.width}px`,
                            top: `${rect.bottom}px`,
                            left: `${rect.left}px`
                        } : null}
                        ref={ref => this.ref = ref}
                    >
                        {
                            personsStatusCode === 2 || sitesStatusCode === 2
                                ? <div className="person-finder__message">Zu viele Ergebnisse gefunden</div>
                                : null
                        }
                        {
                            personsStatusCode === 1 || sitesStatusCode === 1
                                ? <div className="person-finder__message">Keine passenden Ergebnisse gefunden</div>
                                : null
                        }
                        {showPersons && persons.map(r => (
                            <div key={r.personId} className="result" onClick={e => this.handleItemClick(r, e)}>
                                <div className="img">
                                    <img
                                        src={`https://sub60.tobit.com/u/${r.personId}?size=40`}
                                        onError={(e) => {
                                            e.target.onError = () => {
                                            };
                                            e.target.src = '//sub60.tobit.com/Content/unknown_user.png';
                                        }}
                                        alt=""
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
                            <div key={r.siteId} className="result" onClick={e => this.handleItemClick(r, e)}>
                                <div className="img">
                                    <img
                                        src={`https://sub60.tobit.com/l/${r.siteId}?size=40`}
                                        onError={(e) => {
                                            e.target.onError = () => {
                                            };
                                            e.target.src = `//graph.facebook.com/${r.facebookId}/picture`;
                                        }}
                                        alt=""
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
                )
                : null,
                parent),
            <input
                type="text"
                className={classNames('input', className)}
                value={value}
                {...props}
                ref={ref => this.input = ref}
                onChange={this.handleOnChange}
                onFocus={this.handleFocus}
                defaultValue={undefined}
                style={style}
                onClick={stopPropagation ? event => event.stopPropagation() : null}
            />
        ];
    }
}
