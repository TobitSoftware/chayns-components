import type { WithTheme } from '@chayns-components/core';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { PopupAlignment } from '../../constants/alignment';

export const StyledEmojiPickerPopup = styled.div`
    align-items: center;
    display: flex;
    height: ${() => getComputedStyle(document.body).getPropertyValue('line-height')};
    position: relative;
`;

type StyledMotionEmojiPickerPopupContentProps = WithTheme<{
    alignment: PopupAlignment;
}>;

export const StyledMotionEmojiPickerPopupContent = styled(
    motion.div
)<StyledMotionEmojiPickerPopupContentProps>`
    background-color: ${({ theme }: StyledMotionEmojiPickerPopupContentProps) => theme['001']};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    box-shadow: 1px 3px 8px rgb(0 0 0 / 30%);
    color: ${({ theme }: StyledMotionEmojiPickerPopupContentProps) => theme.text};
    position: absolute;
    z-index: 2;

    ::after {
        background-color: inherit;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom-right-radius: 3px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 2px 2px 8px rgb(4 3 4 / 10%);
        content: '';
        height: 14px;
        position: absolute;
        width: 14px;
        z-index: -2;

        ${({ alignment }) => {
            switch (alignment) {
                case PopupAlignment.TopLeft:
                    return css`
                        bottom: -7px;
                        right: 12px;
                        transform: rotate(45deg);
                    `;
                case PopupAlignment.BottomLeft:
                    return css`
                        top: -7px;
                        right: 12px;
                        transform: rotate(225deg);
                    `;
                case PopupAlignment.TopRight:
                    return css`
                        transform: rotate(45deg);
                        bottom: -7px;
                        left: 12px;
                    `;
                case PopupAlignment.BottomRight:
                    return css`
                        transform: rotate(225deg);
                        top: -7px;
                        left: 12px;
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
