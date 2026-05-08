import { Icon } from '@chayns-components/core';
import React, { FC, memo, useLayoutEffect, useRef, useState } from 'react';
import {
    StyledMediaContentImage,
    StyledMediaContentImageWrapper,
    StyledMediaContentPlayIcon,
    StyledMediaContentPreviewImage,
    StyledMediaContentVideo,
    StyledMediaContentVideoWrapper,
} from './MediaContent.styles';
import type { MediaContentProps } from './MediaContent.types';
import { getMediaPreviewUrl, getMediaSourceUrl, isVideoFile } from './MediaContent.utils';
import {
    MEDIA_CONTENT_IMAGE_FADE_DURATION_MS,
    MEDIA_CONTENT_PREVIEW_BLUR,
    MEDIA_CONTENT_PREVIEW_SCALE,
} from './MediaContent.constants';

const MediaContent: FC<MediaContentProps> = ({
    file,
    previewUrl,
    ratio,
    onClick,
    shouldLoadImages = true,
    playIconSize = 50,
}) => {
    const isVideo = isVideoFile(file);
    const finalSourceUrl = getMediaSourceUrl(file);
    const previewSourceUrl = getMediaPreviewUrl(file, previewUrl);
    const [hasLoadedFinalMedia, setHasLoadedFinalMedia] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {
        setHasLoadedFinalMedia(false);
    }, [finalSourceUrl]);

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
    }, [isVideo, shouldLoadImages, finalSourceUrl]);

    if (isVideo) {
        return (
            <StyledMediaContentVideoWrapper onClick={onClick} $ratio={ratio}>
                <StyledMediaContentPlayIcon>
                    <Icon size={playIconSize} icons={['fa fa-play']} />
                </StyledMediaContentPlayIcon>
                <StyledMediaContentVideo
                    ref={videoRef}
                    poster={previewSourceUrl}
                    preload={shouldLoadImages ? 'metadata' : 'none'}
                    onLoadedData={() => setHasLoadedFinalMedia(true)}
                    key={finalSourceUrl}
                    style={{
                        filter:
                            previewSourceUrl && !hasLoadedFinalMedia
                                ? MEDIA_CONTENT_PREVIEW_BLUR
                                : undefined,
                        transform:
                            previewSourceUrl && !hasLoadedFinalMedia
                                ? `scale(${MEDIA_CONTENT_PREVIEW_SCALE})`
                                : undefined,
                        opacity: 1,
                        transition: `opacity ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease, filter ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease, transform ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease`,
                    }}
                >
                    {shouldLoadImages && <source src={finalSourceUrl} type="video/mp4" />}
                </StyledMediaContentVideo>
            </StyledMediaContentVideoWrapper>
        );
    }

    const shouldRenderFinalImage = shouldLoadImages && Boolean(finalSourceUrl);
    const shouldShowPreview = Boolean(previewSourceUrl);

    return (
        <StyledMediaContentImageWrapper onClick={onClick} $ratio={ratio}>
            {shouldShowPreview && (
                <StyledMediaContentPreviewImage
                    draggable={false}
                    src={previewSourceUrl}
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
                    key={finalSourceUrl}
                    alt=""
                    onLoad={() => setHasLoadedFinalMedia(true)}
                    style={{
                        opacity: hasLoadedFinalMedia || !previewSourceUrl ? 1 : 0,
                        transition: `opacity ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease`,
                    }}
                />
            )}
        </StyledMediaContentImageWrapper>
    );
};

MediaContent.displayName = 'MediaContent';

export default memo(MediaContent);
