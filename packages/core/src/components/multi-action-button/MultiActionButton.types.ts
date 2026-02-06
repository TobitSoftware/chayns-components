import type { MouseEvent, ReactNode } from 'react';
import type { MotionValue } from 'motion/react';

/**
 * Supported status types for the multi action button.
 */
export enum MultiActionButtonStatusType {
    /**
     * Pulsing background effect.
     */
    Pulse = 'pulse',
}

/**
 * Minimal status configuration for an action.
 */
export type MultiActionButtonActionStatus = {
    /**
     * Status type to apply.
     */
    type?: MultiActionButtonStatusType;
    /**
     * Optional pulse color override.
     */
    pulseColor?: string;
};

/**
 * Event payload emitted on action click.
 */
export type MultiActionButtonActionEvent = {
    /**
     * Which action was clicked.
     */
    action: 'primary' | 'secondary';
    /**
     * Whether the secondary action is currently extended.
     */
    isExtended: boolean;
    /**
     * Whether the device is considered touch.
     */
    isTouch: boolean;
    /**
     * Original click event.
     */
    event: MouseEvent<HTMLButtonElement>;
};

/**
 * Configuration for a single action.
 */
export type MultiActionButtonAction = {
    /**
     * The icon for the action.
     */
    icon: string | ReactNode;
    /**
     * The optional label for the action.
     */
    label?: ReactNode;
    /**
     * Optional color for the icon and label.
     */
    color?: string;
    /**
     * Click handler for the action.
     */
    onClick: (info: MultiActionButtonActionEvent) => void;
    /**
     * Whether the action is disabled.
     */
    isDisabled?: boolean;
    /**
     * Status effect configuration for the action.
     */
    status?: MultiActionButtonActionStatus;
};

/**
 * Props for the MultiActionButton component.
 */
export type MultiActionButtonProps = {
    /**
     * Additional class name for the wrapper element.
     */
    className?: string;
    /**
     * Whether the whole control is disabled.
     */
    isDisabled?: boolean;
    /**
     * Primary action configuration.
     */
    primaryAction: MultiActionButtonAction & { label: ReactNode };
    /**
     * Secondary action configuration.
     */
    secondaryAction?: MultiActionButtonAction;
    /**
     * Auto-reset timeout for the extended state (ms).
     * @default 2000
     */
    extendedTimeoutMs?: number;
    /**
     * Whether to show the secondary label on hover (desktop).
     * @default true
     */
    shouldShowSecondaryLabelOnHover?: boolean;
    /**
     * Optional width override for the whole button.
     */
    width?: number | MotionValue<number>;
    /**
     * Whether the button is collapsed to a single icon.
     */
    isCollapsed?: boolean;
};
