import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';

import Input from '../../react-chayns-input/component/Input';

import MapMarker from './MapMarkerComp';

export default class Map extends Component {
    static propTypes = {
        defaultPosition: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }).isRequired,
        mapId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        mapOptions: PropTypes.shape({
            defaultZoom: PropTypes.number,
            onPositionChange: PropTypes.func,
            disableDefaultUI: PropTypes.bool,
            reference: PropTypes.func,
            disableDefaultStyles: PropTypes.bool,
            mapStyles: PropTypes.arrayOf(PropTypes.shape({
                featureType: PropTypes.string,
                elementType: PropTypes.string,
                stylers: PropTypes.arrayOf(PropTypes.object),
            })),

        }),
        inputOptions: PropTypes.shape({
            onInputChange: PropTypes.func,
            inputRef: PropTypes.func,
            placeholder: PropTypes.string,
        }),
        markerOptions: PropTypes.shape({
            icon: PropTypes.object,
            bgImg: PropTypes.string,
            onIconClick: PropTypes.func,
        }),

    };

    static defaultProps = {
        mapOptions: {
            defaultZoom: 13,
            disableDefaultUI: false,
            disableDefaultStyles: false,
            onPositionChange: () => {
            },
            reference: () => {
            },
            mapStyles: [],
        },
        inputOptions: {
            onInputChange: () => {
            },
            inputRef: () => {
            },
            placeholder: '',
        },
        markerOptions: {
            icon: faLink,
            bgImg: '',
            onIconClick: () => {
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            adr: '',
            pos: props.defaultPosition,
        };
        this.mapRef = null;
    }

    componentDidMount() {
        const { pos } = this.state;
        this.getAddress(pos);

        this.initMap()
            .then(() => {
                this.concatMapStyles();
            })
            .catch((err) => {
                if (window.debugLevel >= 3) {
                    // eslint-disable-next-line no-console
                    console.debug(err);
                }
            });
    }

    getAddress(geopoint) {
        // eslint-disable-next-line no-undef
        const address = new google.maps.Geocoder();
        address.geocode({ location: geopoint }, (result, status) => {
            if (status === 'OK') {
                let adrs = result[0].formatted_address.split(/(.+),/)[1];
                adrs = adrs.substring(0, adrs.indexOf(','));
                this.setState({
                    adr: adrs,
                });
            }
        });
    }

    concatMapStyles() {
        const { mapOptions } = this.props;

        const defaultStyles = [{
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [{
                visibility: 'on',
            }],
        }, {
            featureType: 'landscape',
            elementType: 'labels',
            stylers: [{
                visibility: 'off',
            }],
        }, {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{
                visibility: 'off',
            }],
        }, {
            featureType: 'water',
            elementType: 'labels',
            stylers: [{
                visibility: 'off',
            }],
        }];
        if (!mapOptions.disableDefaultStyles) {
            this.mapStyles = defaultStyles.concat(mapOptions.mapStyles);
        } else {
            this.mapStyles = mapOptions.mapStyles;
        }
    }

    initMap() {
        const {
            mapOptions,
            defaultPosition,
        } = this.props;
        const {
            defaultZoom,
            disableDefaultUI,
        } = mapOptions;
        return new Promise((resolve, reject) => {
            try {
                // eslint-disable-next-line no-undef
                this.mapRef = new google.maps.Map(this.map, {
                    zoom: defaultZoom,
                    center: defaultPosition,
                    disableDefaultUI,
                    styles: this.mapStyles,
                });
                this.mapRef.addListener('center_changed', () => {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        const center = this.mapRef.getCenter();
                        const currentPos = {
                            lat: center.lat(),
                            lng: center.lng(),
                        };
                        this.getAddress(currentPos);
                        mapOptions.onPositionChange(currentPos);
                    }, 500);
                });
                const options = {
                    componentRestrictions: { country: 'de' },
                };
                // eslint-disable-next-line no-undef
                const autocomplete = new google.maps.places.Autocomplete(this.inputRef, options);
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (!place.geometry) {
                        return;
                    }
                    this.mapRef.setCenter(place.geometry.location);
                    this.mapRef.setZoom(17);
                });
            } catch (err) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                    message: 'Error in google.maps',
                    error: err,
                });
                return;
            }

            if (this.mapRef === null) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                    message: 'Map is null',
                });
                return;
            }
            mapOptions.reference(this.mapRef);

            resolve();
        });
    }

    render() {
        const {
            markerOptions, mapId, inputOptions,
        } = this.props;
        const { adr } = this.state;
        return (
            <div className="cc__map" id="map_comp">
                <div
                    className="mapBorder"
                    style={{
                        minHeight: '226px',
                    }}
                >
                    <div
                        className="centerMarker"

                    >
                        <MapMarker
                            onClick={() => {
                                markerOptions.onIconClick();
                            }}
                            icon={markerOptions.icon}
                            bgImg={markerOptions.bgImg}
                            style={{ transform: 'scale(1.5)' }}

                        />
                    </div>
                    <div
                        className="mapDiv"
                        ref={(el) => {
                            this.map = el;
                        }}
                        id={`map${mapId}`}

                    />
                </div>
                <div
                    id="map__comp--overlay"
                    className="chayns__background-color--shade-1"
                >
                    <MapMarker
                        onClick={() => {
                            markerOptions.onIconClick();
                        }}
                        icon={markerOptions.icon}
                        bgImg={markerOptions.bgImg}
                        style={{ transform: 'scale(1.3)' }}

                    />
                    <Input
                        placeholder={inputOptions.placeholder}
                        value={adr}
                        key="adr"
                        inputRef={(obj) => {
                            this.inputRef = obj;
                            inputOptions.inputRef(obj);
                        }}
                        onChange={(address) => {
                            this.setState({
                                adr: address,
                            });
                            inputOptions.onInputChange(address);
                        }}
                    />
                </div>
            </div>
        );
    }
}
