import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledEmojiPickerProps = WithTheme<unknown>;

export const StyledEmojiPicker = styled.div<StyledEmojiPickerProps>`
    background-color: ${({ theme }: StyledEmojiPickerProps) => theme['100']};
    display: flex;
    flex-direction: column;
    height: 285px;
    padding: 10px 22px;
    width: 350px;
`;
