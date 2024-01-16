import styled from 'styled-components';
import { getFontFamily } from '../../../../utils/font';
import type { WithTheme } from '@chayns-components/core';

type StyledEmojiProps = WithTheme<{
    isSelected: boolean;
}>;

export const StyledEmoji = styled.div<StyledEmojiProps>`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: ${getFontFamily};
    font-size: 32px;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: ${({ theme, isSelected }: StyledEmojiProps) =>
        isSelected ? theme['secondary-102'] : 'none'};
`;
