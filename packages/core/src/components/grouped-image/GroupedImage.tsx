import React, { CSSProperties, useMemo } from 'react';
import {
    ImageSize,
    StyledCornerImage,
    StyledGroupedImage,
    StyledImage,
} from './GroupedImage.styles';

interface GroupedImageProps {
    cornerImage?: string;
    height?: CSSProperties['height'];
    imageBackground?: CSSProperties['background'];
    images: string[];
    shouldHideBackground: boolean;
    shouldShowRoundImage: boolean;
}

const GroupedImage: React.FC<GroupedImageProps> = ({
    cornerImage,
    height = '40px',
    imageBackground,
    images,
    shouldHideBackground,
    shouldShowRoundImage,
}) => {
    const hasCornerImage = Boolean(cornerImage);
    const hasMultipleImages = images.length > 1;

    const imageSize = useMemo(() => {
        if (hasCornerImage) {
            return hasMultipleImages ? ImageSize.GroupedSmall : ImageSize.Small;
        }

        return hasMultipleImages ? ImageSize.Grouped : ImageSize.Full;
    }, [hasCornerImage, hasMultipleImages]);

    const imageElements = images
        .slice(0, 2) // Limit to 2 images for grouping
        .map((src, index) => (
            <StyledImage
                $background={imageBackground}
                $imageSize={imageSize}
                $isSecondImage={index === 1}
                $shouldHideBackground={shouldHideBackground}
                $shouldShowRoundImage={shouldShowRoundImage}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                src={src}
            />
        ));

    return (
        <StyledGroupedImage $height={height}>
            {imageElements}
            {hasCornerImage && <StyledCornerImage src={cornerImage} key="corner-image" />}
        </StyledGroupedImage>
    );
};

GroupedImage.displayName = 'GroupedImage';

export default GroupedImage;
