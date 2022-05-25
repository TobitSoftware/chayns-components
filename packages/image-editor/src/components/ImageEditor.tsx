import React, { FC, useCallback, useMemo } from 'react';
import Icon from '../../../core/src/components/icon/Icon';
import { buttonType, IframeDialogResult } from '../types/chayns';
import { ImageEditorAspectRatio } from './constants/aspectRatio';
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
     * Unique Id to save an load Image Parts
     */
    uId: string | number;
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
     * UserMode (Adin or User) determines where the EditorState, History and Images are saved. EditorData is always saved with uId ('uId'.json).
     * AdminMode saves EditorState & History in site-space (shared for users (with same uId) and only for admins) and image for site at tsgImgCloud.
     * UserMode saves EditorState & History in private-space (different for every user (even if same uId), not shared) and image for user at tsgImgCloud.
     */
    userMode: ImageEditorUserMode;
    /**
     * Function to be executed when the Image is saved
     */
    onConfirm: FunctionStringCallback;
};

const ImageEditor: FC<ImageEditorProps> | null = ({
    uId,
    imageUrl,
    onConfirm,
    ratio = ImageEditorAspectRatio.ratio_16_9,
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
                    maskType,
                    userMode,
                },
            })
            .then((data: IframeDialogResult<string>) => {
                if (data?.buttonType === buttonType.POSITIVE && data.value) {
                    console.log('result', data.value);
                    onConfirm(data.value);
                }
            });
    }, [uId, ratio, maskType, userMode, onConfirm]);

    const render = useMemo(
        () => (
            <>
                {uId && (
                    <StyledImageWrapper ratio={ratio}>
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
