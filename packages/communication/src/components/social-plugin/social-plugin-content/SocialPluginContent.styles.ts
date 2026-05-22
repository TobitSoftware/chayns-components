import styled from 'styled-components';

export const StyledSocialPluginContent = styled.div`
    width: 100%;
`;

export const StyledSocialPluginContentComments = styled.div`
    min-height: 300px;
    max-height: 500px;

    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 16px;

    margin: 8px 0;

    overflow-y: auto;
    overflow-x: hidden;
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
