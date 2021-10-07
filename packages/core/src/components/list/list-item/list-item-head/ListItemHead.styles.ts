import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

interface StyledListItemHeadProps {
    isClickable: boolean;
}

export const StyledListItemHead = styled.div<StyledListItemHeadProps>`
    align-items: center;
    color: ${({ theme }) => theme['text']};
    display: flex;
    height: 64px;
    padding: 12px 9px;

    ${({ isClickable }) =>
        isClickable &&
        css`
            cursor: pointer;
        `}
`;

export const StyledMotionListItemHeadIndicator = styled(motion.div)`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 26px;
    justify-content: center;
    width: 26px;
`;

export const StyledListItemHeadIcon = styled.div`
    align-items: center;
    background-color: rgba(${({ theme }) => theme['text-rgb']}, 0.1);
    box-shadow: 0 0 0 1px rgba(${({ theme }) => theme['009-rgb']}, 0.08) inset;
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    justify-content: center;
    margin-right: 10px;
    width: 40px;
`;

interface StyledListItemHeadImageWrapperProps {
    shouldShowRoundImage?: boolean;
}

export const StyledListItemHeadImageWrapper = styled.div<StyledListItemHeadImageWrapperProps>`
    background-color: rgba(${({ theme }) => theme['text-rgb']}, 0.1);
    border-radius: ${({ shouldShowRoundImage }) => (shouldShowRoundImage ? '50%' : undefined)};
    box-shadow: 0 0 0 1px rgba(${({ theme }) => theme['009-rgb']}, 0.08) inset;
    flex: 0 0 auto;
    height: 40px;
    margin-right: 10px;
    overflow: hidden;
    width: 40px;
`;

export const StyledListItemHeadImage = styled.img`
    height: 100%;
    object-fit: cover;
    width: 100%;
`;

export const StyledListItemHeadImagePartLeft = styled.img``;

export const StyledListItemHeadImagePartTopRight = styled.img``;

export const StyledListItemHeadImagePartBottomRight = styled.img``;

export const StyledListItemHeadContent = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: center;
    line-height: normal;
    min-width: 0;
`;

export const StyledListItemHeadTitle = styled.div``;

export const StyledListItemHeadSubtitle = styled.div`
    margin-top: 2px;
    font-size: 85%;
    opacity: 0.75;
`;
