import React, {
    ChangeEvent,
    ChangeEventHandler,
    CSSProperties,
    FocusEventHandler,
    forwardRef,
    HTMLInputTypeAttribute,
    KeyboardEventHandler,
    type ReactElement,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useTheme } from 'styled-components';
import { useElementSize } from '../../hooks/element';
import { AreaContext } from '../area-provider/AreaContextProvider';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import Icon from '../icon/Icon';
import {
    StyledOldInput,
    StyledOldInputContent,
    StyledOldInputContentWrapper,
    StyledOldInputField,
    StyledOldInputIconWrapper,
    StyledOldInputLabel,
    StyledOldInputRightElement,
    StyledMotionOldInputClearIcon,
    StyledMotionOldInputLabelWrapper,
} from './OldInput.styles';
import { ContentCardType } from '../../types/contentCard';
import { useCursorRepaint } from '../../hooks/resize';
import Tooltip from '../tooltip/Tooltip';

export interface OldInputRef {
    focus: VoidFunction;
    blur: VoidFunction;
}

type InputMode =
    | 'email'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;

type AutoComplete =
    | 'on'
    | 'off'
    | 'name'
    | 'username'
    | 'email'
    | 'new-password'
    | 'current-password'
    | 'tel'
    | 'url'
    | 'street-address'
    | 'postal-code'
    | 'country'
    | undefined;

export enum OldInputSize {
    Small = 'small',
    Medium = 'medium',
}

export type OldInputProps = {
    /**
     * If set and the old-input is disabled, the old-input will display a tooltip with this message.
     */
    disabledHint?: string;
    /**
     * An element to be displayed on the left side of the old-input field
     */
    leftElement?: ReactNode;
    /**
     * The id of the old-input
     */
    id?: string;
    /**
     * Defines the old-input mode of the old-input
     */
    inputMode?: InputMode;
    /**
     * Defines the auto Complete of the old-input
     */
    autoComplete?: AutoComplete;
    /**
     * Disables the old-input so that it cannot be changed anymore
     */
    isDisabled?: boolean;
    /**
     * If true, the old-input field is marked as invalid
     */
    isInvalid?: boolean;
    /**
     * Function that is executed when the old-input field loses focus
     */
    onBlur?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when the text of the old-input changes
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when the old-input field is focused
     */
    onFocus?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when content is pasted into the old-input field
     */
    onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
    /**
     * Function that is executed when a letter is pressed
     */
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    /**
     * Placeholder for the old-input field
     */
    placeholder?: ReactNode;
    /**
     * An element that should be displayed on the right side of the OldInput.
     */
    rightElement?: ReactElement;
    /**
     * Whether the placeholder animation should be prevented.
     */
    shouldPreventPlaceholderAnimation?: boolean;
    /**
     * Whether the placeholder should remain at its position if a value is typed.
     */
    shouldRemainPlaceholder?: boolean;
    /**
     * Whether the content should be displayed centered inside the old-input.
     */
    shouldShowCenteredContent?: boolean;
    /**
     * If true, a clear icon is displayed at the end of the old-input field
     */
    shouldShowClearIcon?: boolean;
    /**
     * Whether only the bottom border should be displayed
     */
    shouldShowOnlyBottomBorder?: boolean;
    /**
     * Whether the background should be transparent.
     */
    shouldShowTransparentBackground?: boolean;
    /**
     * If true, the old-input field is focused when the component is mounted
     */
    shouldUseAutoFocus?: boolean;
    /**
     * The size of the old-input field
     */
    size?: OldInputSize;
    /**
     * OldInput type set for an old-input element (e.g. 'text', 'number' or 'password')
     */
    type?: HTMLInputTypeAttribute;
    /**
     * Value if the old-input field should be controlled
     */
    value?: string;
};

const OldInput = forwardRef<OldInputRef, OldInputProps>(
    (
        {
            leftElement,
            inputMode,
            isDisabled,
            onBlur,
            onChange,
            onFocus,
            onKeyDown,
            onPaste,
            placeholder,
            rightElement,
            shouldShowOnlyBottomBorder,
            shouldRemainPlaceholder = false,
            shouldShowClearIcon = false,
            shouldShowCenteredContent = false,
            size = OldInputSize.Medium,
            type = 'text',
            value,
            disabledHint,
            shouldUseAutoFocus = false,
            isInvalid = false,
            shouldPreventPlaceholderAnimation = false,
            id,
            shouldShowTransparentBackground = false,
            autoComplete,
        },
        ref,
    ) => {
        const [hasValue, setHasValue] = useState(typeof value === 'string' && value !== '');
        const [placeholderWidth, setPlaceholderWidth] = useState(0);

        const areaProvider = useContext(AreaContext);

        const theme = useTheme() as Theme;

        const inputRef = useRef<HTMLInputElement>(null);
        const placeholderRef = useRef<HTMLLabelElement>(null);

        useCursorRepaint(inputRef);

        const placeholderSize = useElementSize(placeholderRef);

        useEffect(() => {
            if (placeholderSize && shouldShowOnlyBottomBorder) {
                setPlaceholderWidth(placeholderSize.width + 5);
            }
        }, [placeholderSize, shouldShowOnlyBottomBorder]);

        const handleClearIconClick = useCallback(() => {
            if (inputRef.current) {
                inputRef.current.value = '';

                setHasValue(false);

                if (typeof onChange === 'function') {
                    onChange({ target: inputRef.current } as ChangeEvent<HTMLInputElement>);
                }
            }
        }, [onChange]);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const shouldShowBorder = rightElement?.props?.style?.backgroundColor === undefined;

        const handleInputFieldChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                setHasValue(event.target.value !== '');

                if (typeof onChange === 'function') {
                    onChange(event);
                }
            },
            [onChange],
        );

        useImperativeHandle(
            ref,
            () => ({
                focus: () => inputRef.current?.focus(),
                blur: () => inputRef.current?.blur(),
            }),
            [],
        );

        useEffect(() => {
            if (typeof value === 'string') {
                setHasValue(value !== '');
            }
        }, [value]);

        let backgroundColor: CSSProperties['backgroundColor'] | undefined;
        let color: CSSProperties['color'] | undefined;

        if (shouldShowTransparentBackground) {
            backgroundColor = 'transparent';
        } else if (
            areaProvider.contentCardType &&
            [ContentCardType.Error, ContentCardType.Success, ContentCardType.Warning].includes(
                areaProvider.contentCardType,
            )
        ) {
            backgroundColor = 'white';
            color = '#555';
        } else if (areaProvider.shouldChangeColor) {
            backgroundColor = theme['000'];
        }

        const labelPosition = useMemo(() => {
            if (hasValue && !shouldRemainPlaceholder && !shouldPreventPlaceholderAnimation) {
                return shouldShowOnlyBottomBorder
                    ? { right: 3, top: -1.5 }
                    : { bottom: size === OldInputSize.Small ? -4 : -10, right: -6 };
            }

            return { left: -1 };
        }, [
            hasValue,
            shouldPreventPlaceholderAnimation,
            shouldRemainPlaceholder,
            shouldShowOnlyBottomBorder,
            size,
        ]);

        const inputElement = useMemo(
            () => (
                <StyledOldInput className="beta-chayns-input" $isDisabled={isDisabled}>
                    <StyledOldInputContentWrapper
                        $shouldShowTransparentBackground={shouldShowTransparentBackground}
                        $backgroundColor={backgroundColor}
                        $isInvalid={isInvalid}
                        $shouldRoundRightCorners={shouldShowBorder}
                        $shouldShowOnlyBottomBorder={shouldShowOnlyBottomBorder}
                        $size={size}
                    >
                        {leftElement && (
                            <StyledOldInputIconWrapper>{leftElement}</StyledOldInputIconWrapper>
                        )}
                        <StyledOldInputContent
                            $shouldShowOnlyBottomBorder={shouldShowOnlyBottomBorder}
                        >
                            <StyledOldInputField
                                $color={color}
                                $placeholderWidth={placeholderWidth}
                                id={id}
                                disabled={isDisabled}
                                onBlur={onBlur}
                                onChange={handleInputFieldChange}
                                onFocus={onFocus}
                                onKeyDown={onKeyDown}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }}
                                onPaste={onPaste}
                                ref={inputRef}
                                type={type}
                                value={value}
                                autoFocus={shouldUseAutoFocus}
                                inputMode={inputMode}
                                autoComplete={autoComplete}
                                $isInvalid={isInvalid}
                                $shouldShowCenteredContent={shouldShowCenteredContent}
                            />
                            <StyledMotionOldInputLabelWrapper
                                animate={
                                    shouldPreventPlaceholderAnimation
                                        ? {
                                              opacity: hasValue ? 0 : 1,
                                          }
                                        : {
                                              fontSize:
                                                  hasValue &&
                                                  !shouldShowOnlyBottomBorder &&
                                                  !shouldRemainPlaceholder
                                                      ? '9px'
                                                      : `${Number(theme.fontSize)}px`,
                                          }
                                }
                                initial={false}
                                layout
                                ref={placeholderRef}
                                style={{ ...labelPosition }}
                                transition={{
                                    type: 'tween',
                                    duration: shouldPreventPlaceholderAnimation ? 0 : 0.1,
                                }}
                            >
                                <StyledOldInputLabel $isInvalid={isInvalid}>
                                    {placeholder}
                                </StyledOldInputLabel>
                            </StyledMotionOldInputLabelWrapper>
                        </StyledOldInputContent>
                        {shouldShowClearIcon && (
                            <StyledMotionOldInputClearIcon
                                $shouldShowOnlyBottomBorder={shouldShowOnlyBottomBorder}
                                $size={size}
                                animate={{ opacity: hasValue ? 1 : 0 }}
                                initial={false}
                                onClick={handleClearIconClick}
                                transition={{ type: 'tween' }}
                            >
                                <Icon
                                    icons={['fa fa-times']}
                                    color={isInvalid ? theme.wrong : undefined}
                                />
                            </StyledMotionOldInputClearIcon>
                        )}
                        {rightElement && shouldShowBorder && rightElement}
                    </StyledOldInputContentWrapper>
                    {rightElement && !shouldShowBorder && (
                        <StyledOldInputRightElement>{rightElement}</StyledOldInputRightElement>
                    )}
                </StyledOldInput>
            ),
            [
                autoComplete,
                backgroundColor,
                color,
                handleClearIconClick,
                handleInputFieldChange,
                hasValue,
                id,
                inputMode,
                isDisabled,
                isInvalid,
                labelPosition,
                leftElement,
                onBlur,
                onFocus,
                onKeyDown,
                onPaste,
                placeholder,
                placeholderWidth,
                rightElement,
                shouldPreventPlaceholderAnimation,
                shouldRemainPlaceholder,
                shouldShowBorder,
                shouldShowCenteredContent,
                shouldShowClearIcon,
                shouldShowOnlyBottomBorder,
                shouldShowTransparentBackground,
                shouldUseAutoFocus,
                size,
                theme.fontSize,
                theme.wrong,
                type,
                value,
            ],
        );

        if (isDisabled && typeof disabledHint === 'string') {
            return (
                <Tooltip item={{ text: disabledHint }} shouldUseFullWidth>
                    {inputElement}
                </Tooltip>
            );
        }

        return inputElement;
    },
);

OldInput.displayName = 'OldInput';

export default OldInput;
