import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import styled from 'styled-components';
import { CopyableContentAppearance } from './CopyableContent.types';

export enum CopyableContentColorMode {
    Dark = 'dark',
    Light = 'light',
}

type StyledCopyableContentProps = WithTheme<{
    $appearance: CopyableContentAppearance;
    $colorMode: CopyableContentColorMode;
}>;

const getBackgroundColor = ({ $appearance, $colorMode }: StyledCopyableContentProps) => {
    if ($appearance === CopyableContentAppearance.Chat) {
        return 'rgba(0, 0, 0, 0.12)';
    }

    return $colorMode === CopyableContentColorMode.Dark ? '#282c34' : '#fafafa';
};

const getTextColor = ({ $colorMode }: StyledCopyableContentProps) =>
    $colorMode === CopyableContentColorMode.Dark ? '#f4f6f8' : '#333333';

export const StyledCopyableContent = styled.section<StyledCopyableContentProps>`
    --copyable-content-action-size: 32px;
    --copyable-content-action-inset: 8px;

    margin: 4px 0;
    min-width: 0;
    max-width: 100%;
    overflow-x: clip;
    overflow-wrap: anywhere;
    padding-top: calc(
        var(--copyable-content-action-size) + var(--copyable-content-action-inset) * 2
    );
    border-radius: 8px;
    background-color: ${getBackgroundColor};
    color: ${getTextColor};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
`;

type StyledCopyableContentButtonProps = WithTheme<{
    $colorMode: CopyableContentColorMode;
    $isSticky: boolean;
}>;

const getActionGroupBorder = ({ $colorMode, $isSticky }: StyledCopyableContentButtonProps) => {
    if (!$isSticky) {
        return 'transparent';
    }

    return $colorMode === CopyableContentColorMode.Dark ? '#5a6474' : '#d4d4d4';
};

const getActionGroupBackground = ({ $colorMode, $isSticky }: StyledCopyableContentButtonProps) => {
    if (!$isSticky) {
        return 'transparent';
    }

    return $colorMode === CopyableContentColorMode.Dark ? '#343a46' : '#fafafa';
};

const getButtonHoverBackground = ({ $colorMode }: StyledCopyableContentButtonProps) =>
    $colorMode === CopyableContentColorMode.Dark ? '#454c59' : 'rgba(128, 128, 128, 0.2)';

const getButtonActiveBackground = ({ $colorMode }: StyledCopyableContentButtonProps) =>
    $colorMode === CopyableContentColorMode.Dark ? '#545d6d' : 'rgba(128, 128, 128, 0.3)';

const getButtonHoverBorder = ({ $colorMode }: StyledCopyableContentButtonProps) =>
    $colorMode === CopyableContentColorMode.Dark ? '#6a7485' : '#c2c2c2';

const getButtonColor = ({ $colorMode }: StyledCopyableContentButtonProps) =>
    $colorMode === CopyableContentColorMode.Dark ? '#f4f6f8' : '#999999';

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
    border: 1px solid ${getActionGroupBorder};
    border-radius: 4px;
    width: var(--copyable-content-action-size);
    height: var(--copyable-content-action-size);
    padding: 0;
    cursor: pointer;
    background-color: ${getActionGroupBackground};
    color: ${getButtonColor};
    box-shadow: ${({ $isSticky }) => ($isSticky ? '0 2px 8px rgba(0, 0, 0, 0.28)' : 'none')};
    transition:
        background-color 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease,
        transform 0.15s ease;

    &:hover {
        border-color: ${getButtonHoverBorder};
        background-color: ${getButtonHoverBackground};
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
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

export const StyledCopyableContentTruncation = styled.div`
    padding: 0 12px 12px;
`;

type StyledCopyableContentBodyProps = WithTheme<{
    $colorMode: CopyableContentColorMode;
    $shouldShowPadding?: boolean;
}>;

const getHeadlineColor = ({ $colorMode }: StyledCopyableContentBodyProps) =>
    $colorMode === CopyableContentColorMode.Dark ? '#e5e5e5' : '#333333';

const getBlockquoteBorderColor = ({ $colorMode }: StyledCopyableContentBodyProps) =>
    $colorMode === CopyableContentColorMode.Dark ? '#5a6474' : '#d4d4d4';

const getLinkColor = ({ $colorMode }: StyledCopyableContentBodyProps) =>
    $colorMode === CopyableContentColorMode.Dark ? '#7cb3ff' : '#0066cc';

export const StyledCopyableContentBody = styled.div<StyledCopyableContentBodyProps>`
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    padding: ${({ $shouldShowPadding = true }) => ($shouldShowPadding ? '0 12px 12px' : '0')};

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
        color: ${getHeadlineColor};
    }

    ul,
    ol {
        padding-left: 24px;
    }

    blockquote {
        padding-left: 12px;
        border-left: 3px solid ${getBlockquoteBorderColor};
    }

    a {
        color: ${getLinkColor};
        overflow-wrap: anywhere;
    }

    > :last-child {
        margin-bottom: 0;
    }
`;
