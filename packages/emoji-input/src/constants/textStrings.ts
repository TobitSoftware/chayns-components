export default {
    components: {
        emojiPicker: {
            input: {
                placeholder: {
                    stringName:
                        'chayns_components_emoji_input_components_emojiPicker_input_placeholder',
                    fallback: 'Suchen',
                },
            },
        },
    },
    emojiPickerPopup: {
        accessibility: {
            open: {
                stringName: 'chayns_components_emoji_input_emojiPickerPopup_accessibility_open',
                fallback: 'Emoji-Auswahl öffnen',
            },
        },
    },
} as const;
