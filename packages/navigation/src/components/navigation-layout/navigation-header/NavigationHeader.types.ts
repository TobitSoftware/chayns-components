import { NavigationLayoutConfig, NavigationLayoutProps } from '../NavigationLayout.types';

export interface NavigationHeaderProps {
    height: number;
    color: string;
    safeAreas?: NavigationLayoutConfig['safeAreas'];
    headerContent: NavigationLayoutProps['headerContent'];
}
