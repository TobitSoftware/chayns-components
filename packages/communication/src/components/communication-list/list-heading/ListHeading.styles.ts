import styled, { css } from 'styled-components';

type StyledListHeadingProps = {
    $shouldAddTopMargin: boolean;
};

export const StyledListHeading = styled.div<StyledListHeadingProps>`
    margin: 0 8px 4px;
    font-size: 85%;
    opacity: 0.5;

    ${({ $shouldAddTopMargin }) =>
        $shouldAddTopMargin &&
        css`
            margin-top: 22px;
        `}
`;
