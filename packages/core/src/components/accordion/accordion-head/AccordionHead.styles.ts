import { motion } from 'framer-motion';
import type { MouseEventHandler } from 'react';
import styled from 'styled-components';

type StyledMotionAccordionHeadProps = {
    onClick?: MouseEventHandler<HTMLDivElement>;
};

export const StyledMotionAccordionHead = styled(motion.div)<StyledMotionAccordionHeadProps>`
    align-items: center;
    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'default')};
    display: flex;
    overflow: hidden;
    padding: 4px 0;
`;

export const StyledMotionIconWrapper = styled(motion.div)`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 25px;
    justify-content: center;
    width: 25px;
`;

export const StyledMotionTitleWrapper = styled(motion.div)`
    align-self: flex-start;
    flex: 1 1 auto;
    height: 100%;
    overflow: hidden;
    margin-right: 10px;
    position: relative;
`;

interface StyledMotionTitleProps {
    isOpen: boolean;
    isWrapped: boolean;
}

export const StyledMotionTitle = styled(motion.div)<StyledMotionTitleProps>`
    align-items: center;
    display: flex;
    font-size: ${({ isOpen, isWrapped }) => (isOpen && !isWrapped ? '1.3rem' : undefined)};
    font-weight: ${({ isOpen, isWrapped }) => (isOpen && isWrapped ? 700 : 'normal')};
    height: ${({ isWrapped }) => (isWrapped ? '100%' : undefined)};
    overflow: hidden;
    text-overflow: ellipsis;
    transform-origin: top left;
    user-select: none;
    white-space: ${({ isOpen, isWrapped }) => (isOpen && !isWrapped ? 'normal' : 'nowrap')};
    width: 100%;
`;

export const StyledRightWrapper = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: center;
    margin-right: 5px;
    overflow: hidden;
`;
