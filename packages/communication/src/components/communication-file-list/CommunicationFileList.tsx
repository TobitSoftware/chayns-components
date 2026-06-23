import React, { FC } from 'react';
import { Masonry } from '@chayns-components/core';
import CommunicationFileItem from './communication-file-item/CommunicationFileItem';
import { CommunicationFileListProps } from './CommunicationFileList.types';
import { StyledCommunicationFileList } from './CommunicationFileList.styles';
import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

const CommunicationFileList: FC<CommunicationFileListProps> = ({
    files,
    onRemove,
    size = CommunicationInputSize.MEDIUM,
}) => (
    <StyledCommunicationFileList>
        <Masonry gap={4} columnWidth={64} rowHeight={64}>
            {files.map((file) => {
                const columns = file.type === 'file' ? 4 : 1;

                return (
                    <Masonry.Item key={file.id} columns={columns}>
                        <CommunicationFileItem file={file} onRemove={onRemove} size={size} />
                    </Masonry.Item>
                );
            })}
        </Masonry>
    </StyledCommunicationFileList>
);

CommunicationFileList.displayName = 'CommunicationFileList';

export default CommunicationFileList;
