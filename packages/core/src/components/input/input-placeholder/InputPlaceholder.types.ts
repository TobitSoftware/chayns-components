/**
 * Defines the different modes for input placeholder behavior
 * @enum {string}
 */
export enum InputPlaceholderMode {
    /** Default placeholder that disappears when input has value. */
    Default = 'default',
    /** Placeholder that floats to the bottom right corner of the input when input has value. */
    Floating = 'floating',
}

/**
 * Props for the InputPlaceholder component
 */
export type InputPlaceholderProps = {
    /**
     * Whether the input has a left element
     * @description Affects the position of the placeholder element.
     */
    hasLeftElement: boolean;
    /**
     * Whether the input has a right element
     * @description Affects the position of the placeholder element.
     */
    hasRightElement: boolean;
    /**
     * Whether the input has a value
     * @description Controls visibility and positioning of placeholder.
     * @example
     * // Hide placeholder when value exists
     * hasValue={true}
     */
    hasValue: boolean;
    /**
     * Whether the input is in an invalid state
     * @description Changes placeholder color to indicate validation error.
     * @example
     * // Show invalid state
     * isInvalid={true}
     */
    isInvalid: boolean;
    /**
     * The placeholder text to display
     * @description The text shown as placeholder in the input.
     * @example
     * // Set placeholder text
     * placeholder="Enter your name"
     */
    placeholder: string;
    /**
     * The mode determining placeholder behavior
     * @description Controls how placeholder behaves when input has value.
     * @example
     * // Use floating placeholder
     * placeholderMode={InputPlaceholderMode.Floating}
     */
    placeholderMode: InputPlaceholderMode;
};
