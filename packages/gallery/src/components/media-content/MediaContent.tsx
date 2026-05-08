import { Icon } from '@chayns-components/core';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import {
    StyledMediaContentImage,
    StyledMediaContentImageWrapper,
    StyledMediaContentPlayIcon,
    StyledMediaContentPreviewImage,
    StyledMediaContentVideo,
    StyledMediaContentVideoWrapper,
} from './MediaContent.styles';
import type { MediaContentProps } from './MediaContent.types';
import { DEFAULT_MEDIA_CONTENT_PLAY_ICON_SIZE } from './MediaContent.constants';
import { getMediaPreviewUrl, getMediaSourceUrl, isVideoFile } from './MediaContent.utils';

const MediaContent: FC<MediaContentProps> = ({
    file,
    previewUrl,
    ratio,
    onClick,
    shouldLoadImages = true,
    playIconSize = DEFAULT_MEDIA_CONTENT_PLAY_ICON_SIZE,
}) => {
    const isVideo = useMemo(() => isVideoFile(file), [file]);
    const finalSourceUrl = useMemo(() => getMediaSourceUrl(file), [file]);
    const previewSourceUrl = useMemo(
        () => getMediaPreviewUrl(file, previewUrl),
        [file, previewUrl],
    );
    const [hasLoadedFinalMedia, setHasLoadedFinalMedia] = useState(false);

    useEffect(() => {
        setHasLoadedFinalMedia(false);
    }, [finalSourceUrl, shouldLoadImages, previewSourceUrl]);

    if (isVideo) {
        return (
            <StyledMediaContentVideoWrapper onClick={onClick} $ratio={ratio}>
                <StyledMediaContentPlayIcon>
                    <Icon size={playIconSize} icons={['fa fa-play']} />
                </StyledMediaContentPlayIcon>
                <StyledMediaContentVideo
                    poster={previewSourceUrl}
                    preload={shouldLoadImages ? 'metadata' : 'none'}
                    onLoadedData={() => setHasLoadedFinalMedia(true)}
                    style={{
                        filter: previewSourceUrl && !hasLoadedFinalMedia ? 'blur(16px)' : undefined,
                        transform:
                            previewSourceUrl && !hasLoadedFinalMedia ? 'scale(1.05)' : undefined,
                    }}
                >
                    {shouldLoadImages && <source src={finalSourceUrl} type="video/mp4" />}
                </StyledMediaContentVideo>
            </StyledMediaContentVideoWrapper>
        );
    }

    const shouldRenderFinalImage = shouldLoadImages && Boolean(finalSourceUrl);
    const shouldShowPreview =
        Boolean(previewSourceUrl) && (!shouldRenderFinalImage || !hasLoadedFinalMedia);

    return (
        <StyledMediaContentImageWrapper onClick={onClick} $ratio={ratio}>
            {shouldShowPreview && (
                <StyledMediaContentPreviewImage
                    draggable={false}
                    src={previewSourceUrl}
                    alt=""
                    aria-hidden="true"
                />
            )}
            {shouldRenderFinalImage && (
                <StyledMediaContentImage
                    draggable={false}
                    src={finalSourceUrl}
                    alt=""
                    onLoad={() => setHasLoadedFinalMedia(true)}
                    style={{
                        opacity: hasLoadedFinalMedia || !previewSourceUrl ? 1 : 0,
                    }}
                />
            )}
        </StyledMediaContentImageWrapper>
    );
};

MediaContent.displayName = 'MediaContent';

export default memo(MediaContent);
