import React, { FC, useCallback, useMemo } from 'react';
import Icon from '../../../core/src/components/icon/Icon';
import { ImageEditorAspectRatio } from './constants/aspectRatio';
import type { MaskType } from './constants/maskType';
import {
    StyledCreateButton,
    StyledEditButton,
    StyledIconWrapper,
    StyledImage,
    StyledImageWrapper,
} from './ImageEditor.styles';

export type ImageEditorProps = {
    /**
     * Unique Id to save an load Image Parts
     */
    uniqueId: string | number;
    /**
     * ImageUrl to show in Preview
     */
    imageUrl?: string;
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
    onConfirm: FunctionStringCallback;
};

const ImageEditor: FC<ImageEditorProps> = ({
    uniqueId,
    imageUrl,
    onConfirm,
    ratio = ImageEditorAspectRatio.ratio_16_9,
    maskType,
}) => {
    const openImageEditorDialog = useCallback(() => {
        chayns.dialog
            .iFrame({
                url: 'https://tobit.software/Willkommen',
                waitCursor: true,
                seamless: true,
                width: '100vw',
                fullHeight: true,
                maxHeight: '100vh',
                transparent: true,
                buttons: [
                    {
                        text: 'Speichern',
                        buttonType: 1,
                    },
                    {
                        text: 'Abbrechen',
                        buttonType: -1,
                    },
                ],
                input: {
                    uniqueId,
                    ratio,
                    maskType,
                },
            })
            .then((data: any) => {
                if (data?.buttonType === 1 && data.value?.text) {
                    console.log('result', data.value.text);
                    onConfirm(data.value.text);
                }
            });
    }, [uniqueId, maskType, ratio, onConfirm]);

    return useMemo(
        () => (
            <>
                {uniqueId && (
                    <StyledImageWrapper ratio={ratio}>
                        {imageUrl ? (
                            <>
                                <StyledImage
                                    src={imageUrl} // get url from space?
                                />
                                <StyledEditButton onClick={openImageEditorDialog}>
                                    <StyledIconWrapper>
                                        <Icon icons={['fas fa-edit']} size={15} />
                                    </StyledIconWrapper>
                                    <div>Bearbeiten</div>
                                </StyledEditButton>
                            </>
                        ) : (
                            <StyledCreateButton onClick={openImageEditorDialog}>
                                <StyledIconWrapper>
                                    <Icon icons={['fas fa-image']} size={15} />
                                </StyledIconWrapper>
                                <div>Bild erstellen</div>
                            </StyledCreateButton>
                        )}
                    </StyledImageWrapper>
                )}
            </>
        ),
        [uniqueId, ratio, imageUrl, openImageEditorDialog]
    );
};
ImageEditor.displayName = 'ImageEditor';

export default ImageEditor;
