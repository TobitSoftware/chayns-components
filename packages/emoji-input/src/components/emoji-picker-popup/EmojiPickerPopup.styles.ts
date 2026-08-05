import styled from 'styled-components';

export const StyledEmojiPickerPopup = styled.div`
    align-items: center;
    display: flex;
    height: ${() => getComputedStyle(document.body).getPropertyValue('line-height')};
    position: relative;

    button {
        background: none;
        border: 0;
        color: inherit;
        cursor: pointer;
        font: inherit;
        padding: 0;
    }
`;
