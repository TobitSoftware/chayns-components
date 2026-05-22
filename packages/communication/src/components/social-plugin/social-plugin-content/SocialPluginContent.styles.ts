import styled from 'styled-components';

export const StyledSocialPluginContent = styled.div``;

export const StyledSocialPluginContentComments = styled.div`
    min-height: 300px;
    max-width: 500px;
`;

type StyledSocialPluginContentRightElementProps = {
    $isDisabled?: boolean;
};

export const StyledSocialPluginContentRightElement = styled.div<StyledSocialPluginContentRightElementProps>`
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};

    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.75 : 1)};

    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;
