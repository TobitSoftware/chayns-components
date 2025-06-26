import React, { CSSProperties, FC, MouseEventHandler, useMemo } from 'react';
import {
    ImageSize,
    StyledCornerImage,
    StyledGroupedImage,
    StyledGroupImageElement,
} from './GroupedImage.styles';

type GroupedImageProps = {
    /**
     * Optional image to display in the bottom right corner of the grouped image.
     */
    cornerImage?: string;
    /**
     * Height of the grouped image container.
     */
    height?: CSSProperties['height'];
    /**
     * Background for the single images.
     */
    imageBackground?: CSSProperties['background'];
    /**
     * Array of image URLs to display in the grouped image. If only one image is provided, it will be displayed as a full image.
     */
    images: string[];
    /**
     * Optional click handler for the grouped image.
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * Whether to prevent the background of the images from being set.
     */
    shouldPreventBackground?: boolean;
    /**
     * Whether to show the images in a round shape.
     */
    shouldShowRoundImage?: boolean;
};

const GroupedImage: FC<GroupedImageProps> = ({
    cornerImage,
    height = '40px',
    imageBackground,
    images,
    onClick,
    shouldPreventBackground = false,
    shouldShowRoundImage = false,
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
            <StyledGroupImageElement
                $background={imageBackground}
                $imageSize={imageSize}
                $isSecondImage={index === 1}
                $shouldPreventBackground={shouldPreventBackground}
                $shouldShowRoundImage={shouldShowRoundImage}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                src={src}
            />
        ));

    return (
        <StyledGroupedImage onClick={onClick} $height={height}>
            {imageElements}
            {hasCornerImage && (
                <StyledCornerImage
                    $background={imageBackground}
                    $shouldPreventBackground={shouldPreventBackground}
                    src={cornerImage}
                    key="corner-image"
                />
            )}
        </StyledGroupedImage>
    );
};

GroupedImage.displayName = 'GroupedImage';

export default GroupedImage;
