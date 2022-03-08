import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from 'react';
import { useForceUpdate } from '../../hooks/forceUpdate';
import { useUuid } from '../../hooks/uuid';
import BBCodeParser, {
    BBConvertType,
    InvalidTagPos,
} from '../../utils/bb-code-parser/BBCodeParser';
import {
    getCurrentCursorPosition,
    insertBrAtCursor,
    setCurrentCursorPosition,
    setCursorToEnd,
} from '../../utils/cursor';
import { isEnterKey } from '../../utils/key';
import { addBrToText, formatInputHTML, formatInputText, replaceAt } from '../../utils/utils';
import { EmojiButton } from '../emoji-button/EmojiButton';
import { DesignMode } from './constants/design';
import { PopupPosition } from './constants/popup';
import {
    StyledEditableDiv,
    StyledEmojiInput,
    StyledPlaceholder,
    StyledRightElement,
} from './EmojiInput.styles';

export type EmojiInputProps = {
    /**
     * Mode and Design of the Input
     */
    design: DesignMode;
    /**
     * input & button cannot be clicked and color changes to gray
     */
    isDisabled: boolean;
    /**
     * on Blur
     */
    onBlur?: (event?: MouseEvent) => void;
    /**
     * on Focus
     */
    onFocus?: (event?: MouseEvent) => void;
    /**
     * Function, that returns current input on every change in input (KeyDown)
     * returns HtmlString and event, event is null if Emoji gets injected
     */
    onInput?: (value: string, event?: KeyboardEvent) => void;
    /**
     * on KeyUp
     */
    onKeyUp?: (value?: KeyboardEvent) => void;
    /**
     * placeholder shown left
     */
    placeholder: string;
    /**
     * Position where the Popup should be shown
     */
    popupPosition: PopupPosition;
    /**
     * Element shown right from Emoji-Button
     */
    right?: ReactNode;
    /**
     * Mode and Design of the Input
     */
    showEmojiButton: boolean;
    /**
     * value in the Input
     */
    value?: string;
};

const EmojiInput: FC<EmojiInputProps> = ({
    design = DesignMode.Normal,
    isDisabled = false,
    onBlur,
    onFocus,
    onInput,
    onKeyUp,
    placeholder = '',
    popupPosition = PopupPosition.TopLeft,
    right,
    showEmojiButton = true,
    value = '',
}) => {
    console.log('render');

    const inputRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const forceRender = useForceUpdate();

    const uuid = useUuid();

    const bbCodeParser = useMemo(
        () => new BBCodeParser(BBConvertType.showBBTags, undefined, InvalidTagPos.outer),
        []
    );
    const bbCodeParser2 = useMemo(
        () =>
            new BBCodeParser(
                BBConvertType.hideBBTags_not_convertable,
                undefined,
                InvalidTagPos.outer
            ),
        []
    );

    useEffect(() => {
        buttonRef.current?.removeEventListener('mousedown', handlePreventLoseInputFocus);
        if (!isDisabled) {
            buttonRef.current?.addEventListener('mousedown', handlePreventLoseInputFocus);
        }
        return () => {
            buttonRef.current?.removeEventListener('mousedown', handlePreventLoseInputFocus);
        };
    }, [isDisabled]);

    useLayoutEffect(() => {
        if (inputRef.current) {
            const html = formatInputHTML(getInputValue());
            const oldValueBB = bbCodeParser.bbCodeHTMLToText(html);
            if (oldValueBB !== value) {
                value = formatInputText(addBrToText(value));
                const newValueHTML = bbCodeParser.bbCodeTextToHTML(value);
                setInputValue(newValueHTML);
                forceRender();
                console.log(
                    bbCodeParser2.bbCodeTextToHTML(
                        'Test Text [b a="" style="asda"]BOLT[/b][link]LINK[/link]'
                    )
                );
            }
        }
    }, [value]);

    const handleInput = useCallback(
        (event) => {
            console.log(getInputValue());

            const cursorPos = getCurrentCursorPosition(inputRef.current);
            const htmlText = formatInputHTML(getInputValue());
            console.time('bbCodeHTMLToText');
            let bbText = bbCodeParser.bbCodeHTMLToText(htmlText) as string;
            console.timeEnd('bbCodeHTMLToText');

            bbText = formatInputText(bbText);
            console.time('bbCodeTextToHTML');
            const newHtml = bbCodeParser.bbCodeTextToHTML(addBrToText(bbText));
            console.timeEnd('bbCodeTextToHTML');
            setInputValue(newHtml);
            setCurrentCursorPosition(cursorPos, inputRef.current);

            /*         console.log(bbText);
            console.log(addBrToText(bbText));
            console.log(newHtml);*/

            if (typeof onInput === 'function') {
                onInput(bbText, event);
            }
        },
        [onInput]
    );

    const handleKeyUp = useCallback(
        (event) => {
            if (typeof onKeyUp === 'function') {
                onKeyUp(event);
            }
        },
        [onKeyUp]
    );

    const handleKeyDown = useCallback((event) => {
        if (isEnterKey(event)) {
            event.preventDefault();
            insertBrAtCursor();
            handleInput(event);
            // insertHTMLAtCursorPos('<br>');
            // forceReRender();
        }
    }, []);

    const handleFocus = useCallback(
        (event) => {
            forceRender();
            if (typeof onFocus === 'function') {
                onFocus(event);
            }
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        (event) => {
            forceRender();
            if (typeof onBlur === 'function') {
                onBlur(event);
            }
        },
        [onBlur]
    );

    const inputHasFocus = useCallback(
        () =>
            !!(
                document.activeElement &&
                inputRef.current &&
                document.activeElement.id === inputRef.current.id
            ),
        [document.activeElement, inputRef]
    );
    const setInputFocus = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            setCursorToEnd(inputRef.current);
            forceRender();
        }
    }, [inputRef]);

    const handlePreventLoseInputFocus = useCallback(
        (event: MouseEvent) => {
            if (
                inputHasFocus() &&
                event.target instanceof Node &&
                buttonRef.current?.contains(event.target)
            ) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        [buttonRef]
    );

    const handlePaste = useCallback((event: ClipboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const text = event.clipboardData?.getData('text/plain');
        if (text) {
            insertHTMLAtCursorPos(text);
        }
    }, []);

    const getInputValue = useCallback(() => inputRef.current?.innerHTML || '', [inputRef]);
    const setInputValue = useCallback(
        (html: string) => {
            if (inputRef.current) {
                inputRef.current.innerHTML = html;
            }
        },
        [inputRef]
    );

    const insertHTMLAtCursorPos = useCallback((html: string) => {
        const cursorPos = getCurrentCursorPosition(inputRef.current);
        console.log(cursorPos, getInputValue(), html);
        if (cursorPos) {
            const inputValue = getInputValue();
            let bbText = bbCodeParser.bbCodeHTMLToText(inputValue) as string;
            bbText = replaceAt(bbText, cursorPos, cursorPos - 1, html);
            setInputValue(bbCodeParser.bbCodeTextToHTML(bbText));
            setCurrentCursorPosition(cursorPos, inputRef.current);
            // forceReRender();
        }
        // document.execCommand('insertHTML', false, html);
    }, []);

    return (
        <StyledEmojiInput
            className="beta-chayns-emoji-input"
            translate="no"
            design={design}
            isDisabled={isDisabled}
        >
            <StyledEditableDiv
                contentEditable={!isDisabled}
                design={design}
                dir="auto"
                id={uuid}
                isDisabled={isDisabled}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onInput={handleInput}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                ref={inputRef}
                showEmojiButton={showEmojiButton}
            />
            <StyledPlaceholder
                isHidden={getInputValue() !== '' || inputHasFocus()}
                design={design}
                isDisabled={isDisabled}
            >
                {placeholder}
            </StyledPlaceholder>
            {showEmojiButton && (
                <EmojiButton
                    ref={buttonRef}
                    isDisabled={isDisabled}
                    design={design}
                    onClick={() => {
                        if (!inputHasFocus()) {
                            setInputFocus();
                        }
                    }}
                    onEmojiInput={(emojiHtml) => {
                        // insertHTMLAtCursorPos(emojiHtml);
                    }}
                />
            )}
            <StyledRightElement design={design}>{right}</StyledRightElement>
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
