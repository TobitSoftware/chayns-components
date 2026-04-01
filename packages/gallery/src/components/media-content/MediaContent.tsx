import { Icon } from '@chayns-components/core';
import React, { FC } from 'react';
import {
    StyledMediaContentImage,
    StyledMediaContentImageWrapper,
    StyledMediaContentPlayIcon,
    StyledMediaContentVideo,
    StyledMediaContentVideoWrapper,
} from './MediaContent.styles';
import type { MediaContentProps } from './MediaContent.types';

const MediaContent: FC<MediaContentProps> = ({ file, ratio, onClick, playIconSize = 50 }) =>
    'thumbnailUrl' in file ? (
        <StyledMediaContentVideoWrapper onClick={onClick} $ratio={ratio}>
            <StyledMediaContentPlayIcon>
                <Icon size={playIconSize} icons={['fa fa-play']} />
            </StyledMediaContentPlayIcon>
            <StyledMediaContentVideo poster={file.thumbnailUrl}>
                <source src={file.url} type="video/mp4" />
            </StyledMediaContentVideo>
        </StyledMediaContentVideoWrapper>
    ) : (
        <StyledMediaContentImageWrapper onClick={onClick} $ratio={ratio}>
            <StyledMediaContentImage draggable={false} src={file.url} />
        </StyledMediaContentImageWrapper>
    );

MediaContent.displayName = 'MediaContent';

export default MediaContent;
