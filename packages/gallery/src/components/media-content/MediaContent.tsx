import { Icon } from '@chayns-components/core';
import React, { FC, memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
    StyledMediaContentImage,
    StyledMediaContentImageWrapper,
    StyledMediaContentPlayIcon,
    StyledMediaContentPreviewImage,
    StyledMediaContentVideo,
    StyledMediaContentVideoWrapper,
} from './MediaContent.styles';
import type { MediaContentProps } from './MediaContent.types';
import {
    getMediaPreviewUrl,
    getMediaSourceUrl,
    getResponsiveImageServiceUrl,
    isVideoFile,
} from './MediaContent.utils';
import {
    MEDIA_CONTENT_IMAGE_FADE_DURATION_MS,
    MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DELAY_MS,
    MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DURATION_MS,
    MEDIA_CONTENT_PREVIEW_BLUR,
    MEDIA_CONTENT_PREVIEW_SCALE,
} from './MediaContent.constants';
import useMediaContentSize from './useMediaContentSize';

const MediaContent: FC<MediaContentProps> = ({
    file,
    previewUrl,
    ratio,
    onClick,
    shouldLoadImages = true,
    playIconSize = 50,
}) => {
    const isVideo = isVideoFile(file);
    const sourceKey = getMediaSourceUrl(file);
    const previewSourceUrl = getMediaPreviewUrl(file, previewUrl);
    const [hasLoadedFinalMedia, setHasLoadedFinalMedia] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);
    const renderSize = useMediaContentSize(containerElement);
    const devicePixelRatio =
        typeof window !== 'undefined' &&
        Number.isFinite(window.devicePixelRatio) &&
        window.devicePixelRatio > 0
            ? window.devicePixelRatio
            : 1;

    const finalSourceUrl = useMemo(
        () =>
            isVideo
                ? sourceKey
                : getResponsiveImageServiceUrl(sourceKey, renderSize, devicePixelRatio),
        [devicePixelRatio, isVideo, renderSize, sourceKey],
    );
    const displayPreviewUrl = useMemo(
        () =>
            previewSourceUrl
                ? getResponsiveImageServiceUrl(previewSourceUrl, renderSize, devicePixelRatio)
                : undefined,
        [devicePixelRatio, previewSourceUrl, renderSize],
    );

    useLayoutEffect(() => {
        setHasLoadedFinalMedia(false);
    }, [sourceKey]);

    useLayoutEffect(() => {
        if (!shouldLoadImages) {
            return;
        }

        if (!isVideo && imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
            setHasLoadedFinalMedia(true);
        }

        if (isVideo && videoRef.current?.readyState && videoRef.current.readyState >= 2) {
            setHasLoadedFinalMedia(true);
        }
    }, [finalSourceUrl, isVideo, shouldLoadImages]);

    const shouldRenderFinalImage = shouldLoadImages && Boolean(finalSourceUrl);
    const shouldShowPreview = Boolean(displayPreviewUrl);

    if (isVideo) {
        return (
            <StyledMediaContentVideoWrapper
                ref={setContainerElement}
                onClick={onClick}
                $ratio={ratio}
            >
                {displayPreviewUrl && (
                    <StyledMediaContentPreviewImage
                        draggable={false}
                        src={displayPreviewUrl}
                        alt=""
                        aria-hidden="true"
                        style={{
                            opacity: shouldLoadImages && hasLoadedFinalMedia ? 0 : 1,
                        }}
                    />
                )}
                <StyledMediaContentPlayIcon>
                    <Icon size={playIconSize} icons={['fa fa-play']} />
                </StyledMediaContentPlayIcon>
                {shouldRenderFinalImage && (
                    <StyledMediaContentVideo
                        ref={videoRef}
                        poster={displayPreviewUrl}
                        preload="metadata"
                        onLoadedData={() => setHasLoadedFinalMedia(true)}
                        style={{
                            filter:
                                displayPreviewUrl && !hasLoadedFinalMedia
                                    ? MEDIA_CONTENT_PREVIEW_BLUR
                                    : 'none',
                            transform:
                                displayPreviewUrl && !hasLoadedFinalMedia
                                    ? `scale(${MEDIA_CONTENT_PREVIEW_SCALE})`
                                    : 'none',
                            opacity: hasLoadedFinalMedia || !displayPreviewUrl ? 1 : 0,
                            transition: `opacity ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease, filter ${MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DURATION_MS}ms ease ${MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DELAY_MS}ms, transform ${MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DURATION_MS}ms ease ${MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DELAY_MS}ms`,
                        }}
                    >
                        <source src={finalSourceUrl} type="video/mp4" />
                    </StyledMediaContentVideo>
                )}
            </StyledMediaContentVideoWrapper>
        );
    }

    return (
        <StyledMediaContentImageWrapper ref={setContainerElement} onClick={onClick} $ratio={ratio}>
            {shouldShowPreview && (
                <StyledMediaContentPreviewImage
                    draggable={false}
                    src={displayPreviewUrl}
                    alt=""
                    aria-hidden="true"
                    style={{
                        opacity: shouldLoadImages && hasLoadedFinalMedia ? 0 : 1,
                    }}
                />
            )}
            {shouldRenderFinalImage && (
                <StyledMediaContentImage
                    ref={imageRef}
                    draggable={false}
                    src={finalSourceUrl}
                    alt=""
                    onLoad={() => setHasLoadedFinalMedia(true)}
                    style={{
                        filter:
                            displayPreviewUrl && !hasLoadedFinalMedia
                                ? MEDIA_CONTENT_PREVIEW_BLUR
                                : 'none',
                        transform:
                            displayPreviewUrl && !hasLoadedFinalMedia
                                ? `scale(${MEDIA_CONTENT_PREVIEW_SCALE})`
                                : 'none',
                        opacity: hasLoadedFinalMedia || !displayPreviewUrl ? 1 : 0,
                        transition: `opacity ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease, filter ${MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DURATION_MS}ms ease ${MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DELAY_MS}ms, transform ${MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DURATION_MS}ms ease ${MEDIA_CONTENT_IMAGE_BLUR_REMOVE_DELAY_MS}ms`,
                    }}
                />
            )}
        </StyledMediaContentImageWrapper>
    );
};

MediaContent.displayName = 'MediaContent';

export default memo(MediaContent);
