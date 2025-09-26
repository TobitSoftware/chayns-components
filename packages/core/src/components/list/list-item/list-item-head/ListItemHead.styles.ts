import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../color-scheme-provider/ColorSchemeProvider';
import {
    LIST_ITEM_HEAD_HTML_TAG,
    LIST_ITEM_HEAD_INDICATOR_HTML_TAG,
    LIST_ITEM_HEAD_TITLE_HTML_TAG,
} from '../../../../constants/list';

type StyledListItemHeadProps = WithTheme<{
    $isClickable: boolean;
    $isAnyItemExpandable: boolean;
}>;

export const StyledListItemHead = styled[LIST_ITEM_HEAD_HTML_TAG]<StyledListItemHeadProps>`
    //align-items: center;
    overflow: hidden;
    color: ${({ theme }: StyledListItemHeadProps) => theme.text};
    display: flex;
    min-height: 64px;
    padding: 12px 9px;
    position: relative;
    width: 100%;
    justify-content: center;
    cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};

    ${({ $isAnyItemExpandable }) =>
        !$isAnyItemExpandable &&
        css`
            padding-left: 12px;
        `}
`;

export const StyledListItemHeadLeftWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: auto 0;
`;

export const StyledListItemHeadIndicator = styled[LIST_ITEM_HEAD_INDICATOR_HTML_TAG]`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 26px;
    justify-content: center;
    width: 26px;
`;

type StyledListItemHeadContentProps = {
    $isIconOrImageGiven: boolean;
    $isOpen: boolean;
};

export const StyledListItemHeadContent = styled.div<StyledListItemHeadContentProps>`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    justify-content: center;
    line-height: normal;
    margin-left: ${({ $isIconOrImageGiven }) => ($isIconOrImageGiven ? '10px' : undefined)};
    min-width: 0;
`;

export const StyledListItemHeadTitle = styled[LIST_ITEM_HEAD_TITLE_HTML_TAG]`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const StyledListItemHeadTitleContent = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    max-width: 100%;
    min-width: 0;
    position: relative;
`;

export const StyledListItemHeadSubtitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
`;

type StyledMotionListItemHeadHoverItemWrapperProps = WithTheme<unknown>;

export const StyledMotionListItemHeadHoverItemWrapper = styled(
    motion.div,
)<StyledMotionListItemHeadHoverItemWrapperProps>`
    overflow: hidden;
    flex-shrink: 0;
    margin: auto 0;
    position: absolute;
    right: 0;

    background: ${({ theme }: StyledMotionListItemHeadHoverItemWrapperProps) =>
        `linear-gradient(to right, transparent 0px, rgb(${theme['000-rgb'] ?? ''}) 40px)`};
`;

export const StyledMotionListItemHeadHoverItem = styled.div`
    padding-left: 40px;
`;
