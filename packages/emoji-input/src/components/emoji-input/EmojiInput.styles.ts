import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../../core/src/components/color-scheme-provider/ColorSchemeProvider';
import { DesignMode } from './constants/design';
import type { EmojiInputProps } from './EmojiInput';

type StyledEmojiInputProps = WithTheme<Pick<EmojiInputProps, 'design'>>;

export const StyledEmojiInput = styled.div<StyledEmojiInputProps>`
    align-items: center;
    display: flex;
    line-height: 26px;
    position: relative;
    width: 100%;

    ${({ design, theme }: StyledEmojiInputProps) => {
        switch (design) {
            case DesignMode.BorderDesign:
                return css`
                    background-color: ${theme['000']};
                    border-radius: 3px;
                    border: 1px solid rgba(160, 160, 160, 0.3);
                    color: ${theme['006']};
                    min-height: 42px;
                    padding: 0 10px;
                `;
            case DesignMode.Normal:
            default:
                return css``;
        }
    }}
`;

type StyledDivProps = WithTheme<Pick<EmojiInputProps, 'design' | 'isDisabled'>>;

export const StyledEditableDiv = styled.div<StyledDivProps>`
    display: inline-block;
    flex: 1;
    font-weight: 400;
    margin-right: 8px;

    ${({ design, theme }: StyledDivProps) => {
        switch (design) {
            case DesignMode.BorderDesign:
                return css`
                    cursor: text;
                    padding: 5px 1px;
                `;
            case DesignMode.Normal:
            default:
                return css`
                    background-color: transparent;
                    border-bottom-color: rgba(${theme['headline-rgb']}, 0.45) !important;
                    border-radius: 0;
                    border: 1px solid transparent;
                    box-shadow: none;
                    color: ${theme.text};
                    cursor: text;
                    min-height: 36px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    padding: 5px 1px;
                    transition: border-color 0.4s, color 0.4s, font-weight 0.4s;
                    word-break: break-word;
                `;
        }
    }}

    ${({ isDisabled }: StyledDivProps) =>
        isDisabled &&
        css`
            border-bottom-color: #5c646c;
            color: #e8e8e8;
        `}
`;

type StyledPlaceholderProps = {
    isHidden: boolean;
} & Pick<EmojiInputProps, 'design'>;
export const StyledPlaceholder = styled.div<StyledPlaceholderProps>`
    // transition: left 0.4s ease-out, right 0.4s ease-out, opacity 0.4s ease-out; // fade out to right
    color: #757575;
    font-weight: 400;
    margin-right: 8px;
    opacity: ${({ isHidden }: StyledPlaceholderProps) => (isHidden ? '0' : '1')};
    overflow: hidden;
    padding: 5px 1px;
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    transition: opacity 0.35s ease-in-out; //fade out
    user-select: none;
    white-space: nowrap;
`;

type StyledRightElementProps = Pick<EmojiInputProps, 'design'>;
export const StyledRightElement = styled.div<StyledRightElementProps>`
    align-items: center;
    align-self: end;
    display: flex;
    justify-content: center;
    min-height: ${({ design }: StyledRightElementProps) =>
        design === DesignMode.BorderDesign ? '42px' : '36px'};
`;
