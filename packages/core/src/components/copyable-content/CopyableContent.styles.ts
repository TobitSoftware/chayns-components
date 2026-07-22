import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import styled from 'styled-components';
import { CopyableContentAppearance } from './CopyableContent.types';

type StyledCopyableContentProps = WithTheme<{
    $appearance: CopyableContentAppearance;
}>;

const getBackgroundColor = ({ $appearance, theme }: StyledCopyableContentProps) => {
    if ($appearance === CopyableContentAppearance.Chat) {
        return theme.colorMode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)';
    }

    const secondaryColor = theme['secondary-100-rgb'] ?? '255, 255, 255';
    const opacity = theme.cardBackgroundOpacity ?? 1;

    return `rgba(${secondaryColor}, ${opacity})`;
};

export const StyledCopyableContent = styled.section<StyledCopyableContentProps>`
    --copyable-content-action-size: 32px;
    --copyable-content-action-inset: 8px;

    min-width: 0;
    max-width: 100%;
    overflow-x: clip;
    overflow-wrap: anywhere;
    padding-top: calc(
        var(--copyable-content-action-size) + var(--copyable-content-action-inset) * 2
    );
    border-radius: ${({ theme }) => theme.cardBorderRadius}px;
    background-color: ${getBackgroundColor};
    color: ${({ theme }) => theme.text};
`;

type StyledCopyableContentButtonProps = WithTheme<{
    $isSticky: boolean;
}>;

export const StyledCopyableContentActions = styled.div`
    position: sticky;
    top: var(--copyable-content-action-inset);
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    height: calc(var(--copyable-content-action-size) + var(--copyable-content-action-inset));
    margin-top: calc(
        (var(--copyable-content-action-size) + var(--copyable-content-action-inset)) * -1
    );
    padding-right: var(--copyable-content-action-inset);
`;

export const StyledCopyableContentActionGroup = styled.div`
    display: flex;
    gap: 4px;
    height: var(--copyable-content-action-size);
`;

export const StyledCopyableContentButton = styled.button<StyledCopyableContentButtonProps>`
    box-sizing: border-box;
    border: 1px solid ${({ $isSticky, theme }) => ($isSticky ? theme['202'] : 'transparent')};
    border-radius: 4px;
    width: var(--copyable-content-action-size);
    height: var(--copyable-content-action-size);
    padding: 0;
    cursor: pointer;
    background-color: ${({ $isSticky, theme }) => ($isSticky ? theme['100'] : 'transparent')};
    color: ${({ theme }) => theme.text};
    box-shadow: ${({ $isSticky }) => ($isSticky ? '0 2px 8px rgba(0, 0, 0, 0.16)' : 'none')};
    transition:
        background-color 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease,
        transform 0.15s ease;

    &:hover {
        background-color: rgba(${({ theme }) => theme['text-rgb']}, 0.1);
        box-shadow: inset 0 0 0 1px rgba(${({ theme }) => theme['text-rgb']}, 0.06);
    }

    &:active {
        transform: scale(0.9);
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.buttonBackgroundColor};
        outline-offset: 2px;
    }
`;

export const StyledCopyableContentBody = styled.div<WithTheme<unknown>>`
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    padding: 0 12px 12px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    blockquote {
        margin: 0 0 12px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: ${({ theme }) => theme.headline};
    }

    ul,
    ol {
        padding-left: 24px;
    }

    blockquote {
        padding-left: 12px;
        border-left: 3px solid ${({ theme }) => theme['202']};
    }

    a {
        color: ${({ theme }) => theme.primary};
        overflow-wrap: anywhere;
    }

    > :last-child {
        margin-bottom: 0;
    }
`;
