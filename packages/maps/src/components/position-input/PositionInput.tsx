import { Input } from '@chayns-components/core';
import React, { FC } from 'react';
import { DEFAULT_POLYGON_OPTIONS, DEFAULT_POSITION } from '../../constants/positionInput';
import type { IMarker, PolygonOptions, Position } from '../../types/positionInput';
import MapWrapper from './map-wrapper/MapWrapper';
import { StyledPositionInput, StyledPositionInputSearch } from './PositionInput.styles';

export type PositionInputProps = {
    /**
     * The api token for google maps.
     */
    apiToken: string;
    /**
     * The position of the center of the map on the initial render.
     */
    initialPosition?: Position;
    /**
     * Markers that should be displayed.
     */
    markers?: IMarker[];
    /**
     * Function to be executed when a marker is added.
     */
    onMarkerAdd?: (marker: IMarker) => void;
    /**
     * Function to be executed when a marker position is changed.
     */
    onMarkerChange?: (markers: IMarker[]) => void;
    /**
     * Function to be executed when a marker is removed.
     */
    onMarkerRemove?: (id: number) => void;
    /**
     * Options to style the polygon.
     */
    polygonOptions?: PolygonOptions;
    /**
     * The placeholder of the search input.
     */
    searchPlaceholder?: string;
    /**
     * The zoom of the map.
     */
    zoom?: number;
};

const PositionInput: FC<PositionInputProps> = ({
    searchPlaceholder,
    apiToken,
    polygonOptions = DEFAULT_POLYGON_OPTIONS,
    initialPosition = DEFAULT_POSITION,
    zoom = 13,
    markers,
    onMarkerRemove,
    onMarkerChange,
    onMarkerAdd,
}) => (
    <StyledPositionInput>
        <StyledPositionInputSearch>
            <Input id="auto-complete-input" placeholder={searchPlaceholder} />
        </StyledPositionInputSearch>
        <MapWrapper
            apiToken={apiToken}
            polygonOptions={polygonOptions}
            initialPosition={initialPosition}
            initialZoom={zoom}
            markers={markers}
            onMarkerAdd={onMarkerAdd}
            onMarkerChange={onMarkerChange}
            onMarkerRemove={onMarkerRemove}
        />
    </StyledPositionInput>
);

PositionInput.displayName = 'PositionInput';

export default PositionInput;
