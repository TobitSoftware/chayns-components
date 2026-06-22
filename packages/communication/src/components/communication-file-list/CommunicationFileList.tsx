import React from 'react';
import { Masonry } from '@chayns-components/core';
import CommunicationFileItem from './communication-file-item/CommunicationFileItem';
import { CommunicationFileListProps } from './CommunicationFileList.types';
import { StyledCommunicationFileList } from './CommunicationFileList.styles';

const CommunicationFileList: React.FC<CommunicationFileListProps> = ({ files, onRemove }) => (
    <StyledCommunicationFileList>
        <Masonry gap={8} columnWidth={64}>
            {files.map((file) => {
                // Dateien nehmen 1 Spalte, Bilder/Videos 2 Spalten
                const columnSpan = file.type === 'file' ? 1 : 3;

                return (
                    <Masonry.Item key={file.id} columnSpan={columnSpan}>
                        <CommunicationFileItem file={file} onRemove={onRemove} />
                    </Masonry.Item>
                );
            })}
        </Masonry>
    </StyledCommunicationFileList>
);

CommunicationFileList.displayName = 'CommunicationFileList';

export default CommunicationFileList;
