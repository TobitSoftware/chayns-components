import { imageUpload } from '../api/image/imageUpload';
import { videoUpload } from '../api/video/videoUpload';
import type { Meta, UploadedFile, Video } from '../types/files';

interface SelectFilesOptions {
    type: string;
    multiple: boolean;
}

export const selectFiles = ({ type, multiple }: SelectFilesOptions): Promise<null | FileList> =>
    new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';

        if (type !== '*/*' && type) {
            input.accept = type;
        }

        if (multiple) {
            input.multiple = true;
        }

        input.style.visibility = 'none';
        input.style.width = '0';
        input.style.height = '0';
        input.style.display = 'none';

        document.body.appendChild(input);

        input.addEventListener('change', (event) => {
            document.body.removeChild(input);

            const target = event.target as HTMLInputElement;
            const { files } = target;

            resolve(files);
        });

        input.click();
    });

export const convertFileListToArray = (fileList: FileList): File[] => {
    const filesArray = [];
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);

        if (file) {
            filesArray.push(file);
        }
    }

    return filesArray;
};

interface FilterDuplicateFilesOptions {
    oldFiles: UploadedFile[];
    newFiles: UploadedFile[];
}

export const filterDuplicateFiles = ({ oldFiles, newFiles }: FilterDuplicateFilesOptions) => {
    const seenKeys = new Set<string>();
    const filteredFiles: UploadedFile[] = [];

    oldFiles.forEach((file) => {
        seenKeys.add(file.id?.toString() ?? file.url);
        filteredFiles.push(file);
    });

    const newUniqueFiles: UploadedFile[] = [];

    newFiles.forEach((file) => {
        const key = file.id?.toString() ?? file.url;

        const oldFile = oldFiles.find((f) => f.id === file.id);

        const alreadyAdded = newUniqueFiles.find((f) => f.id === file.id);

        if (!oldFile && !alreadyAdded) {
            seenKeys.add(key);
            newUniqueFiles.push(file);
        }
    });

    return { filteredFiles, newUniqueFiles };
};

export interface UploadedImage {
    key: string;
    base: string;
    meta?: Meta;
}

interface UploadFilesOptions {
    filesToUpload: File[];
    accessToken: string;
    personId: string;
}

/**
 * Upload files
 */
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
        videoUpload({ accessToken, file: video })
    );

    newUploadedFiles = newUploadedFiles.concat(await Promise.all(videoUploadPromises));
    newUploadedFiles = newUploadedFiles.flat();

    // Upload images
    const imageUploadPromises: Promise<UploadedImage>[] = images.map((image) =>
        imageUpload({
            accessToken,
            file: image,
            personId,
        })
    );

    const uploadedImages: UploadedImage[] = await Promise.all(imageUploadPromises);
    const newImages: UploadedFile[] = uploadedImages.map((file) => ({
        url: `${file.base}/${file.key}`,
        id: file.key,
        meta: file.meta,
    }));

    newUploadedFiles = newUploadedFiles.concat(newImages);

    return newUploadedFiles;
};
