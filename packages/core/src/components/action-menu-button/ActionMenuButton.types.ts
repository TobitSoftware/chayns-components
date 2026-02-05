import type { MouseEventHandler, ReactNode } from 'react';
import type { MotionValue } from 'framer-motion';
import type { ContextMenuItem } from '../context-menu/ContextMenu.types';

export type ActionMenuButtonProps = {
    /**
     * List of items to display in the dropdown menu.
     * @description Array of menu items. If provided, a dropdown trigger (or the whole button) will open a context menu.
     * @optional
     */
    contextMenuItems?: ContextMenuItem[];
    /**
     * Icon to display on the left side of the text.
     * @description Can be a string identifier for an icon or a ReactNode.
     * @optional
     */
    icon?: string | ReactNode;
    /**
     * Whether the button is disabled.
     * @description If true, the button is non-interactive and displayed in a disabled state.
     * @optional
     * @default false
     */
    isDisabled?: boolean;
    /**
     * The content to be displayed inside the button.
     * @description Should be a string used as the main label of the button.
     */
    label?: string;
    /**
     * Function to call when the primary action (left part) is clicked.
     * @description If provided, this function is called on click. If not provided but menu items exist, the button serves as a menu trigger.
     * @optional
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /**
     * Whether the button should take the full available width.
     * @description If true, the button expands to 100% width of its container.
     * @optional
     * @default false
     */
    shouldUseFullWidth?: boolean;
    /**
     * Whether the button is collapsed.
     * @description If true, the button displays only the icon in a circular shape.
     * @optional
     * @default false
     */
    isCollapsed?: boolean;
    /**
     * Optional width for the button.
     * @description Can be a MotionValue<number> or a number (in pixels). Overrides shouldUseFullWidth and isCollapsed for width.
     * @optional
     */
    width?: MotionValue<number> | number;
    /**
     * Color for the text and icons in the button.
     * @description Specifies the color used for the button label and icons.
     * @optional
     * @default 'white'
     */
    color?: string;
};
