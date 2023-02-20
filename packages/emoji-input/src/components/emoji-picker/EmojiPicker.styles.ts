import styled from 'styled-components';

export const emojiPickerSize = {
    height: 285,
    width: 350,
};

export const StyledEmojiPicker = styled.div`
    display: flex;
    flex-direction: column;
    height: ${emojiPickerSize.height}px;
    padding: 10px 22px;
    width: ${emojiPickerSize.width}px;
    user-select: none;
`;
