import { ColorMode } from 'chayns-api';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { PopupAlignment } from '../types';

type StyledMotionPopupContentProps = WithTheme<{
    position: PopupAlignment;
    colorMode: ColorMode;
}>;

export const StyledMotionPopupContent = styled(motion.div)<StyledMotionPopupContentProps>`
    background-color: ${({ theme, colorMode }: StyledMotionPopupContentProps) =>
        colorMode === ColorMode.Dark ? theme['003'] : theme['001']};
    border-radius: 3px;
    box-shadow: 1px 3px 8px rgb(0 0 0 / 30%);
    color: ${({ theme }: StyledMotionPopupContentProps) => theme.text};
    z-index: 100;
    position: fixed;

    &::after {
        background-color: inherit;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 2px 2px 8px rgb(4 3 4 / 10%);
        content: '';
        height: 14px;
        position: absolute;
        width: 14px;
        z-index: -2;

        ${({ position }) => {
            switch (position) {
                case PopupAlignment.TopLeft:
                    return css`
                        bottom: -7px;
                        right: 13px;
                        transform: rotate(45deg);
                    `;
                case PopupAlignment.BottomLeft:
                    return css`
                        top: -7px;
                        right: 13px;
                        transform: rotate(225deg);
                    `;
                case PopupAlignment.TopRight:
                    return css`
                        transform: rotate(45deg);
                        bottom: -7px;
                        left: 13px;
                    `;
                case PopupAlignment.BottomRight:
                    return css`
                        transform: rotate(225deg);
                        top: -7px;
                        left: 13px;
                    `;
                default:
                    return undefined;
            }
        }}
    }

    &::before {
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

export const StyledPopupContentInner = styled.div`
    border-radius: 3px;
    overflow: hidden;
`;
