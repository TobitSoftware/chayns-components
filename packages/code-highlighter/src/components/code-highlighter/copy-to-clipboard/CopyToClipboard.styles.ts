import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';
import { CodeHighlighterTheme } from '../../../types/codeHighlighter';

type StyledCopyToClipboardProps = WithTheme<{
    $codeTheme: CodeHighlighterTheme;
    $fixedRight: number;
    $fixedTop: number;
    $isFixed: boolean;
}>;

export const StyledCopyToClipboard = styled.div<StyledCopyToClipboardProps>`
    position: ${({ $isFixed }) => ($isFixed ? 'fixed' : 'sticky')};
    top: ${({ $fixedTop, $isFixed }) =>
        $isFixed ? `${$fixedTop}px` : 'var(--code-highlighter-action-inset)'};
    right: ${({ $fixedRight, $isFixed }) => ($isFixed ? `${$fixedRight}px` : 'auto')};
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    height: calc(var(--code-highlighter-action-size) + var(--code-highlighter-action-inset));
    margin-top: ${({ $isFixed }) =>
        $isFixed
            ? '0'
            : 'calc((var(--code-highlighter-action-size) + var(--code-highlighter-action-inset)) * -1)'};
    padding-right: var(--code-highlighter-action-inset);
`;

type StyledCopyToClipboardButtonProps = WithTheme<{
    $codeTheme: CodeHighlighterTheme;
    $isSticky: boolean;
}>;

const getActionGroupBorder = ({ $codeTheme, $isSticky }: StyledCopyToClipboardButtonProps) => {
    if (!$isSticky) {
        return 'transparent';
    }

    return $codeTheme === CodeHighlighterTheme.Dark ? '#5a6474' : '#d4d4d4';
};

const getActionGroupBackground = ({ $codeTheme, $isSticky }: StyledCopyToClipboardButtonProps) => {
    if (!$isSticky) {
        return 'transparent';
    }

    return $codeTheme === CodeHighlighterTheme.Dark ? '#343a46' : '#fafafa';
};

const getButtonHoverBackground = ({ $codeTheme }: StyledCopyToClipboardButtonProps) =>
    $codeTheme === CodeHighlighterTheme.Dark ? '#454c59' : 'rgba(128, 128, 128, 0.2)';

const getButtonActiveBackground = ({ $codeTheme }: StyledCopyToClipboardButtonProps) =>
    $codeTheme === CodeHighlighterTheme.Dark ? '#545d6d' : 'rgba(128, 128, 128, 0.3)';

const getButtonHoverBorder = ({ $codeTheme }: StyledCopyToClipboardButtonProps) =>
    $codeTheme === CodeHighlighterTheme.Dark ? '#6a7485' : '#c2c2c2';

const getButtonShadow = ({ $isSticky }: StyledCopyToClipboardButtonProps) =>
    $isSticky ? '0 2px 8px rgba(0, 0, 0, 0.28)' : 'none';

const getButtonHoverShadow = ({ $isSticky }: StyledCopyToClipboardButtonProps) => {
    const insetShadow = 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)';

    return $isSticky ? `0 2px 8px rgba(0, 0, 0, 0.32), ${insetShadow}` : insetShadow;
};

export const StyledCopyToClipboardActionGroup = styled.div`
    display: flex;
    gap: 4px;
    height: var(--code-highlighter-action-size);
`;

export const StyledCopyToClipboardButton = styled.button<StyledCopyToClipboardButtonProps>`
    box-sizing: border-box;
    border: 1px solid ${getActionGroupBorder};
    border-radius: 4px;
    width: var(--code-highlighter-action-size);
    height: var(--code-highlighter-action-size);
    padding: 0;
    cursor: pointer;
    background-color: ${getActionGroupBackground};
    color: ${({ $codeTheme }) =>
        $codeTheme === CodeHighlighterTheme.Dark ? '#f4f6f8' : '#999999'};
    box-shadow: ${getButtonShadow};
    transition:
        background-color 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease,
        transform 0.15s ease;

    &:hover {
        border-color: ${getButtonHoverBorder};
        background-color: ${getButtonHoverBackground};
        box-shadow: ${getButtonHoverShadow};
    }

    &:active {
        background-color: ${getButtonActiveBackground};
        transform: scale(0.94);
    }

    &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
    }
`;

type StyledCopyToClipboardTextProps = WithTheme<{
    $codeTheme: CodeHighlighterTheme;
}>;
export const StyledCopyToClipboardText = styled.span<StyledCopyToClipboardTextProps>`
    color: ${({ $codeTheme }) =>
        $codeTheme === CodeHighlighterTheme.Dark ? '#e5e5e5' : '#999999'};
    font-size: small;
    margin-left: 4px;
`;
