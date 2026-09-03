import { postImage } from '../api/image/post';
import { postVideo } from '../api/video/post';
import type { UploadUrls } from '../config/uploadUrls';
import type { Image, InternalFileItem, Video } from '../types/file';

interface UploadFilesOptions {
    fileToUpload: InternalFileItem;
    callback: (UploadedFile: Video | Image) => void;
    shouldUploadImageToSite?: boolean;
    /**
     * Overrides the globally configured upload service URLs for this upload.
     */
    uploadUrls?: Partial<UploadUrls>;
}

export const uploadFile = async ({
    fileToUpload,
    callback,
    shouldUploadImageToSite,
    uploadUrls,
}: UploadFilesOptions): Promise<void> => {
    if (!fileToUpload || (fileToUpload.state !== undefined && fileToUpload.state !== 'none')) {
        return;
    }

    if (fileToUpload.file?.type.includes('video/')) {
        const uploadedVideo = await postVideo({ file: fileToUpload.file, uploadUrls });

        if (uploadedVideo) {
            callback({
                ...uploadedVideo,
                id: uploadedVideo.id.toString(),
            });
        }
    }

    if (fileToUpload.file?.type.includes('image/')) {
        const uploadedImage = await postImage({
            file: fileToUpload.file,
            shouldUploadImageToSite,
            uploadUrls,
        });

        if (uploadedImage) {
            callback({
                url: `${uploadedImage.base}/${uploadedImage.key}`,
                id: uploadedImage.key,
                meta: uploadedImage.meta,
                ratio:
                    uploadedImage.meta?.width && uploadedImage.meta?.height
                        ? Number(uploadedImage.meta?.width) / Number(uploadedImage.meta?.height)
                        : undefined,
            });
        }
    }
};
