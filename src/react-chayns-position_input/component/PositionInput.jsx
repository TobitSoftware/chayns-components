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

const noop = () => {};

const autocomplete = new google.maps.places.AutocompleteService();
const geocoder = new google.maps.Geocoder();


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

        this.state = {
            value: '',
            addresses: [],
        };

        /** @type {React.RefObject<google.maps.Map>} */
        this.mapRef = createRef();

        this.getAddresses = debounce(this.getAddresses, 500);
    }

    handleUserPan = (map) => {
        const { onPositionChange } = this.props;

        const center = toLiteral(map.getCenter());
        onPositionChange(center);

        this.setState({
            value: `${center.lat.toFixed(4)}  ${center.lng.toFixed(4)}`,
        });
    }

    handleInputChange = (value) => {
        this.setState({ value });

        try {
            const { onPositionChange } = this.props;
            const { latitude: lat, longitude: lng } = new Coordinates(value);
            const position = { lat, lng };
            this.mapRef.current.panTo(position);
            onPositionChange(position);
        } catch (e) {
            // Invalid coordinates
            this.getAddresses(value);
        }
    }

    getAddresses = (value) => {
        const { defaultPosition: { lat, lng } } = this.props;

        autocomplete.getPlacePredictions({
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

        geocoder.geocode({ address: value }, (results, status) => {
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
        } = this.state;

        return (
            <div className="cc__map">
                <div className="map--crosshair">
                    +
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
                                        addresses.map((a, index) => (
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
