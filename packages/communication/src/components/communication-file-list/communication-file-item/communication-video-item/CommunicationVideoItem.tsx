import React from 'react';
import { CommunicationVideo, CommunicationLoadingState } from '../../CommunicationFileList.types';
import {
    StyledCommunicationVideoItemThumbnail,
    StyledCommunicationVideoItem,
    StyledCommunicationVideoItemIcon,
} from './CommunicationVideoItem.styles';
import { Icon } from '@chayns-components/core';

interface Props {
    file: CommunicationVideo;
}

const CommunicationVideoItem = ({ file }: Props) => {
    const isUploaded = file.loadingState === CommunicationLoadingState.UPLOADED;

    return (
        <StyledCommunicationVideoItem>
            {file.thumbnail && (
                <StyledCommunicationVideoItemThumbnail src={file.thumbnail} alt="" />
            )}

            {isUploaded && (
                <StyledCommunicationVideoItemIcon>
                    <Icon icons={['fa fa-play']} size={20} />
                </StyledCommunicationVideoItemIcon>
            )}
        </StyledCommunicationVideoItem>
    );
};

export default CommunicationVideoItem;
