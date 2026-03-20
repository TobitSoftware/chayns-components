import { FC, useEffect } from 'react';
import type { IMarker, Position } from '../../../../../types/positionInput';

export type MarkerProps = {
    id: number;
    position: Position;
    isDraggable: boolean;
    onChange: (marker: IMarker) => void;
    onRemove: (id: number) => void;
    map?: google.maps.Map;
};

const Marker: FC<MarkerProps> = ({ id, isDraggable, position, onChange, onRemove, map }) => {
    useEffect(() => {
        const pin = new google.maps.Marker({
            draggable: isDraggable,
            map,
            position,
        });

        const dragendListener = google.maps.event.addListener(
            pin,
            'dragend',
            (evt: google.maps.MapMouseEvent) => {
                const newLat = evt.latLng?.lat();
                const newLng = evt.latLng?.lng();

                if (newLat == null || newLng == null) {
                    return;
                }

                onChange({ id, position: { lng: newLng, lat: newLat } });
            },
        );

        const rightclickListener = google.maps.event.addListener(pin, 'rightclick', () => {
            onRemove(id);
        });

        return () => {
            google.maps.event.removeListener(dragendListener);
            google.maps.event.removeListener(rightclickListener);
            pin.setMap(null);
        };
    }, [id, isDraggable, map, onChange, onRemove, position]);

    return null;
};

Marker.displayName = 'Marker';

export default Marker;
