import styled, { css } from 'styled-components';

export const StyledHeaderActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;

type StyledHeaderActionsSideProps = {
    $isRightSide?: boolean;
};

export const StyledHeaderActionsSide = styled.div<StyledHeaderActionsSideProps>`
    display: flex;
    align-items: center;
    gap: 4px;

    ${({ $isRightSide }) =>
        $isRightSide &&
        css`
            width: 100%;
            min-width: 0;
            justify-content: end;
        `}
`;
