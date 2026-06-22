import React from 'react';
import { CommunicationFile } from '../CommunicationFileList.types';
import CommunicationDocumentItem from './communication-document-item/CommunicationDocumentItem';
import CommunicationImageItem from './communication-image-item/CommunicationImageItem';
import CommunicationVideoItem from './communication-video-item/CommunicationVideoItem';

interface Props {
    file: CommunicationFile;
}

const CommunicationFileItem = ({ file }: Props) => {
    // Show preview if provided and file is uploading
    if (file.status === 'uploading' && file.preview) {
        return <>{file.preview}</>;
    }

    if (file.mimeType.startsWith('image/')) {
        return <CommunicationImageItem file={file} />;
    }

    if (file.mimeType.startsWith('video/')) {
        return <CommunicationVideoItem file={file} />;
    }

    return <CommunicationDocumentItem file={file} />;
};

export default CommunicationFileItem;
