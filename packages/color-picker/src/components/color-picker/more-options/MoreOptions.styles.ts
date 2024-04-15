import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledMoreOptions = styled.div``;
export const StyledMoreOptionsInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
`;

type StyledMoreOptionsInputProps = WithTheme<{ $isInvalid: boolean }>;

export const StyledMoreOptionsInput = styled.input<StyledMoreOptionsInputProps>`
    width: 100%;
    border-radius: 3px;
    border: 1px solid
        ${({ theme, $isInvalid }: StyledMoreOptionsInputProps) =>
            $isInvalid ? theme.wrong : 'rgba(160, 160, 160, 0.3)'};
    background-color: ${({ theme }: StyledMoreOptionsInputProps) =>
        theme.colorMode === 'classic' ? theme['000'] : theme['100']};
    color: ${({ theme, $isInvalid }: StyledMoreOptionsInputProps) =>
        $isInvalid ? theme.wrong : theme.text};
    padding: 6px;
    font-size: 12px;
`;
