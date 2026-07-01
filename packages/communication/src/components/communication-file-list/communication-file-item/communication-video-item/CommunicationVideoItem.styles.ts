import styled from 'styled-components';

export const StyledCommunicationVideoItem = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const StyledCommunicationVideoItemThumbnail = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const StyledCommunicationVideoItemIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
`;
