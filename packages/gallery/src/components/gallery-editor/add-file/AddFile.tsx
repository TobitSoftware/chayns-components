import { Icon, selectFiles } from '@chayns-components/core';
import React, { FC, memo, useCallback } from 'react';
import { StyledAddFile, StyledAddFIleIconWrapper } from './AddFile.styles';
import type { AddFileProps } from './AddFile.types';
import { DEFAULT_ADD_FILE_ICON } from './AddFile.constants';

const AddFile: FC<AddFileProps> = ({ addFileIcon = DEFAULT_ADD_FILE_ICON, onAdd }) => {
    const openSelectDialog = useCallback(async () => {
        const files = await selectFiles({
            multiple: true,
            type: 'image/*, video/*',
        });

        onAdd(files);
    }, [onAdd]);

    return (
        <StyledAddFile key="addButton">
            <StyledAddFIleIconWrapper onClick={() => void openSelectDialog()}>
                <Icon size={40} icons={[addFileIcon]} />
            </StyledAddFIleIconWrapper>
        </StyledAddFile>
    );
};

AddFile.displayName = 'AddFile';

export default memo(AddFile);
