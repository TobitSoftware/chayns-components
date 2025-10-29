import styled, { css } from 'styled-components';
import { GalleryViewMode } from './Gallery.types';

export const StyledGallery = styled.div``;

export const StyledGalleryItemWrapper = styled.div<{
    $uploadedFileLength: number;
    $ratio: number;
    $viewMode: GalleryViewMode;
}>`
    display: grid;
    gap: 5px;

    ${({ $viewMode, $uploadedFileLength }) => {
        if ($viewMode === GalleryViewMode.GRID) {
            return css`
                > div:first-child {
                    grid-column: 1 / -1;
                }

                ${() => {
                    switch ($uploadedFileLength) {
                        case 1:
                            return css`
                                grid-template-columns: 1fr;
                            `;
                        case 2:
                            return css`
                                grid-template-columns: repeat(2, 1fr);
                                > div:first-child {
                                    grid-column: span 1;
                                }
                            `;
                        case 3:
                            return css`
                                grid-template-columns: repeat(2, 1fr);
                                > div:first-child {
                                    grid-column: span 2;
                                }
                            `;
                        default:
                            return css`
                                grid-template-columns: repeat(3, minmax(0, 1fr));
                                > div:not(:first-child) {
                                    grid-column: span 1;
                                }
                            `;
                    }
                }}
            `;
        }

        switch ($uploadedFileLength) {
            case 1:
                return css`
                    grid-template-columns: 1fr;
                `;
            case 2:
                return css`
                    grid-template-columns: repeat(2, 1fr);
                `;
            case 3:
                return css`
                    grid-template-columns: repeat(3, 1fr);
                `;
            default:
                return css`
                    grid-template-columns: repeat(2, 1fr);
                    > div:nth-child(-n + 2) {
                        grid-row: 1;
                    }
                `;
        }
    }}

    aspect-ratio: ${({ $ratio }) => $ratio};
`;

export const StyledGalleryEditModeWrapper = styled.div<{
    $fileMinWidth: number;
}>`
    display: grid;
    grid-template-columns: ${({ $fileMinWidth }) =>
        `repeat(auto-fill, minmax(${$fileMinWidth}px, 1fr))`};
    grid-auto-rows: 1fr;
    gap: 6px;
`;
