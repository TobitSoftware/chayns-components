import React, { FC } from 'react';
import { StyledGallery } from './Gallery.styles';

export type GalleryProps = unknown;

const Gallery: FC<GalleryProps> = () => <StyledGallery>Gallery</StyledGallery>;

Gallery.displayName = 'Gallery';

export default Gallery;
