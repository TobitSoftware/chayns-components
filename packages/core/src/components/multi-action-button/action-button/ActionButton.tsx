import { AnimatePresence } from 'motion/react';
import React, { FC, MouseEvent } from 'react';
import Icon from '../../icon/Icon';
import Tooltip from '../../tooltip/Tooltip';
import {
    StyledActionButton,
    StyledActionContent,
    StyledIconSlot,
    StyledLabelWrapper,
    StyledSecondaryLabel,
} from './ActionButton.styles';
import type { MultiActionButtonAction } from '../MultiActionButton.types';
import { PopupAlignment } from '../../../types/popup';

const LABEL_GAP = 6;
const LABEL_TRANSITION = { duration: 0.3 };

export type ActionButtonProps = {
    action: MultiActionButtonAction;
    actionType: 'primary' | 'secondary';
    backgroundColor?: string;
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
    height: number;
};

/**
 * Shared action button UI used by both primary and secondary actions.
 * Keeps layout and animations consistent while isolating styling details.
 */
const ActionButton: FC<ActionButtonProps> = ({
    action,
    actionType,
    backgroundColor,
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
    height,
}) => {
    const isPrimary = actionType === 'primary';
    const isSecondary = actionType === 'secondary';
    const actionColor = action.color ?? '#FFFFFF';
    const isActionDisabled = isDisabled || Boolean(action.isDisabled);
    const disabledReason = action.disabledReason?.trim();
    const shouldShowDisabledReason = Boolean(disabledReason) && isActionDisabled;

    const actionContent = (
        <StyledActionContent>
            <StyledIconSlot $height={height}>
                {typeof action.icon === 'string' ? (
                    <Icon icons={[action.icon]} color={actionColor} size={height - 24} />
                ) : (
                    action.icon
                )}
            </StyledIconSlot>
            <AnimatePresence initial={false}>
                {/* Animate width and margin to avoid layout jumps when labels mount/unmount. */}
                {showLabel && (
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
    );

    return (
        <StyledActionButton
            aria-disabled={isActionDisabled}
            disabled={isActionDisabled && !shouldShowDisabledReason}
            $backgroundColor={backgroundColor}
            $isCollapsed={isCollapsed}
            $isExpanded={isSecondary ? isExpanded : undefined}
            $isInteractionDisabled={isActionDisabled}
            $isHidden={isSecondary ? isHidden : undefined}
            $isPrimary={isPrimary}
            $isSecondary={isSecondary}
            $isShrunk={isPrimary ? isShrunk : undefined}
            $isSolo={isPrimary ? isSolo : undefined}
            $pulseColors={action.status?.pulseColors}
            $height={height}
            $statusType={action.status?.type}
            $shouldUseContentWidth={shouldUseContentWidth}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            type="button"
        >
            {shouldShowDisabledReason && disabledReason ? (
                <Tooltip
                    alignment={PopupAlignment.BottomRight}
                    item={{ text: disabledReason }}
                    maxItemWidth={400}
                >
                    {actionContent}
                </Tooltip>
            ) : (
                actionContent
            )}
        </StyledActionButton>
    );
};

ActionButton.displayName = 'ActionButton';

export default ActionButton;
