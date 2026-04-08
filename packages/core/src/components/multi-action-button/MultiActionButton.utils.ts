import type { CSSProperties } from 'react';

export enum MultiActionButtonAutoCollapseMode {
    Expanded = 'expanded',
    IconsOnly = 'icons-only',
    PrimaryOnly = 'primary-only',
}

const AUTO_COLLAPSE_HYSTERESIS_PX = 12;
export const MULTI_ACTION_BUTTON_LABEL_GAP_PX = 6;
export const MULTI_ACTION_BUTTON_LABEL_RIGHT_PADDING_PX = 18;
export const MULTI_ACTION_BUTTON_SEPARATOR_WIDTH_PX = 1;

export interface GetMultiActionButtonAutoCollapseModeOptions {
    availableWidth?: number;
    expandedWidth: number;
    hasSecondaryAction: boolean;
    height: number;
    previousMode?: MultiActionButtonAutoCollapseMode;
}

export const getMinimumMultiActionButtonIconsWidth = ({
    hasSecondaryAction,
    height,
}: Pick<GetMultiActionButtonAutoCollapseModeOptions, 'hasSecondaryAction' | 'height'>): number => {
    const minimumPrimaryActionWidth = height;

    if (!hasSecondaryAction) {
        return minimumPrimaryActionWidth;
    }

    return minimumPrimaryActionWidth * 2 + 1;
};

export interface GetMinimumPrimaryLabelVisibleWidthOptions {
    hasVisibleSecondaryAction: boolean;
    height: number;
}

export const getMinimumPrimaryLabelVisibleWidth = ({
    hasVisibleSecondaryAction,
    height,
}: GetMinimumPrimaryLabelVisibleWidthOptions): number => {
    const minimumPrimaryIconWidth = height;
    const minimumPrimaryLabelWidth =
        MULTI_ACTION_BUTTON_LABEL_GAP_PX + MULTI_ACTION_BUTTON_LABEL_RIGHT_PADDING_PX;
    const minimumSecondaryWidth = hasVisibleSecondaryAction
        ? height + MULTI_ACTION_BUTTON_SEPARATOR_WIDTH_PX
        : 0;

    return minimumPrimaryIconWidth + minimumPrimaryLabelWidth + minimumSecondaryWidth;
};

export const getMultiActionButtonAutoCollapseMode = ({
    availableWidth,
    expandedWidth,
    hasSecondaryAction,
    height,
    previousMode = MultiActionButtonAutoCollapseMode.Expanded,
}: GetMultiActionButtonAutoCollapseModeOptions): MultiActionButtonAutoCollapseMode => {
    if (!availableWidth || expandedWidth <= 0) {
        return MultiActionButtonAutoCollapseMode.Expanded;
    }

    const minimumIconsWidth = getMinimumMultiActionButtonIconsWidth({
        hasSecondaryAction,
        height,
    });

    if (!hasSecondaryAction) {
        if (availableWidth < expandedWidth) {
            return MultiActionButtonAutoCollapseMode.PrimaryOnly;
        }

        if (
            previousMode === MultiActionButtonAutoCollapseMode.PrimaryOnly &&
            availableWidth < expandedWidth + AUTO_COLLAPSE_HYSTERESIS_PX
        ) {
            return MultiActionButtonAutoCollapseMode.PrimaryOnly;
        }

        return MultiActionButtonAutoCollapseMode.Expanded;
    }

    if (previousMode === MultiActionButtonAutoCollapseMode.Expanded) {
        if (availableWidth < minimumIconsWidth) {
            return MultiActionButtonAutoCollapseMode.PrimaryOnly;
        }

        if (availableWidth < expandedWidth) {
            return MultiActionButtonAutoCollapseMode.IconsOnly;
        }

        return MultiActionButtonAutoCollapseMode.Expanded;
    }

    if (previousMode === MultiActionButtonAutoCollapseMode.IconsOnly) {
        if (availableWidth < minimumIconsWidth) {
            return MultiActionButtonAutoCollapseMode.PrimaryOnly;
        }

        if (availableWidth < expandedWidth + AUTO_COLLAPSE_HYSTERESIS_PX) {
            return MultiActionButtonAutoCollapseMode.IconsOnly;
        }

        return MultiActionButtonAutoCollapseMode.Expanded;
    }

    if (availableWidth < minimumIconsWidth + AUTO_COLLAPSE_HYSTERESIS_PX) {
        return MultiActionButtonAutoCollapseMode.PrimaryOnly;
    }

    if (availableWidth < expandedWidth) {
        return MultiActionButtonAutoCollapseMode.IconsOnly;
    }

    if (availableWidth < expandedWidth + AUTO_COLLAPSE_HYSTERESIS_PX) {
        return MultiActionButtonAutoCollapseMode.IconsOnly;
    }

    return MultiActionButtonAutoCollapseMode.Expanded;
};

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
