/* global google */
import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import Coordinates from 'coordinate-parser';
import Input from '../../react-chayns-input/component/Input';
import GoogleMap from './GoogleMap/GoogleMap';
import AutocompleteItem from './AutocompleteItem';
import { PositionProps } from './GoogleMap/PropTypes';
import debounce from '../../utils/debounce';
import './styles.scss';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';

/** Uses the `toJSON()` method to return a human readable-object */
const toLiteral = (value) => JSON.parse(JSON.stringify(value));

const ADDRESS = 1;
const COORDS = 2;

const noop = () => {
};

export default class PositionInput extends PureComponent {
    constructor(props) {
        super(props);

        if (!window.google) {
            // eslint-disable-next-line max-len
            throw new Error('The google maps JS API could not be found. Did you forget to include the script? See https://developers.google.com/maps/documentation/javascript/get-api-key for more details.');
        }

        this.autocomplete = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();

        this.state = {
            value: '',
            addresses: [],
            currentInputType: ADDRESS,
            overlayPosition: {
                width: 0,
                left: 0,
                bottom: 0,
            },
        };

        /** @type {React.RefObject<google.maps.Map>} */
        this.mapRef = createRef();
        this.mapOverlayRef = createRef();

        this.getAddresses = debounce(this.getAddresses, 500);

        this.setAddress(props.defaultPosition);
    }

    setAddress = (position) => {
        this.geocoder.geocode({ location: position }, (result, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                this.setState({
                    value: result[0].formatted_address,
                });
            }
        });
    };

    handleUserPan = (map) => {
        const { onPositionChange } = this.props;
        const { currentInputType } = this.state;

        const center = toLiteral(map.getCenter());
        onPositionChange(center);

        if (currentInputType === COORDS) {
            this.setState({
                value: `${center.lat.toFixed(4)}  ${center.lng.toFixed(4)}`,
            });
        } else {
            this.setAddress(center);
        }
    };

    handleInputChange = (value) => {
        this.setState({
            value,
            overlayPosition: this.mapOverlayRef.current.getBoundingClientRect(),
        });

        try {
            const { onPositionChange } = this.props;
            const { latitude: lat, longitude: lng } = new Coordinates(value);
            const position = {
                lat,
                lng,
            };
            this.mapRef.current.panTo(position);
            onPositionChange(position);

            this.setState({
                currentInputType: COORDS,
                addresses: [],
            });
        } catch (e) {
            // Invalid coordinates
            this.getAddresses(value);

            this.setState({
                currentInputType: ADDRESS,
            });
        }
    };

    changePosition = (value) => {
        const { currentInputType } = this.state;
        this.mapRef.current.panTo(value);
        if (currentInputType === COORDS) {
            this.setState({
                value: `${value.lat.toFixed(4)}  ${value.lng.toFixed(4)}`,
            });
        } else {
            this.setAddress(value);
        }
    }

    getAddresses = (value) => {
        if (value) {
            const { defaultPosition: { lat, lng } } = this.props;

            this.autocomplete.getPlacePredictions({
                location: new google.maps.LatLng(lat, lng),
                radius: 10000,
                input: value,
            }, (result, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    this.setState({
                        addresses: result.map((a) => a.description),
                    });
                }
            });
        }
    };

    selectAddress = (value) => {
        this.setState({
            value,
            addresses: [],
        });

        this.geocoder.geocode({ address: value }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                const { onPositionChange } = this.props;

                const position = toLiteral(results[0].geometry.location);
                this.mapRef.current.panTo(position);
                onPositionChange(position);
            }
        });
    };

    render() {
        const {
            defaultPosition,
            mapOptions,
            children,
            parent,
        } = this.props;

        const {
            value,
            addresses,
            currentInputType,
            overlayPosition,
        } = this.state;

        return (
            <div className="cc__map">
                <div className="map--crosshair">+</div>
                <GoogleMap
                    mapRef={this.mapRef}
                    containerStyle={{
                        height: '100%',
                        position: 'relative',
                    }}
                    options={{
                        ...mapOptions,
                        center: defaultPosition,
                    }}
                    onDragend={this.handleUserPan}
                />
                {
                    children && (
                        <div className="map--overlay" ref={this.mapOverlayRef}>
                            {children(value, this.handleInputChange, this.changePosition)}
                            <TappPortal parent={parent}>
                                <div
                                    className="map--autocomplete_popup"
                                    style={{
                                        left: `${overlayPosition.left}px`,
                                        top: `${overlayPosition.bottom}px`,
                                        width: `${overlayPosition.width}px`,
                                    }}
                                >
                                    {
                                        !!value && currentInputType === ADDRESS && addresses.map((a, index) => (
                                            <AutocompleteItem
                                                index={index}
                                                address={a}
                                                onClick={this.selectAddress}
                                                key={a}
                                            />
                                        ))
                                    }
                                </div>
                            </TappPortal>
                        </div>
                    )
                }
            </div>
        );
    }
}

PositionInput.propTypes = {
    defaultPosition: PositionProps.isRequired,
    onPositionChange: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    mapOptions: PropTypes.object,
    children: PropTypes.func,
    parent: PropTypes.node,
};

PositionInput.defaultProps = {
    onPositionChange: noop,
    mapOptions: {
        zoom: 15,
        gestureHandling: 'greedy',
        disableDefaultUI: true,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
            },
        ],
    },
    // eslint-disable-next-line react/display-name
    children: (value, onChange) => (
        <Input
            placeholder="Position"
            value={value}
            onChange={onChange}
        />
    ),
    parent: null,
};

PositionInput.displayName = 'PositionInput';
