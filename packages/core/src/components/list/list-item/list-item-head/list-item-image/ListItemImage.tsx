import React, { useCallback, useState } from 'react';
import GridImage from '../../../../grid-image/GridImage';
import { StyledListItemHeadImage, StyledListItemHeadImageWrapper } from './ListItemImage.styles';
import { MediaType, openMedia, OpenMediaItem } from 'chayns-api';

type ListItemImageProps = {
    images: string[];
    shouldHideBackground: boolean;
    shouldShowRoundImage: boolean;
    shouldOpenImageOnClick: boolean;
};

const ListItemImage: React.FC<ListItemImageProps> = ({
    images,
    shouldHideBackground,
    shouldShowRoundImage,
    shouldOpenImageOnClick,
}) => {
    const [hasLoadedImage, setHasLoadedImage] = useState(false);
    const handleImageLoaded = useCallback(() => {
        setHasLoadedImage(true);
    }, []);

    const handleImageClick = (event: MouseEvent) => {
        if (!shouldOpenImageOnClick) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const items: OpenMediaItem[] = images.map((image) => ({
            url: image,
            mediaType: MediaType.IMAGE,
        }));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        void openMedia({ items, startIndex: 0 });
    };

    if (images && images[0] && images[1] && images[2]) {
        const gridImages = [images[0], images[1], images[2]];

        return (
            <GridImage
                images={gridImages}
                shouldShowRoundImage={shouldShowRoundImage}
                size={40}
                onClick={handleImageClick}
            />
        );
    }

    if (images && images[0]) {
        return (
            <StyledListItemHeadImageWrapper
                onClick={handleImageClick}
                $shouldHideBackground={shouldHideBackground}
                $shouldShowRoundImage={shouldShowRoundImage}
            >
                <StyledListItemHeadImage
                    $isHidden={!hasLoadedImage}
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
