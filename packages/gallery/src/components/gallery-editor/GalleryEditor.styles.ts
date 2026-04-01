import styled from 'styled-components';

export const StyledGalleryEditor = styled.div`
    width: 100%;
`;

export const StyledGalleryEditorGrid = styled.div<{
    $fileMinWidth: number;
}>`
    display: grid;
    grid-template-columns: ${({ $fileMinWidth }) =>
        `repeat(auto-fill, minmax(${$fileMinWidth}px, 1fr))`};
    grid-auto-rows: 1fr;
    gap: 6px;
`;
