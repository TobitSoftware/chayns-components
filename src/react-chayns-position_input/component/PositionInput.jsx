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

/** Uses the `toJSON()` method to return a human readable-object */
const toLiteral = value => JSON.parse(JSON.stringify(value));

const ADDRESS = 1;
const COORDS = 2;

const noop = () => {};

export default class PositionInput extends PureComponent {
    static propTypes = {
        defaultPosition: PositionProps.isRequired,
        onPositionChange: PropTypes.func,
        mapOptions: PropTypes.object,
        children: PropTypes.func,
    };

    static defaultProps = {
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
            <Input
                placeholder="Position"
                value={value}
                onChange={onChange}
            />
        ),
    };

    constructor(props) {
        super(props);

        if (!window.google) {
            throw new Error('The google maps JS API could not be found. Did you forget to include the script? See https://developers.google.com/maps/documentation/javascript/get-api-key for more details.');
        }

        this.autocomplete = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();

        this.state = {
            value: '',
            addresses: [],
            currentInputType: ADDRESS,
        };

        /** @type {React.RefObject<google.maps.Map>} */
        this.mapRef = createRef();

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
    }

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
    }

    handleInputChange = (value) => {
        this.setState({ value });

        try {
            const { onPositionChange } = this.props;
            const { latitude: lat, longitude: lng } = new Coordinates(value);
            const position = { lat, lng };
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
    }

    getAddresses = (value) => {
        const { defaultPosition: { lat, lng } } = this.props;

        this.autocomplete.getPlacePredictions({
            location: new google.maps.LatLng(lat, lng),
            radius: 10000,
            input: value,
        }, (result, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    addresses: result.map(a => a.description),
                });
            }
        });
    }

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
    }

    render() {
        const {
            defaultPosition,
            mapOptions,
            children,
        } = this.props;

        const {
            value,
            addresses,
            currentInputType,
        } = this.state;

        return (
            <div className="cc__map">
                <div className="map--crosshair">
                    {'+'}
                </div>
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
                        <div className="map--overlay chayns__background-color--shade-1">
                            {children(value, this.handleInputChange)}
                            <div className="map--autocomplete_popup_root">
                                <div className="map--autocomplete_popup">
                                    {
                                        currentInputType === ADDRESS && addresses.map((a, index) => (
                                            <AutocompleteItem
                                                index={index}
                                                address={a}
                                                onClick={this.selectAddress}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}
