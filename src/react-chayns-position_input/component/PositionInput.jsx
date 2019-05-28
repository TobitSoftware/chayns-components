import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    };

    handleUserPan = (map) => {
        const { onPositionChange } = this.props;

        const center = toLiteral(map.getCenter());
        onPositionChange(center);
    }

    render() {
        const {
            defaultPosition,
            mapOptions,
        } = this.props;

        return (
            <div className="cc__map">
                <div className="map--crosshair">
                    +
                </div>
                <GoogleMap
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
            </div>
        );
    }
}
