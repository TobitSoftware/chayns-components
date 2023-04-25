import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { MentionFinderPopupAlignment } from './constants/alignment';
import type { MentionFinderProps } from './MentionFinder';

export const StyledMentionFinder = styled.div`
    position: relative;
`;

type StyledMentionFinderPopupProps = WithTheme<Pick<MentionFinderProps, 'popupAlignment'>>;

export const StyledMotionMentionFinderPopup = styled(motion.div)<StyledMentionFinderPopupProps>`
    background-color: ${({ theme }: StyledMentionFinderPopupProps) => theme['001']};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);
    left: 0;
    max-height: 300px;
    overflow-y: scroll;
    position: absolute;
    width: 100%;

    ${({ popupAlignment }) => {
        switch (popupAlignment) {
            case MentionFinderPopupAlignment.Bottom:
                return css`
                    top: 0;
                `;
            case MentionFinderPopupAlignment.Top:
                return css`
                    bottom: 0;
                `;
            default:
                return undefined;
        }
    }}

    // Styles for custom scrollbar
    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-button {
        background-color: transparent;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(
            ${({ theme }: StyledMentionFinderPopupProps) => theme['text-rgb']},
            0.15
        );
        border-radius: 20px;
    }

    // Scrollbar styles for Firefox. The above styles are not supported in Firefox, these styles are
    // only supported in Firefox:
    * {
        scrollbar-color: rgba(
                ${({ theme }: StyledMentionFinderPopupProps) => theme['text-rgb']},
                0.15
            )
            transparent;
        scrollbar-width: thin;
    }
`;
