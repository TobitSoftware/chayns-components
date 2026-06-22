import React from 'react';
import {
    CommunicationFile,
    CommunicationImage,
    CommunicationVideo,
} from '../CommunicationFileList.types';
import CommunicationDocumentItem from './communication-document-item/CommunicationDocumentItem';
import CommunicationImageItem from './communication-image-item/CommunicationImageItem';
import CommunicationVideoItem from './communication-video-item/CommunicationVideoItem';

interface Props {
    file: CommunicationFile | CommunicationImage | CommunicationVideo;
    onRemove?: (fileId: string) => void;
}

const CommunicationFileItem = ({ file, onRemove }: Props) => {
    if (file.type === 'image') {
        return <CommunicationImageItem file={file} onRemove={onRemove} />;
    }

    if (file.type === 'video') {
        return <CommunicationVideoItem file={file} onRemove={onRemove} />;
    }

    return <CommunicationDocumentItem file={file} onRemove={onRemove} />;
};

export default CommunicationFileItem;
