import type { CSSProperties } from 'react';

export interface GetSecondaryContextMenuTriggerStyleOptions {
    height: number;
    isCollapsed: boolean;
    isExpanded: boolean;
    shouldUseContentWidth: boolean;
}

export const getSecondaryContextMenuTriggerStyle = ({
    height,
    isCollapsed,
    isExpanded,
    shouldUseContentWidth,
}: GetSecondaryContextMenuTriggerStyleOptions): CSSProperties => {
    if (isCollapsed) {
        return {
            display: 'inline-flex',
            minWidth: 0,
            opacity: 0,
            pointerEvents: 'none',
            width: 0,
        };
    }

    if (shouldUseContentWidth) {
        return {
            display: 'inline-flex',
            flex: '0 1 auto',
            minWidth: 0,
        };
    }

    if (isExpanded) {
        return {
            display: 'inline-flex',
            flex: '1 1 auto',
            minWidth: 0,
        };
    }

    return {
        display: 'inline-flex',
        flex: '0 0 auto',
        minWidth: 0,
        width: height,
    };
};
