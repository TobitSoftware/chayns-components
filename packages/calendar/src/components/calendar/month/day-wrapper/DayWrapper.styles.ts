import styled from 'styled-components';

export const StyledDayWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(7, 1fr);
    padding-top: 6px;
    gap: 2px;
    margin: 0 15px;
`;
