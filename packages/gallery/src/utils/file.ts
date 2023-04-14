import { imageUpload } from '../api/image/imageUpload';
import { videoUpload } from '../api/video/videoUpload';
import type { Image, UploadedFile, Video } from '../types/files';

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
        let key: string;
        if ('id' in file) {
            key = file.id.toString();
        } else {
            key = file.key;
        }

        seenKeys.add(key);
        filteredFiles.push(file);
    });

    const newUniqueFiles: UploadedFile[] = [];

    newFiles.forEach((file) => {
        let key: string;
        if ('id' in file) {
            key = file.id.toString();
        } else {
            key = file.key;
        }

        const oldFile = oldFiles.find((f) => {
            if ('id' in f && 'id' in file) {
                return f.id === file.id;
            }

            if ('key' in f && 'key' in file) {
                return f.key === file.key;
            }

            return null;
        });

        const alreadyAdded = newUniqueFiles.find((f) => {
            if ('id' in f && 'id' in file) {
                return f.id === file.id;
            }

            if ('key' in f && 'key' in file) {
                return f.key === file.key;
            }

            return null;
        });

        if (!oldFile && !alreadyAdded) {
            seenKeys.add(key);
            newUniqueFiles.push(file);
        }
    });

    return { filteredFiles, newUniqueFiles };
};

export const getBaseAndRoute = (url: string) => {
    const urlObject = new URL(url);
    const base = urlObject.origin;
    const route = urlObject.pathname;

    return { base, route };
};

interface UploadFilesOptions {
    filesToUpload: File[];
    uploadedFiles: UploadedFile[];
    accessToken: string;
    personId: string;
    onAdd?: (files: UploadedFile[]) => void;
}

/**
 * Upload files
 */
export const uploadFiles = async ({
    filesToUpload,
    onAdd,
    personId,
    accessToken,
    uploadedFiles,
}: UploadFilesOptions): Promise<UploadedFile[]> => {
    if (!filesToUpload) {
        return uploadedFiles;
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
    const imageUploadPromises: Promise<Image>[] = images.map((image) =>
        imageUpload({
            accessToken,
            file: image,
            personId,
        })
    );

    newUploadedFiles = newUploadedFiles.concat(await Promise.all(imageUploadPromises));

    const { newUniqueFiles } = filterDuplicateFiles({
        oldFiles: uploadedFiles,
        newFiles: newUploadedFiles,
    });

    if (onAdd) {
        onAdd(newUniqueFiles);
    }

    return newUniqueFiles;
};
