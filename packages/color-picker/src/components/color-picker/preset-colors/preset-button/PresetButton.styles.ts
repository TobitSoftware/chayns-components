import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledPresetButtonProps = WithTheme<{ $isDisabled: boolean }>;

export const StyledPresetButton = styled.div<StyledPresetButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    width: 22px;
    aspect-ratio: 1;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'normal' : 'pointer')};

    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};

    border-radius: 50px;
    border: 1px solid rgba(160, 160, 160, 0.3);
`;
