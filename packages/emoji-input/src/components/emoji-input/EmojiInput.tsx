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
    getCursorPosition,
    replaceSelectionWithHTML,
    setCursorPosition,
    setCursorToEnd,
} from '../../utils/cursor';
import { isCtrlV, isCtrlY, isCtrlZ, isEnterKey, isSpaceKey } from '../../utils/key';
import UndoHandler from '../../utils/undoHandler';
import { addBrTag, removeBrTag, replaceNbsp, replaceSpace } from '../../utils/utils';
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
     * max Height for Scrollbar, default 300px
     */
    maxHeight?: string;
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
let lastKeyCtrlZY = false;
let lastKeyCtrlVOrSpace: boolean | null = false;
let prevInputHTML: string;

const EmojiInput: FC<EmojiInputProps> = ({
    design = DesignMode.Normal,
    isDisabled = false,
    maxHeight,
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
    console.log('--------------------------------------- render');

    const inputRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const forceRender = useForceUpdate();

    const uuid = useUuid();

    const bbCodeParser = useMemo(
        () => new BBCodeParser(BBConvertType.showBBTags, undefined, InvalidTagPos.outer),
        []
    );
    const undoHandler = useMemo(() => new UndoHandler(), []);

    useEffect(() => {
        undoHandler.addInputHistory({ bbValue: replaceSpace(addBrTag(value)), selection: null });

        buttonRef.current?.removeEventListener('mousedown', handlePreventLoseInputFocus);
        if (!isDisabled) {
            buttonRef.current?.addEventListener('mousedown', handlePreventLoseInputFocus);
        }
        return () => {
            buttonRef.current?.removeEventListener('mousedown', handlePreventLoseInputFocus);
        };
    }, [isDisabled]);

    useLayoutEffect(() => {
        if (inputRef.current && value) {
            const html = getInputValue();
            const oldValueBB = bbCodeParser.bbCodeHTMLToText(html);
            const tempValue = replaceSpace(addBrTag(value));
            if (oldValueBB !== tempValue) {
                const newValueHTML = bbCodeParser.bbCodeTextToHTML(tempValue);
                setInputValue(newValueHTML);
                forceRender();
            }
        }
    }, [value]);

    const handleInput = useCallback(
        (event: any, addHTML: string | null = null) => {
            console.log('before handleInput:', event, addHTML, lastKeyCtrlZY);
            if (!lastKeyCtrlZY) {
                console.time('handleInput');
                let cursorSelection = getCursorPosition(inputRef.current);
                let bbText = '';
                let newHtml = '';
                if (cursorSelection) {
                    console.log('start handleInput:', cursorSelection, getInputValue());
                    bbText = bbCodeParser.bbCodeHTMLToText(getInputValue());
                    bbText = replaceSpace(bbText);
                    if (addHTML) {
                        const bbTextWithSelection = replaceSelectionWithHTML(
                            bbText,
                            addHTML,
                            cursorSelection
                        );
                        bbText = bbTextWithSelection.bb;
                        cursorSelection = bbTextWithSelection.sel;
                    }
                    if (addHTML || lastKeyCtrlVOrSpace) {
                        undoHandler.addInputHistory({
                            bbValue: addBrTag(bbText),
                            selection: cursorSelection,
                        });
                    }
                    console.log('during handleInput BBCode:', bbText);

                    newHtml = bbCodeParser.bbCodeTextToHTML(addBrTag(bbText));
                    console.log('a handleInput newHTML:', newHtml);
                    setInputValue(newHtml);
                    setCursorPosition(cursorSelection, inputRef.current);
                }
                console.timeEnd('handleInput');
                if (typeof onInput === 'function' && newHtml !== prevInputHTML) {
                    onInput(replaceNbsp(removeBrTag(bbText)), event);
                }
                prevInputHTML = newHtml;
                console.log('-----------------------handleInput--------------------------------');
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
        console.log('Keydown', event);
        lastKeyCtrlZY = false;
        const ctrlZ = isCtrlZ(event);
        const ctrlY = isCtrlY(event);
        const prevLastKeyCtrlVOrSpace = lastKeyCtrlVOrSpace;
        lastKeyCtrlVOrSpace = false;
        if (isEnterKey(event)) {
            event.preventDefault();
            handleInput(event, '<br>');
        } else if (ctrlZ || ctrlY) {
            event.preventDefault();
            lastKeyCtrlZY = true;
            let newValue = null;
            if (ctrlZ) {
                newValue = undoHandler.undoValue({
                    bbValue: bbCodeParser.bbCodeHTMLToText(getInputValue()),
                    selection: getCursorPosition(inputRef.current),
                });
            }
            if (ctrlY) {
                newValue = undoHandler.redoValue();
            }
            if (newValue) {
                const newHtml = bbCodeParser.bbCodeTextToHTML(replaceSpace(newValue.bbValue));
                setInputValue(newHtml);
                if (newValue.selection) {
                    setCursorPosition(newValue.selection, inputRef.current);
                } else {
                    setCursorToEnd(inputRef.current);
                }
            }
        } else if (isSpaceKey(event) || isCtrlV(event)) {
            if (prevLastKeyCtrlVOrSpace === false) {
                lastKeyCtrlVOrSpace = true;
            } else {
                lastKeyCtrlVOrSpace = null;
            }
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
            handleInput(event, text);
        }
    }, []);

    const getInputValue = useCallback(() => {
        return inputRef.current?.innerHTML as string;
    }, [inputRef]);

    const setInputValue = useCallback(
        (html: string) => {
            if (inputRef.current) {
                inputRef.current.innerHTML = html;
            }
        },
        [inputRef]
    );

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
                maxHeight={maxHeight}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onInput={handleInput}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                // @ts-ignore
                onPaste={handlePaste}
                ref={inputRef}
                showEmojiButton={showEmojiButton}
                spellCheck={true}
            />
            <StyledPlaceholder
                isHidden={(!!getInputValue() && getInputValue() !== '<br>') || inputHasFocus()}
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
                    onEmojiInput={(event: MouseEvent, emojiHtml) => {
                        handleInput(event, emojiHtml);
                    }}
                />
            )}
            <StyledRightElement design={design}>{right}</StyledRightElement>
        </StyledEmojiInput>
    );
};

EmojiInput.displayName = 'EmojiInput';

export default EmojiInput;
