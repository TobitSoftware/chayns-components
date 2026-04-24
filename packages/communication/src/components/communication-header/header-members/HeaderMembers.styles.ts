import styled from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';

type StyledHeaderMembersProps = WithTheme<{ $isLoading?: boolean }>;

export const StyledHeaderMembers = styled.div<StyledHeaderMembersProps>`
    width: 100%;
    opacity: ${({ $isLoading }) => ($isLoading ? 1 : 0.75)};

    display: flex;
    flex-direction: column;
`;

export const StyledHeaderMembersContent = styled.div`
    width: 100%;
    height: 100%;
    gap: 12px;
    overflow: hidden;

    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 8px;
    row-gap: 2px;
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
