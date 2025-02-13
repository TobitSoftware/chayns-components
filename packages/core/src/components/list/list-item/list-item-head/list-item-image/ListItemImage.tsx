import { MediaType, openMedia, OpenMediaItem } from 'chayns-api';
import React, { CSSProperties, MouseEventHandler, useCallback, useState } from 'react';
import {
    StyledCareOfImage,
    StyledListImageWrapper,
    StyledListImageWrapperImage,
    StyledListItemHeadImage,
    StyledListItemHeadImageWrapper,
} from './ListItemImage.styles';

type ListItemImageProps = {
    careOfLocationId?: number;
    imageBackground?: CSSProperties['background'];
    images: string[];
    shouldHideBackground: boolean;
    shouldShowRoundImage: boolean;
    shouldOpenImageOnClick: boolean;
};

const ListItemImage: React.FC<ListItemImageProps> = ({
    careOfLocationId,
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

    if (images && images[0] && images[1]) {
        return (
            <StyledListImageWrapper onClick={handleImageClick}>
                <StyledListImageWrapperImage
                    src={images[0]}
                    $shouldHideBackground={shouldHideBackground}
                    $background={imageBackground}
                    $isSmall={!!careOfLocationId}
                />
                <StyledListImageWrapperImage
                    src={images[1]}
                    $isSecondImage
                    $shouldHideBackground={shouldHideBackground}
                    $background={imageBackground}
                    $isSmall={!!careOfLocationId}
                />
                {careOfLocationId && (
                    <StyledCareOfImage
                        $shouldHideBackground={shouldHideBackground}
                        $background={imageBackground}
                        src={`https://sub60.tobit.com/l/${careOfLocationId}?size=128`}
                        alt="care-of"
                    />
                )}
            </StyledListImageWrapper>
        );
    }

    if (images && images[0]) {
        return (
            <StyledListItemHeadImageWrapper onClick={handleImageClick}>
                <StyledListItemHeadImage
                    $isHidden={!hasLoadedImage}
                    onLoad={handleImageLoaded}
                    $shouldShowRoundImage={shouldShowRoundImage}
                    $background={imageBackground}
                    $shouldHideBackground={shouldHideBackground}
                    $isSmall={!!careOfLocationId}
                    src={images[0]}
                />
                {careOfLocationId && (
                    <StyledCareOfImage
                        $shouldHideBackground={shouldHideBackground}
                        $background={imageBackground}
                        src={`https://sub60.tobit.com/l/${careOfLocationId}?size=128`}
                        alt="care-of"
                    />
                )}
            </StyledListItemHeadImageWrapper>
        );
    }

    return null;
};

ListItemImage.displayName = 'ListItemImage';

export default ListItemImage;
