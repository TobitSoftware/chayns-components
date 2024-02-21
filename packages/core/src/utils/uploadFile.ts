import { postImage } from '../api/image/post';
import { postVideo } from '../api/video/post';
import type { Image, InternalFileItem, Video } from '../types/file';

interface UploadFilesOptions {
    fileToUpload: InternalFileItem;
    callback: (UploadedFile: Video | Image) => void;
}

export const uploadFile = async ({ fileToUpload, callback }: UploadFilesOptions): Promise<void> => {
    if (!fileToUpload || fileToUpload.state !== 'none') {
        return;
    }

    if (fileToUpload.file?.type.includes('video/')) {
        const uploadedVideo = await postVideo({ file: fileToUpload.file });

        if (uploadedVideo) {
            callback({
                ...uploadedVideo,
                id: uploadedVideo.id.toString(),
            });
        }
    }

    if (fileToUpload.file?.type.includes('image/')) {
        const uploadedImage = await postImage({ file: fileToUpload.file });

        if (uploadedImage) {
            callback({
                url: `${uploadedImage.base}/${uploadedImage.key}`,
                id: uploadedImage.key,
                meta: uploadedImage.meta,
            });
        }
    }
};
