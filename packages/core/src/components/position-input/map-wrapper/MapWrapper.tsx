import React, { FC, type ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
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
    const [polygonPath, setPolygonPath] = useState<Position[]>();
    const [canPolyDraw, setCanPolyDraw] = useState(false);
    const [zoom, setZoom] = useState(initialZoom);
    const [center, setCenter] = useState<Position>(initialPosition);
    const [internalMarkers, setInternalMarkers] = useState<IMarker[]>();
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (markers) {
            setInternalMarkers(markers);
        }
    }, [markers]);

    const handleClick = useCallback(
        (e: google.maps.MapMouseEvent) => {
            const latLng = e.latLng?.toJSON();

            if (!latLng) {
                return;
            }

            setInternalMarkers((prevState) => {
                if (prevState && prevState.length >= 2) {
                    return prevState;
                }

                const newMarker: IMarker = {
                    position: { lat: latLng.lat, lng: latLng.lng },
                    id: prevState ? prevState.length : 0,
                };

                if (typeof onMarkerAdd === 'function') {
                    onMarkerAdd(newMarker);
                }

                return prevState ? [...prevState, newMarker] : [newMarker];
            });
        },
        [onMarkerAdd],
    );

    useEffect(() => {
        if (!internalMarkers) {
            return;
        }

        if (internalMarkers.length !== 2) {
            setCanPolyDraw(false);

            return;
        }

        const path: Position[] = [
            {
                lat: internalMarkers[0]?.position.lat ?? 0,
                lng: internalMarkers[0]?.position.lng ?? 0,
            },
            {
                lat: internalMarkers[0]?.position.lat ?? 0,
                lng: internalMarkers[1]?.position.lng ?? 0,
            },
            {
                lat: internalMarkers[1]?.position.lat ?? 0,
                lng: internalMarkers[1]?.position.lng ?? 0,
            },
            {
                lat: internalMarkers[1]?.position.lat ?? 0,
                lng: internalMarkers[0]?.position.lng ?? 0,
            },
        ];

        const maxLat = path.reduce((prev, current) => (prev.lat > current.lat ? prev : current));
        const minLat = path.reduce((prev, current) => (prev.lat < current.lat ? prev : current));
        const maxLng = path.reduce((prev, current) => (prev.lng > current.lng ? prev : current));
        const minLng = path.reduce((prev, current) => (prev.lng < current.lng ? prev : current));

        const topLeft = path.find((item) => item.lat === maxLat.lat && item.lng === minLng.lng);
        const bottomRight = path.find((item) => item.lat === minLat.lat && item.lng === maxLng.lng);

        if (!topLeft || !bottomRight) {
            return;
        }

        const centerLat = (topLeft.lat + bottomRight.lat) / 2;
        const centerLng = (topLeft.lng + bottomRight.lng) / 2;

        const polygonCenter = {
            lat: centerLat,
            lng: centerLng,
        };

        if (!polygonCenter) {
            return;
        }

        setCanPolyDraw(true);
        setPolygonPath(path);
    }, [internalMarkers]);

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
            setInternalMarkers((prevState) => {
                const updatedMarkers = (prevState ?? []).map((prevMarker) => {
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
        [onMarkerChange],
    );

    const handleMarkerRemove = useCallback(
        (id: number) => {
            setInternalMarkers((prevState) => {
                if (typeof onMarkerRemove === 'function') {
                    onMarkerRemove(id);
                }

                return prevState ? prevState.filter((marker) => marker.id !== id) : [];
            });
        },
        [onMarkerRemove],
    );

    const markerList = useMemo(() => {
        const items: ReactElement[] = [];

        if (!internalMarkers) {
            return items;
        }

        internalMarkers.forEach(({ id, position }) => {
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
    }, [handleMarkerChange, handleMarkerRemove, internalMarkers, map]);

    return useMemo(
        () => (
            <StyledMapWrapper>
                <Wrapper apiKey={apiToken} libraries={['places']}>
                    {/* ToDo find better solution */}
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
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
                        {markerList}
                        {canPolyDraw && <Polygon path={polygonPath} options={polygonOptions} />}
                    </Map>
                </Wrapper>
            </StyledMapWrapper>
        ),
        [apiToken, handleClick, center, zoom, markerList, canPolyDraw, polygonPath, polygonOptions],
    );
};

MapWrapper.displayName = 'MapWrapper';

export default MapWrapper;
