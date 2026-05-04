import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledChip = styled.div<WithTheme<unknown>>`
    display: flex;
    align-items: center;

    background-color: ${({ theme }) => theme['102']};
    border: 1px solid ${({ theme }) => `rgba(${theme['text-rgb'] ?? ''}, 0.12)`};
    border-radius: 3px;

    font-size: 13px;
    font-weight: 500;
    gap: 4px;
    line-height: 1;
    max-width: 200px;
    min-width: 0;
    padding: 6px;
`;

type StyledChipLabelProps = WithTheme<{
    $isClickable: boolean;
}>;

export const StyledChipLabel = styled.div<StyledChipLabelProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    white-space: nowrap;

    cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};

    .beta-chayns-icon {
        min-height: 0;
        min-width: 0;
    }
`;

export const StyledChipXMark = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
