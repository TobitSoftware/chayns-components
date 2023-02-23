import React, { ChangeEvent, ChangeEventHandler, FC, useCallback, useEffect, useRef } from 'react';
import { convertAsciiToUnicode } from '../../utils/emoji';
import { restoreSelection, saveSelection } from '../../utils/selection';
import EmojiPickerPopup from '../emoji-picker-popup/EmojiPickerPopup';
import { StyledEmojiInput, StyledEmojiInputEditor } from './EmojiInput.styles';

export type EmojiInputProps = {
    /**
     * Disables the input so that it cannot be changed anymore
     */
    isDisabled: boolean;
    /**
     * Function that is executed when the text of the input changes
     */
    onInput?: ChangeEventHandler<HTMLDivElement>;
    /**
     * Function that is executed when the visibility of the popup changes.
     * @param {boolean} isVisible - Whether the popup is visible or not
     */
    onPopupVisibilityChange?: (isVisible: boolean) => void;
    /**
     * Placeholder for the input field
     */
    placeholder?: string;
    /**
     * Value of the input field
     */
    value: string;
};

const EmojiInput: FC<EmojiInputProps> = ({
    isDisabled,
    onInput,
    onPopupVisibilityChange,
    placeholder,
    value,
}) => {
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

        const newHtml = convertAsciiToUnicode(text);

        if (newHtml !== editorRef.current.innerHTML) {
            saveSelection(editorRef.current);

            editorRef.current.innerHTML = newHtml;

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

            handleUpdateText(editorRef.current.innerHTML);

            if (typeof onInput === 'function') {
                onInput(event);
            }
        },
        [handleUpdateText, onInput]
    );

    /**
     * This function processes the selection of an emoji via the popup. If the 'contentEditable'
     * element has the focus, the new emoji is inserted at the cursor position. If not, the emoji
     * will be appended to the back of the input field content.
     *
     * In addition, this function also sets the cursor to the correct position when the input field
     * has the focus. For this purpose, the current position of the cursor or a selection is read to
     * calculate the cursor position after inserting the emoji.
     *
     * At the end an 'input' event is dispatched, so that the function 'handleInput' is triggered,
     * which in turn executes the 'onInput' function from the props. So this serves to ensure that
     * the event is also passed through to the top when inserting via the popup.
     */
    const handlePopupSelect = useCallback((emoji: string) => {
        if (!editorRef.current) {
            return;
        }

        const selection = window.getSelection();

        if (selection?.anchorNode && editorRef.current.contains(selection.anchorNode)) {
            const { endOffset, startOffset } = selection.getRangeAt(0);

            const rangeDistance = endOffset - startOffset;

            let offset = endOffset + emoji.length - rangeDistance;

            const { anchorNode } = selection;

            if (anchorNode.nodeValue) {
                anchorNode.nodeValue =
                    anchorNode.nodeValue.substring(0, startOffset) +
                    emoji +
                    anchorNode.nodeValue.substring(endOffset);
            }

            const newRange = document.createRange();

            if (anchorNode.nodeValue) {
                offset = Math.min(offset, anchorNode.nodeValue.length);
            }

            newRange.setStart(anchorNode, offset);
            newRange.setEnd(anchorNode, offset);

            selection.removeAllRanges();
            selection.addRange(newRange);
        } else {
            editorRef.current.innerHTML += emoji;
        }

        const event = new Event('input', { bubbles: true });

        editorRef.current.dispatchEvent(event);
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
            <StyledEmojiInputEditor
                contentEditable={!isDisabled}
                onInput={handleInput}
                placeholder={placeholder}
                ref={editorRef}
            />
            <EmojiPickerPopup onSelect={handlePopupSelect} />
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
