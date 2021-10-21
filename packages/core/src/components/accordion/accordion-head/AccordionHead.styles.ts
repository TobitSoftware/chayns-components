import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledMotionAccordionHeadProps = WithTheme<unknown>;

export const StyledMotionAccordionHead = styled(motion.div)`
    align-items: center;
    color: ${({ theme }: StyledMotionAccordionHeadProps) => theme.text};
    display: flex;
    overflow: hidden;
    padding: 4px 0;
`;

export const StyledMotionIconWrapper = styled(motion.div)`
    align-items: center;
    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'default')};
    display: flex;
    flex: 0 0 auto;
    height: 25px;
    justify-content: center;
    width: 25px;
`;

export const StyledMotionContentWrapper = styled(motion.div)`
    align-self: flex-start;
    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'default')};
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    overflow: hidden;
    margin-right: 10px;
`;

export const StyledMotionTitleWrapper = styled(motion.div)`
    display: grid;
    flex: 0 1 auto;
    grid-template-areas: 'header';
`;

interface StyledMotionTitleProps {
    isOpen: boolean;
    isWrapped: boolean;
}

export const StyledMotionTitle = styled(motion.div)<StyledMotionTitleProps>`
    font-size: ${({ isOpen, isWrapped }) => (isOpen && !isWrapped ? '1.3rem' : undefined)};
    font-weight: ${({ isOpen, isWrapped }) => (isOpen && isWrapped ? 700 : 'normal')};
    grid-area: header;
    height: ${({ isWrapped }) => (isWrapped ? '100%' : undefined)};
    overflow: hidden;
    text-overflow: ellipsis;
    transform-origin: top left;
    user-select: none;
    white-space: ${({ isOpen, isWrapped }) => (isOpen && !isWrapped ? 'normal' : 'nowrap')};

    ${({ isWrapped }) =>
        isWrapped &&
        css`
            align-items: center;
            display: flex;
        `}
`;

export const StyledMotionTitleElementWrapper = styled(motion.div)`
    align-items: center;
    display: flex;
    margin-left: 8px;
`;

export const StyledRightElementWrapper = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: center;
    margin-right: 5px;
    overflow: hidden;
`;
