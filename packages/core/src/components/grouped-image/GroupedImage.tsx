import React, { CSSProperties, FC, MouseEventHandler, ReactNode, SyntheticEvent } from 'react';
import {
    StyledCornerElement,
    StyledCornerImage,
    StyledGroupedImage,
    StyledGroupImageElement,
} from './GroupedImage.styles';
import CareOfClipPath from './clip-paths/CareOfClipPath';
import { useUuid } from '../../hooks/uuid';
import SecondImageClipPath from './clip-paths/SecondImageClipPath';

const GROUPED_IMAGE_SERVICE_ORIGIN = 'https://tsimg.cloud';
const IMAGE_SERVICE_PARAM_PATTERN = /^(?:m(?:scale|crop|shortedgescale)|[whsbd]\d+)$/i;

interface GroupedImageProps {
    /**
     * Optional image to display in the bottom right corner of the grouped image.
     */
    cornerImage?: string;
    /**
     * Height of the grouped image container.
     */
    height?: number;
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
    /**
     * Optional Element to display in the right corner of the image
     */
    cornerElement?: ReactNode;
    /**
     * Optional handler for image load errors.
     */
    onImageError?: (event: SyntheticEvent<HTMLImageElement, Event>, index: number) => void;
}

const getGroupedImageDisplayUrl = (url: string, size: number): string => {
    try {
        const urlObject = new URL(url);

        if (urlObject.origin !== GROUPED_IMAGE_SERVICE_ORIGIN) {
            return url;
        }

        const pathSegments = urlObject.pathname.split('/');
        const fileName = pathSegments.pop();

        if (!fileName) {
            return url;
        }

        const extensionIndex = fileName.lastIndexOf('.');
        const extension = extensionIndex > -1 ? fileName.slice(extensionIndex) : '';
        const fileBaseName = extensionIndex > -1 ? fileName.slice(0, extensionIndex) : fileName;
        const parameterSegment = fileBaseName.split('_').pop();
        const hasImageServiceParameters = Boolean(
            parameterSegment &&
            parameterSegment !== fileBaseName &&
            parameterSegment
                .split('-')
                .every((parameter) => IMAGE_SERVICE_PARAM_PATTERN.test(parameter)),
        );
        const normalizedFileBaseName = hasImageServiceParameters
            ? fileBaseName.slice(0, fileBaseName.lastIndexOf('_'))
            : fileBaseName;
        const normalizedSize = Math.max(1, Math.round(size));

        pathSegments.push(
            `${normalizedFileBaseName}_w${normalizedSize}-h${normalizedSize}${extension}`,
        );
        urlObject.pathname = pathSegments.join('/');

        return urlObject.toString();
    } catch {
        return url;
    }
};

const GroupedImage: FC<GroupedImageProps> = ({
    cornerImage,
    height = 40,
    imageBackground,
    images,
    onClick,
    shouldPreventBackground = false,
    shouldShowRoundImage = false,
    cornerElement,
    onImageError,
}) => {
    const hasCornerImage = Boolean(cornerImage);
    const hasCornerElement = Boolean(cornerElement);
    const hasMultipleImages = images.length > 1;
    const uuid = useUuid();
    const cornerImageDisplayUrl = cornerImage
        ? getGroupedImageDisplayUrl(cornerImage, height)
        : undefined;

    const imageElements = images.slice(0, 2).map((src, index) => (
        <StyledGroupImageElement
            $background={imageBackground}
            $isSecondImage={index === 1}
            $hasCornerImage={hasCornerImage}
            $hasMultipleImages={hasMultipleImages}
            $shouldPreventBackground={shouldPreventBackground}
            $shouldShowRoundImage={shouldShowRoundImage}
            $uuid={uuid}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <foreignObject width="40" height="40">
                    <img
                        alt={`image--${index}`}
                        src={getGroupedImageDisplayUrl(src, height)}
                        onError={(event) =>
                            typeof onImageError === 'function' && onImageError(event, index)
                        }
                    />
                </foreignObject>
            </svg>
        </StyledGroupImageElement>
    ));

    return (
        <StyledGroupedImage onClick={onClick} $height={height}>
            {hasCornerImage && (
                <CareOfClipPath
                    height={height}
                    uuid={uuid}
                    imageFactors={hasMultipleImages ? [0.76, 0.8] : [1]}
                />
            )}
            {hasMultipleImages && (
                <SecondImageClipPath
                    height={height}
                    uuid={uuid}
                    shouldShowRoundImage={shouldShowRoundImage}
                />
            )}

            {imageElements}

            {hasCornerImage && (
                <StyledCornerImage
                    $background={imageBackground}
                    $shouldPreventBackground={shouldPreventBackground}
                    $hasMultipleImages={hasMultipleImages}
                    src={cornerImageDisplayUrl}
                    key="corner-image"
                />
            )}
            {hasCornerElement && <StyledCornerElement>{cornerElement}</StyledCornerElement>}
        </StyledGroupedImage>
    );
};

GroupedImage.displayName = 'GroupedImage';

export default GroupedImage;
