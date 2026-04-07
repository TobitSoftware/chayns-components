import styled, { css } from 'styled-components';
import { GalleryViewMode } from '../../types/gallery';

export const StyledGalleryViewer = styled.div`
    width: 100%;
`;

export const StyledGalleryViewerItemWrapper = styled.div<{
    $itemCount: number;
    $ratio: number;
    $viewMode: GalleryViewMode;
}>`
    display: grid;
    gap: 5px;

    ${({ $viewMode, $itemCount }) => {
        if ($viewMode === GalleryViewMode.GRID) {
            return css`
                > div:first-child {
                    grid-column: 1 / -1;
                }

                ${() => {
                    switch ($itemCount) {
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

        switch ($itemCount) {
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

    ${({ $itemCount, $ratio }) =>
        $itemCount > 0
            ? css`
                  aspect-ratio: ${$ratio};
              `
            : ''}
`;
