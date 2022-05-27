import React, { FC, useCallback, useMemo } from 'react';
import Icon from '../../../core/src/components/icon/Icon';
import { buttonType, IframeDialogResult } from '../types/chayns';
import { ImageEditorAspectRatio, Resolution } from './constants/aspectRatio';
import type { MaskType } from './constants/maskType';
import {
    StyledCreateButton,
    StyledEditButton,
    StyledIconWrapper,
    StyledImage,
    StyledImageWrapper,
} from './ImageEditor.styles';

export enum ImageEditorUserMode {
    none,
    admin,
    user,
}

export type ImageEditorProps = {
    /**
     * Unique id to save an load image parts
     */
    uId: string | number;
    /**
     * ImageUrl to show in preview
     */
    imageUrl?: string;
    /**
     * Aspect ratio for image editor, when not set user can change ratio
     */
    ratio?: ImageEditorAspectRatio | number | null;
    /**
     * Resolution for image editor, when not set user can change resolution according to aspect ratio
     */
    resolution?: Resolution;
    /**
     * Mask shape to crop resulting Image
     */
    maskType?: MaskType;
    /**
     * UserMode (Adin or User) determines where the EditorState and History is saved. EditorData is always saved with uId ('uId'.json).
     * AdminMode saves EditorState & History in site-space (shared for users (with same uId) and only for admins).
     * UserMode saves EditorState & History in private-space (different for every user (even if same uId), not shared).
     */
    userMode: ImageEditorUserMode;
    /**
     * Function to be executed when the image is saved
     */
    onConfirm: FunctionStringCallback;
};

const ImageEditor: FC<ImageEditorProps> | null = ({
    uId,
    imageUrl,
    onConfirm,
    ratio,
    resolution,
    maskType,
    userMode = ImageEditorUserMode.none,
}) => {
    const openImageEditorDialog = useCallback(() => {
        void chayns.dialog
            .iFrame({
                url:
                    process.env.NODE_ENV === 'production'
                        ? 'https://tapp.chayns-static.space/image-editor-dialog/v1/index.html'
                        : 'https://w-ni-surface.tobit.ag:8080/index.html',
                waitCursor: true,
                seamless: true,
                width: '100vw',
                fullHeight: true,
                maxHeight: '100vh',
                transparent: true,
                buttons: [],
                input: {
                    uId,
                    ratio,
                    resolution,
                    maskType,
                    userMode,
                    imageUrl,
                },
            })
            .then((data: IframeDialogResult<string>) => {
                if (data?.buttonType === buttonType.POSITIVE && data.value) {
                    console.warn('result', data.value);
                    onConfirm(data.value);
                }
            });
    }, [uId, ratio, resolution, maskType, userMode, imageUrl, onConfirm]);

    const render = useMemo(
        () => (
            <>
                {uId && (
                    <StyledImageWrapper
                        ratio={ratio || (!imageUrl ? ImageEditorAspectRatio.ratio_16_9 : null)}
                    >
                        {imageUrl ? (
                            <>
                                <StyledImage src={imageUrl} />
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
        [uId, ratio, imageUrl, openImageEditorDialog]
    );

    if (userMode === ImageEditorUserMode.none) {
        console.error(
            'image-editor: property userMode must be set (1 = admin, 2 = user). It determines where the status & history is saved and where the images are uploaded!'
        );
        return null;
    }
    return render;
};
ImageEditor.displayName = 'ImageEditor';

export default ImageEditor;
