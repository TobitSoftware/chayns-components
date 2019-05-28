import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import Coordinates from 'coordinate-parser';
import Input from '../../react-chayns-input/component/Input';
import GoogleMap from './GoogleMap/GoogleMap';
import { PositionProps } from './GoogleMap/PropTypes';
import './styles.scss';

/** Uses the `toJSON()` method to return a human readable-object */
const toLiteral = value => JSON.parse(JSON.stringify(value));

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

        this.state = {
            value: '',
        };

        /** @type {React.RefObject<google.maps.Map>} */
        this.mapRef = createRef();
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
        } catch (e) { /* Invalid coordinates, ignore */ }
    }

    render() {
        const {
            defaultPosition,
            mapOptions,
            children,
        } = this.props;

        const {
            value,
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
                        </div>
                    )
                }
            </div>
        );
    }
}
