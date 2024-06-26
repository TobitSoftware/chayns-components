import { AreaProvider, Icon, Popup, type PopupRef } from '@chayns-components/core';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import EmojiPicker from '../emoji-picker/EmojiPicker';
import { StyledEmojiPickerPopup } from './EmojiPickerPopup.styles';

export type EmojiPickerPopupProps = {
    /**
     * Access token of the logged-in user. Is needed to load and save the history of the emojis.
     */
    accessToken?: string;
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
};

const EmojiPickerPopup: FC<EmojiPickerPopupProps> = ({
    accessToken,
    onPopupVisibilityChange,
    onSelect,
    personId,
}) => {
    const popupRef = useRef<PopupRef>(null);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape' && !event.shiftKey) {
            popupRef.current?.hide();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.addEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <StyledEmojiPickerPopup>
            <Popup
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
                            onSelect={onSelect}
                            personId={personId}
                        />
                    </AreaProvider>
                }
            >
                <Icon className="prevent-lose-focus" icons={['far fa-smile']} size={18} />
            </Popup>
        </StyledEmojiPickerPopup>
    );
};

EmojiPickerPopup.displayName = 'EmojiPickerPopup';

export default EmojiPickerPopup;
