import { ChangeEventHandler, CSSProperties, FocusEventHandler, ReactHTML, ReactNode } from 'react';
import { CSSPropertiesWithVars } from 'styled-components/dist/types';
import { DropdownDirection } from '../../types/dropdown';

/**
 * Ref interface for the `ComboBox` component.
 */
export interface ComboBoxRef {
    /**
     * Hides the dropdown content.
     */
    hide: VoidFunction;
    /**
     * Shows the dropdown content.
     */
    show: VoidFunction;
}

/**
 * A grouped list definition used by the `ComboBox` component.
 */
export interface IComboBoxItems {
    /**
     * Optional group label shown above the list.
     */
    groupName?: string;
    /**
     * The items that should be rendered inside the group.
     */
    list: Array<IComboBoxItem>;
    /**
     * Whether the items in this group should use round images.
     */
    shouldShowRoundImage?: boolean;
}

/**
 * Optional text styling configuration for a combobox item.
 */
export interface ComboBoxTextStyles {
    /**
     * The HTML tag that should be used for the text wrapper.
     */
    tagName?: keyof ReactHTML;
    /**
     * Additional inline styles applied to the text wrapper.
     */
    styles?: CSSPropertiesWithVars;
    /**
     * Additional class name applied to the text wrapper.
     */
    className?: string;
}

/**
 * Single selectable item configuration for the `ComboBox` component.
 */
export interface IComboBoxItem {
    /**
     * Optional icon classes rendered before the text.
     */
    icons?: string[];
    /**
     * Optional background style used for the image placeholder.
     */
    imageBackground?: CSSProperties['background'];
    /**
     * Optional image URL rendered for the item.
     */
    imageUrl?: string;
    /**
     * Whether the item should be disabled.
     */
    isDisabled?: boolean;
    /**
     * Optional element rendered on the right side of the item.
     */
    rightElement?: ReactNode;
    /**
     * Optional secondary text rendered below the main text.
     */
    subtext?: string;
    /**
     * Optional suffix element rendered after the text.
     */
    suffixElement?: ReactNode;
    /**
     * Main label of the item.
     */
    text: string;
    /**
     * Stable item value used for selection and matching.
     */
    value: string | number;
    /**
     * Optional text styling overrides for the item label.
     */
    textStyles?: ComboBoxTextStyles;
}

/**
 * Available size variants for the `ComboBox` header.
 */
export enum ComboBoxSize {
    /**
     * Standard height and spacing.
     */
    NORMAL = 'normal',
    /**
     * Compact height and spacing.
     */
    SMALL = 'small',
}

/**
 * Props for the `ComboBox` component.
 */
export type ComboBoxProps = {
    /**
     * The width of the body.
     * @default undefined
     */
    bodyWidth?: number;
    /**
     * The element where the content of the `ComboBox` should be rendered via React Portal.
     * @default undefined
     */
    container?: Element;
    /**
     * The direction in which the combobox should open.
     * @default DropdownDirection.RIGHT
     */
    direction?: DropdownDirection;
    /**
     * The value of the optional input.
     * @default undefined
     */
    inputValue?: string;
    /**
     * Whether the combobox should be disabled.
     * @default false
     */
    isDisabled?: boolean;
    /**
     * The list of the items that should be displayed.
     */
    lists: IComboBoxItems[];
    /**
     * The maximum height of the combobox content.
     * @default 280
     */
    maxHeight?: number;
    /**
     * Function to be executed when the value of the optional input is changed.
     * @default undefined
     */
    onInputChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when the optional input lost its focus.
     * @default undefined
     */
    onInputBlur?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when the optional input gets its focus.
     * @default undefined
     */
    onInputFocus?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function that should be executed when an item is selected. If the function returns false, the item will not be selected.
     * @default undefined
     */
    onSelect?: (comboboxItem?: IComboBoxItem) => Promise<boolean> | boolean | void;
    /**
     * Function to be executed when the content of the `ComboBox` is shown.
     * @default undefined
     */
    onShow?: () => void;
    /**
     * Function to be executed when the content of the `ComboBox` is hidden.
     * @default undefined
     */
    onHide?: () => void;
    /**
     * A text that should be displayed when no item is selected.
     */
    placeholder: string;
    /**
     * A prefix that should be displayed before the placeholder.
     * @default undefined
     */
    prefix?: string;
    /**
     * An item that should be preselected.
     * @default undefined
     */
    selectedItem?: IComboBoxItem;
    /**
     * If true, the images of the items are displayed in a bigger shape. This prop will automatically be set to true if the subtext of an item is given.
     * @default false
     */
    shouldShowBigImage?: boolean;
    /**
     * If true, a clear icon is displayed at the end of the combo box if an item is selected.
     * @default false
     */
    shouldShowClearIcon?: boolean;
    /**
     * Whether the background should be transparent.
     * @default false
     */
    shouldShowTransparentBackground?: boolean;
    /**
     * If true, the images of the items are displayed in a round shape.
     * @default false
     */
    shouldShowRoundImage?: boolean;
    /**
     * Whether the width of the ComboBox should be the width of the current item.
     * @default false
     */
    shouldUseCurrentItemWidth?: boolean;
    /**
     * Whether the width of the 'ComboBox' should be the width of the parent or of the widest item.
     * @default false
     */
    shouldUseFullWidth?: boolean;
    /**
     * If true, the dropdown will use the maximum width of the items.
     * @default false
     */
    shouldDropDownUseMaxItemWidth?: boolean;
    /**
     * Whether the outside events should be captured.
     * @default undefined
     */
    shouldCaptureEvents?: boolean;
    /**
     * The size of the ComboBox.
     * @default ComboBoxSize.NORMAL
     */
    size?: ComboBoxSize;
    /**
     * Optional min width for the prefix element.
     * @default undefined
     */
    prefixMinWidth?: number;
};
