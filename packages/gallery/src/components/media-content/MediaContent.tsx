import { Icon } from '@chayns-components/core';
import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
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
import { MEDIA_CONTENT_IMAGE_FADE_DURATION_MS } from './MediaContent.constants';
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
    const [resolvedFinalSourceUrl, setResolvedFinalSourceUrl] = useState<string>();
    const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const renderSize = useMediaContentSize(containerElement);
    const devicePixelRatio =
        typeof window !== 'undefined' &&
        Number.isFinite(window.devicePixelRatio) &&
        window.devicePixelRatio > 0
            ? window.devicePixelRatio
            : 1;
    const displayPreviewUrl = useMemo(
        () =>
            previewSourceUrl
                ? getResponsiveImageServiceUrl(previewSourceUrl, renderSize, devicePixelRatio)
                : undefined,
        [devicePixelRatio, previewSourceUrl, renderSize],
    );
    const finalSourceUrl = isVideo ? sourceKey : resolvedFinalSourceUrl;
    const shouldHidePreview = shouldLoadImages && hasLoadedFinalMedia;
    const previewLayerStyle = {
        opacity: shouldHidePreview ? 0 : 1,
        filter: shouldHidePreview ? 'blur(0px)' : undefined,
    };
    const finalMediaStyle = {
        opacity: hasLoadedFinalMedia || !displayPreviewUrl ? 1 : 0,
        transition: `opacity ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease`,
    };

    useEffect(() => {
        setHasLoadedFinalMedia(false);
    }, [sourceKey]);

    useEffect(() => {
        if (!shouldLoadImages) {
            setResolvedFinalSourceUrl(undefined);
            return;
        }

        if (isVideo) {
            setResolvedFinalSourceUrl(sourceKey);
            return;
        }

        if (!renderSize) {
            setResolvedFinalSourceUrl(undefined);
            return;
        }

        setResolvedFinalSourceUrl(
            getResponsiveImageServiceUrl(sourceKey, renderSize, devicePixelRatio),
        );
    }, [devicePixelRatio, isVideo, renderSize, shouldLoadImages, sourceKey]);

    useEffect(() => {
        if (!shouldLoadImages || !finalSourceUrl) {
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
                        style={previewLayerStyle}
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
                        style={finalMediaStyle}
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
                    style={previewLayerStyle}
                />
            )}
            {shouldRenderFinalImage && (
                <StyledMediaContentImage
                    ref={imageRef}
                    draggable={false}
                    src={finalSourceUrl}
                    alt=""
                    onLoad={() => setHasLoadedFinalMedia(true)}
                    style={finalMediaStyle}
                />
            )}
        </StyledMediaContentImageWrapper>
    );
};

MediaContent.displayName = 'MediaContent';

export default memo(MediaContent);
