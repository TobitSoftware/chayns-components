import styled from 'styled-components';

export const emojiPickerSize = {
    height: 285,
    width: 350,
};

export const StyledEmojiPicker = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: ${emojiPickerSize.height}px;
    justify-content: center;
    padding: 10px 22px;
    width: ${emojiPickerSize.width}px;
    user-select: none;
`;
