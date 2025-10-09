export const hasBrowserSupport = (constraint: string): boolean =>
    constraint in navigator.mediaDevices.getSupportedConstraints();

export const checkTrackSupport = (track: MediaStreamTrack, capability: string): boolean =>
    hasBrowserSupport(capability) && capability in track.getCapabilities();
