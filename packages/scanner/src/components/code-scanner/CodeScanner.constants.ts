export const ALL_FORMATS: Array<BarcodeFormat> = [
    'code_128',
    'code_39',
    'code_93',
    'codabar',
    'ean_13',
    'ean_8',
    'itf',
    'qr_code',
    'upc_a',
    'upc_e',
];

export const DEFAULT_VIDEO_CONSTRAINTS: MediaTrackConstraints = {
    facingMode: {
        ideal: 'environment',
    },
};

export const DEFAULT_TRACK_CONSTRAINTS: MediaTrackConstraints = {
    width: 640,
    height: 480,
    frameRate: 25,
    noiseSuppression: false,
    facingMode: 'environment',
};
