import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addVisibilityChangeListener, removeVisibilityChangeListener } from 'chayns-api';
import { Icon, SmallWaitCursor } from '@chayns-components/core';
import {
    StyledCodeScanner,
    StyledCodeScannerPreview,
    StyledCodeScannerTextWrapper,
} from './CodeScanner.styles';
import {
    CodeReaderOnScanCallback,
    ScannerErrorMessages,
    ScannerErrorType,
} from '../../types/codeScanner';
import {
    ALL_FORMATS,
    DEFAULT_TRACK_CONSTRAINTS,
    DEFAULT_VIDEO_CONSTRAINTS,
} from '../../constants/codeScanner';
import { checkTrackSupport } from '../../utils/support';
import { createErrorAlertDialog } from '../../utils/errorDialog';
import ScannerToolbar from './scanner-toolbar/ScannerToolbar';
import { useScannerPolyfill } from '../../hooks/loadscript';

type CodeScannerProps = {
    /**
     * Defines which barcode formats are allowed to be detected.
     */
    allowedFormats?: Array<BarcodeFormat>;
    /**
     * The interval of the scans.
     */
    scanInterval?: number;
    /**
     * Custom error messages for various scanner states or failures.
     */
    errorMessages: ScannerErrorMessages;
    /**
     * Disables the file select feature if set to true.
     */
    isFileSelectDisabled?: boolean;
    /**
     * Disables the torch (flashlight) feature if set to true.
     */
    isTorchDisabled?: boolean;
    /**
     * Disables the zoom control if set to true.
     */
    isZoomDisabled?: boolean;
    /**
     * Maximum allowed zoom level for the camera.
     */
    maxZoom?: number;
    /**
     * Minimum allowed zoom level for the camera.
     */
    minZoom?: number;
    /**
     * Callback function triggered when a code is successfully scanned.
     */
    onScan?: CodeReaderOnScanCallback;
    /**
     * If true, allows scanning the same code multiple times in a row.
     */
    shouldTriggerForSameCode?: boolean;
    /**
     * Custom media track constraints for controlling the video input.
     */
    trackConstraints?: MediaTrackConstraints;
    /**
     * Additional video constraints for the camera feed.
     */
    videoConstraints?: MediaTrackConstraints;
};

const CodeScanner: FC<CodeScannerProps> = ({
    shouldTriggerForSameCode = false,
    onScan,
    allowedFormats = ALL_FORMATS,
    trackConstraints = DEFAULT_TRACK_CONSTRAINTS,
    videoConstraints = DEFAULT_VIDEO_CONSTRAINTS,
    minZoom = 2,
    maxZoom = 10,
    isFileSelectDisabled = false,
    isTorchDisabled = false,
    isZoomDisabled = false,
    scanInterval = 250,
    errorMessages,
}) => {
    const [isPolyfillLoaded, setIsPolyfillLoaded] = useState(false);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
    const [barcodeDetector, setBarcodeDetector] = useState<BarcodeDetector>();
    const [stream, setStream] = useState<MediaStream>();
    const [scannerError, setScannerError] = useState<ScannerErrorType | undefined>(undefined);
    const [isScanningFile, setIsScanningFile] = useState(false);
    const [isHandlingCode, setIsHandlingCode] = useState(false);
    const lastCode = useRef<string>();
    const handleStopRef = useRef<() => void>();
    const prevValueRef = useRef<{ value: string; timestamp: number }>({
        value: '',
        timestamp: 0,
    });

    const { loadQrCodeDetector } = useScannerPolyfill();

    const errorText = useMemo(() => {
        if (typeof scannerError === 'undefined') {
            return undefined;
        }

        switch (scannerError) {
            case ScannerErrorType.NO_CAMERA_ACCESS:
                return errorMessages.noPermission;
            case ScannerErrorType.CAMERA_ALREADY_IN_USE:
                return errorMessages.alreadyInUse;
            default:
                return errorMessages.cameraNotAvailable;
        }
    }, [errorMessages, scannerError]);

    const handleScan = useCallback(
        (code: { format: BarcodeFormat; value: string }) => {
            if (!onScan) return;

            const now = Date.now();

            if (!prevValueRef.current) {
                prevValueRef.current = { value: '', timestamp: 0 };
            }

            const { value: prevValue, timestamp: prevTimestamp } = prevValueRef.current;

            if (code.value === prevValue && now - prevTimestamp < scanInterval * 3) {
                return;
            }

            prevValueRef.current = { value: code.value, timestamp: now };

            const result = onScan(code);
            if (result instanceof Promise) {
                setIsHandlingCode(true);
                void result.finally(() => setIsHandlingCode(false));
            }
        },
        [onScan, scanInterval],
    );

    const handleScanResult = useCallback(
        (result: Array<DetectedBarcode>) => {
            if (!result.length) return;

            const code = result[0];

            if (!code) {
                return;
            }

            if (allowedFormats && !allowedFormats.includes(code.format)) {
                return;
            }

            if (shouldTriggerForSameCode) {
                handleScan({ format: code.format, value: code.rawValue });
                return;
            }

            if (lastCode.current && code.rawValue === lastCode.current) {
                return;
            }

            lastCode.current = code.rawValue;
            handleScan({ format: code.format, value: code.rawValue });
        },
        [handleScan, shouldTriggerForSameCode, allowedFormats],
    );

    const handleVideoInitialization = useCallback(async () => {
        if (!navigator.mediaDevices.getUserMedia || !videoRef || !isPolyfillLoaded) return;

        let res: MediaStream | undefined;

        try {
            res = await navigator.mediaDevices.getUserMedia({
                video: videoConstraints,
            });
        } catch (e) {
            const error = e as Error;

            if (error.name === 'NotAllowedError') {
                setScannerError(ScannerErrorType.NO_CAMERA_ACCESS);
            } else if (error.name === 'NotReadableError') {
                setScannerError(ScannerErrorType.CAMERA_ALREADY_IN_USE);
            } else if (error.name === 'NotFoundError') {
                setScannerError(ScannerErrorType.DEVICE_NOT_FOUND);
            } else {
                setScannerError(ScannerErrorType.UNKNOWN);
                console.warn(e);
            }
        }

        if (res) {
            res.getVideoTracks().forEach((elem) => {
                const constraints = {
                    ...trackConstraints,
                    advanced: trackConstraints.advanced?.map((a) => ({ ...a })) || [],
                };

                if (checkTrackSupport(elem, 'zoom')) {
                    constraints.advanced.push({ zoom: minZoom });
                }

                void elem.applyConstraints(constraints);
            });

            setStream(res);

            videoRef.srcObject = res;

            await videoRef.play();
        }

        const codeDetector = new BarcodeDetector(
            allowedFormats ? { formats: allowedFormats } : undefined,
        );

        setBarcodeDetector(codeDetector);
    }, [isPolyfillLoaded, minZoom, trackConstraints, allowedFormats, videoConstraints, videoRef]);

    const handleStopCameraAccess = useCallback(() => {
        if (videoRef) {
            videoRef.pause();
        }

        if (barcodeDetector) {
            setBarcodeDetector(undefined);
        }

        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(undefined);
        }
    }, [barcodeDetector, stream, videoRef]);

    // Load BarCodeDetector
    useEffect(() => {
        void loadQrCodeDetector().then(() => {
            setIsPolyfillLoaded(true);
        });

        return () => {
            if (handleStopRef.current) handleStopRef.current();
        };
    }, [loadQrCodeDetector]);

    useEffect(() => {
        handleStopRef.current = handleStopCameraAccess;
    }, [handleStopCameraAccess]);

    useEffect(() => {
        const idPromise = addVisibilityChangeListener(({ isVisible }) => {
            if (!isVisible) {
                handleStopCameraAccess();
            } else {
                void handleVideoInitialization();
            }
        });

        return () => {
            void idPromise.then((id) => {
                void removeVisibilityChangeListener(id);
            });
        };
    }, [handleStopCameraAccess, handleVideoInitialization]);

    useEffect(() => {
        if (!barcodeDetector || !videoRef) return undefined;

        if (!isScanningFile && !isHandlingCode) {
            const interval = setInterval(() => {
                void barcodeDetector.detect(videoRef).then(handleScanResult);
            }, scanInterval);

            return () => clearInterval(interval);
        }

        return undefined;
    }, [barcodeDetector, handleScanResult, isHandlingCode, isScanningFile, videoRef, scanInterval]);

    useEffect(() => {
        if (
            !navigator.mediaDevices.enumerateDevices ||
            !navigator.mediaDevices.getUserMedia ||
            !videoRef ||
            !isPolyfillLoaded
        ) {
            return;
        }

        void handleVideoInitialization();
    }, [handleVideoInitialization, isPolyfillLoaded, videoRef]);

    return (
        <StyledCodeScanner>
            {(!barcodeDetector || errorText) && (
                <StyledCodeScannerTextWrapper>
                    {!barcodeDetector && !errorText && <SmallWaitCursor />}
                    {errorText && (
                        <>
                            <Icon
                                icons={['fa fa-webcam-slash']}
                                size={40}
                                color="rgb(128, 128, 128)"
                            />
                            {errorText}
                        </>
                    )}
                </StyledCodeScannerTextWrapper>
            )}
            <StyledCodeScannerPreview
                ref={setVideoRef}
                autoPlay
                playsInline
                height="100%"
                width="100%"
                $isVisible={!!barcodeDetector && !errorText}
            />
            {!!barcodeDetector && (
                <ScannerToolbar
                    videoConstraints={videoConstraints}
                    onFileSelect={(data) => {
                        setIsScanningFile(true);

                        void barcodeDetector
                            .detect(data)
                            .then((value) => {
                                if (value.length) {
                                    handleScanResult(value);
                                } else {
                                    void createErrorAlertDialog(errorMessages.noCodeFound).open();
                                }
                            })
                            .finally(() => setIsScanningFile(false));
                    }}
                    isScanningFile={isScanningFile}
                    hasScannerError={typeof scannerError !== 'undefined'}
                    stream={stream}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    isZoomDisabled={isZoomDisabled}
                    isTorchDisabled={isTorchDisabled}
                    isFileSelectDisabled={isFileSelectDisabled}
                />
            )}
        </StyledCodeScanner>
    );
};

export default CodeScanner;
