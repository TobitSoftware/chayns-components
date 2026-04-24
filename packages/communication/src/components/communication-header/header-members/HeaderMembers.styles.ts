import styled from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';

type StyledHeaderMembersProps = WithTheme<{ $isLoading?: boolean }>;

export const StyledHeaderMembers = styled.div<StyledHeaderMembersProps>`
    width: 100%;
    opacity: ${({ $isLoading }) => ($isLoading ? 1 : 0.75)};
`;

export const StyledHeaderMembersFirstMember = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const StyledHeaderMembersDate = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const StyledHeaderMembersIconWrapper = styled.div<WithTheme<unknown>>`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    aspect-ratio: 1;
    padding: 6px;

    border-radius: 4px;

    &:hover {
        background-color: ${({ theme }) => theme['201']};
    }
`;

export const StyledMotionIcon = styled(motion.div)`
    display: flex;
`;
