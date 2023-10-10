import styled, { css } from 'styled-components';

export const StyledGallery = styled.div``;

export const StyledGalleryItemWrapper = styled.div<{
    columns: string;
    uploadedFileLength: number;
    ratio: number;
}>`
    ${({ columns, uploadedFileLength, ratio }) =>
        uploadedFileLength > 1
            ? css`
                  display: grid;
                  grid-template-columns: ${columns};
                  row-gap: 5px;
                  column-gap: 5px;
                  aspect-ratio: ${ratio};
              `
            : css`
                  aspect-ratio: ${ratio};
              `}
`;

export const StyledGalleryEditModeWrapper = styled.div<{
    fileMinWidth: number;
}>`
    display: grid;
    grid-template-columns: ${({ fileMinWidth }) =>
        `repeat(auto-fill, minmax(${fileMinWidth}px, 1fr))`};
    grid-auto-rows: 1fr;
    gap: 6px;
`;
