import React, {
    ChangeEvent,
    ChangeEventHandler,
    ClipboardEvent,
    FC,
    KeyboardEventHandler,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import type { PopupAlignment } from '../../constants/alignment';
import { convertEmojisToUnicode } from '../../utils/emoji';
import { getIsMobile } from '../../utils/environment';
import { getRootFontFamily } from '../../utils/font';
import { insertTextAtCursorPosition } from '../../utils/insert';
import { restoreSelection, saveSelection } from '../../utils/selection';
import EmojiPickerPopup from '../emoji-picker-popup/EmojiPickerPopup';
import {
    StyledEmojiInput,
    StyledEmojiInputContent,
    StyledEmojiInputEditor,
    StyledEmojiInputRightWrapper,
} from './EmojiInput.styles';

export type EmojiInputProps = {
    /**
     * Access token of the logged-in user. Is needed to load and save the history of the emojis.
     */
    accessToken?: string;
    /**
     * Disables the input so that it cannot be changed anymore
     */
    isDisabled?: boolean;
    /**
     * Function that is executed when the text of the input changes
     */
    onInput?: ChangeEventHandler<HTMLDivElement>;
    /**
     * Function that is executed when a key is pressed down.
     */
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
    /**
     * Function that is executed when the visibility of the popup changes.
     * @param {boolean} isVisible - Whether the popup is visible or not
     */
    onPopupVisibilityChange?: (isVisible: boolean) => void;
    /**
     * Person id of the logged-in user. Is needed to load and save the history of the emojis.
     */
    personId?: string;
    /**
     * Placeholder for the input field
     */
    placeholder?: string;
    /**
     * Sets the alignment of the popup to a fixed value. If this value is not set, the component
     * calculates the best position on its own. Use the imported 'PopupAlignment' enum to set this
     * value.
     */
    popupAlignment?: PopupAlignment;
    /**
     * Element that is rendered inside the EmojiInput on the right side.
     */
    rightElement?: ReactNode;
    /**
     * Value of the input field
     */
    value: string;
};

const EmojiInput: FC<EmojiInputProps> = ({
    accessToken,
    isDisabled,
    onInput,
    onKeyDown,
    onPopupVisibilityChange,
    personId,
    placeholder,
    popupAlignment,
    rightElement,
    value,
}) => {
    const [isMobile] = useState(getIsMobile());
    const [rootFontFamily] = useState(getRootFontFamily());

    const editorRef = useRef<HTMLDivElement>(null);

    /**
     * This function updates the content of the 'contentEditable' element if the new text is
     * different from the previous content. So this is only true if, for example, a text like ":-)"
     * has been replaced to the corresponding emoji.
     *
     * When updating the HTML, the current cursor position is saved before replacing the content, so
     * that it can be set again afterward.
     */
    const handleUpdateText = useCallback((text: string) => {
        if (!editorRef.current) {
            return;
        }

        const newInnerText = convertEmojisToUnicode(text);

        if (newInnerText !== editorRef.current.innerText) {
            saveSelection(editorRef.current);

            editorRef.current.innerText = newInnerText;

            restoreSelection(editorRef.current);
        }
    }, []);

    /**
     * This function handles the 'input' events of the 'contentEditable' element and also passes the
     * respective event up accordingly if the 'onInput' property is a function.
     */
    const handleInput = useCallback(
        (event: ChangeEvent<HTMLDivElement>) => {
            if (!editorRef.current) {
                return;
            }

            handleUpdateText(editorRef.current.innerText);

            if (typeof onInput === 'function') {
                onInput(event);
            }
        },
        [handleUpdateText, onInput]
    );

    /**
     * This function prevents formatting from being adopted when texts are inserted. To do this, the
     * plain text is read from the event after the default behavior has been prevented. The plain
     * text is then inserted at the correct position in the input field using the
     * 'insertTextAtCursorPosition' function.
     */
    const handlePaste = useCallback((event: ClipboardEvent<HTMLDivElement>) => {
        if (editorRef.current) {
            event.preventDefault();

            let text = event.clipboardData.getData('text/plain');

            text = convertEmojisToUnicode(text);

            insertTextAtCursorPosition({ editorElement: editorRef.current, text });

            const newEvent = new Event('input', { bubbles: true });

            editorRef.current.dispatchEvent(newEvent);
        }
    }, []);

    /**
     * This function uses the 'insertTextAtCursorPosition' function to insert the emoji at the
     * correct position in the editor element.
     *
     * At the end an 'input' event is dispatched, so that the function 'handleInput' is triggered,
     * which in turn executes the 'onInput' function from the props. So this serves to ensure that
     * the event is also passed through to the top when inserting via the popup.
     */
    const handlePopupSelect = useCallback((emoji: string) => {
        if (editorRef.current) {
            insertTextAtCursorPosition({ editorElement: editorRef.current, text: emoji });

            const event = new Event('input', { bubbles: true });

            editorRef.current.dispatchEvent(event);
        }
    }, []);

    /**
     * This function ensures that the input field does not lose focus when the popup is opened or an
     * emoji is selected in it. For this purpose the corresponding elements get the class
     * 'prevent-lose-focus'.
     *
     * The class can also be set to any other elements that should also not cause the input field to
     * lose focus.
     */
    const handlePreventLoseFocus = useCallback((event: MouseEvent) => {
        const element = event.target as Element;

        if (
            element.classList.contains('prevent-lose-focus') ||
            element.parentElement?.classList.contains('prevent-lose-focus')
        ) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, []);

    useEffect(() => {
        handleUpdateText(value);
    }, [handleUpdateText, value]);

    useEffect(() => {
        document.body.addEventListener('mousedown', handlePreventLoseFocus);

        return () => {
            document.body.removeEventListener('mousedown', handlePreventLoseFocus);
        };
    }, [handlePreventLoseFocus]);

    return (
        <StyledEmojiInput isDisabled={isDisabled}>
            <StyledEmojiInputContent isRightElementGiven={!!rightElement}>
                <StyledEmojiInputEditor
                    contentEditable={!isDisabled}
                    isMobile={isMobile}
                    onInput={handleInput}
                    onKeyDown={onKeyDown}
                    onPaste={handlePaste}
                    placeholder={placeholder}
                    ref={editorRef}
                    rootFontFamily={rootFontFamily}
                />
                {!isMobile && (
                    <EmojiPickerPopup
                        accessToken={accessToken}
                        alignment={popupAlignment}
                        onSelect={handlePopupSelect}
                        onPopupVisibilityChange={onPopupVisibilityChange}
                        personId={personId}
                    />
                )}
            </StyledEmojiInputContent>
            {rightElement && (
                <StyledEmojiInputRightWrapper>{rightElement}</StyledEmojiInputRightWrapper>
            )}
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
