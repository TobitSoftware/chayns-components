export interface PolygonOptions {
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    fillColor: string;
    fillOpacity: number;
    clickable: boolean;
    draggable: boolean;
    editable: boolean;
    visible: boolean;
    radius: number;
    zIndex: number;
}

export interface Position {
    lat: number;
    lng: number;
}

export interface IMarker {
    position: Position;
    id: number;
}
