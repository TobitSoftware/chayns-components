import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { ContextMenuAlignment } from '../constants/alignment';

type StyledMotionContextMenuContentProps = WithTheme<{
    position: ContextMenuAlignment;
}>;

export const StyledMotionContextMenuContent = styled(
    motion.div
)<StyledMotionContextMenuContentProps>`
    background-color: ${({ theme }: StyledMotionContextMenuContentProps) => theme['001']};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    box-shadow: 1px 3px 8px rgb(0 0 0 / 30%);
    color: ${({ theme }: StyledMotionContextMenuContentProps) => theme.text};
    position: absolute;
    z-index: 0;

    ::after {
        background-color: inherit;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom-right-radius: 2px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 2px 2px 8px rgb(4 3 4 / 10%);
        content: '';
        height: 14px;
        position: absolute;
        width: 14px;
        z-index: -2;

        ${({ position }) => {
            switch (position) {
                case ContextMenuAlignment.TopLeft:
                    return css`
                        bottom: -8px;
                        right: 13px;
                        transform: rotate(45deg);
                    `;
                case ContextMenuAlignment.BottomLeft:
                    return css`
                        top: -8px;
                        right: 13px;
                        transform: rotate(225deg);
                    `;
                case ContextMenuAlignment.TopRight:
                    return css`
                        transform: rotate(45deg);
                        bottom: -8px;
                        left: 13px;
                    `;
                case ContextMenuAlignment.BottomRight:
                    return css`
                        transform: rotate(225deg);
                        top: -8px;
                        left: 13px;
                    `;
                default:
                    return undefined;
            }
        }}
    }

    ::before {
        background-color: inherit;
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
    }
`;

type StyledContextMenuContentItemProps = WithTheme<unknown>;

export const StyledContextMenuContentItem = styled.div<StyledContextMenuContentItemProps>`
    cursor: pointer;
    display: flex;
    padding: 5px 8px 5px 5px;
    transition: background-color 0.3s ease;

    :hover {
        background-color: ${({ theme }: StyledContextMenuContentItemProps) =>
            theme['secondary-103']};
    }
`;

export const StyledContextMenuContentItemIconWrapper = styled.div`
    flex: 0 0 auto;
    margin: 0 8px 0 3px;
    width: 20px;
`;

export const StyledContextMenuContentItemText = styled.div`
    flex: 0 0 auto;
    white-space: nowrap;
`;
