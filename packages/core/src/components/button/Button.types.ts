import type { MouseEventHandler, ReactNode } from 'react';

export type ButtonProps = {
    /**
     * The label of the button.
     * @description
     * The content to be displayed inside the button. This can be text, icons, or any React node.
     * It serves as the primary label for the button's action.
     * @optional
     */
    children?: ReactNode;
    /**
     * Additional class names for the button element.
     * @description
     * Allows adding custom CSS classes to the button for further styling or integration with CSS frameworks.
     * Multiple classes can be provided as a space-separated string.
     * @optional
     */
    className?: string;
    /**
     * An icon that is displayed on the left-hand side of the button text.
     * @description
     * Specifies an icon to be shown alongside the button text. The icon is positioned to the left of the text.
     * This enhances the visual representation of the button's function.
     * @optional
     */
    icon?: string;
    /**
     * Whether the button is disabled and cannot be clicked anymore.
     * @description
     * When set to true, the button becomes non-interactive, preventing user clicks and often changing its appearance to indicate the disabled state.
     * This is useful for scenarios where the action is temporarily unavailable.
     * @optional
     */
    isDisabled?: boolean;
    /**
     * Displays the button in the secondary style.
     * @description
     * Applies a secondary visual style to the button, typically with a different background color or border.
     * This is used to differentiate less prominent actions from primary ones.
     * @optional
     */
    isSecondary?: boolean;
    /**
     * Function to be executed when the button is clicked.
     * @description
     * A callback function that is triggered when the user clicks on the button. This can be used to handle interactions,
     * such as submitting forms, navigating to pages, or performing any custom action.
     */
    onClick: MouseEventHandler<HTMLButtonElement>;
    /**
     * Whether the button should be displayed as a selectButton.
     * @description
     * Modifies the button's appearance to resemble a select button, often used in dropdowns or selection interfaces.
     * This changes the styling to indicate a selection state.
     * @optional
     * @default false
     */
    shouldShowAsSelectButton?: boolean;
    /**
     * Whether the text should be 'Roboto Medium'.
     * @description
     * Controls the font weight of the button text. When true, applies 'Roboto Medium' font weight for emphasis.
     * This can improve readability or match design guidelines.
     * @optional
     * @default true
     */
    shouldShowTextAsRobotoMedium?: boolean;
    /**
     * Shows a wait cursor instead of button text.
     * @description
     * Replaces the button content with a wait cursor animation, indicating that an action is in progress.
     * This provides visual feedback during loading or processing states.
     * @optional
     */
    shouldShowWaitCursor?: boolean;
    /**
     * Stops event propagation on click.
     * @description
     * Prevents the click event from bubbling up to parent elements, isolating the button's interaction.
     * Useful in complex UI structures where event handling needs to be contained.
     * @optional
     */
    shouldStopPropagation?: boolean;
    /**
     * Optional button design override.
     * @description
     * Allows overriding the default button design with a specific numeric value, corresponding to different visual themes or styles.
     * This provides flexibility for custom theming.
     * @optional
     */
    buttonDesign?: number;
};
