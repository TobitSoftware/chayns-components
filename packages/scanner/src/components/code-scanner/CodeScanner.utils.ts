import { createDialog, DialogType } from 'chayns-api';

export const createErrorAlertDialog = (text: string) =>
    createDialog({
        type: DialogType.ALERT,
        text: `<p style="text-align: center;">%%DialogErrorIcon%%</p><p>${text}</p>`,
    });

export const hasBrowserSupport = (constraint: string): boolean =>
    constraint in navigator.mediaDevices.getSupportedConstraints();

export const checkTrackSupport = (track: MediaStreamTrack, capability: string): boolean =>
    hasBrowserSupport(capability) && capability in track.getCapabilities();
