import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { FramerMotionBugFix, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledFileSelect = styled.div``;

type StyledFileSelectWrapperProps = WithTheme<{
    $isDisabled?: boolean;
}>;

export const StyledFileSelectWrapper = styled.div<StyledFileSelectWrapperProps>`
    display: flex;

    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
`;

type StyledFileSelectContainerProps = WithTheme<{
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

export const StyledFileSelectContainer = styled.div<StyledFileSelectContainerProps>`
    border: ${({ theme }: StyledFileSelectContainerProps) => theme.text} 1px dashed;
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

type StyledFileSelectTextProps = WithTheme<unknown>;

export const StyledFileSelectText = styled.p<StyledFileSelectTextProps>`
    color: ${({ theme }: StyledFileSelectTextProps) => theme.text};
`;

export const StyledMotionFileSelectList = styled(motion.div)<FramerMotionBugFix>``;
