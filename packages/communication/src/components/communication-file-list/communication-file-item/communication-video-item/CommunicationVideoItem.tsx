import React from 'react';
import { CommunicationFile } from '../../CommunicationFileList.types';
import { StyledVideo } from './CommunicationVideoItem.styles';

interface Props {
    file: CommunicationFile;
}

const CommunicationVideoItem = ({ file }: Props) => {
    if (!file.previewUrl && !file.url) {
        return null;
    }

    const videoSrc = file.previewUrl || file.url;

    return (
        <StyledVideo controls preload="metadata">
            <source src={videoSrc} type={file.mimeType} />
        </StyledVideo>
    );
};

export default CommunicationVideoItem;
