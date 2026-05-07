import { Icon, selectFiles } from '@chayns-components/core';
import React, { FC, useCallback } from 'react';
import { StyledAddFile, StyledAddFIleIconWrapper } from './AddFile.styles';
import type { AddFileProps } from './AddFile.types';

const AddFile: FC<AddFileProps> = ({ addFileIcon = 'fa fa-plus', onAdd }) => {
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

export default AddFile;
