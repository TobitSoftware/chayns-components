import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { NavigationLayoutConfig } from '../NavigationLayout.types';

type StyledNavigationHeaderProps = WithTheme<{
    $height: number;
    $color: string;
    $safeAreas: NavigationLayoutConfig['safeAreas'];
}>;

export const StyledNavigationHeader = styled.div<StyledNavigationHeaderProps>`
    width: 100%;
    height: ${({ $height }) => $height}px;
    color: ${({ $color }) => $color};

    padding: ${({ $safeAreas }) => `${$safeAreas?.top || 0}px ${$safeAreas?.right || 16}px 0
        ${$safeAreas?.left || 16}px`};

    // Need for electron dragging
    -webkit-app-region: drag;

    display: flex;
    align-items: center;
    gap: 8px;
`;
