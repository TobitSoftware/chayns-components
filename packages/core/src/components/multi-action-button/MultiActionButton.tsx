import clsx from 'clsx';
import React, {
    FC,
    MouseEvent,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useElementSize, useMeasuredClone } from '../../hooks/element';
import { useIsTouch } from '../../utils/environment';
import ContextMenu from '../context-menu/ContextMenu';
import type { ContextMenuRef } from '../context-menu/ContextMenu.types';
import ActionButton from './action-button/ActionButton';
import { StyledMultiActionButton, StyledSeparator } from './MultiActionButton.styles';
import {
    getMinimumPrimaryLabelVisibleWidth,
    getMultiActionButtonAutoCollapseMode,
    getSecondaryContextMenuTriggerStyle,
    MultiActionButtonAutoCollapseMode,
} from './MultiActionButton.utils';
import { MultiActionButtonHeight } from './MultiActionButton.types';
import type {
    MultiActionButtonAction,
    MultiActionButtonActionEvent,
    MultiActionButtonProps,
} from './MultiActionButton.types';

const SECONDARY_CONTEXT_MENU_ACTION: MultiActionButtonAction = {
    icon: 'fa fa-chevron-down',
    label: undefined,
};

interface CreateMeasuredMultiActionButtonContentOptions {
    backgroundColor?: string;
    gapColor?: string;
    height: number;
    primaryAction: MultiActionButtonAction;
    secondaryAction?: MultiActionButtonAction;
}

const createMeasuredMultiActionButtonContent = ({
    backgroundColor,
    gapColor,
    height,
    primaryAction,
    secondaryAction,
}: CreateMeasuredMultiActionButtonContentOptions): ReactNode => (
    <StyledMultiActionButton style={{ width: 'fit-content' }}>
        <ActionButton
            action={primaryAction}
            actionType="primary"
            backgroundColor={primaryAction.backgroundColor ?? backgroundColor}
            isCollapsed={false}
            isDisabled={false}
            isShrunk={false}
            isSolo={!secondaryAction}
            showLabel
            shouldUseContentWidth
            height={height}
        />
        {secondaryAction && (
            <>
                <StyledSeparator $gapColor={gapColor} $isHidden={false} />
                <ActionButton
                    action={secondaryAction}
                    actionType="secondary"
                    backgroundColor={secondaryAction.backgroundColor ?? backgroundColor}
                    isCollapsed={false}
                    isDisabled={false}
                    isExpanded={false}
                    isHidden={false}
                    showLabel={false}
                    shouldUseContentWidth
                    height={height}
                />
            </>
        )}
    </StyledMultiActionButton>
);

/**
 * Multi-action button with optional secondary action that can expand on hover/click.
 */
const MultiActionButton: FC<MultiActionButtonProps> = ({
    backgroundColor,
    className,
    extendedTimeoutMs = 3000,
    gapColor,
    height = MultiActionButtonHeight.Medium,
    isCollapsed = false,
    isDisabled = false,
    primaryAction,
    secondaryAction,
    secondaryContextMenu,
    shouldAutoCollapse = false,
    shouldUseFullWidth,
    width,
}) => {
    const [isExtendedByClick, setIsExtendedByClick] = useState(false);
    const [isSecondaryExpanded, setIsSecondaryExpanded] = useState(false);
    const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

    const autoCollapseTimeoutRef = useRef<number | null>(null);
    const multiActionButtonRef = useRef<HTMLDivElement | null>(null);
    const secondaryContextMenuRef = useRef<ContextMenuRef>(null);
    const [autoCollapseMode, setAutoCollapseMode] = useState<MultiActionButtonAutoCollapseMode>(
        MultiActionButtonAutoCollapseMode.Expanded,
    );

    const isTouch = useIsTouch();
    const parentSize = useElementSize(multiActionButtonRef, { shouldUseParentElement: true });

    const hasSecondaryContextMenu = Boolean(secondaryContextMenu?.length);
    const secondaryTriggerAction = hasSecondaryContextMenu
        ? SECONDARY_CONTEXT_MENU_ACTION
        : secondaryAction;
    const hasExpandableSecondaryAction = Boolean(secondaryAction) && !hasSecondaryContextMenu;
    const hasSecondaryAction = Boolean(secondaryTriggerAction);
    const shouldUseContentWidth = !width && !shouldUseFullWidth;

    const expandedMeasuredContent = useMemo(
        () =>
            createMeasuredMultiActionButtonContent({
                backgroundColor,
                gapColor,
                height,
                primaryAction,
                secondaryAction: secondaryTriggerAction,
            }),
        [backgroundColor, gapColor, height, primaryAction, secondaryTriggerAction],
    );

    const { measuredElement, width: expandedMeasuredWidth } = useMeasuredClone({
        content: expandedMeasuredContent,
    });

    const availableWidth = useMemo(() => {
        const parentWidth = parentSize?.width;

        if (typeof width === 'number') {
            return typeof parentWidth === 'number' ? Math.min(parentWidth, width) : width;
        }

        return parentWidth;
    }, [parentSize?.width, width]);

    useEffect(() => {
        if (!shouldAutoCollapse || isCollapsed) {
            setAutoCollapseMode(MultiActionButtonAutoCollapseMode.Expanded);
            return;
        }

        if (expandedMeasuredWidth <= 0) {
            return;
        }

        setAutoCollapseMode((previousMode) =>
            getMultiActionButtonAutoCollapseMode({
                availableWidth,
                expandedWidth: expandedMeasuredWidth,
                hasSecondaryAction,
                height,
                previousMode,
            }),
        );
    }, [
        availableWidth,
        expandedMeasuredWidth,
        hasSecondaryAction,
        height,
        isCollapsed,
        shouldAutoCollapse,
    ]);

    const isAutoIconsOnly =
        shouldAutoCollapse && autoCollapseMode === MultiActionButtonAutoCollapseMode.IconsOnly;
    const isAutoPrimaryOnly =
        shouldAutoCollapse && autoCollapseMode === MultiActionButtonAutoCollapseMode.PrimaryOnly;
    const shouldKeepFullWidth = Boolean(shouldUseFullWidth);
    const shouldHideSecondaryForAutoCollapse = hasSecondaryAction && isAutoPrimaryOnly;
    const effectiveIsCollapsed = isCollapsed || (!shouldKeepFullWidth && isAutoPrimaryOnly);
    const resolvedSecondaryAction = hasSecondaryAction ? secondaryTriggerAction : undefined;
    const isSecondaryHidden = effectiveIsCollapsed || shouldHideSecondaryForAutoCollapse;
    const shouldPreventSecondaryExpansion = isAutoIconsOnly || isSecondaryHidden;
    const shouldKeepPrimaryLabelVisible = shouldKeepFullWidth && shouldAutoCollapse;
    const minimumPrimaryLabelVisibleWidth = getMinimumPrimaryLabelVisibleWidth({
        hasVisibleSecondaryAction: hasSecondaryAction,
        height,
    });
    const shouldHidePrimaryLabelForMinimumWidth =
        shouldKeepPrimaryLabelVisible &&
        typeof availableWidth === 'number' &&
        availableWidth <= minimumPrimaryLabelVisibleWidth;

    const resolvedWidth = shouldKeepFullWidth
        ? '100%'
        : effectiveIsCollapsed
          ? height
          : (width ?? 'fit-content');

    const secondaryContextMenuTriggerStyle = getSecondaryContextMenuTriggerStyle({
        height,
        isCollapsed: isSecondaryHidden,
        isExpanded: false,
        shouldUseContentWidth,
    });

    /**
     * Clears the current auto-collapse timer without changing visual state.
     */
    const clearAutoCollapseTimeout = useCallback(() => {
        if (autoCollapseTimeoutRef.current) {
            window.clearTimeout(autoCollapseTimeoutRef.current);
            autoCollapseTimeoutRef.current = null;
        }
    }, []);

    /**
     * Clears and restarts the auto-collapse timer used after click-triggered expansion.
     */
    const resetAutoCollapseTimeout = useCallback(() => {
        clearAutoCollapseTimeout();

        if (extendedTimeoutMs <= 0) {
            return;
        }

        autoCollapseTimeoutRef.current = window.setTimeout(() => {
            setIsSecondaryExpanded(false);
            setIsExtendedByClick(false);
        }, extendedTimeoutMs);
    }, [clearAutoCollapseTimeout, extendedTimeoutMs]);

    /**
     * Expands the secondary action and remembers that it originated from a click.
     */
    const expandSecondaryByClick = useCallback(() => {
        setIsSecondaryExpanded(true);
        setIsExtendedByClick(true);
        resetAutoCollapseTimeout();
    }, [resetAutoCollapseTimeout]);

    /**
     * Cleanup timers on unmount.
     */
    useEffect(
        () => () => {
            clearAutoCollapseTimeout();
        },
        [clearAutoCollapseTimeout],
    );

    /**
     * Collapsing the control should also reset any temporary expansion state.
     */
    useEffect(() => {
        if (effectiveIsCollapsed || shouldPreventSecondaryExpansion) {
            clearAutoCollapseTimeout();
            setIsSecondaryExpanded(false);
            setIsExtendedByClick(false);
            setIsSecondaryHovered(false);
        }
    }, [clearAutoCollapseTimeout, effectiveIsCollapsed, shouldPreventSecondaryExpansion]);

    /**
     * Handler for the primary action button.
     */
    const handlePrimaryClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (isDisabled || primaryAction.isDisabled) {
                return;
            }

            const payload: MultiActionButtonActionEvent = {
                action: 'primary',
                event,
                isExtended: isSecondaryExpanded,
                isTouch,
            };

            primaryAction.onClick?.(payload);
        },
        [isDisabled, isSecondaryExpanded, isTouch, primaryAction],
    );

    /**
     * Handler for the secondary action button.
     */
    const handleSecondaryClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (
                !resolvedSecondaryAction ||
                isSecondaryHidden ||
                isDisabled ||
                resolvedSecondaryAction.isDisabled
            ) {
                return;
            }

            if (hasSecondaryContextMenu) {
                secondaryContextMenuRef.current?.show();
                return;
            }

            const payload: MultiActionButtonActionEvent = {
                action: 'secondary',
                event,
                isExtended: isSecondaryExpanded,
                isTouch,
            };

            resolvedSecondaryAction.onClick?.(payload);
            if (!shouldPreventSecondaryExpansion) {
                expandSecondaryByClick();
            }
        },
        [
            expandSecondaryByClick,
            hasSecondaryContextMenu,
            isSecondaryHidden,
            isDisabled,
            isSecondaryExpanded,
            isTouch,
            resolvedSecondaryAction,
            shouldPreventSecondaryExpansion,
        ],
    );

    /**
     * Desktop hover behavior keeps the secondary action expanded while hovered.
     */
    const handleSecondaryMouseEnter = useCallback(() => {
        if (
            !secondaryAction ||
            isSecondaryHidden ||
            isTouch ||
            isDisabled ||
            shouldPreventSecondaryExpansion ||
            secondaryAction.isDisabled
        ) {
            return;
        }

        setIsSecondaryHovered(true);
        if (!isExtendedByClick) {
            setIsSecondaryExpanded(true);
        }
    }, [
        isSecondaryHidden,
        isDisabled,
        isExtendedByClick,
        isTouch,
        secondaryAction,
        shouldPreventSecondaryExpansion,
    ]);

    const handleSecondaryMouseLeave = useCallback(() => {
        if (isTouch) {
            return;
        }

        setIsSecondaryHovered(false);
        if (!isExtendedByClick && !effectiveIsCollapsed) {
            setIsSecondaryExpanded(false);
        }
    }, [effectiveIsCollapsed, isExtendedByClick, isTouch]);

    /**
     * Secondary label is visible when expanded or when hovered (desktop only).
     */
    const isSecondaryLabelVisible = isSecondaryExpanded || (!isTouch && isSecondaryHovered);

    return (
        <>
            {measuredElement}
            <StyledMultiActionButton
                className={clsx('beta-chayns-multi-action', className)}
                ref={multiActionButtonRef}
                style={{ maxWidth: '100%', width: resolvedWidth }}
            >
                <ActionButton
                    action={primaryAction}
                    actionType="primary"
                    backgroundColor={primaryAction.backgroundColor ?? backgroundColor}
                    isCollapsed={effectiveIsCollapsed}
                    isDisabled={isDisabled}
                    isShrunk={
                        hasSecondaryAction &&
                        ((!shouldKeepFullWidth && isAutoIconsOnly) || isSecondaryExpanded)
                    }
                    isSolo={!hasSecondaryAction || isSecondaryHidden || effectiveIsCollapsed}
                    onClick={handlePrimaryClick}
                    showLabel={
                        !effectiveIsCollapsed &&
                        !shouldHidePrimaryLabelForMinimumWidth &&
                        (shouldKeepPrimaryLabelVisible || !isAutoIconsOnly) &&
                        (shouldKeepPrimaryLabelVisible || !shouldHideSecondaryForAutoCollapse) &&
                        (!hasExpandableSecondaryAction || !isSecondaryExpanded)
                    }
                    shouldUseContentWidth={shouldUseContentWidth}
                    height={height}
                />
                {hasSecondaryAction && (
                    <>
                        <StyledSeparator $gapColor={gapColor} $isHidden={isSecondaryHidden} />
                        {hasSecondaryContextMenu ? (
                            <ContextMenu
                                items={secondaryContextMenu ?? []}
                                ref={secondaryContextMenuRef}
                                shouldDisableClick
                                shouldUseDefaultTriggerStyles={false}
                                shouldHidePopupArrow
                                yOffset={-6}
                                style={secondaryContextMenuTriggerStyle}
                            >
                                <ActionButton
                                    action={
                                        resolvedSecondaryAction ?? SECONDARY_CONTEXT_MENU_ACTION
                                    }
                                    actionType="secondary"
                                    backgroundColor={
                                        resolvedSecondaryAction?.backgroundColor ?? backgroundColor
                                    }
                                    isCollapsed={false}
                                    isDisabled={isDisabled}
                                    isExpanded={false}
                                    isHidden={isSecondaryHidden}
                                    key="multi-action-secondary-context-menu"
                                    onClick={handleSecondaryClick}
                                    showLabel={false}
                                    shouldUseContentWidth={shouldUseContentWidth}
                                    height={height}
                                />
                            </ContextMenu>
                        ) : (
                            <ActionButton
                                action={
                                    resolvedSecondaryAction ??
                                    secondaryAction ??
                                    SECONDARY_CONTEXT_MENU_ACTION
                                }
                                actionType="secondary"
                                backgroundColor={
                                    resolvedSecondaryAction?.backgroundColor ?? backgroundColor
                                }
                                isCollapsed={false}
                                isDisabled={isDisabled}
                                isExpanded={!isAutoIconsOnly && isSecondaryExpanded}
                                isHidden={isSecondaryHidden}
                                key="multi-action-secondary-button"
                                onClick={handleSecondaryClick}
                                onMouseEnter={handleSecondaryMouseEnter}
                                onMouseLeave={handleSecondaryMouseLeave}
                                showLabel={
                                    !isSecondaryHidden &&
                                    !isAutoIconsOnly &&
                                    isSecondaryLabelVisible
                                }
                                shouldUseContentWidth={shouldUseContentWidth}
                                height={height}
                            />
                        )}
                    </>
                )}
            </StyledMultiActionButton>
        </>
    );
};

MultiActionButton.displayName = 'MultiActionButton';

export default MultiActionButton;
