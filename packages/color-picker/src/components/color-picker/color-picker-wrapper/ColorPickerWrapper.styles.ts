import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledColorPickerWrapper = styled.div``;

export const StyledColorPickerWrapperInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

type StyledColorPickerWrapperInfoColorProps = WithTheme<{
    $color?: string;
}>;

type StyledColorPickerWrapperInfoColorWrapperProps = WithTheme<{
    $shouldShowRoundPreviewColor: boolean;
}>;

export const StyledColorPickerWrapperInfoColorWrapper = styled.div<StyledColorPickerWrapperInfoColorWrapperProps>`
    border-radius: ${({ $shouldShowRoundPreviewColor }) =>
        $shouldShowRoundPreviewColor ? '50px' : '0px'};
    border: 1px ${({ theme }: StyledColorPickerWrapperInfoColorProps) => theme.text} solid;

    width: 15px;
    aspect-ratio: 1;
    position: relative;

    overflow: hidden;
`;

export const StyledColorPickerWrapperInfoColorBackground = styled.div`
    position: absolute;
    background-color: #fff;
    background-image: linear-gradient(45deg, #a0a0a0 25%, #0000 0),
        linear-gradient(-45deg, #a0a0a0 25%, #0000 0), linear-gradient(45deg, #0000 75%, #a0a0a0 0),
        linear-gradient(-45deg, #0000 75%, #a0a0a0 0);
    background-position:
        0 0,
        0 4px,
        4px -4px,
        -4px 0;
    background-repeat: repeat;
    background-size: 8px 8px;
    height: 100%;
    width: 100%;
`;

export const StyledColorPickerWrapperInfoColor = styled.div.attrs<StyledColorPickerWrapperInfoColorProps>(
    ({ $color }) => ({
        style: {
            backgroundColor: $color,
        },
    }),
)`
    height: 100%;
    width: 100%;
    position: absolute;
`;

type StyledColorPickerWrapperInfoTextProps = WithTheme<unknown>;

export const StyledColorPickerWrapperInfoText = styled.div<StyledColorPickerWrapperInfoTextProps>`
    border-bottom-style: dashed;
    border-bottom-width: 1px;

    color: ${({ theme }: StyledColorPickerWrapperInfoTextProps) => theme.text};
`;
