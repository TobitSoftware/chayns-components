export type CodeReaderOnScanCallback = (code: {
    format: BarcodeFormat;
    value: string;
}) => void | Promise<void>;

export enum ScannerErrorType {
    NO_CAMERA_ACCESS,
    CAMERA_ALREADY_IN_USE,
    DEVICE_NOT_FOUND,
    UNKNOWN,
}

export interface ScannerErrorMessages {
    noPermission: string;
    alreadyInUse: string;
    cameraNotAvailable: string;
    noCodeFound: string;
}
