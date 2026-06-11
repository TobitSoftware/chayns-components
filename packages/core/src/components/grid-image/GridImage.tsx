import React, {
    CSSProperties,
    FC,
    KeyboardEventHandler,
    MouseEventHandler,
    MouseEvent,
    SyntheticEvent,
    useCallback,
    useState,
} from 'react';
import { useKeyboardFocusHighlighting } from '../../hooks/useKeyboardFocusHighlighting';
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
    background?: CSSProperties['background'];
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
    /**
     * Enables keyboard-only focus highlighting for clickable GridImage instances.
     */
    shouldEnableKeyboardHighlighting?: boolean;
};

const GridImage: FC<GridImageProps> = ({
    background,
    images,
    shouldShowRoundImage,
    size,
    onClick,
    shouldEnableKeyboardHighlighting = false,
}) => {
    const [hasLoadedLeftImage, setHasLoadedLeftImage] = useState(false);
    const [hasLoadedTopRightImage, setHasLoadedTopRightImage] = useState(false);
    const [hasLoadedBottomRightImage, setHasLoadedBottomRightImage] = useState(false);

    const isClickable = typeof onClick === 'function';
    const isKeyboardFocusable = isClickable && shouldEnableKeyboardHighlighting;
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (!isClickable) {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick?.(event as unknown as MouseEvent<HTMLDivElement>);
            }
        },
        [isClickable, onClick],
    );

    const handleLeftImageLoaded = useCallback(() => setHasLoadedLeftImage(true), []);

    const handleTopRightImageLoaded = useCallback(() => setHasLoadedTopRightImage(true), []);

    const handleBottomRightImageLoaded = useCallback(() => setHasLoadedBottomRightImage(true), []);

    const isGridImageHidden =
        !hasLoadedLeftImage || !hasLoadedTopRightImage || !hasLoadedBottomRightImage;

    return (
        <StyledGridImage
            $background={background}
            $shouldShowRoundImage={shouldShowRoundImage}
            $shouldShowKeyboardHighlighting={shouldShowKeyboardHighlighting}
            $size={size}
            onClick={isClickable ? onClick : undefined}
            onKeyDown={isKeyboardFocusable ? handleKeyDown : undefined}
            tabIndex={isKeyboardFocusable ? 0 : -1}
            role={isClickable ? 'button' : undefined}
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
