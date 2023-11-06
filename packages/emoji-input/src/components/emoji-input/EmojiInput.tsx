import React, {
    ChangeEvent,
    ClipboardEvent,
    FC,
    FocusEventHandler,
    KeyboardEvent,
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
import { insertTextAtCursorPosition } from '../../utils/insert';
import {
    getCharCodeThatWillBeDeleted,
    restoreSelection,
    saveSelection,
} from '../../utils/selection';
import { convertHTMLToText, convertTextToHTML } from '../../utils/text';
import EmojiPickerPopup from '../emoji-picker-popup/EmojiPickerPopup';
import {
    StyledEmojiInput,
    StyledEmojiInputContent,
    StyledEmojiInputRightWrapper,
    StyledMotionEmojiInputEditor,
} from './EmojiInput.styles';

export type EmojiInputProps = {
    /**
     * Access token of the logged-in user. Is needed to load and save the history of the emojis.
     */
    accessToken?: string;
    /**
     * HTML id of the input element
     */
    inputId?: string;
    /**
     * Disables the input so that it cannot be changed anymore
     */
    isDisabled?: boolean;
    /**
     * Function that is executed when the input field loses focus.
     */
    onBlur?: FocusEventHandler<HTMLDivElement>;
    /**
     * Function that is executed when the input field gets the focus.
     */
    onFocus?: FocusEventHandler<HTMLDivElement>;
    /**
     * Function that is executed when the text of the input changes. In addition to the original
     * event, the original text is returned as second parameter, in which the internally used HTML
     * elements have been converted back to BB codes.
     */
    onInput?: (event: ChangeEvent<HTMLDivElement>, originalText: string) => void;
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
     * Prevents the EmojiPickerPopup icon from being displayed
     */
    shouldPreventEmojiPicker?: boolean;
    /**
     * Sets the maximum height of the input field to the size of the parent element.
     */
    shouldUseFullHeight?: boolean;
    /**
     * The plain text value of the input field. Instead of HTML elements BB codes must be used at
     * this point. These are then converted by the input field into corresponding HTML elements.
     */
    value: string;
};

const EmojiInput: FC<EmojiInputProps> = ({
    accessToken,
    inputId,
    isDisabled,
    onBlur,
    onFocus,
    onInput,
    onKeyDown,
    onPopupVisibilityChange,
    personId,
    placeholder,
    popupAlignment,
    rightElement,
    shouldPreventEmojiPicker,
    shouldUseFullHeight,
    value,
}) => {
    const [isMobile] = useState(getIsMobile());
    const [plainTextValue, setPlainTextValue] = useState(value);

    const editorRef = useRef<HTMLDivElement>(null);

    const shouldDeleteOneMoreBackwards = useRef(false);
    const shouldDeleteOneMoreForwards = useRef(false);

    /**
     * This function updates the content of the 'contentEditable' element if the new text is
     * different from the previous content. So this is only true if, for example, a text like ":-)"
     * has been replaced to the corresponding emoji.
     *
     * When updating the HTML, the current cursor position is saved before replacing the content, so
     * that it can be set again afterward.
     */
    const handleUpdateHTML = useCallback((html: string) => {
        if (!editorRef.current) {
            return;
        }

        let newInnerHTML = convertEmojisToUnicode(html);

        newInnerHTML = convertTextToHTML(newInnerHTML);

        if (newInnerHTML !== editorRef.current.innerHTML) {
            saveSelection(editorRef.current, { shouldIgnoreEmptyTextNodes: true });

            editorRef.current.innerHTML = newInnerHTML;

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

            if (shouldDeleteOneMoreBackwards.current) {
                shouldDeleteOneMoreBackwards.current = false;
                shouldDeleteOneMoreForwards.current = false;

                event.preventDefault();
                event.stopPropagation();

                document.execCommand('delete', false);

                return;
            }

            if (shouldDeleteOneMoreForwards.current) {
                shouldDeleteOneMoreBackwards.current = false;
                shouldDeleteOneMoreForwards.current = false;

                event.preventDefault();
                event.stopPropagation();

                document.execCommand('forwardDelete', false);

                return;
            }

            handleUpdateHTML(editorRef.current.innerHTML);

            const text = convertHTMLToText(editorRef.current.innerHTML);

            setPlainTextValue(text);

            if (typeof onInput === 'function') {
                onInput(event, text);
            }
        },
        [handleUpdateHTML, onInput]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (typeof onKeyDown === 'function') {
                onKeyDown(event);
            }

            if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !event.isPropagationStopped() &&
                editorRef.current
            ) {
                event.preventDefault();

                document.execCommand('insertLineBreak', false);
            }

            if (event.key === 'Backspace' || event.key === 'Delete') {
                const charCodeThatWillBeDeleted = getCharCodeThatWillBeDeleted(event);

                if (charCodeThatWillBeDeleted === 8203) {
                    if (event.key === 'Backspace') {
                        shouldDeleteOneMoreBackwards.current = true;
                    } else {
                        shouldDeleteOneMoreForwards.current = true;
                    }
                }
            }
        },
        [onKeyDown]
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

    useEffect(() => {
        if (value !== plainTextValue) {
            setPlainTextValue(value);

            handleUpdateHTML(value);
        }
    }, [handleUpdateHTML, plainTextValue, value]);

    useEffect(() => {
        /**
         * This function ensures that the input field does not lose focus when the popup is opened
         * or an emoji is selected in it. For this purpose the corresponding elements get the class
         * 'prevent-lose-focus'.
         *
         * The class can also be set to any other elements that should also not cause the input
         * field to lose focus.
         */
        const handlePreventLoseFocus = (event: MouseEvent) => {
            const element = event.target as Element;

            if (
                element.classList.contains('prevent-lose-focus') ||
                element.parentElement?.classList.contains('prevent-lose-focus') ||
                element.parentElement?.parentElement?.classList.contains('prevent-lose-focus')
            ) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        document.body.addEventListener('mousedown', handlePreventLoseFocus);

        return () => {
            document.body.removeEventListener('mousedown', handlePreventLoseFocus);
        };
    }, []);

    return (
        <StyledEmojiInput isDisabled={isDisabled} shouldUseFullHeight={shouldUseFullHeight}>
            <StyledEmojiInputContent
                isRightElementGiven={!!rightElement}
                shouldUseFullHeight={shouldUseFullHeight}
            >
                <StyledMotionEmojiInputEditor
                    animate={{ maxHeight: shouldUseFullHeight ? '100%' : '210px' }}
                    contentEditable={!isDisabled}
                    id={inputId}
                    initial={false}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    placeholder={placeholder}
                    ref={editorRef}
                />
                {!isMobile && !shouldPreventEmojiPicker && (
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
