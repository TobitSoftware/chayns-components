import type { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

export interface CommunicationButtonProps {
    /**
     * Optional person ID used to show a profile image inside the button.
     * @description
     * When provided, the component loads the matching user image and renders it behind the icon.
     * Use this for person-related actions such as quick contact shortcuts.
     * @optional
     */
    personId?: string;
    /**
     * Called when the button is pressed.
     * @description
     * Invoked only when the button is not disabled.
     * Use this to trigger the primary communication action.
     * @optional
     */
    onClick?: () => void;
    /**
     * Disables the button and prevents clicks.
     * @description
     * Keeps the button visible while making it non-interactive.
     * This is useful when the related action is temporarily unavailable.
     * @optional
     */
    isDisabled?: boolean;

    /**
     * Icon class names rendered inside the button.
     * @description
     * Defines one or more icons that visually represent the action.
     * The icons are rendered in the provided order.
     */
    icons: string[];
    /**
     * Controls whether the button uses a filled background style.
     * @description
     * Disable this to render a lighter or more subtle visual appearance.
     * @optional
     * @default true
     */
    shouldFillBackground?: boolean;
    /**
     * Additional class name applied to the button root element.
     * @description
     * Use this to attach custom styling hooks from the outside.
     * @optional
     */
    className?: string;
    /**
     * Color of the rendered icon.
     * @description
     * Overrides the default icon color used by the button.
     * @optional
     */
    iconColor?: string;
    /**
     * Size variant shared with the communication input.
     * @description
     * Controls the overall button dimensions and icon size.
     * Use the same value as surrounding communication controls for consistent spacing.
     * @optional
     * @default CommunicationInputSize.MEDIUM
     */
    size?: CommunicationInputSize;
}
