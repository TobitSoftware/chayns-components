import Icon from '@chayns-components/core/lib/components/icon/Icon';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { convertAsciiToUnicode } from '../../utils/emoji';
import { restoreSelection, saveSelection } from '../../utils/selection';
import { StyledEmojiInput, StyledEmojiInputEditor } from './EmojiInput.styles';

export type EmojiInputProps = {
    /**
     * Disables the input so that it cannot be changed anymore
     */
    isDisabled: boolean;
    /**
     * Function that is executed when the text of the input changes
     */
    onChange?: ChangeEventHandler<HTMLDivElement>;
    /**
     * Placeholder for the input field
     */
    placeholder?: string;
    /**
     * Value of the input field
     */
    value: string;
};

const EmojiInput: FC<EmojiInputProps> = ({ isDisabled, onChange, placeholder, value }) => {
    const [html, setHtml] = useState(convertAsciiToUnicode(value));

    const handleInput = useCallback((event: ChangeEvent<HTMLDivElement>) => {
        const newHtml = convertAsciiToUnicode(event.target.innerHTML);

        if (newHtml !== event.target.innerHTML) {
            saveSelection(event.target);

            // eslint-disable-next-line no-param-reassign
            event.target.innerHTML = newHtml;

            restoreSelection(event.target);
        }

        // ToDo: Trigger "onChange" event
    }, []);

    const handlePopupIconClick = useCallback(() => {
        console.debug('handlePopupIconClick');
    }, []);

    useEffect(() => {
        setHtml(convertAsciiToUnicode(value));
    }, [value]);

    useLayoutEffect(() => {}, []);

    return (
        <StyledEmojiInput isDisabled={isDisabled}>
            <StyledEmojiInputEditor
                contentEditable={!isDisabled}
                dangerouslySetInnerHTML={{ __html: html }}
                onInput={handleInput}
                placeholder={placeholder}
            />
            <Icon icons={['far fa-smile']} onClick={handlePopupIconClick} size={18} />
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
