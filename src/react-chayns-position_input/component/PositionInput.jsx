/**
 * @component
 */

/* global google */
import Coordinates from 'coordinate-parser';
import PropTypes from 'prop-types';
import React, { createRef, PureComponent } from 'react';
import Input from '../../react-chayns-input/component/Input';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';
import debounce from '../../utils/debounce';
import AutocompleteItem from './AutocompleteItem';
import GoogleMap from './GoogleMap/GoogleMap';
import './styles.scss';

/** Uses the `toJSON()` method to return a human readable-object */
const toLiteral = (value) => JSON.parse(JSON.stringify(value));

const ADDRESS = 1;
const COORDS = 2;

const noop = () => {};

/**
 * A location input with a map and text input.
 *
 * This requires the Google Maps JavaScript API with the places library enabled.
 * You can find more information about the Maps API
 * [here](https://developers.google.com/maps/documentation/javascript/overview).
 */
export default class PositionInput extends PureComponent {
    constructor(props) {
        super(props);

        if (!window.google) {
            throw new Error(
                'The google maps JS API could not be found. Did you forget to include the script? See https://developers.google.com/maps/documentation/javascript/get-api-key for more details.'
            );
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

        this.setAddress(props.defaultPosition, false);
    }

    setAddress = (position, triggerChange = true) => {
        const { onPositionChange } = this.props;

        this.geocoder.geocode({ location: position }, (result, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                this.setState({
                    value: result[0].formatted_address,
                });

                if (triggerChange){
                    onPositionChange(position, result[0].formatted_address)
                }
            }
        });
    };

    handleUserPan = (map) => {
        const { onPositionChange } = this.props;
        const { currentInputType } = this.state;

        const center = toLiteral(map.getCenter());

        if (currentInputType === COORDS) {
            onPositionChange(center);

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
            onPositionChange(position, value);

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
            this.setAddress(value, false);
        }
    };

    getAddresses = (value) => {
        if (value) {
            const {
                defaultPosition: { lat, lng },
            } = this.props;

            this.autocomplete.getPlacePredictions(
                {
                    location: new google.maps.LatLng(lat, lng),
                    radius: 10000,
                    input: value,
                },
                (result, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        this.setState({
                            addresses: result.map((a) => a.description),
                        });
                    }
                }
            );
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
                onPositionChange(position, value);
            }
        });
    };

    render() {
        const { defaultPosition, mapOptions, children, parent } = this.props;

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
                {children && (
                    <div className="map--overlay" ref={this.mapOverlayRef}>
                        {children(
                            value,
                            this.handleInputChange,
                            this.changePosition
                        )}
                        <TappPortal parent={parent}>
                            <div
                                className="map--autocomplete_popup"
                                style={{
                                    left: `${overlayPosition.left}px`,
                                    top: `${overlayPosition.bottom}px`,
                                    width: `${overlayPosition.width}px`,
                                }}
                            >
                                {!!value &&
                                currentInputType === ADDRESS &&
                                addresses.map((a, index) => (
                                    <AutocompleteItem
                                        index={index}
                                        address={a}
                                        onClick={this.selectAddress}
                                        key={a}
                                    />
                                ))}
                            </div>
                        </TappPortal>
                    </div>
                )}
            </div>
        );
    }
}

PositionInput.propTypes = {
    /**
     * The position that will be used as a starting point.
     */
    defaultPosition: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }).isRequired,

    /**
     * This will be called when the position selection changes.
     */
    onPositionChange: PropTypes.func,

    /**
     * An object with options for the Google Map. These options are documented
     * [here](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions).
     */
    mapOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types

    /**
     * A render function for creating a custom input overlay. It receives the
     * currently selected position as its first argument and an onChange-method
     * as its second argument.
     */
    children: PropTypes.func,

    /**
     * A DOM element that the overlay should be rendered into.
     */
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
    children: (value, onChange) => (
        <Input placeholder="Position" value={value} onChange={onChange} />
    ),
    parent: null,
};

PositionInput.displayName = 'PositionInput';
