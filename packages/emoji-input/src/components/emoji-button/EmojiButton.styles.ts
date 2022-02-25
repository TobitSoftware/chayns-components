import styled from 'styled-components';
import { DesignMode } from '../emoji-input/constants/design';
import type { EmojiInputProps } from '../emoji-input/EmojiInput';

type StyledEmojiButtonProps = Pick<EmojiInputProps, 'design'>;
export const StyledEmojiButton = styled.div<StyledEmojiButtonProps>`
    align-items: center;
    align-self: end;
    display: flex;
    flex: 0;
    height: ${({ design }: StyledEmojiButtonProps) =>
        design === DesignMode.BorderDesign ? '42px' : '36px'};
    justify-content: center;
    margin-right: 4px;
    span {
        width: auto;
        height: auto;
        padding: 10px 4px;
        opacity: 1;
    }
`;
