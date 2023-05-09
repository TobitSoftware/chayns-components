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

export const StyledGalleryEditModeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;
    padding: 15px;

    & > * {
        flex-basis: calc(25% - 7.5px);
    }
`;
