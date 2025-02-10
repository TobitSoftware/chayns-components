import { MediaType, openMedia, OpenMediaItem } from 'chayns-api';
import React, { CSSProperties, MouseEventHandler, useCallback, useState } from 'react';
import GridImage from '../../../../grid-image/GridImage';
import {
    StyledListImageWrapper,
    StyledListImageWrapperImage,
    StyledListItemHeadImage,
    StyledListItemHeadImageWrapper,
} from './ListItemImage.styles';

type ListItemImageProps = {
    imageBackground?: CSSProperties['background'];
    images: string[];
    shouldHideBackground: boolean;
    shouldShowRoundImage: boolean;
    shouldOpenImageOnClick: boolean;
};

const ListItemImage: React.FC<ListItemImageProps> = ({
    imageBackground,
    images,
    shouldHideBackground,
    shouldShowRoundImage,
    shouldOpenImageOnClick,
}) => {
    const [hasLoadedImage, setHasLoadedImage] = useState(false);
    const handleImageLoaded = useCallback(() => {
        setHasLoadedImage(true);
    }, []);

    const handleImageClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
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
        },
        [images, shouldOpenImageOnClick],
    );

    if (images && images[0] && images[1] && images[2]) {
        const gridImages = [images[0], images[1], images[2]];

        return (
            <GridImage
                background={imageBackground}
                images={gridImages}
                shouldShowRoundImage={shouldShowRoundImage}
                size={40}
                onClick={handleImageClick}
            />
        );
    }

    if (images && images[0] && images[1]) {
        return (
            <StyledListImageWrapper onClick={handleImageClick}>
                <StyledListImageWrapperImage src={images[0]} />
                <StyledListImageWrapperImage src={images[1]} $isSecondImage />
            </StyledListImageWrapper>
        );
    }

    if (images && images[0]) {
        return (
            <StyledListItemHeadImageWrapper
                onClick={handleImageClick}
                $background={imageBackground}
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
