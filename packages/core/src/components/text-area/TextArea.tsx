import { getDevice } from 'chayns-api';
import React, {
    ChangeEventHandler,
    CSSProperties,
    FocusEventHandler,
    forwardRef,
    KeyboardEventHandler,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { BrowserName } from '../../types/chayns';
import { AreaContext } from '../area-provider/AreaContextProvider';
import { StyledInputRightElement } from '../old-input/OldInput.styles';
import {
    StyledTextArea,
    StyledTextAreaContent,
    StyledTextAreaContentWrapper,
    StyledTextAreaInput,
    StyledTextAreaLabel,
    StyledTextAreaLabelWrapper,
} from './TextArea.styles';

export type TextAreaProps = {
    /**
     * Disables the text area so that it cannot be changed.
     */
    isDisabled?: boolean;
    /**
     * If true, the text area is marked as invalid
     */
    isInvalid?: boolean;
    /**
     * The maximum height of the text area.
     */
    maxHeight?: CSSProperties['maxHeight'];
    /**
     * The minimum height of the text area.
     */
    minHeight?: CSSProperties['minHeight'];
    /**
     * Function that is executed when the text area loses focus.
     */
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Function that is executed when the text of the text area changes.
     */
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    /**
     * Function that is executed when the input field is focused
     */
    onFocus?: FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Function that is executed when a letter is pressed
     */
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    /**
     * Placeholder for the text area field.
     */
    placeholder?: string | ReactElement;
    /**
     * An element that should be displayed on the right side of the Input.
     */
    rightElement?: ReactElement;
    /**
     * Value if the text area should be controlled.
     */
    value?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            isDisabled,
            isInvalid,
            placeholder,
            value,
            onChange,
            onFocus,
            onKeyDown,
            rightElement,
            onBlur,
            maxHeight = '120px',
            minHeight = '41px',
        },
        ref,
    ) => {
        const [isOverflowing, setIsOverflowing] = useState(false);

        const areaProvider = useContext(AreaContext);

        const textareaRef = useRef<HTMLTextAreaElement>(null);

        const { browser } = getDevice();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const shouldShowBorder = rightElement?.props?.style?.backgroundColor === undefined;

        const shouldChangeColor = useMemo(
            () => areaProvider.shouldChangeColor ?? false,
            [areaProvider.shouldChangeColor],
        );

        const adjustTextareaHeight = useCallback(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

                setIsOverflowing(
                    textareaRef.current.scrollHeight > parseInt(maxHeight.toString(), 10),
                );
            }
        }, [maxHeight]);

        useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

        /**
         * This hook calculates the height of the TextArea after the displayValue is changed and the content is inside the "textareaRef".
         * To maintain the functionality while clearing the input, the length need to be greater than -1.
         */
        useEffect(() => {
            if (typeof value === 'string' && value.length > -1) {
                adjustTextareaHeight();
            }
        }, [adjustTextareaHeight, value]);

        return useMemo(
            () => (
                <StyledTextArea $isDisabled={isDisabled}>
                    <StyledTextAreaContentWrapper
                        $isInvalid={isInvalid}
                        $shouldChangeColor={shouldChangeColor}
                    >
                        <StyledTextAreaContent>
                            <StyledTextAreaInput
                                $browser={browser?.name as BrowserName}
                                disabled={isDisabled}
                                $isInvalid={isInvalid}
                                ref={textareaRef}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                onFocus={onFocus}
                                onKeyDown={onKeyDown}
                                $maxHeight={maxHeight}
                                $minHeight={minHeight}
                                $isOverflowing={isOverflowing}
                                rows={1}
                            />
                            {!value && (
                                <StyledTextAreaLabelWrapper>
                                    <StyledTextAreaLabel $isInvalid={isInvalid}>
                                        {placeholder}
                                    </StyledTextAreaLabel>
                                </StyledTextAreaLabelWrapper>
                            )}
                        </StyledTextAreaContent>
                        {rightElement && shouldShowBorder && rightElement}
                    </StyledTextAreaContentWrapper>
                    {rightElement && !shouldShowBorder && (
                        <StyledInputRightElement>{rightElement}</StyledInputRightElement>
                    )}
                </StyledTextArea>
            ),
            [
                browser?.name,
                isDisabled,
                isInvalid,
                isOverflowing,
                maxHeight,
                minHeight,
                onBlur,
                onChange,
                onFocus,
                onKeyDown,
                placeholder,
                rightElement,
                shouldChangeColor,
                shouldShowBorder,
                value,
            ],
        );
    },
);

TextArea.displayName = 'TextArea';

export default TextArea;
