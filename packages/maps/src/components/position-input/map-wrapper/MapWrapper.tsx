import React, { FC, type ReactElement, useCallback, useMemo, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { StyledMapWrapper } from './MapWrapper.styles';
import type { IMarker, PolygonOptions, Position } from '../../../types/positionInput';
import { Polygon } from '@react-google-maps/api';
import Marker from './map/marker/Marker';
import Map from './map/Map';

export type MapWrapperProps = {
    apiToken: string;
    polygonOptions: PolygonOptions;
    initialZoom: number;
    initialPosition: Position;
    markers?: IMarker[];
    onMarkerAdd?: (marker: IMarker) => void;
    onMarkerRemove?: (id: number) => void;
    onMarkerChange?: (markers: IMarker[]) => void;
};

const MapWrapper: FC<MapWrapperProps> = ({
    apiToken,
    polygonOptions,
    initialZoom,
    initialPosition,
    markers,
    onMarkerAdd,
    onMarkerRemove,
    onMarkerChange,
}) => {
    const [zoom, setZoom] = useState(initialZoom);
    const [center, setCenter] = useState<Position>(initialPosition);
    const [internalMarkers, setInternalMarkers] = useState<IMarker[]>(markers ?? []);
    const [map, setMap] = useState<google.maps.Map>();
    const currentMarkers = markers ?? internalMarkers;
    const isControlled = markers !== undefined;

    const updateInternalMarkers = useCallback(
        (updater: (prevMarkers: IMarker[]) => IMarker[]) => {
            if (!isControlled) {
                setInternalMarkers(updater);
            }
        },
        [isControlled],
    );

    const handleClick = useCallback(
        (e: google.maps.MapMouseEvent) => {
            const latLng = e.latLng?.toJSON();

            if (!latLng) {
                return;
            }

            updateInternalMarkers((prevState) => {
                if (prevState.length >= 2) {
                    return prevState;
                }

                const newMarker: IMarker = {
                    position: { lat: latLng.lat, lng: latLng.lng },
                    id: prevState.length,
                };

                if (typeof onMarkerAdd === 'function') {
                    onMarkerAdd(newMarker);
                }

                return [...prevState, newMarker];
            });
        },
        [onMarkerAdd, updateInternalMarkers],
    );

    const handleIdle = (m: google.maps.Map) => {
        setMap(m);
        setZoom(m.getZoom() ?? 0);
        setCenter(m.getCenter()?.toJSON() ?? { lat: 0, lng: 0 });
    };

    const handlePositionChange = (position: Position) => {
        setCenter(position);
    };

    const handleMarkerChange = useCallback(
        (marker: IMarker) => {
            updateInternalMarkers((prevState) => {
                const updatedMarkers = prevState.map((prevMarker) => {
                    if (prevMarker.id === marker.id) {
                        return { ...prevMarker, position: marker.position };
                    }
                    return prevMarker;
                });

                if (typeof onMarkerChange === 'function') {
                    onMarkerChange(updatedMarkers);
                }

                return updatedMarkers;
            });
        },
        [onMarkerChange, updateInternalMarkers],
    );

    const handleMarkerRemove = useCallback(
        (id: number) => {
            updateInternalMarkers((prevState) => {
                if (typeof onMarkerRemove === 'function') {
                    onMarkerRemove(id);
                }

                return prevState.filter((marker) => marker.id !== id);
            });
        },
        [onMarkerRemove, updateInternalMarkers],
    );

    const markerList = useMemo(() => {
        const items: ReactElement[] = [];

        if (!currentMarkers) {
            return items;
        }

        currentMarkers.forEach(({ id, position }) => {
            items.push(
                <Marker
                    key={`marker_${id}`}
                    id={id}
                    position={position}
                    isDraggable
                    map={map}
                    onChange={handleMarkerChange}
                    onRemove={handleMarkerRemove}
                />,
            );
        });

        return items;
    }, [currentMarkers, handleMarkerChange, handleMarkerRemove, map]);

    const polygonPath = useMemo<Position[] | undefined>(() => {
        const [firstMarker, secondMarker] = currentMarkers;

        if (!firstMarker || !secondMarker || currentMarkers.length !== 2) {
            return undefined;
        }

        return [
            {
                lat: firstMarker.position.lat,
                lng: firstMarker.position.lng,
            },
            {
                lat: firstMarker.position.lat,
                lng: secondMarker.position.lng,
            },
            {
                lat: secondMarker.position.lat,
                lng: secondMarker.position.lng,
            },
            {
                lat: secondMarker.position.lat,
                lng: firstMarker.position.lng,
            },
        ];
    }, [currentMarkers]);

    return (
        <StyledMapWrapper>
            <Wrapper apiKey={apiToken} libraries={['places']}>
                <Map
                    onClick={handleClick}
                    onIdle={handleIdle}
                    onPositionChange={handlePositionChange}
                    center={center}
                    zoom={zoom}
                    fullscreenControl={false}
                    mapTypeControl={false}
                    streetViewControl={false}
                >
                    <>
                        {markerList}
                        {polygonPath && <Polygon path={polygonPath} options={polygonOptions} />}
                    </>
                </Map>
            </Wrapper>
        </StyledMapWrapper>
    );
};

MapWrapper.displayName = 'MapWrapper';

export default MapWrapper;
