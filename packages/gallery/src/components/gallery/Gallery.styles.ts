import styled from 'styled-components';

export const StyledGallery = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px;
`;

export const StyledGalleryItem = styled.div`
    position: relative;
`;

export const StyledGalleryItemDeleteButton = styled.button`
    background-color: white;
    opacity: 0.7;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    height: 30px;
    width: 30px;
`;

export const StyledGalleryItemAdd = styled.button`
    width: 150px;
    height: 150px;
    border: darkslateblue solid 2px;
    border-radius: 2px;
`;

export const StyledGalleryItemImage = styled.img`
    z-index: 1;
    width: 150px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: darkslateblue solid 2px;
    border-radius: 2px;
`;

export const StyledGalleryItemVideo = styled.video`
    width: 150px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: darkslateblue solid 2px;
    border-radius: 2px;
`;
