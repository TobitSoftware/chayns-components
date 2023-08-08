import React, {
    ChangeEvent,
    ChangeEventHandler,
    CSSProperties,
    FC,
    FocusEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { StyledTextArea, StyledTextAreaInput } from './TextArea.styles';

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
    placeholder?: string;
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

    /**
     * This function sets the external value
     */
    useEffect(() => {
        if (typeof value === 'string') {
            setDisplayedValue(value);
        }
    }, [value]);

    const adjustTextareaHeight = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

            setIsOverflowing(textareaRef.current.scrollHeight > parseInt(maxHeight.toString(), 10));
        }
    }, [maxHeight]);

    /**
     * This function updates the value
     */
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            setDisplayedValue(event.target.value);

            adjustTextareaHeight();

            if (onChange) {
                onChange(event);
            }
        },
        [adjustTextareaHeight, onChange]
    );

    return useMemo(
        () => (
            <StyledTextArea>
                <StyledTextAreaInput
                    ref={textareaRef}
                    value={displayedValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={handleChange}
                    maxHeight={maxHeight}
                    isOverflowing={isOverflowing}
                    rows={1}
                />
            </StyledTextArea>
        ),
        [displayedValue, handleChange, isOverflowing, maxHeight, onBlur, placeholder]
    );
};

TextArea.displayName = 'TextArea';

export default TextArea;
