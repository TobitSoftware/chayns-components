import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledSocialPluginContent = styled.div`
    width: 100%;
`;

export const StyledSocialPluginContentComments = styled.div`
    min-height: 300px;
    max-height: 500px;

    width: 100%;
    margin: 8px 0;

    overflow-y: auto;
    overflow-x: hidden;
`;

export const StyledSocialPluginContentCommentsInner = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const StyledSocialPluginContentTopContent = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
`;

type StyledSocialPluginContentRightElementProps = WithTheme<{
    $isDisabled?: boolean;
}>;

export const StyledSocialPluginContentRightElement = styled.button<StyledSocialPluginContentRightElementProps>`
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    padding: 0;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};

    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.75 : 1)};

    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    &:focus-visible {
        border-radius: 50%;
        outline: 2px solid color-mix(in srgb, white 70%, transparent);
        outline-offset: 3px;
    }
`;

export const StyledSocialPluginImageWrapper = styled.div`
    height: 54px;
    width: 54px;

    position: relative;

    border-radius: 3px;
`;

export const StyledSocialPluginImageXmark = styled.button`
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;

    &:focus-visible {
        outline: 2px solid color-mix(in srgb, white 70%, transparent);
        outline-offset: 3px;
    }

    cursor: pointer;
`;

export const StyledSocialPluginImage = styled.img`
    height: 100%;
    width: 100%;

    object-fit: cover;
`;
