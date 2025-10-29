import { FC, useEffect, useState } from 'react';
import type { IMarker, IPosition } from '../../../PositionInput.types';

export type MarkerProps = {
    id: number;
    position: IPosition;
    isDraggable: boolean;
    onChange: (marker: IMarker) => void;
    onRemove: (id: number) => void;
    map?: google.maps.Map;
};

const Marker: FC<MarkerProps> = ({ id, isDraggable, position, onChange, onRemove, map }) => {
    const [pin, setPin] = useState<google.maps.Marker>();

    useEffect(() => {
        if (pin) {
            google.maps.event.addListener(pin, 'dragend', (evt: google.maps.MapMouseEvent) => {
                const newLat = evt.latLng?.lat();
                const newLng = evt.latLng?.lng();

                if (!newLat || !newLng) {
                    return;
                }

                onChange({ id, position: { lng: newLng, lat: newLat } });
            });

            google.maps.event.addListener(pin, 'rightclick', () => {
                onRemove(id);
            });
        }
    }, [pin, id, onChange, onRemove]);

    useEffect(() => {
        if (!pin) {
            setPin(new google.maps.Marker({ map }));
        }

        // remove marker from map on unmount
        return () => {
            if (pin) {
                pin.setMap(null);
            }
        };
    }, [pin, map]);

    useEffect(() => {
        if (pin) {
            pin.setOptions({
                draggable: isDraggable,
                position,
                map,
            });
        }
    }, [pin, isDraggable, position, map]);

    return null;
};

Marker.displayName = 'Marker';

export default Marker;
