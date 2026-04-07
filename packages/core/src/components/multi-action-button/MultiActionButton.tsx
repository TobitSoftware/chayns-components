import clsx from 'clsx';
import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useIsTouch } from '../../utils/environment';
import ContextMenu from '../context-menu/ContextMenu';
import type { ContextMenuRef } from '../context-menu/ContextMenu.types';
import ActionButton from './action-button/ActionButton';
import { StyledMultiActionButton, StyledSeparator } from './MultiActionButton.styles';
import { getSecondaryContextMenuTriggerStyle } from './MultiActionButton.utils';
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
    shouldUseFullWidth,
    width,
}) => {
    const [isExtendedByClick, setIsExtendedByClick] = useState(false);
    const [isSecondaryExpanded, setIsSecondaryExpanded] = useState(false);
    const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

    const autoCollapseTimeoutRef = useRef<number | null>(null);
    const secondaryContextMenuRef = useRef<ContextMenuRef>(null);

    const isTouch = useIsTouch();

    const hasSecondaryContextMenu = Boolean(secondaryContextMenu?.length);
    const hasExpandableSecondaryAction = Boolean(secondaryAction) && !hasSecondaryContextMenu;
    const hasSecondaryAction = hasExpandableSecondaryAction || hasSecondaryContextMenu;
    const resolvedSecondaryAction = hasSecondaryContextMenu
        ? SECONDARY_CONTEXT_MENU_ACTION
        : secondaryAction;
    const shouldUseContentWidth = !width && !shouldUseFullWidth;

    const resolvedWidth = isCollapsed
        ? height
        : (width ?? (shouldUseFullWidth ? '100%' : 'fit-content'));

    const secondaryContextMenuTriggerStyle = getSecondaryContextMenuTriggerStyle({
        height,
        isCollapsed,
        isExpanded: isSecondaryExpanded,
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
        if (isCollapsed) {
            setIsSecondaryExpanded(false);
            setIsExtendedByClick(false);
        }
    }, [isCollapsed]);

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
                isCollapsed ||
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
            expandSecondaryByClick();
        },
        [
            expandSecondaryByClick,
            hasSecondaryContextMenu,
            isCollapsed,
            isDisabled,
            isSecondaryExpanded,
            isTouch,
            resolvedSecondaryAction,
        ],
    );

    /**
     * Desktop hover behavior keeps the secondary action expanded while hovered.
     */
    const handleSecondaryMouseEnter = useCallback(() => {
        if (
            !secondaryAction ||
            isCollapsed ||
            isTouch ||
            isDisabled ||
            secondaryAction.isDisabled
        ) {
            return;
        }

        setIsSecondaryHovered(true);
        if (!isExtendedByClick) {
            setIsSecondaryExpanded(true);
        }
    }, [isCollapsed, isDisabled, isExtendedByClick, isTouch, secondaryAction]);

    const handleSecondaryMouseLeave = useCallback(() => {
        if (isTouch) {
            return;
        }

        setIsSecondaryHovered(false);
        if (!isExtendedByClick && !isCollapsed) {
            setIsSecondaryExpanded(false);
        }
    }, [isCollapsed, isExtendedByClick, isTouch]);

    /**
     * Secondary label is visible when expanded or when hovered (desktop only).
     */
    const isSecondaryLabelVisible = isSecondaryExpanded || (!isTouch && isSecondaryHovered);

    return (
        <StyledMultiActionButton
            className={clsx('beta-chayns-multi-action', className)}
            style={{ maxWidth: '100%', width: resolvedWidth }}
        >
            <ActionButton
                action={primaryAction}
                actionType="primary"
                backgroundColor={primaryAction.backgroundColor ?? backgroundColor}
                isCollapsed={isCollapsed}
                isDisabled={isDisabled}
                isShrunk={hasExpandableSecondaryAction && isSecondaryExpanded}
                isSolo={!hasSecondaryAction && !isCollapsed}
                onClick={handlePrimaryClick}
                showLabel={!isCollapsed && (!hasExpandableSecondaryAction || !isSecondaryExpanded)}
                shouldUseContentWidth={shouldUseContentWidth}
                height={height}
            />
            {resolvedSecondaryAction && (
                <>
                    {!isCollapsed && <StyledSeparator $gapColor={gapColor} />}
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
                                action={resolvedSecondaryAction}
                                actionType="secondary"
                                backgroundColor={
                                    resolvedSecondaryAction.backgroundColor ?? backgroundColor
                                }
                                isCollapsed={isCollapsed}
                                isDisabled={isDisabled}
                                isExpanded={false}
                                isHidden={isCollapsed}
                                onClick={handleSecondaryClick}
                                showLabel={false}
                                shouldUseContentWidth={shouldUseContentWidth}
                                height={height}
                            />
                        </ContextMenu>
                    ) : (
                        <ActionButton
                            action={resolvedSecondaryAction}
                            actionType="secondary"
                            backgroundColor={
                                resolvedSecondaryAction.backgroundColor ?? backgroundColor
                            }
                            isCollapsed={isCollapsed}
                            isDisabled={isDisabled}
                            isExpanded={isSecondaryExpanded}
                            isHidden={isCollapsed}
                            onClick={handleSecondaryClick}
                            onMouseEnter={handleSecondaryMouseEnter}
                            onMouseLeave={handleSecondaryMouseLeave}
                            showLabel={isSecondaryLabelVisible}
                            shouldUseContentWidth={shouldUseContentWidth}
                            height={height}
                        />
                    )}
                </>
            )}
        </StyledMultiActionButton>
    );
};

MultiActionButton.displayName = 'MultiActionButton';

export default MultiActionButton;
