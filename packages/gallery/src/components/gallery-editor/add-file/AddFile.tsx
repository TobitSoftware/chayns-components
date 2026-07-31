import {
    Icon,
    selectFiles,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';
import React, { FC, KeyboardEventHandler, memo, useCallback, useRef } from 'react';
import { StyledAddFile, StyledAddFIleIconWrapper } from './AddFile.styles';
import type { AddFileProps } from './AddFile.types';

const AddFile: FC<AddFileProps> = ({
    addFileIcon = 'fa fa-plus',
    onAdd,
    shouldEnableKeyboardHighlighting,
}) => {
    const iconWrapperRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );
    useFocusRingPortal(iconWrapperRef, { isEnabled: shouldShowKeyboardHighlighting });
    const openSelectDialog = useCallback(async () => {
        const files = await selectFiles({
            multiple: true,
            type: 'image/*, video/*',
        });

        onAdd(files);
    }, [onAdd]);

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
        (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                void openSelectDialog();
            }
        },
        [openSelectDialog],
    );

    return (
        <StyledAddFile key="addButton">
            <StyledAddFIleIconWrapper
                ref={iconWrapperRef}
                onClick={() => void openSelectDialog()}
                onKeyDown={handleKeyDown}
            >
                <Icon size={40} icons={[addFileIcon]} />
            </StyledAddFIleIconWrapper>
        </StyledAddFile>
    );
};

AddFile.displayName = 'AddFile';

export default memo(AddFile);
