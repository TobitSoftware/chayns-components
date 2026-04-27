import { ReactNode } from 'react';

export interface CommunicationContentProps {
    children: ReactNode;
    content: ReactNode;
    shouldShowContent?: boolean;
    breakPoint?: number;
    sideContentConfig?: SideContentConfig;
    overlayContentConfig?: OverlayContentConfig;
    onChange?: (width: number) => void;
}

export interface SideContentConfig {
    initialWidth?: number;
    minWidth?: number;
    maxWidth?: number;
}

export interface OverlayContentConfig {
    minHeight?: number;
    topOffset?: number;
}
