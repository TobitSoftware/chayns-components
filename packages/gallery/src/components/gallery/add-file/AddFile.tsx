import { Icon, selectFiles } from '@chayns-components/core';
import React, { FC, useCallback } from 'react';
import { StyledAddFile, StyledAddFIleIconWrapper } from './AddFile.styles';

export type AddFileProps = {
    /**
     *  Function to be executed when files are added
     */
    onAdd: (files: File[]) => void;
};

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
