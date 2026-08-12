import React, { FC } from 'react';
import { Masonry } from '@chayns-components/core';
import CommunicationFileItem from './communication-file-item/CommunicationFileItem';
import { CommunicationFileListProps } from './CommunicationFileList.types';
import { StyledCommunicationFileList } from './CommunicationFileList.styles';
import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';
import { TextStringProviderSSR } from '@chayns/textstrings';

const CommunicationFileList: FC<CommunicationFileListProps> = ({
    files,
    onRemove,
    size = CommunicationInputSize.MEDIUM,
    shouldEnableKeyboardHighlighting,
}) => (
    <TextStringProviderSSR
        libraries="chayns-components-v5-communication"
        id="communication-file-list"
    >
        <StyledCommunicationFileList>
            <Masonry gap={4} columnWidth={64} rowHeight={64}>
                {files.map((file) => {
                    const columns = file.type === 'file' ? 4 : 1;

                    return (
                        <Masonry.Item key={file.id} columns={columns}>
                            <CommunicationFileItem
                                file={file}
                                onRemove={onRemove}
                                shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                                size={size}
                            />
                        </Masonry.Item>
                    );
                })}
            </Masonry>
        </StyledCommunicationFileList>
    </TextStringProviderSSR>
);

CommunicationFileList.displayName = 'CommunicationFileList';

export default CommunicationFileList;
