import type { IPolygonOptions, IPosition } from './PositionInput.types';

export const DEFAULT_POLYGON_OPTIONS: IPolygonOptions = {
    strokeColor: '#000000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#808080',
    fillOpacity: 0.25,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
};

export const DEFAULT_POSITION: IPosition = {
    lat: 52.067450969671796,
    lng: 7.017417,
};
