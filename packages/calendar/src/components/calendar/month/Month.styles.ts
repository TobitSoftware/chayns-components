import styled from 'styled-components';
import type { WithTheme } from '@chayns-components/core';
import { motion } from 'framer-motion';

export const StyledMonth = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const StyledMonthHead = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledMonthIconWrapper = styled.div`
    cursor: pointer;
`;

type StyledMonthNameProps = WithTheme<{
    shouldShowLeftArrow: boolean;
    shouldShowRightArrow: boolean;
}>;

export const StyledMonthName = styled.div<StyledMonthNameProps>`
    font-weight: bold;
    width: 100%;
    text-align: center;
    user-select: none;

    margin: 0 ${({ shouldShowRightArrow }) => (shouldShowRightArrow ? '0' : '15px')} 0
        ${({ shouldShowLeftArrow }) => (shouldShowLeftArrow ? '0' : '15px')};
`;

export const StyledDayAnimationWrapper = styled.div`
    //display: flex;
    //align-items: center;
`;

type StyledMotionDayWrapperProps = WithTheme<{ width: number }>;

export const StyledMotionDayWrapper = styled(motion.div)<StyledMotionDayWrapperProps>`
    position: absolute;
    width: 100%;
    height: 100%;
`;
