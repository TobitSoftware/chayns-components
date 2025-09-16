import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledRankingEntryProps = WithTheme<{
    $shouldShowLines: boolean;
}>;

export const StyledRankingEntry = styled.div<StyledRankingEntryProps>`
    ${({ theme, $shouldShowLines }) =>
        theme.accordionLines &&
        $shouldShowLines &&
        css`
            &:not(:last-child) {
                border-bottom: 1px solid rgba(${theme['headline-rgb']}, 0.5);
            }
        `}
`;

export const StyledRankingEntryElement = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    padding: 4px 6px;
`;

export const StyledRankingEntryElementLeft = styled.div``;

export const StyledRankingEntryElementRight = styled.div``;

export const StyledRankingEntryRightElement = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const StyledRankingEntryRightElementPoints = styled.div`
    line-height: 15px;
`;

export const StyledRankingEntryContent = styled.div`
    display: flex;
    flex-direction: column;

    gap: 8px;
`;

export const StyledRankingEntryContentHeadline = styled.div`
    font-weight: bold;
    font-size: 80%;

    margin-bottom: -8px;
`;

export const StyledRankingEntryContentEntry = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StyledRankingEntryContentEntryName = styled.div``;

export const StyledRankingEntryContentEntryValue = styled.div``;
