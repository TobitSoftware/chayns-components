import {
    AreaProvider,
    Icon,
    Popup,
    PopupAlignment,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
    type PopupRef,
} from '@chayns-components/core';
import React, { FC, KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import EmojiPicker from '../emoji-picker/EmojiPicker';
import { StyledEmojiPickerPopup } from './EmojiPickerPopup.styles';
import { TextStringProviderSSR, useTranslation } from '@chayns/textstrings';
import textStrings from '../../constants/textStrings';

export type EmojiPickerPopupProps = {
    /**
     * Access token of the logged-in user. Is needed to load and save the history of the emojis.
     */
    accessToken?: string;
    /**
     * The DOM element that should receive the popup portal.
     */
    container?: Element;
    /**
     * Whether the picker trigger is disabled.
     */
    isDisabled?: boolean;
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
     * Function executed when an emoji is selected in the popup
     * @param {string} emoji - Emoji that was selected
     */
    onSelect: (emoji: string) => void;
    /**
     * Enables keyboard-only focus highlighting for the picker trigger.
     */
    shouldEnableKeyboardHighlighting?: boolean;
    /**
     * Receives focus after an emoji is selected with the keyboard.
     */
    onSelectWithKeyboard?: (emoji: string) => void;
};

const EmojiPickerPopupContent: FC<EmojiPickerPopupProps> = ({
    accessToken,
    container,
    isDisabled,
    onPopupVisibilityChange,
    onSelect,
    onSelectWithKeyboard,
    personId,
    shouldEnableKeyboardHighlighting,
}) => {
    const { t } = useTranslation();
    const popupRef = useRef<PopupRef>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        isDisabled ? false : shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(triggerRef, {
        isEnabled: shouldShowKeyboardHighlighting,
        shape: 'circle',
        padding: 4,
    });

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && !event.shiftKey) {
            popupRef.current?.hide();
        }
    }, []);

    const handleTriggerKeyDown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
        (event) => {
            if (isDisabled) {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                popupRef.current?.show();
            }
        },
        [isDisabled],
    );

    const handleSelect = useCallback(
        (emoji: string, shouldRestoreInputFocus?: boolean) => {
            onSelect(emoji);

            if (shouldRestoreInputFocus) {
                onSelectWithKeyboard?.(emoji);
            }
        },
        [onSelect, onSelectWithKeyboard],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <StyledEmojiPickerPopup aria-hidden={isDisabled}>
            <Popup
                container={container}
                ref={popupRef}
                onHide={() =>
                    typeof onPopupVisibilityChange === 'function'
                        ? onPopupVisibilityChange(false)
                        : undefined
                }
                onShow={() =>
                    typeof onPopupVisibilityChange === 'function'
                        ? onPopupVisibilityChange(true)
                        : undefined
                }
                content={
                    <AreaProvider shouldChangeColor={false}>
                        <EmojiPicker
                            accessToken={accessToken}
                            onSelect={handleSelect}
                            personId={personId}
                        />
                    </AreaProvider>
                }
            >
                <button
                    aria-label={t(textStrings.emojiPickerPopup.accessibility.open)}
                    className="prevent-lose-focus"
                    disabled={isDisabled}
                    onClick={(event) => {
                        if (isDisabled) {
                            event.stopPropagation();
                        }
                    }}
                    onKeyDown={handleTriggerKeyDown}
                    ref={triggerRef}
                    tabIndex={isDisabled ? -1 : 0}
                    type="button"
                >
                    <Icon icons={['far fa-smile']} size={18} />
                </button>
            </Popup>
        </StyledEmojiPickerPopup>
    );
};

const EmojiPickerPopup: FC<EmojiPickerPopupProps> = (props) => (
    <TextStringProviderSSR libraries="@chayns-component-emoji-input" id="emoji-picker-popup">
        <EmojiPickerPopupContent {...props} />
    </TextStringProviderSSR>
);

EmojiPickerPopup.displayName = 'EmojiPickerPopup';

export default EmojiPickerPopup;
