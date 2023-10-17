import React, {
    ChangeEvent,
    ChangeEventHandler,
    CSSProperties,
    FC,
    FocusEventHandler,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { StyledTextArea, StyledTextAreaInput, StyledTextAreaLabel } from './TextArea.styles';

export type TextAreaProps = {
    /**
     * The maximum height of the text area.
     */
    maxHeight?: CSSProperties['maxHeight'];
    /**
     * Function that is executed when the text area loses focus.
     */
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Function that is executed when the text of the text area changes.
     */
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    /**
     * Placeholder for the text area field.
     */
    placeholder?: string | ReactElement;
    /**
     * Value if the text area should be controlled.
     */
    value?: string;
};

const TextArea: FC<TextAreaProps> = ({
    placeholder,
    value,
    onChange,
    onBlur,
    maxHeight = '120px',
}) => {
    const [displayedValue, setDisplayedValue] = useState('');
    const [isOverflowing, setIsOverflowing] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustTextareaHeight = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

            setIsOverflowing(textareaRef.current.scrollHeight > parseInt(maxHeight.toString(), 10));
        }
    }, [maxHeight]);

    /**
     * This hook calculates the height of the TextArea after the displayValue is changed and the content is inside the "textareaRef".
     * To maintain the functionality while clearing the input, the length need to be greater than -1.
     */
    useEffect(() => {
        if (displayedValue.length > -1) {
            adjustTextareaHeight();
        }
    }, [adjustTextareaHeight, displayedValue]);

    /**
     * This function sets the external value
     */
    useEffect(() => {
        if (typeof value === 'string') {
            setDisplayedValue(value);
        }
    }, [value]);

    /**
     * This function updates the value
     */
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            setDisplayedValue(event.target.value);

            if (onChange) {
                onChange(event);
            }
        },
        [onChange]
    );

    return useMemo(
        () => (
            <StyledTextArea>
                <StyledTextAreaInput
                    ref={textareaRef}
                    value={displayedValue}
                    onBlur={onBlur}
                    onChange={handleChange}
                    maxHeight={maxHeight}
                    isOverflowing={isOverflowing}
                    rows={1}
                />
                {!displayedValue && <StyledTextAreaLabel>{placeholder}</StyledTextAreaLabel>}
            </StyledTextArea>
        ),
        [displayedValue, handleChange, isOverflowing, maxHeight, onBlur, placeholder]
    );
};

TextArea.displayName = 'TextArea';

export default TextArea;
