interface MediaTrackCapabilities {
    zoom: {
        min: number;
        max: number;
        step?: number;
    };
}

interface MediaTrackConstraintSet {
    zoom?: number;
    torch?: boolean;
}

interface MediaTrackSettings {
    zoom: number;
}
