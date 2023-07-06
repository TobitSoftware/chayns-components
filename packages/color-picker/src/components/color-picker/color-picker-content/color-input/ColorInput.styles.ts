import styled from 'styled-components';

export const StyledColorInput = styled.div`
    width: 300px; // ToDo: Find better solution to fix width increase if accordion open
`;

export const StyledColorInputWrapper = styled.div`
    display: flex;
    gap: 10px;

    > div {
        flex: 1 1 auto;
        min-width: 0;
    }
`;
