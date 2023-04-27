import { Icon } from '@chayns-components/core';
import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import type { UploadedFile } from '../../types/file';
import { convertFileListToArray, filterDuplicateFiles, selectFiles } from '../../utils/file';
import { uploadFiles } from '../../utils/upload';
import { StyledAddFile, StyledAddFIleIconWrapper } from './AddFile.styles';

export type AddFileProps = {
    /**
     *  Function to add files to the uploaded files
     */
    setUploadedFiles: Dispatch<SetStateAction<UploadedFile[]>>;
    /**
     *  Images and videos which should be displayed
     */
    uploadedFiles: UploadedFile[];
    /**
     *  Function to be executed when files are added
     */
    onAdd?: (files: UploadedFile[]) => void;
    /**
     * PersonId of the user
     */
    personId: string;
    /**
     * AccessToken of the user
     */
    accessToken: string;
};

const AddFile: FC<AddFileProps> = ({
    setUploadedFiles,
    uploadedFiles,
    onAdd,
    accessToken,
    personId,
}) => {
    /**
     * Open a dialog to select files
     */
    const openSelectDialog = useCallback(async () => {
        const selectedFiles = await selectFiles({
            multiple: true,
            type: 'image/*, video/*',
        });

        if (!selectedFiles || selectedFiles.length <= 0) {
            return;
        }

        const fileArray = convertFileListToArray(selectedFiles);

        // Filters files to use only under 64MB
        const filteredFileArray = fileArray.filter(({ size, type }) => {
            const sizeInMB = size / 1024 / 1024;

            if (type.includes('video/') && sizeInMB > 500) {
                return false;
            }

            return !(type.includes('image/') && sizeInMB > 64);
        });

        if (fileArray.length !== filteredFileArray.length) {
            // ToDo show dialog that some files are to big
        }

        if (filteredFileArray.length === 0) {
            // ToDo show dialog that all files are to big

            return;
        }

        const updatedFiles = await uploadFiles({
            filesToUpload: filteredFileArray,
            personId,
            accessToken,
        });

        const { newUniqueFiles } = filterDuplicateFiles({
            oldFiles: uploadedFiles,
            newFiles: updatedFiles,
        });

        if (onAdd) {
            onAdd(newUniqueFiles);
        }

        setUploadedFiles((prevState) => [...prevState, ...newUniqueFiles]);
    }, [accessToken, onAdd, personId, setUploadedFiles, uploadedFiles]);

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
