import type { MouseEvent, ReactNode } from 'react';
import type { MotionValue } from 'motion/react';

/**
 * Supported status types for the multi action button.
 */
export enum MultiActionButtonStatusType {
    /**
     * Pulsing background effect.
     * @description Applies a subtle animated overlay on the action background to draw attention.
     * This is intended for temporary states like recording or live activity indicators.
     */
    Pulse = 'pulse',
}

/**
 * Supported heights for the multi action button.
 */
export enum MultiActionButtonHeight {
    /**
     * Medium height (42px).
     */
    Medium = 42,
    /**
     * Large height (48px).
     */
    Large = 48,
}

/**
 * Minimal status configuration for an action.
 */
export type MultiActionButtonActionStatus = {
    /**
     * Optional pulse colors for the animation.
     * @description Defines the two colors for the pulsing background animation. If not provided, defaults to ['#A50000', '#630000'].
     * @optional
     */
    pulseColors?: [string, string];
    /**
     * Status type to apply.
     * @description Selects the visual emphasis type applied to the action. The component currently
     * supports a pulsing overlay, and additional types may be added later.
     * @optional
     */
    type?: MultiActionButtonStatusType;
};

/**
 * Event payload emitted on action click.
 */
export type MultiActionButtonActionEvent = {
    /**
     * Which action was clicked.
     * @description Indicates whether the primary or secondary action fired. This is helpful when
     * sharing a handler between both actions.
     */
    action: 'primary' | 'secondary';
    /**
     * Original click event.
     * @description Useful to access modifier keys, prevent default, or stop propagation.
     */
    event: MouseEvent<HTMLButtonElement>;
    /**
     * Whether the secondary action is currently extended.
     * @description Useful for flows that need to distinguish between a collapsed and expanded
     * secondary action, especially on touch devices.
     */
    isExtended: boolean;
    /**
     * Whether the device is considered touch.
     * @description Derived from pointer capabilities and used to decide between hover and click behavior.
     */
    isTouch: boolean;
};

/**
 * Configuration for a single action.
 */
export type MultiActionButtonAction = {
    /**
     * Optional color for the icon and label.
     * @description Overrides the default text/icon color. If omitted, the current theme text color is used.
     * @optional
     */
    color?: string;
    /**
     * The icon for the action.
     * @description Can be a FontAwesome class string (e.g., 'fa fa-microphone') or a custom ReactNode.
     * The icon is always rendered inside a fixed-size slot to keep alignment stable.
     */
    icon: string | ReactNode;
    /**
     * Whether the action is disabled.
     * @description Disabled actions do not respond to hover or click and are visually dimmed.
     * @optional
     */
    isDisabled?: boolean;
    /**
     * The optional label for the action.
     * @description The label is shown next to the icon and will be truncated with ellipsis when
     * there is not enough horizontal space.
     * @optional
     */
    label: ReactNode;
    /**
     * Click handler for the action.
     * @description Receives a payload that includes the action type, extension state, and device info.
     * This allows external logic to decide whether the click should trigger an action immediately.
     * @optional
     */
    onClick?: (info: MultiActionButtonActionEvent) => void;
    /**
     * Status effect configuration for the action.
     * @description Controls optional visual emphasis like pulsing, without changing layout or sizing.
     * @optional
     */
    status?: MultiActionButtonActionStatus;
};

/**
 * Props for the MultiActionButton component.
 */
export type MultiActionButtonProps = {
    /**
     * Optional background color for both actions.
     * @description Overrides the default background color for the action buttons. This is useful
     * when the button is used on different backgrounds or when a specific brand color is needed.
     * If omitted, the primary color from the theme is used.
     * @default theme.primary
     * @optional
     */
    backgroundColor?: string;
    /**
     * Additional class name for the wrapper element.
     * @description Useful for custom styling or testing hooks.
     * @optional
     */
    className?: string;
    /**
     * Auto-reset timeout for the extended state (ms).
     * @description Applies only when the secondary action is clicked (not when hovered). After the timeout,
     * the secondary action collapses automatically.
     * @default 3000
     * @optional
     */
    extendedTimeoutMs?: number;
    /**
     * Height of the button.
     * @description Controls the height of the button. Use values from MultiActionButtonHeight enum or custom number.
     * @default MultiActionButtonHeight.Medium
     * @optional
     */
    height?: number;
    /**
     * Whether the button is collapsed to a single icon.
     * @description When collapsed, only the primary icon is shown and the overall width shrinks to a circle.
     * Use this to provide compact states or toolbar modes.
     * @default false
     * @optional
     */
    isCollapsed?: boolean;
    /**
     * Whether the whole control is disabled.
     * @description Disables interactions for both actions, including hover expansion and clicks.
     * @default false
     * @optional
     */
    isDisabled?: boolean;
    /**
     * Primary action configuration.
     * @description Required action shown on the left side (or as the only action when no secondary is provided).
     */
    primaryAction: MultiActionButtonAction;
    /**
     * Secondary action configuration.
     * @description Optional action shown on the right side. When present, it can expand on hover or click.
     * @optional
     */
    secondaryAction?: MultiActionButtonAction;
    /**
     * Whether the button should take the full width of its parent.
     * @description When true, the control stretches to 100% width unless `width` is provided.
     * @optional
     */
    shouldUseFullWidth?: boolean;
    /**
     * Optional width override for the whole button.
     * @description Can be a fixed number or a MotionValue for external animations. When omitted,
     * the width is driven by the content unless `shouldUseFullWidth` is true.
     * @optional
     */
    width?: number | MotionValue<number>;
};
