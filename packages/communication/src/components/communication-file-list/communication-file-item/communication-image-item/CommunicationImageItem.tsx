import React from 'react';
import { CommunicationFile } from '../../CommunicationFileList.types';
import { StyledImage } from './CommunicationImageItem.styles';

interface Props {
    file: CommunicationFile;
}

const CommunicationImageItem = ({ file }: Props) => {
    if (!file.previewUrl && !file.url) {
        return null;
    }

    const imageSrc = file.previewUrl || file.url;

    return <StyledImage src={imageSrc} alt={file.name} loading="lazy" />;
};

export default CommunicationImageItem;
