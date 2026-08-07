import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledSocialPluginBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const StyledSocialPluginBarCommentCount = styled.footer``;

export const StyledSocialPluginBarDivider = styled.div<WithTheme<unknown>>`
    width: 100%;
    height: 1px;
    margin-bottom: 4px;

    background-color: rgba(${({ theme }) => theme['text-rgb']}, 0.1);
`;

export const StyledSocialPluginBarItems = styled.div`
    display: flex;
    align-items: center;

    justify-content: space-between;
    gap: 16px;
`;

export const StyledSocialPluginBarItemsSide = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const StyledSocialPluginBarItem = styled.button`
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    cursor: pointer;

    &:focus-visible {
        border-radius: 4px;
        outline: 2px solid color-mix(in srgb, white 70%, transparent);
        outline-offset: 3px;
    }
`;

type StyledSocialPluginBarItemTextProps = {
    $shouldHighlight?: boolean;
};

export const StyledSocialPluginBarItemText = styled.div<StyledSocialPluginBarItemTextProps>`
    font-weight: ${({ $shouldHighlight }) => ($shouldHighlight ? 'bold' : 'normal')};
    line-height: 1;
`;
