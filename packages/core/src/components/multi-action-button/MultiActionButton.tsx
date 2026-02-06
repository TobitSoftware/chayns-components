import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
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
    shouldShowSecondaryLabelOnHover = true,
}) => {
    const [isSecondaryExtended, setIsSecondaryExtended] = useState(false);
    const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);
    const [isExtendedFromClick, setIsExtendedFromClick] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const isTouch = useIsTouch();
    const hasSecondaryAction = Boolean(secondaryAction);
    const theme = useTheme() as Theme;
    const defaultColor = theme?.text ?? '#fff';
    // Ensure the extended state resets after the timeout window (click-only).
    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            setIsSecondaryExtended(false);
            setIsExtendedFromClick(false);
        }, extendedTimeoutMs);
    }, [extendedTimeoutMs]);

    // Trigger an extend (click path) and schedule auto-reset.
    const extendSecondaryByClick = useCallback(() => {
        setIsSecondaryExtended(true);
        setIsExtendedFromClick(true);
        resetTimeout();
    }, [resetTimeout]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

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

    const handleSecondaryClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (!secondaryAction || isDisabled || secondaryAction.isDisabled) {
                return;
            }

            extendSecondaryByClick();

            const payload: MultiActionButtonActionEvent = {
                action: 'secondary',
                isExtended: true,
                isTouch,
                event,
            };

            secondaryAction.onClick?.(payload);
        },
        [extendSecondaryByClick, isDisabled, isTouch, secondaryAction],
    );

    const handleSecondaryMouseEnter = useCallback(() => {
        if (!secondaryAction || isTouch || isDisabled || secondaryAction.isDisabled) {
            return;
        }

        setIsSecondaryHovered(true);
        if (!isExtendedFromClick) {
            setIsSecondaryExtended(true);
        }
    }, [isDisabled, isExtendedFromClick, isTouch, secondaryAction]);

    const handleSecondaryMouseLeave = useCallback(() => {
        if (isTouch) {
            return;
        }

        setIsSecondaryHovered(false);
        if (!isExtendedFromClick) {
            setIsSecondaryExtended(false);
        }
    }, [isExtendedFromClick, isTouch]);

    const shouldShowSecondaryLabel =
        isSecondaryExtended || (!isTouch && shouldShowSecondaryLabelOnHover && isSecondaryHovered);

    return (
        <StyledMultiActionButton className={clsx('beta-chayns-multi-action', className)}>
            <StyledActionButton
                disabled={isDisabled || primaryAction.isDisabled}
                $isPrimary={hasSecondaryAction}
                $isCollapsed={hasSecondaryAction && isSecondaryExtended}
                $isSolo={!hasSecondaryAction}
                $statusType={primaryAction.status?.type}
                $pulseColor={primaryAction.status?.pulseColor}
                onClick={handlePrimaryClick}
                type="button"
            >
                <StyledActionContent>
                    <StyledIconSlot $isPrimary={hasSecondaryAction}>
                        {typeof primaryAction.icon === 'string' ? (
                            <Icon icons={[primaryAction.icon]} color={primaryAction.color ?? defaultColor} size={18} />
                        ) : (
                            primaryAction.icon
                        )}
                    </StyledIconSlot>
                    <AnimatePresence initial={false}>
                        {(!hasSecondaryAction || !isSecondaryExtended) && (
                            <motion.span
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                initial={{ opacity: 0, width: 0 }}
                                key="primary-label"
                                style={{ overflow: 'hidden' }}
                                transition={{ duration: 0.2 }}
                            >
                                <StyledPrimaryLabel style={{ color: primaryAction.color ?? defaultColor }}>
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
                    $statusType={secondaryAction.status?.type}
                    $pulseColor={secondaryAction.status?.pulseColor}
                    onClick={handleSecondaryClick}
                    onMouseEnter={handleSecondaryMouseEnter}
                    onMouseLeave={handleSecondaryMouseLeave}
                    type="button"
                >
                    <StyledActionContent>
                        <StyledIconSlot $isSecondary>
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
                                    style={{ overflow: 'hidden' }}
                                    transition={{ duration: 0.2 }}
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
