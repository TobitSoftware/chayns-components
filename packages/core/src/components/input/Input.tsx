import React, {
    FocusEvent,
    forwardRef,
    HTMLInputTypeAttribute,
    useCallback,
    useRef,
    useState,
} from 'react';
import { StyledInput, StyledInputContentWrapper, StyledInputField } from './Input.styles';
import { InputDesign, InputPlaceholderMode } from '../../types/input';
import InputPlaceholder from './input-placeholder/InputPlaceholder';

export type InputProps = {
    /**
     * Design variant of the input field.
     * @description
     * The `design` prop allows you to choose the visual style of the input field.
     * It can be set to either `default` or `rounded`, affecting the overall appearance of the input.
     * By default, it is set to `default`, which provides a standard input style.
     * If you want a more modern look with rounded corners, you can set it to `rounded`.
     * @default InputDesign.Default
     * @example
     * <Input design={InputDesign.Rounded} />
     * @optional
     */
    design?: InputDesign;
    /**
     * The type of the input field.
     * @description
     * The `inputType` prop specifies the HTML input type attribute, which determines the kind of data that can be entered into the input field.
     * Common types include `text`, `email`, `password`, etc. This prop is optional and defaults to `text`.
     * If not specified, the input will behave as a standard text input.
     * @default 'text'
     * @example
     * <Input inputType="email" />
     * @optional
     */
    inputType?: HTMLInputTypeAttribute;
    /**
     * Disables the input field, preventing user interaction.
     * @description
     * The `isDisabled` prop is used to disable the input field, making it unresponsive to user input.
     * When set to `true`, the input field will not accept any user interaction, such as typing or clicking.
     * This is useful for scenarios where the input should not be editable, such as when the form is in a read-only state or when certain conditions are met.
     * By default, this prop is set to `false`, meaning the input field is enabled and can be interacted with.
     * @default false
     * @example
     * <Input isDisabled={true} />
     * @optional
     */
    isDisabled?: boolean;
    /**
     * Indicates whether the input field is invalid.
     * @description
     * The `isInvalid` prop is used to visually indicate that the input field has an error or is not valid.
     * When set to `true`, it typically changes the border color or background color of the input field to signal an issue to the user.
     * This prop is optional and defaults to `false`, meaning the input field is considered valid by default.
     * It is commonly used in forms to provide feedback on user input.
     * @default false
     * @example
     * <Input isInvalid={true} />
     * @optional
     */
    isInvalid?: boolean;
    /**
     * Callback function triggered when the input field loses focus.
     * @description
     * The `onBlur` prop is a function that is called when the input field loses focus, allowing you to handle any necessary actions or validations when the user clicks away from the input.
     * This can be useful for form validation, updating state, or triggering side effects based on user interaction.
     * If not provided, no action will be taken on blur.
     * @example
     * <Input onBlur={() => console.log('Input blurred')} />
     * @optional
     */
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Callback function triggered when the input value changes.
     * @description
     * The `onChange` prop is a function that is called whenever the value of the input field changes.
     * This is typically used to update the state of the component or perform actions based on user input.
     * The function receives the new value as an argument, allowing you to handle the input dynamically.
     * If not provided, the input will not respond to changes.
     * @example
     * <Input onChange={(event) => console.log(event.target.value)} />
     * @optional
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Callback function triggered when the input field gains focus.
     * @description
     * The `onFocus` prop is a function that is called when the input field receives focus, allowing you to handle any necessary actions or visual changes when the user clicks into the input.
     * This can be useful for highlighting the input, showing tooltips, or preparing the input for user interaction.
     * If not provided, no action will be taken on focus.
     * @example
     * <Input onFocus={() => console.log('Input focused')} />
     * @optional
     */
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Placeholder text displayed when the input field is empty.
     * @description
     * The placeholder provides a hint to the user about what to enter into the input field.
     * It is typically displayed in a lighter color and disappears when the user starts typing.
     * If not provided, the input field will not display any placeholder text.
     * @example
     * <Input placeholder="Write message" />
     * @optional
     */
    placeholder?: string;
    /**
     * The mode of the placeholder.
     * @description
     * This prop determines how the placeholder behaves if the input field has a value. It can be set to `default` or `floating`.
     * Setting it to `default` will keep the placeholder in its original position until the user starts typing, while `floating` will move the placeholder into the bottom right corner of input field when it has a value.
     * By default, it is set to `default`.
     * @default InputPlaceholderMode.Default
     * @example
     * <Input placeholderMode={InputPlaceholderMode.Floating} />
     * @optional
     */
    placeholderMode?: InputPlaceholderMode;
    /**
     * Whether the input should be automatically focused when the component mounts.
     * @description
     * This prop determines if the input field should receive focus automatically when the component is rendered.
     * If set to `true`, the input will be focused immediately, allowing the user to start typing without needing to click on the input field first.
     * This is useful for enhancing user experience in forms or interactive components.
     * By default, this prop is set to `false`, meaning the input will not be focused automatically.
     * @default false
     * @example
     * <Input autoFocus={true} />
     * @optional
     */
    shouldUseAutoFocus?: boolean;
    /**
     * The value of the input field.
     * @description
     * This prop represents the current value of the input field. It is used to control the input's content programmatically.
     * If not provided, the input will be empty by default.
     * @example
     * <Input value="Hello World" />
     * @optional
     */
    value?: string;
};

const Input = forwardRef<unknown, InputProps>(
    ({
        design = InputDesign.Default,
        inputType = 'text',
        isDisabled = false,
        isInvalid = false,
        onBlur,
        onChange,
        onFocus,
        placeholder,
        placeholderMode = InputPlaceholderMode.Default,
        shouldUseAutoFocus = false,
        value,
    }) => {
        const [hasValue, setHasValue] = useState(typeof value === 'string' && value !== '');
        const [isFocused, setIsFocused] = useState(false);

        const inputFieldRef = useRef<HTMLInputElement>(null);

        const handleBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setIsFocused(false);

                onBlur?.(event);
            },
            [onBlur],
        );

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setHasValue(event.target.value !== '');

                onChange?.(event);
            },
            [onChange],
        );

        const handleFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setIsFocused(true);

                onFocus?.(event);
            },
            [onFocus],
        );

        return (
            <StyledInput $design={design} $isDisabled={isDisabled} $isFocused={isFocused}>
                <StyledInputContentWrapper>
                    <StyledInputField
                        $isInvalid={isInvalid}
                        autoFocus={shouldUseAutoFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        ref={inputFieldRef}
                        type={inputType}
                        value={value}
                    />
                    {placeholder && (
                        <InputPlaceholder
                            hasValue={hasValue}
                            isInvalid={isInvalid}
                            placeholder={placeholder}
                            placeholderMode={placeholderMode}
                        />
                    )}
                </StyledInputContentWrapper>
            </StyledInput>
        );
    },
);

Input.displayName = 'Input';

export default Input;
