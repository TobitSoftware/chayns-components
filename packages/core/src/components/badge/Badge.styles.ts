import styled from 'styled-components';

export const StyledBadge = styled.div`
    background-color: ${({ theme }) => theme['secondary-202']};
    border-radius: 15px;
    color: ${({ theme }) => theme['007']};
    font-size: 0.8rem;
    min-width: 1.65rem;
    padding: 2px 7px;
    text-align: center;
`;
