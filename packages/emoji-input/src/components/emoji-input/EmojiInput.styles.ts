import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../../core/src/components/color-scheme-provider/ColorSchemeProvider';
import { DesignMode } from './constants/design';
import type { EmojiInputProps } from './EmojiInput';

type StyledEmojiInputProps = WithTheme<Pick<EmojiInputProps, 'design' | 'isDisabled'>>;

export const StyledEmojiInput = styled.div<StyledEmojiInputProps>`
    align-items: center;
    display: flex;
    line-height: 26px;
    position: relative;
    width: 100%;

    ${({ design, theme, isDisabled }: StyledEmojiInputProps) => {
        switch (design) {
            case DesignMode.BorderDesign:
                return css`
                    background-color: ${theme['000']};
                    border-radius: 3px;
                    border: 1px solid rgba(160, 160, 160, 0.3);
                    color: ${theme['006']};
                    min-height: 42px;
                    opacity: ${isDisabled ? '0.6' : '1'};
                `;
            case DesignMode.Normal:
            default:
                return css``;
        }
    }}
`;

type StyledDivProps = WithTheme<Pick<EmojiInputProps, 'design' | 'isDisabled' | 'showEmojiButton'>>;

export const StyledEditableDiv = styled.div<StyledDivProps>`
    cursor: text;
    display: inline-block;
    flex: 1;
    font-weight: 400;
    overflow-x: hidden;
    overflow-y: auto;
    word-break: break-word;

    ${({ design, theme, isDisabled, showEmojiButton }: StyledDivProps) => {
        switch (design) {
            case DesignMode.BorderDesign:
                return css`
                    padding: 8px ${showEmojiButton ? '6px' : '10px'} 8px 11px;
                    min-height: 42px;
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
                    margin-right: ${showEmojiButton ? '6px' : '0px'};
                    padding: 5px 0px 5px 1px;
                    transition: border-color 0.4s, color 0.4s, font-weight 0.4s;
                    opacity: ${isDisabled ? '0.6' : '1'};
                    :focus {
                        border-bottom-color: rgba(${theme['headline-rgb']}, 0.9) !important;
                    }
                `;
        }
    }}

    ${({ isDisabled }: StyledDivProps) =>
        isDisabled &&
        css`
            cursor: initial;
        `}
`;

type StyledPlaceholderProps = {
    isHidden: boolean;
} & Pick<EmojiInputProps, 'design' | 'isDisabled'>;
export const StyledPlaceholder = styled.div<StyledPlaceholderProps>`
    // transition: left 0.4s ease-out, right 0.4s ease-out, opacity 0.4s ease-out; // fade out to right
    color: #757575;
    font-weight: 400;
    margin-right: 8px;
    opacity: ${({ isHidden, isDisabled }: StyledPlaceholderProps) =>
        isHidden ? '0' : isDisabled ? '0.6' : '1'};
    overflow: hidden;
    padding: ${({ design }: StyledPlaceholderProps) =>
        design === DesignMode.Normal ? '6px 1px 5px 1px' : '8px 0 8px 11px'};
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
