import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledComboBox = styled.div`
    width: fit-content;
`;

type StyledComboBoxHeaderProps = WithTheme<{
    isOpen: boolean;
    minWidth: number;
}>;

export const StyledComboBoxHeader = styled.div<StyledComboBoxHeaderProps>`
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(160, 160, 160, 0.3);
    padding: 8px 10px;
    cursor: pointer;
    background: ${({ theme }: StyledComboBoxHeaderProps) => theme['001']};
    min-width: ${({ minWidth }) => minWidth}px;
    max-width: ${({ minWidth }) => minWidth}px;

    ${({ isOpen }) =>
        isOpen
            ? css`
                  border-top-left-radius: 3px;
                  border-top-right-radius: 3px;
              `
            : css`
                  border-radius: 3px;
              `}

    &:hover {
        background: ${({ theme }: StyledComboBoxHeaderProps) => theme['secondary-103']};
    }
`;

type StyledComboBoxPlaceholderProps = WithTheme<unknown>;

export const StyledComboBoxPlaceholder = styled.p<StyledComboBoxPlaceholderProps>`
    color: ${({ theme }: StyledComboBoxPlaceholderProps) => theme.text};
    margin: 0;
`;

export const StyledComboBoxIconWrapper = styled.div`
    margin-left: 5px;
`;

type StyledComboBoxBodyProps = WithTheme<{
    height: number;
}>;

export const StyledMotionComboBoxBody = styled(motion.div)<StyledComboBoxBodyProps>`
    background: ${({ theme }: StyledComboBoxBodyProps) => theme['001']};
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(160, 160, 160, 0.3);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-top: none;
    cursor: pointer;
    max-height: 300px;
    overflow-y: ${({ height }) => (height <= 300 ? 'hidden' : 'auto')};
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledComboBoxBodyProps) => theme['009-rgb']}, 0.08)
        inset;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(160, 160, 160, 1);
    }
`;
