import { AnimatePresence } from 'motion/react';
import React, { FC, MouseEvent } from 'react';
import Icon from '../../icon/Icon';
import {
    StyledActionButton,
    StyledActionContent,
    StyledIconSlot,
    StyledLabelWrapper,
    StyledSecondaryLabel,
} from './ActionButton.styles';
import type { MultiActionButtonAction } from '../MultiActionButton.types';

const LABEL_GAP = 6;
const LABEL_TRANSITION = { duration: 0.3 };

export type ActionButtonProps = {
    action: MultiActionButtonAction;
    actionType: 'primary' | 'secondary';
    backgroundColor?: string;
    defaultColor: string;
    isCollapsed: boolean;
    isDisabled: boolean;
    isExpanded?: boolean;
    isHidden?: boolean;
    isShrunk?: boolean;
    isSolo?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    showLabel: boolean;
    shouldUseContentWidth: boolean;
};

/**
 * Shared action button UI used by both primary and secondary actions.
 * Keeps layout and animations consistent while isolating styling details.
 */
const ActionButton: FC<ActionButtonProps> = ({
    action,
    actionType,
    backgroundColor,
    defaultColor,
    isCollapsed,
    isDisabled,
    isExpanded,
    isHidden,
    isShrunk,
    isSolo,
    onClick,
    onMouseEnter,
    onMouseLeave,
    showLabel,
    shouldUseContentWidth,
}) => {
    const isPrimary = actionType === 'primary';
    const isSecondary = actionType === 'secondary';
    const actionColor = action.color ?? defaultColor;
    const shouldRenderLabel = Boolean(action.label) && showLabel;

    return (
        <StyledActionButton
            disabled={isDisabled || action.isDisabled}
            $backgroundColor={backgroundColor}
            $isCollapsed={isCollapsed}
            $isExpanded={isSecondary ? isExpanded : undefined}
            $isHidden={isSecondary ? isHidden : undefined}
            $isPrimary={isPrimary}
            $isSecondary={isSecondary}
            $isShrunk={isPrimary ? isShrunk : undefined}
            $isSolo={isPrimary ? isSolo : undefined}
            $pulseColor={action.status?.pulseColor}
            $statusType={action.status?.type}
            $shouldUseContentWidth={shouldUseContentWidth}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            type="button"
        >
            <StyledActionContent>
                <StyledIconSlot>
                    {typeof action.icon === 'string' ? (
                        <Icon icons={[action.icon]} color={actionColor} size={18} />
                    ) : (
                        action.icon
                    )}
                </StyledIconSlot>
                <AnimatePresence initial={false}>
                    {/* Animate width and margin to avoid layout jumps when labels mount/unmount. */}
                    {shouldRenderLabel && (
                        <StyledLabelWrapper
                            animate={{ opacity: 1, width: 'auto', marginLeft: LABEL_GAP }}
                            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                            transition={LABEL_TRANSITION}
                        >
                            <StyledSecondaryLabel style={{ color: actionColor }}>
                                {action.label}
                            </StyledSecondaryLabel>
                        </StyledLabelWrapper>
                    )}
                </AnimatePresence>
            </StyledActionContent>
        </StyledActionButton>
    );
};

ActionButton.displayName = 'ActionButton';

export default ActionButton;
