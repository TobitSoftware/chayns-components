import { Icon, selectFiles } from '@chayns-components/core';
import React, { FC, useCallback } from 'react';
import { StyledAddFile, StyledAddFIleIconWrapper } from './AddFile.styles';
import type { AddFileProps } from './AddFile.types';

const AddFile: FC<AddFileProps> = ({ onAdd }) => {
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
                <Icon size={40} icons={['fa fa-plus']} />
            </StyledAddFIleIconWrapper>
        </StyledAddFile>
    );
};

AddFile.displayName = 'AddFile';

export default AddFile;
