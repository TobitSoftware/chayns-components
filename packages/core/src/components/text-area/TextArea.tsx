import { getDevice } from 'chayns-api';
import React, {
    ChangeEventHandler,
    CSSProperties,
    FC,
    FocusEventHandler,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { AreaContext } from '../area-provider/AreaContextProvider';
import {
    StyledTextArea,
    StyledTextAreaInput,
    StyledTextAreaLabel,
    StyledTextAreaLabelWrapper,
} from './TextArea.styles';

export type TextAreaProps = {
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
    minHeight = '41px',
}) => {
    const [isOverflowing, setIsOverflowing] = useState(false);

    const areaProvider = useContext(AreaContext);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { browser } = getDevice();

    const shouldChangeColor = useMemo(
        () => areaProvider.shouldChangeColor ?? false,
        [areaProvider.shouldChangeColor],
    );

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
        if (typeof value === 'string' && value.length > -1) {
            adjustTextareaHeight();
        }
    }, [adjustTextareaHeight, value]);

    return useMemo(
        () => (
            <StyledTextArea>
                <StyledTextAreaInput
                    $shouldChangeColor={shouldChangeColor}
                    $browser={browser?.name}
                    ref={textareaRef}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    $maxHeight={maxHeight}
                    $minHeight={minHeight}
                    $isOverflowing={isOverflowing}
                    rows={1}
                />
                {!value && (
                    <StyledTextAreaLabelWrapper>
                        <StyledTextAreaLabel>{placeholder}</StyledTextAreaLabel>
                    </StyledTextAreaLabelWrapper>
                )}
            </StyledTextArea>
        ),
        [
            browser?.name,
            isOverflowing,
            maxHeight,
            minHeight,
            onBlur,
            onChange,
            placeholder,
            shouldChangeColor,
            value,
        ],
    );
};

TextArea.displayName = 'TextArea';

export default TextArea;
