import styled from 'styled-components';

export const StyledGalleryViewerItem = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
`;

export const StyledGalleryViewerMoreItemsIndicator = styled.div`
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: brightness(40%);

    p {
        font-size: 40px;
        color: white;
    }
`;
