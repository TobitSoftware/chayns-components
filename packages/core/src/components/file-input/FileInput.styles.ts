import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { FramerMotionBugFix, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledFileInput = styled.div``;

type StyledFileInputWrapperProps = WithTheme<{
    $isDisabled: boolean;
}>;

export const StyledFileInputWrapper = styled.div<StyledFileInputWrapperProps>`
    display: flex;

    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
`;

type StyledFileInputContainerProps = WithTheme<{
    $isImageSelection?: boolean;
}>;

type StyledUploadedFilesListProps = WithTheme<{ $shouldShowBorder: boolean }>;

export const StyledUploadedFilesList = styled.div<StyledUploadedFilesListProps>`
    ${({ $shouldShowBorder, theme }: StyledUploadedFilesListProps) =>
        $shouldShowBorder &&
        css`
            border-top: 1px solid ${theme.headline};
        `}
`;

export const StyledFileInputContainer = styled.div<StyledFileInputContainerProps>`
    border: ${({ theme }: StyledFileInputContainerProps) => theme.text} 1px dotted;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 15px;
    justify-content: center;
    width: 100%;

    ${({ $isImageSelection }) =>
        $isImageSelection &&
        css`
            border-left: none;
        `}
`;

type StyledFileInputTextProps = WithTheme<unknown>;

export const StyledFileInputText = styled.p<StyledFileInputTextProps>`
    color: ${({ theme }: StyledFileInputTextProps) => theme.text};
`;

export const StyledMotionFileInputList = styled(motion.div)<FramerMotionBugFix>``;
