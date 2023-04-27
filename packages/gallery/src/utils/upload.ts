import { postImage } from '../api/image/post';
import { postVideo } from '../api/video/post';
import type { UploadedFile, Video } from '../types/file';

interface UploadFilesOptions {
    filesToUpload: File[];
    accessToken: string;
    personId: string;
}

export const uploadFiles = async ({
    filesToUpload,
    personId,
    accessToken,
}: UploadFilesOptions): Promise<UploadedFile[]> => {
    if (!filesToUpload) {
        return [];
    }

    const videos = filesToUpload.filter(({ type }) => type.includes('video/'));
    const images = filesToUpload.filter(({ type }) => type.includes('image/'));

    let newUploadedFiles: UploadedFile[] = [];

    // Upload videos
    const videoUploadPromises: Promise<Video>[] = videos.map((video) =>
        postVideo({ accessToken, file: video })
    );

    newUploadedFiles = newUploadedFiles.concat(await Promise.all(videoUploadPromises));
    newUploadedFiles = newUploadedFiles.flat();

    // Upload images
    const imageUploadPromises = images.map((image) =>
        postImage({
            accessToken,
            file: image,
            personId,
        })
    );

    const uploadedImages = await Promise.all(imageUploadPromises);

    const newImages: UploadedFile[] = uploadedImages.map((file) => ({
        url: `${file.base}/${file.key}`,
        id: file.key,
        meta: file.meta,
    }));

    newUploadedFiles = newUploadedFiles.concat(newImages);

    return newUploadedFiles;
};
