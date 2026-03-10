import { ChangeEventHandler, CSSProperties, FocusEventHandler, ReactHTML, ReactNode } from 'react';
import { CSSPropertiesWithVars } from 'styled-components/dist/types';
import { DropdownDirection } from '../../types/dropdown';

export interface ComboBoxRef {
    hide: VoidFunction;
    show: VoidFunction;
}

export interface IComboBoxItems {
    groupName?: string;
    list: Array<IComboBoxItem>;
    shouldShowRoundImage?: boolean;
}

export interface ComboBoxTextStyles {
    tagName?: keyof ReactHTML;
    styles?: CSSPropertiesWithVars;
    className?: string;
}

export interface IComboBoxItem {
    icons?: string[];
    imageBackground?: CSSProperties['background'];
    imageUrl?: string;
    isDisabled?: boolean;
    rightElement?: ReactNode;
    subtext?: string;
    suffixElement?: ReactNode;
    text: string;
    value: string | number;
    textStyles?: ComboBoxTextStyles;
}

export enum ComboBoxSize {
    NORMAL = 'normal',
    SMALL = 'small',
}

export type ComboBoxProps = {
    /**
     * The width of the body.
     */
    bodyWidth?: number;
    /**
     * The element where the content of the `ComboBox` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The direction in which the combobox should open.
     */
    direction?: DropdownDirection;
    /**
     * The value of the optional input.
     */
    inputValue?: string;
    /**
     * Whether the combobox should be disabled.
     */
    isDisabled?: boolean;
    /**
     * The list of the items that should be displayed.
     */
    lists: IComboBoxItems[];
    /**
     * The maximum height of the combobox content.
     */
    maxHeight?: number;
    /**
     * Function to be executed when the value of the optional input is changed.
     */
    onInputChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when the optional input lost its focus.
     */
    onInputBlur?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when the optional input gets its focus.
     */
    onInputFocus?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function that should be executed when an item is selected. If the function returns false, the item will not be selected.
     */
    onSelect?: (comboboxItem?: IComboBoxItem) => Promise<boolean> | boolean | void;
    /**
     * Function to be executed when the content of the `ComboBox` is shown.
     */
    onShow?: () => void;
    /**
     * Function to be executed when the content of the `ComboBox` is hidden.
     */
    onHide?: () => void;
    /**
     * A text that should be displayed when no item is selected.
     */
    placeholder: string;
    /**
     * A prefix that should be displayed before the placeholder.
     */
    prefix?: string;
    /**
     * An item that should be preselected.
     */
    selectedItem?: IComboBoxItem;
    /**
     * If true, the images of the items are displayed in a bigger shape. This prop will automatically be set to true if the subtext of an item is given.
     */
    shouldShowBigImage?: boolean;
    /**
     * If true, a clear icon is displayed at the end of the combo box if an item is selected.
     */
    shouldShowClearIcon?: boolean;
    /**
     * Whether the background should be transparent.
     */
    shouldShowTransparentBackground?: boolean;
    /**
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
    /**
     * Whether the width of the ComboBox should be the width of the current item.
     */
    shouldUseCurrentItemWidth?: boolean;
    /**
     * Whether the width of the 'ComboBox' should be the width of the parent or of the widest item.
     */
    shouldUseFullWidth?: boolean;
    /**
     * If true, the dropdown will use the maximum width of the items.
     */
    shouldDropDownUseMaxItemWidth?: boolean;
    /**
     * Whether the outside events should be captured.
     */
    shouldCaptureEvents?: boolean;
    /**
     * The size of the ComboBox.
     */
    size?: ComboBoxSize;
    /**
     * Optional min width for the prefix element.
     */
    prefixMinWidth?: number;
};
