import React from 'react';
import { CommunicationImage } from '../../CommunicationFileList.types';
import { StyledCommunicationImageItemImage } from './CommunicationImageItem.styles';

interface Props {
    file: CommunicationImage;
}

const CommunicationImageItem = ({ file }: Props) => {
    const displayUrl = file.url || file.thumbnail;

    if (!displayUrl) {
        return null;
    }

    return <StyledCommunicationImageItemImage src={displayUrl} alt="" loading="lazy" />;
};

export default CommunicationImageItem;
