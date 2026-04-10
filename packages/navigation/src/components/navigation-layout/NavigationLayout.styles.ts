import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { ColorMode } from 'chayns-api';

export const StyledNavigationLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-height: 0;
    position: relative;
`;

export const StyledNavigationLayoutContentWrapper = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    min-height: 0;
`;

type StyledNavigationLayoutContentProps = WithTheme<{ $colorMode: ColorMode }>;

export const StyledNavigationLayoutContent = styled.div<StyledNavigationLayoutContentProps>`
    background-color: ${({ $colorMode }) =>
        $colorMode === ColorMode.Dark ? '#121212' : '#FFFFFF'};

    border-top-left-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 20px 16px;

    flex: 1;
    width: 100%;
    min-width: 0;
    min-height: 0;
`;

type StyledNavigationLayoutBackgroundProps = WithTheme<{ $backgroundColor: string }>;

export const StyledNavigationLayoutBackground = styled.div<StyledNavigationLayoutBackgroundProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -100;

    background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const StyledNavigationLayoutBackgroundImage = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
`;
