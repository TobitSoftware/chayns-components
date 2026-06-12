import styled from 'styled-components';

export const StyledMasonry = styled.div<{ $height: number }>`
    position: relative;
    width: 100%;
    height: ${({ $height }) => $height}px;
`;
