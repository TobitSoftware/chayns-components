/* eslint-disable react/forbid-prop-types */
/* global google */
import React, {
    PureComponent,
    Children,
    cloneElement,
    createRef,
} from 'react';

import PropTypes from 'prop-types';

import { toPropTypes, toHandlerName } from './PropTypes';

const events = [
    'bounds_changed',
    'center_changed',
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'heading_changed',
    'idle',
    'maptypeid_changed',
    'mousemove',
    'mouseout',
    'mouseover',
    'projection_changed',
    'rightclick',
    'tilesloaded',
    'tilt_changed',
    'zoom_changed',
];

/**
 * A react component wrapper around the google maps JS API.
 */
class GoogleMap extends PureComponent {
    constructor(props) {
        super(props);

        this.ref = createRef();
    }

    componentDidMount() {
        const { options, mapRef, children } = this.props;

        this.map = new google.maps.Map(this.ref.current, options);

        events.forEach((eventName) => {
            const { [toHandlerName(eventName)]: handler } = this.props;
            if (handler) {
                this.map.addListener(eventName, (event) => {
                    handler(this.map, event);
                });
            }
        });

        if (mapRef) {
            mapRef.current = this.map;
        }

        // Needed to render initial children correctly
        if (children) {
            this.forceUpdate();
        }
    }

    /** Passes the map instance down to children */
    renderChildren() {
        const { children } = this.props;

        if (!children) return null;

        return Children.map(children, (c) => (c ? cloneElement(c, {
            __map: this.map,
        }) : c));
    }

    render() {
        const { containerStyle } = this.props;

        return (
            <div ref={this.ref} style={containerStyle}>
                {this.renderChildren()}
            </div>
        );
    }
}

GoogleMap.propTypes = {
    /** @type {React.CSSProperties} */
    containerStyle: PropTypes.object.isRequired,
    /** @type {google.maps.MapOptions} */
    options: PropTypes.object.isRequired,
    ...toPropTypes(events, false),
};

GoogleMap.defaultProps = {
    ...toPropTypes(events, true),
};

GoogleMap.displayName = 'GoogleMap';

export default GoogleMap;
