import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledColorPickerWrapper = styled.div``;

export const StyledColorPickerWrapperInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

type StyledColorPickerWrapperInfoColorProps = WithTheme<{ $color?: string }>;

export const StyledColorPickerWrapperInfoColor = styled.div.attrs<StyledColorPickerWrapperInfoColorProps>(
    ({ $color }) => ({
        style: {
            backgroundColor: $color,
        },
    }),
)`
    width: 15px;
    aspect-ratio: 1;
    border-radius: 50px;
`;

type StyledColorPickerWrapperInfoTextProps = WithTheme<unknown>;

export const StyledColorPickerWrapperInfoText = styled.div<StyledColorPickerWrapperInfoTextProps>`
    border-bottom-style: dashed;
    border-bottom-width: 1px;

    color: ${({ theme }: StyledColorPickerWrapperInfoTextProps) => theme.text};
`;
