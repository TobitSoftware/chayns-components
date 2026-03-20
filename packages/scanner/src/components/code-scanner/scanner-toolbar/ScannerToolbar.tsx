import React, { FC, useEffect, useMemo, useState } from 'react';
import { Icon, selectFiles } from '@chayns-components/core';
import {
    StyledScannerToolbar,
    StyledScannerToolbarButton,
    StyledScannerToolbarPlaceholder,
} from './ScannerToolbar.styles';
import { checkTrackSupport } from '../../../utils/support';
import { animateNumericValue } from '../../../utils/animate';
import usePrevious from '../../../hooks/codeScanner';

type ScannerToolbarProps = {
    /**
     * Indicates whether the scanner currently has an active error.
     */
    hasScannerError?: boolean;
    /**
     * Disables the file select option if set to true.
     */
    isFileSelectDisabled?: boolean;
    /**
     * Disables the torch (flashlight) button if set to true.
     */
    isTorchDisabled?: boolean;
    /**
     * Indicates if a file is currently being scanned.
     */
    isScanningFile: boolean;
    /**
     * Disables the zoom slider if set to true.
     */
    isZoomDisabled?: boolean;
    /**
     * A placeholder that should be displayed inside the preview.
     */
    placeholder?: string;
    /**
     * Maximum allowed zoom level for the camera.
     */
    maxZoom?: number;
    /**
     * Minimum allowed zoom level for the camera.
     */
    minZoom?: number;
    /**
     * Callback triggered when a file is selected for scanning.
     */
    onFileSelect: (file: File) => void;
    /**
     * The active media stream used by the scanner.
     */
    stream?: MediaStream;
};

const ScannerToolbar: FC<ScannerToolbarProps> = ({
    onFileSelect,
    isScanningFile,
    hasScannerError = false,
    stream,
    minZoom: minZoomProp = 1,
    maxZoom: maxZoomProp = 3,
    isZoomDisabled = false,
    placeholder,
    isTorchDisabled = false,
    isFileSelectDisabled = false,
}) => {
    'use memo';

    const [isZoomed, setIsZoomed] = useState<boolean>();
    const previousIsZoomed = usePrevious(isZoomed);
    const [isTorchActive, setIsTorchActive] = useState(false);
    const [isImageSelectActive, setIsImageSelectActive] = useState(false);

    const trackInfo = useMemo(() => {
        const videoTracks = stream?.getVideoTracks() ?? [];

        let canZoom = false;
        let canTorch = false;
        let minZoom = minZoomProp;
        let maxZoom = maxZoomProp;

        if (!hasScannerError) {
            videoTracks.forEach((track) => {
                if (checkTrackSupport(track, 'zoom')) {
                    canZoom = true;

                    const capabilities = track.getCapabilities();

                    if (capabilities.zoom.min > minZoom) {
                        minZoom = capabilities.zoom.min;
                    }
                    if (capabilities.zoom.max < maxZoom) {
                        maxZoom = capabilities.zoom.max;
                    }
                }
                if (checkTrackSupport(track, 'torch')) {
                    canTorch = true;
                }
            });
        }

        return {
            canTorch,
            canZoom,
            maxZoom,
            minZoom,
            tracks: videoTracks,
        };
    }, [hasScannerError, maxZoomProp, minZoomProp, stream]);

    const isZoomSupported = trackInfo.canZoom && !isZoomDisabled;
    const isTorchSupported = trackInfo.canTorch && !isTorchDisabled;
    const { tracks, minZoom, maxZoom } = trackInfo;

    useEffect(() => {
        if (tracks.length > 0 && isZoomSupported) {
            if (typeof previousIsZoomed === 'undefined') {
                tracks.forEach((track) => {
                    if (checkTrackSupport(track, 'zoom')) {
                        void track.applyConstraints({
                            advanced: [{ zoom: isZoomed ? maxZoom : minZoom }],
                        });
                    }
                });
            } else if (previousIsZoomed !== isZoomed) {
                animateNumericValue(
                    previousIsZoomed ? maxZoom : minZoom,
                    isZoomed ? maxZoom : minZoom,
                    500,
                    (value) => {
                        tracks.forEach((track) => {
                            if (checkTrackSupport(track, 'zoom')) {
                                void track.applyConstraints({
                                    advanced: [{ zoom: value }],
                                });
                            }
                        });
                    },
                );
            }
        }
    }, [isZoomSupported, isZoomed, previousIsZoomed, tracks, minZoom, maxZoom]);

    useEffect(() => {
        if (tracks.length > 0 && isTorchSupported) {
            tracks.forEach((track) => {
                if (checkTrackSupport(track, 'torch')) {
                    void track.applyConstraints({
                        advanced: [{ torch: isTorchActive }],
                    });
                }
            });
        }
    }, [isTorchActive, isTorchSupported, tracks]);

    if (typeof placeholder === 'string' && placeholder.length > 0) {
        return (
            <StyledScannerToolbar>
                <StyledScannerToolbarPlaceholder>{placeholder}</StyledScannerToolbarPlaceholder>
            </StyledScannerToolbar>
        );
    }

    return (
        <StyledScannerToolbar>
            <StyledScannerToolbarButton
                $isAvailable={isTorchSupported}
                $isActive={isTorchSupported && isTorchActive}
                onClick={() => {
                    setIsTorchActive((prev) => !prev);
                }}
            >
                <Icon icons={['far fa-lightbulb']} size={25} />
            </StyledScannerToolbarButton>
            <StyledScannerToolbarButton
                $isAvailable={isZoomSupported}
                $isActive={isZoomSupported && isZoomed}
                onClick={() => {
                    setIsZoomed((prev) => !prev);
                }}
            >
                <Icon icons={['far fa-search-plus']} size={25} />
            </StyledScannerToolbarButton>
            <StyledScannerToolbarButton
                $isAvailable={!isFileSelectDisabled}
                $isActive={isImageSelectActive || isScanningFile}
                onClick={() => {
                    setIsImageSelectActive(true);
                    selectFiles({
                        multiple: false,
                        type: 'image/*',
                    })
                        .then((files) => {
                            if (files && files[0]) {
                                onFileSelect(files[0]);
                            }
                        })
                        .catch(console.error)
                        .finally(() => {
                            setIsImageSelectActive(false);
                        });
                }}
            >
                <Icon icons={['far fa-folder-image']} size={25} />
            </StyledScannerToolbarButton>
        </StyledScannerToolbar>
    );
};

export default ScannerToolbar;
