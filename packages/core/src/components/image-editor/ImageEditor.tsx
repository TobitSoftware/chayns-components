import React, { FC, useState } from 'react';
import Button from '../button/Button';
import { ImageEditorAspectRatio } from './constants/aspectRatio';
import { MaskType } from './constants/maskType';
import { StyledImage, StyledImageWrapper } from './ImageEditor.styles';

export type ImageEditorProps = {
    /**
     * Unique Id to save an load Image Parts
     */
    uniqueId: string | number;
    /**
     * Aspect Ratio for Image to Edit
     */
    ratio?: ImageEditorAspectRatio | number | null;
    /**
     * Mask shape to crop resulting Image
     */
    maskType?: MaskType;
    /**
     * Function to be executed when the Image is saved
     */
    onConfirm: VoidFunction;
};

const ImageEditor: FC<ImageEditorProps> = ({
    uniqueId,
    ratio = ImageEditorAspectRatio.ratio_16_9,
    maskType,
}) => {
    const [imageUrl, setImageUrl] = useState(
        'https://tsimg.cloud/77890-29730/ef1214d1d3e6f4bf5045f23085ff14a508f1a682_fwebp-w1000.jpg'
    );

    return (
        <StyledImageWrapper ratio={ratio}>
            {imageUrl ? (
                <StyledImage
                    src={imageUrl} // get url from space?
                />
            ) : null}
            <div style={{ position: 'absolute' }}>
                <Button onClick={console.log}>Bearbeiteten</Button>
            </div>
        </StyledImageWrapper>
    );
};

ImageEditor.displayName = 'ImageEditor';

export default ImageEditor;
