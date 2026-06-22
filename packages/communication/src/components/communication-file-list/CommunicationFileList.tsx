import React from 'react';
import { Masonry } from '@chayns-components/core';
import CommunicationFileItem from './communication-file-item/CommunicationFileItem';
import { CommunicationFileListProps } from './CommunicationFileList.types';
import { StyledCommunicationFileList } from './CommunicationFileList.styles';

const CommunicationFileList: React.FC<CommunicationFileListProps> = ({ files }) => {
    return (
        <StyledCommunicationFileList>
            <Masonry gap={8} columnWidth={180}>
                {files.map((file) => (
                    <CommunicationFileItem key={file.id} file={file} />
                ))}
            </Masonry>
        </StyledCommunicationFileList>
    );
};

CommunicationFileList.displayName = 'CommunicationFileList';

export default CommunicationFileList;
