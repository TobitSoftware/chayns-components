import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

/**
 * Enum for the design variants of the Badge component.
 */
export enum BadgeDesign {
    /** Default design with background color and no border */
    DEFAULT = 'default',
    /** Design with border only, no background color */
    BORDER = 'border',
}

/**
 * Enum for the size variants of the Badge component.
 */
export enum BadgeSize {
    /** Small size */
    SMALL = 'small',
    /** Default size */
    DEFAULT = 'default',
}

export type BadgeProps = {
    /**
     * The background color of the badge.
     * @description
     * Allows customization of the badge's background color. Accepts any valid CSS color value, such as hex codes, color names, or RGB values.
     * This can be used to match the badge with the application's theme or to highlight specific information.
     * @optional
     */
    backgroundColor?: CSSProperties['backgroundColor'];
    /**
     * The content of the badge.
     * @description
     * The content to be displayed inside the badge. This can be text, icons, or any React node.
     * If no content is provided, a zero-width space is used to maintain the badge's shape.
     * @optional
     */
    children?: ReactNode;
    /**
     * Additional class names for the badge element.
     * @description
     * Allows adding custom CSS classes to the badge for further styling or integration with CSS frameworks.
     * Multiple classes can be provided as a space-separated string.
     * @optional
     */
    className?: string;
    /**
     * The design of the Badge.
     * @description
     * Determines the visual style of the badge. Options include 'default' for a solid background and 'border' for a bordered appearance.
     * This affects how the badge integrates with the surrounding UI elements.
     * @optional
     * @default BadgeDesign.DEFAULT
     */
    design?: BadgeDesign;
    /**
     * The font color of the badge.
     * @description
     * Specifies the color of the text or content inside the badge. Accepts any valid CSS color value.
     * Useful for ensuring readability against different background colors.
     * @optional
     */
    fontColor?: CSSProperties['color'];
    /**
     * Function to be executed when the badge is clicked.
     * @description
     * A callback function that is triggered when the user clicks on the badge. This can be used to handle interactions,
     * such as opening a modal, navigating to a page, or performing any custom action.
     * @optional
     */
    onClick?: MouseEventHandler;
    /**
     * The size of the badge.
     * @description
     * Controls the size of the badge, affecting font size and padding. 'small' is more compact, while 'default' provides a standard size.
     * Choose based on the context and available space in the UI.
     * @optional
     * @default BadgeSize.DEFAULT
     */
    size?: BadgeSize;
};
