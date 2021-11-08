import React, { useCallback, useState } from 'react';
import GridImage from '../../../../grid-image/GridImage';
import { StyledListItemHeadImage, StyledListItemHeadImageWrapper } from './ListItemImage.styles';

type ListItemImageProps = {
    images: string[];
    shouldShowRoundImage: boolean;
};

const ListItemImage: React.FC<ListItemImageProps> = ({ images, shouldShowRoundImage }) => {
    const [hasLoadedImage, setHasLoadedImage] = useState(false);
    const handleImageLoaded = useCallback(() => {
        setHasLoadedImage(true);
    }, []);

    if (images && images[0] && images[1] && images[2]) {
        const gridImages = [images[0], images[1], images[2]];

        return (
            <GridImage images={gridImages} shouldShowRoundImage={shouldShowRoundImage} size={40} />
        );
    }

    if (images && images[0]) {
        return (
            <StyledListItemHeadImageWrapper shouldShowRoundImage={shouldShowRoundImage}>
                <StyledListItemHeadImage
                    isHidden={!hasLoadedImage}
                    onLoad={handleImageLoaded}
                    src={images[0]}
                />
            </StyledListItemHeadImageWrapper>
        );
    }

    return null;
};

ListItemImage.displayName = 'ListItemImage';

export default ListItemImage;
