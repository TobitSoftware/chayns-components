import React, { FC, type ReactElement, useEffect, useRef, useState } from 'react';
import { StyledMap } from './Map.styles';
import type { Position } from '../../../../types/positionInput';
import { useDeepCompareEffectForMaps } from '../../../../hooks/positionInput';

export type MapProps = {
    onClick: (event: google.maps.MapMouseEvent) => void;
    onIdle: (event: google.maps.Map) => void;
    onPositionChange: (position: Position) => void;
    children: ReactElement;
    center: Position;
    zoom: number;
    fullscreenControl: boolean;
    mapTypeControl: boolean;
    streetViewControl: boolean;
};

const Map: FC<MapProps> = ({
    mapTypeControl,
    fullscreenControl,
    streetViewControl,
    children,
    onClick,
    onIdle,
    zoom,
    center,
    onPositionChange,
}) => {
    const [map, setMap] = useState<google.maps.Map>();

    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));

            const input = document.getElementById('auto-complete-input') as HTMLInputElement;

            if (!input) {
                return;
            }

            const autoComplete = new google.maps.places.Autocomplete(input, {
                // componentRestrictions: { country: ["de"] },
                fields: ['address_component', 'geometry'],
                types: ['(cities)'],
            });

            input.placeholder = '';

            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace();

                const placeLocation = place.geometry?.location;

                if (!placeLocation) {
                    return;
                }

                onPositionChange({ lat: placeLocation.lat(), lng: placeLocation.lng() });
            });
        }
    }, [ref, map, onPositionChange]);

    useEffect(() => {
        if (map) {
            map.setCenter(center);
        }
    }, [center, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions({ mapTypeControl, fullscreenControl, streetViewControl, zoom });
        }
    }, [map]);

    useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName),
            );

            if (onClick) {
                map.addListener('click', onClick);
            }

            if (onIdle) {
                map.addListener('idle', () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <StyledMap ref={ref} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return React.cloneElement(child, { map });
                }
                return null;
            })}
        </>
    );
};

Map.displayName = 'Map';

export default Map;
