import styled from 'styled-components';
import { motion } from 'motion/react';

export const StyledCommunicationContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
`;

export const StyledCommunicationContentInner = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
`;

export const StyledCommunicationContentChildren = styled.div`
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
`;

export const StyledCommunicationContentSide = styled(motion.aside)`
    height: 100%;
    overflow: hidden;
    min-width: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
`;

export const StyledCommunicationContentResizeHandle = styled.div`
    width: 6px;
    flex-shrink: 0;
    cursor: col-resize;
    touch-action: none;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

export const StyledCommunicationContentOverlayBackdrop = styled(motion.div)`
    position: absolute;
    inset: 0;
    z-index: 20;
    background: rgba(0, 0, 0, 0.35);
`;

export const StyledCommunicationContentOverlay = styled(motion.aside)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;

    display: flex;
    flex-direction: column;

    border-radius: 18px 18px 0 0;
    overflow: hidden;

    background: var(--background-color-secondary, #1e1e1e);
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.35);
`;

export const StyledCommunicationContentOverlayHandle = styled.div`
    height: 28px;
    cursor: ns-resize;
    touch-action: none;

    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
        content: '';
        width: 42px;
        height: 4px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.35);
    }
`;

export const StyledCommunicationContentContent = styled.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
`;
