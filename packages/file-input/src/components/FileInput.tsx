import Icon from '@chayns-components/core/lib/components/icon/Icon';
import React, { FC, useMemo, useState } from 'react';
import { StyledFileInput, StyledFileInputText } from './FileInput.styles';

// ToDo add more types

type FileType = 'image/*' | 'video/*';

export type FileInputProps = {
    /**
     *
     */
    onAdd?: (files: File[]) => void;
    /**
     *
     */
    onRemove?: (file: File) => void;
    /**
     *
     */
    acceptedTypes?: FileType[];
};

const FileInput: FC<FileInputProps> = ({ onRemove, onAdd, acceptedTypes }) => {
    const [internalFiles, setInternalFiles] = useState<File[]>([]);

    const handleClick = () => {};

    return useMemo(
        () => (
            <StyledFileInput onClick={handleClick}>
                <Icon icons={['fa fa-upload']} />
                <StyledFileInputText>Dateien hochladen</StyledFileInputText>
            </StyledFileInput>
        ),
        []
    );
};

FileInput.displayName = 'FileInput';

export default FileInput;
