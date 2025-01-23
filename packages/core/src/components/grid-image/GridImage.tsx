import React, { CSSProperties, FC, MouseEventHandler, useCallback, useState } from 'react';
import {
    StyledGridBottomRightImage,
    StyledGridImage,
    StyledGridLeftImage,
    StyledGridTopRightImage,
} from './GridImage.styles';

type GridImageProps = {
    /**
     * The background color of the image.
     */
    backgroundColor?: CSSProperties['backgroundColor'];
    /**
     * The images to be displayed in the `GridImage`. Only the first three images are displayed.
     */
    images: string[];
    /**
     * Function to be executed when the images are clicked.
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * Images of users should always be displayed in a round shape. Therefore, this property can be set to true.
     */
    shouldShowRoundImage?: boolean;
    /**
     * The size of the `GridImage` in pixels, which is set as both width and height.
     */
    size: number;
};

const GridImage: FC<GridImageProps> = ({
    backgroundColor,
    images,
    shouldShowRoundImage,
    size,
    onClick,
}) => {
    const [hasLoadedLeftImage, setHasLoadedLeftImage] = useState(false);
    const [hasLoadedTopRightImage, setHasLoadedTopRightImage] = useState(false);
    const [hasLoadedBottomRightImage, setHasLoadedBottomRightImage] = useState(false);

    const handleLeftImageLoaded = useCallback(() => setHasLoadedLeftImage(true), []);

    const handleTopRightImageLoaded = useCallback(() => setHasLoadedTopRightImage(true), []);

    const handleBottomRightImageLoaded = useCallback(() => setHasLoadedBottomRightImage(true), []);

    const isGridImageHidden =
        !hasLoadedLeftImage || !hasLoadedTopRightImage || !hasLoadedBottomRightImage;

    return (
        <StyledGridImage
            $backgroundColor={backgroundColor}
            $shouldShowRoundImage={shouldShowRoundImage}
            $size={size}
            onClick={typeof onClick === 'function' ? onClick : undefined}
        >
            <StyledGridLeftImage
                $isHidden={isGridImageHidden}
                onLoad={handleLeftImageLoaded}
                $size={size}
                src={images[0]}
            />
            <StyledGridTopRightImage
                $isHidden={isGridImageHidden}
                onLoad={handleTopRightImageLoaded}
                $size={size}
                src={images[1]}
            />
            <StyledGridBottomRightImage
                $isHidden={isGridImageHidden}
                onLoad={handleBottomRightImageLoaded}
                src={images[2]}
            />
        </StyledGridImage>
    );
};

GridImage.displayName = 'GridImage';

export default GridImage;
