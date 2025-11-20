import React, { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react';
import {
    StyledCornerElement,
    StyledCornerImage,
    StyledGroupedImage,
    StyledGroupImageElement,
} from './GroupedImage.styles';
import CareOfClipPath from './clip-paths/CareOfClipPath';
import { useUuid } from '../../hooks/uuid';
import SecondImageClipPath from './clip-paths/SecondImageClipPath';

type GroupedImageProps = {
    cornerImage?: string;
    height?: number;
    imageBackground?: CSSProperties['background'];
    images: string[];
    onClick?: MouseEventHandler<HTMLDivElement>;
    shouldPreventBackground?: boolean;
    shouldShowRoundImage?: boolean;
    cornerElement?: ReactNode;
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
}) => {
    const hasCornerImage = Boolean(cornerImage);
    const hasCornerElement = Boolean(cornerElement);
    const hasMultipleImages = images.length > 1;
    const uuid = useUuid();

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
                <image href={src} width="40" height="40" />
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
                    src={cornerImage}
                    key="corner-image"
                />
            )}
            {hasCornerElement && <StyledCornerElement>{cornerElement}</StyledCornerElement>}
        </StyledGroupedImage>
    );
};

GroupedImage.displayName = 'GroupedImage';

export default GroupedImage;
