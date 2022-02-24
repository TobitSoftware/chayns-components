import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../../core/src/components/color-scheme-provider/ColorSchemeProvider';
import { DesignMode } from './constants/design';
import type { EmojiInputProps } from './EmojiInput';

type StyledEmojiInputProps = WithTheme<Pick<EmojiInputProps, 'design'>>;

export const StyledEmojiInput = styled.div<StyledEmojiInputProps>`
    align-items: center;
    display: flex;
    position: relative;
    width: 100%;

    ${({ design, theme }) => {
        console.debug('theme', theme);
        switch (design) {
            case DesignMode.BorderDesign:
                return css`
                    padding-left: 10px;
                    border: 1px solid rgba(160, 160, 160, 0.3);
                    color: ${theme['006']};
                    background-color: ${theme['000']};
                    // padding: 8px 10px;
                    justify-content: space-between;
                    min-height: 42px;
                    border-radius: 3px;
                `;
            case DesignMode.Normal:
            default:
                return css``;
        }
    }}
`;

type StyledDivProps = WithTheme<EmojiInputProps> & any;

export const StyledEditableDiv = styled.div<StyledDivProps>`
    flex: 1;
    display: inline-block;
    margin-right: 8px;

    ${({ design, theme }) => {
        switch (design) {
            case DesignMode.BorderDesign:
                return css`
                    position: relative;
                    width: 100%;
                    flex: 1 0;
                `;
            case DesignMode.Normal:
            default:
                return css`
                    cursor: text;
                    padding: 5px 1px;
                    font-weight: 300;
                    box-shadow: none;
                    border-radius: 0;
                    background-color: transparent;
                    border: 1px solid transparent;
                    border-bottom-color: rgba(${theme.headline}, 0.45);
                    color: ${theme.text};
                    transition: border-color 0.4s, color 0.4s, font-weight 0.4s;
                `;
        }
    }}

    ${({ isDisabled }) =>
        isDisabled &&
        css`
            background-color: transparent;
            border: 1px solid transparent;
            border-bottom-color: #5c646c;
            padding: 4px 8px;
            font-weight: 300;
            box-shadow: none;
            border-radius: 0;
            color: #e8e8e8;
        `}
`;

type StyledPlaceholderProps = {
    isHidden: boolean;
};
export const StyledPlaceholder = styled.div<StyledPlaceholderProps>`
    transition: opacity 0.35s ease-in-out;
    pointer-events: none;
    position: absolute;
    user-select: none;
    font-weight: 400;
    padding: 4px 8px;
    color: #757575;
    left: 1px;
    top: 1px;
    opacity: ${({ isHidden }: StyledPlaceholderProps) => (isHidden ? '0' : '1')};
`;

export const StyledRightElement = styled.div`
    flex: 0;
`;
