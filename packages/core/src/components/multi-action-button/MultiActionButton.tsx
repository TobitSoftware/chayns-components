import clsx from 'clsx';
import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useIsTouch } from '../../utils/environment';
import ActionButton from './action-button/ActionButton';
import { StyledMultiActionButton, StyledSeparator } from './MultiActionButton.styles';
import { MultiActionButtonHeight } from './MultiActionButton.types';
import type {
    MultiActionButtonActionEvent,
    MultiActionButtonProps,
} from './MultiActionButton.types';

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
    shouldUseFullWidth,
    width,
}) => {
    const [isExtendedByClick, setIsExtendedByClick] = useState(false);
    const [isSecondaryExpanded, setIsSecondaryExpanded] = useState(false);
    const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

    const autoCollapseTimeoutRef = useRef<number | null>(null);

    const isTouch = useIsTouch();

    const hasSecondaryAction = Boolean(secondaryAction);
    const shouldUseContentWidth = !width && !shouldUseFullWidth;

    const resolvedWidth = isCollapsed
        ? height
        : (width ?? (shouldUseFullWidth ? '100%' : 'fit-content'));

    /**
     * Clears and restarts the auto-collapse timer used after click-triggered expansion.
     */
    const resetAutoCollapseTimeout = useCallback(() => {
        if (autoCollapseTimeoutRef.current) {
            window.clearTimeout(autoCollapseTimeoutRef.current);
        }

        if (extendedTimeoutMs <= 0) {
            autoCollapseTimeoutRef.current = null;
            return;
        }

        autoCollapseTimeoutRef.current = window.setTimeout(() => {
            setIsSecondaryExpanded(false);
            setIsExtendedByClick(false);
        }, extendedTimeoutMs);
    }, [extendedTimeoutMs]);

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
            if (autoCollapseTimeoutRef.current) {
                window.clearTimeout(autoCollapseTimeoutRef.current);
            }
        },
        [],
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
            if (!secondaryAction || isCollapsed || isDisabled || secondaryAction.isDisabled) {
                return;
            }

            const payload: MultiActionButtonActionEvent = {
                action: 'secondary',
                event,
                isExtended: isSecondaryExpanded,
                isTouch,
            };

            secondaryAction.onClick?.(payload);
            expandSecondaryByClick();
        },
        [
            expandSecondaryByClick,
            isCollapsed,
            isDisabled,
            isSecondaryExpanded,
            isTouch,
            secondaryAction,
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
                isShrunk={hasSecondaryAction && isSecondaryExpanded}
                isSolo={!hasSecondaryAction && !isCollapsed}
                onClick={handlePrimaryClick}
                showLabel={!isCollapsed && (!hasSecondaryAction || !isSecondaryExpanded)}
                shouldUseContentWidth={shouldUseContentWidth}
                height={height}
            />
            {secondaryAction && (
                <>
                    {!isCollapsed && <StyledSeparator $gapColor={gapColor} />}
                    <ActionButton
                        action={secondaryAction}
                        actionType="secondary"
                        backgroundColor={secondaryAction.backgroundColor ?? backgroundColor}
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
                </>
            )}
        </StyledMultiActionButton>
    );
};

MultiActionButton.displayName = 'MultiActionButton';

export default MultiActionButton;
