import React, { FocusEvent, HTMLInputTypeAttribute } from 'react';
import { InputPlaceholderMode } from './input-placeholder/InputPlaceholder.types';

/**
 * Defines the possible states of the input expanding animation.
 * @enum {string}
 */
export enum InputAnimationState {
    /** No animation used. The input will appear at its full size. */
    None = 'none',
    /** The input is waiting for the expanding animation to start. */
    Idle = 'idle',
    /** The input is currently expanding. */
    Expanding = 'expanding',
    /** The input has finished expanding. */
    Expanded = 'expanded',
}

/**
 * Defines the visual design variants available for Input components.
 * @enum {string}
 */
export enum InputDesign {
    /** Standard appearance of the input with only slightly rounded corners. */
    Default = 'default',
    /** Input appearance with fully rounded corners. */
    Rounded = 'rounded',
}

/**
 * Props for the Input component
 */
export type InputProps = {
    /**
     * An element to be displayed while the input expanding is animated.
     * @description
     * The `animationElement` prop allows you to specify a React element that will be displayed
     * during the input field's expanding animation. This can be useful for providing visual
     * feedback to users while the input is transitioning to its expanded state. The element can be
     * any valid React component or HTML element, such as a spinner, icon, or custom animation. This
     * element will only be used if the `shouldShowExpandAnimation` prop is set to `true`. If not
     * provided, the input will not display any animation element.
     * @example
     * <Input animationElement={<Icon icons={['ts-sidekick']} />} />
     * @optional
     */
    animationElement?: React.ReactElement;
    /**
     * Design variant of the input field.
     * @description
     * The `design` prop allows you to choose the visual style of the input field. It can be set to
     * either `default` or `rounded`, affecting the overall appearance of the input. By default, it
     * is set to `default`, which provides a standard input style. If you want a more modern look
     * with rounded corners, you can set it to `rounded`.
     * @default InputDesign.Default
     * @example
     * <Input design={InputDesign.Rounded} />
     * @optional
     */
    design?: InputDesign;
    /**
     * The type of the input field.
     * @description
     * The `inputType` prop specifies the HTML input type attribute, which determines the kind of
     * data that can be entered into the input field. Common types include `text`, `email`,
     * `password`, etc. This prop is optional and defaults to `text`. If not specified, the input
     * will behave as a standard text input.
     * @default 'text'
     * @example
     * <Input inputType="email" />
     * @optional
     */
    inputType?: HTMLInputTypeAttribute;
    /**
     * Disables the input field, preventing user interaction.
     * @description
     * The `isDisabled` prop is used to disable the input field, making it unresponsive to user
     * input. When set to `true`, the input field will not accept any user interaction, such as
     * typing or clicking. This is useful for scenarios where the input should not be editable, such
     * as when the form is in a read-only state or when certain conditions are met. By default, this
     * prop is set to `false`, meaning the input field is enabled and can be interacted with.
     * @default false
     * @example
     * <Input isDisabled={true} />
     * @optional
     */
    isDisabled?: boolean;
    /**
     * Indicates whether the input field is invalid.
     * @description
     * The `isInvalid` prop is used to visually indicate that the input field has an error or is not
     * valid. When set to `true`, it typically changes the border color or background color of the
     * input field to signal an issue to the user. This prop is optional and defaults to `false`,
     * meaning the input field is considered valid by default. It is commonly used in forms to
     * provide feedback on user input.
     * @default false
     * @example
     * <Input isInvalid={true} />
     * @optional
     */
    isInvalid?: boolean;
    /**
     * An element to be displayed on the left side of the input field.
     * @description
     * The `leftElement` prop allows you to add an element to the left side of the input field. It
     * can be used to display icons, buttons, or any other content that is relevant to the input's
     * purpose. This prop is optional and can be used to add additional context or information to
     * the input field.
     * @example
     * <Input leftElement={<Icon icons={['fa-search']} />} />
     * @optional
     */
    leftElement?: React.ReactNode;
    /**
     * Callback function triggered when the input field loses focus.
     * @description
     * The `onBlur` prop is a function called when the input field loses focus, allowing you to
     * handle any necessary actions or validations when the user clicks away from the input. This
     * can be useful for form validation, updating state, or triggering side effects based on user
     * interaction. If not provided, no action will be taken on blur.
     * @example
     * <Input onBlur={() => console.log('Input blurred')} />
     * @optional
     */
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Callback function triggered when the input value changes.
     * @description
     * The `onChange` prop is a function called whenever the value of the input field changes. This
     * is typically used to update the state of the component or perform actions based on user
     * input. The function receives the new value as an argument, allowing you to handle the input
     * dynamically. If not provided, the input will not respond to changes.
     * @example
     * <Input onChange={(event) => console.log(event.target.value)} />
     * @optional
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Callback function triggered when the input field gains focus.
     * @description
     * The `onFocus` prop is a function called when the input field receives focus, allowing you to
     * handle any necessary actions or visual changes when the user clicks into the input. This can
     * be useful for highlighting the input, showing tooltips, or preparing the input for user
     * interaction. If not provided, no action will be taken on focus.
     * @example
     * <Input onFocus={() => console.log('Input focused')} />
     * @optional
     */
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Placeholder text displayed when the input field is empty.
     * @description
     * The placeholder provides a hint to the user about what to enter into the input field. It is
     * typically displayed in a lighter color and disappears when the user starts typing. If not
     * provided, the input field will not display any placeholder text.
     * @example
     * <Input placeholder="Write message" />
     * @optional
     */
    placeholder?: string;
    /**
     * The mode of the placeholder.
     * @description
     * This prop determines how the placeholder behaves if the input field has a value. It can be
     * set to `default` or `floating`. Setting it to `default` will keep the placeholder in its
     * original position until the user starts typing, while `floating` will move the placeholder
     * into the bottom right corner of the input field when it has a value. By default, it is set to
     * `default`.
     * @default InputPlaceholderMode.Default
     * @example
     * <Input placeholderMode={InputPlaceholderMode.Floating} />
     * @optional
     */
    placeholderMode?: InputPlaceholderMode;
    /**
     * An element to be displayed on the right side of the input field.
     * @description
     * The `rightElement` prop allows you to add an element to the right side of the input field. It
     * can be used to display icons, buttons, or any other content that is relevant to the input's
     * purpose. This prop is optional and can be used to add additional context or information to
     * the input field.
     * @example
     * <Input rightElement={<Icon icons={['fa-paper-plane']} />} />
     * @optional
     */
    rightElement?: React.ReactNode;
    /**
     * Whether to expand the input animated on the first render.
     * @description
     * This prop determines if the input field should expand with an animation effect when it is
     * first rendered. If set to `true`, the input will smoothly transition from a smaller size to
     * its full size upon initial display, providing a visually appealing effect. This can enhance
     * the user experience by drawing attention to the input field. By default, this prop is set to
     * `false`, meaning the input will appear at its full size without any animation.
     * @default false
     * @example
     * <Input shouldExpandOnFirstRender />
     * @optional
     */
    shouldShowExpandAnimation?: boolean;
    /**
     * Whether the input should be automatically focused when the component mounts.
     * @description
     * This prop determines if the input field should receive focus automatically when the component
     * is rendered. If set to `true`, the input will be focused immediately, allowing the user to
     * start typing without needing to click on the input field first. This is useful for enhancing
     * user experience in forms or interactive components. By default, this prop is set to `false`,
     * meaning the input will not be focused automatically.
     * @default false
     * @example
     * <Input autoFocus={true} />
     * @optional
     */
    shouldUseAutoFocus?: boolean;
    /**
     * The value of the input field.
     * @description
     * This prop represents the current value of the input field. It is used to control the input's
     * content programmatically. If not provided, the input will be empty by default.
     * @example
     * <Input value="Hello World" />
     * @optional
     */
    value?: string;
};
