import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { MentionFinderPopupAlignment } from '../../constants/mentionFinder';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledMentionFinder = styled.div`
    position: relative;
    z-index: 2;
`;

export const StyledMentionFinderDragHandle = styled.div<
    WithTheme<{ $alignment: MentionFinderPopupAlignment }>
>`
    align-items: center;
    background-color: ${({ theme }) => theme['000']};
    border: 0;
    cursor: grab;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    padding: 8px 0;
    pointer-events: none;
    position: sticky;
    width: 100%;
    z-index: 2;

    ${({ $alignment }) =>
        $alignment === MentionFinderPopupAlignment.Top
            ? css`
                  border-bottom: 0;
                  top: 0;
              `
            : css`
                  border-top: 0;
                  bottom: 0;
              `}
`;

export const StyledMentionFinderDragHandleInner = styled.div<
    WithTheme<{
        $isDragging: boolean;
        $alignment: MentionFinderPopupAlignment;
        $dragProgress: number;
        $dragOffset: number;
    }>
>`
    background-color: ${({ theme }) => theme['005']};
    border: 0;
    border-radius: 2px;
    cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
    display: flex;
    height: 4px;
    justify-content: center;
    margin: 0 auto;
    pointer-events: auto;
    position: relative;
    touch-action: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    width: 50px;

    &::before {
        content: '';
        height: 36px;
        left: 50%;
        pointer-events: auto;
        position: absolute;
        top: 50%;
        touch-action: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        transform: translate(-50%, -50%);
        width: 120px;
    }
`;

type StyledMentionFinderPopupProps = WithTheme<{
    $popupAlignment: MentionFinderPopupAlignment;
    $isDragging: boolean;
}>;

export const StyledMotionMentionFinderPopup = styled(motion.div)<StyledMentionFinderPopupProps>`
    background-color: ${({ theme }: StyledMentionFinderPopupProps) => theme['000']};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 0;
    border-radius: 3px;
    display: flex;
    flex-direction: column;

    ${({ $isDragging, $popupAlignment }) => {
        if (!$isDragging)
            return css`
                z-index: 5;
            `;
        switch ($popupAlignment) {
            case MentionFinderPopupAlignment.Bottom:
                return css`
                    border-bottom-left-radius: 15px;
                    border-bottom-right-radius: 15px;
                    z-index: 2;
                `;
            case MentionFinderPopupAlignment.Top:
                return css`
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                    z-index: 2;
                `;
            default:
                return css``;
        }
    }}
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.1);
    left: 0;
    max-height: 275px;
    overflow: hidden;
    position: absolute;
    width: 100%;

    ${({ $popupAlignment }) => {
        switch ($popupAlignment) {
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
`;

type StyledMentionFinderItemListProps = WithTheme<unknown>;

export const StyledMentionFinderItemList = styled.div<WithTheme<StyledMentionFinderItemListProps>>`
    flex: 1 1 auto;
    max-height: inherit;
    overflow-y: auto;

    // Styles for custom scrollbar
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-button {
        background-color: transparent;
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(
            ${({ theme }: StyledMentionFinderItemListProps) => theme['text-rgb']},
            0.15
        );
        border-radius: 20px;
    }

    // Scrollbar styles for Firefox. The above styles are not supported in Firefox, these styles are
    // only supported in Firefox:
    * {
        scrollbar-color: rgba(
                ${({ theme }: StyledMentionFinderItemListProps) => theme['text-rgb']},
                0.15
            )
            transparent;
        scrollbar-width: thin;
    }
`;

export const StyledMentionFinderOverlay = styled(motion.div)`
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background: radial-gradient(#000000a6 0, #000000bf 100%);
    inset: 0;
    opacity: 0;
    pointer-events: all;
    position: absolute;
    z-index: 1;
`;
