import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../icon/Icon';
import { useIsTouch } from '../../utils/environment';
import {
    StyledActionButton,
    StyledActionContent,
    StyledIconSlot,
    StyledMultiActionButton,
    StyledPrimaryLabel,
    StyledSecondaryLabel,
} from './MultiActionButton.styles';
import type {
    MultiActionButtonActionEvent,
    MultiActionButtonProps,
} from './MultiActionButton.types';

const MultiActionButton: FC<MultiActionButtonProps> = ({
    className,
    isDisabled,
    primaryAction,
    secondaryAction,
    extendedTimeoutMs = 2000,
    width,
    backgroundColor,
    shouldUseFullWidth,
    isCollapsed = false,
}) => {
    const [isSecondaryExtended, setIsSecondaryExtended] = useState(false);
    const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);
    const [isExtendedFromClick, setIsExtendedFromClick] = useState(false);

    const timeoutRef = useRef<number | null>(null);

    const isTouch = useIsTouch();

    const hasSecondaryAction = Boolean(secondaryAction);

    const defaultColor = '#fff';

    // Ensure the extended state resets after the timeout window (click-only).
    // Reset the auto-collapse timeout after click-based extension.
    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            setIsSecondaryExtended(false);
            setIsExtendedFromClick(false);
        }, extendedTimeoutMs);
    }, [extendedTimeoutMs]);

    // Extend the secondary action due to a click.
    const extendSecondaryByClick = useCallback(() => {
        setIsSecondaryExtended(true);
        setIsExtendedFromClick(true);
        resetTimeout();
    }, [resetTimeout]);

    // Cleanup timers on unmount.
    useEffect(
        () => () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
        },
        [],
    );

    // Collapsing the whole button should also clear any secondary expansion.
    useEffect(() => {
        if (isCollapsed) {
            setIsSecondaryExtended(false);
            setIsExtendedFromClick(false);
        }
    }, [isCollapsed]);

    // Primary action click handler.
    // Primary action click handler.
    const handlePrimaryClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (isDisabled || primaryAction.isDisabled) {
                return;
            }

            const payload: MultiActionButtonActionEvent = {
                action: 'primary',
                isExtended: isSecondaryExtended,
                isTouch,
                event,
            };

            primaryAction.onClick?.(payload);
        },
        [isDisabled, primaryAction, isSecondaryExtended, isTouch],
    );

    // Secondary action click handler.
    const handleSecondaryClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (!secondaryAction || isCollapsed || isDisabled || secondaryAction.isDisabled) {
                return;
            }

            const payload: MultiActionButtonActionEvent = {
                action: 'secondary',
                isExtended: isSecondaryExtended,
                isTouch,
                event,
            };

            secondaryAction.onClick?.(payload);

            extendSecondaryByClick();
        },
        [
            extendSecondaryByClick,
            isCollapsed,
            isDisabled,
            isSecondaryExtended,
            isTouch,
            secondaryAction,
        ],
    );

    // Hovering the secondary action should extend it immediately on desktop.
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
        if (!isExtendedFromClick) {
            setIsSecondaryExtended(true);
        }
    }, [isCollapsed, isDisabled, isExtendedFromClick, isTouch, secondaryAction]);

    // Leaving the secondary action should collapse it immediately on desktop.
    const handleSecondaryMouseLeave = useCallback(() => {
        if (isTouch) {
            return;
        }

        setIsSecondaryHovered(false);
        if (!isExtendedFromClick && !isCollapsed) {
            setIsSecondaryExtended(false);
        }
    }, [isCollapsed, isExtendedFromClick, isTouch]);

    // Secondary label is shown whenever the button is extended or hovered on desktop.
    const shouldShowSecondaryLabel = isSecondaryExtended || (!isTouch && isSecondaryHovered);

    const resolvedWidth = isCollapsed ? 42 : width ?? (shouldUseFullWidth ? '100%' : 'fit-content');
    const shouldUseContentWidth = !width && !shouldUseFullWidth;

    return (
        <StyledMultiActionButton
            className={clsx('beta-chayns-multi-action', className)}
            style={{ width: resolvedWidth, maxWidth: '100%' }}
        >
            <StyledActionButton
                disabled={isDisabled || primaryAction.isDisabled}
                $isPrimary={hasSecondaryAction}
                $isCollapsed={isCollapsed}
                $isShrunk={hasSecondaryAction && isSecondaryExtended}
                $isSolo={!hasSecondaryAction && !isCollapsed}
                $statusType={primaryAction.status?.type}
                $pulseColor={primaryAction.status?.pulseColor}
                $backgroundColor={backgroundColor}
                $useContentWidth={shouldUseContentWidth}
                onClick={handlePrimaryClick}
                type="button"
            >
                <StyledActionContent>
                    <StyledIconSlot>
                        {typeof primaryAction.icon === 'string' ? (
                            <Icon
                                icons={[primaryAction.icon]}
                                color={primaryAction.color ?? defaultColor}
                                size={18}
                            />
                        ) : (
                            primaryAction.icon
                        )}
                    </StyledIconSlot>
                    <AnimatePresence initial={false}>
                        {(!hasSecondaryAction || !isSecondaryExtended) && !isCollapsed && (
                            <motion.span
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                initial={{ opacity: 0, width: 0 }}
                                key="primary-label"
                                style={{
                                    flex: '1 1 auto',
                                    minWidth: 0,
                                    overflow: 'hidden',
                                    textAlign: 'left',
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <StyledPrimaryLabel
                                    style={{ color: primaryAction.color ?? defaultColor }}
                                >
                                    {primaryAction.label}
                                </StyledPrimaryLabel>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </StyledActionContent>
            </StyledActionButton>
            {secondaryAction && (
                <StyledActionButton
                    disabled={isDisabled || secondaryAction.isDisabled}
                    $isSecondary
                    $isExpanded={isSecondaryExtended}
                    $isHidden={isCollapsed}
                    $statusType={secondaryAction.status?.type}
                    $pulseColor={secondaryAction.status?.pulseColor}
                    $backgroundColor={backgroundColor}
                    $useContentWidth={shouldUseContentWidth}
                    onClick={handleSecondaryClick}
                    onMouseEnter={handleSecondaryMouseEnter}
                    onMouseLeave={handleSecondaryMouseLeave}
                    type="button"
                >
                    <StyledActionContent>
                        <StyledIconSlot>
                            {typeof secondaryAction.icon === 'string' ? (
                                <Icon
                                    icons={[secondaryAction.icon]}
                                    color={secondaryAction.color ?? defaultColor}
                                    size={18}
                                />
                            ) : (
                                secondaryAction.icon
                            )}
                        </StyledIconSlot>
                        <AnimatePresence initial={false}>
                            {shouldShowSecondaryLabel && secondaryAction.label && (
                                <motion.span
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    initial={{ opacity: 0, width: 0 }}
                                    key="secondary-label"
                                    style={{
                                        flex: '1 1 auto',
                                        minWidth: 0,
                                        overflow: 'hidden',
                                        textAlign: 'left',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <StyledSecondaryLabel
                                        style={{ color: secondaryAction.color ?? defaultColor }}
                                    >
                                        {secondaryAction.label}
                                    </StyledSecondaryLabel>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </StyledActionContent>
                </StyledActionButton>
            )}
        </StyledMultiActionButton>
    );
};

MultiActionButton.displayName = 'MultiActionButton';

export default MultiActionButton;
