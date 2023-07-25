import type { FileItem } from '@chayns-components/core/lib/types/file'; // TODO: Check why absolute import is needed

interface FilerDuplicateFileOptions {
    files: FileItem[];
    newFile: File;
}

export const filterDuplicateFile = ({ newFile, files }: FilerDuplicateFileOptions) => {
    const duplicates = files.filter(
        ({ file }) => file && file.name === newFile.name && file.size === newFile.size
    );

    return duplicates.length > 0;
};

interface GeneratePreviewUrlOptions {
    file: File;
    callback: (previewUrl: string) => void;
}

export const generatePreviewUrl = ({ callback, file }: GeneratePreviewUrlOptions): void => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const previewUrl = event.target?.result as string;

        callback(previewUrl);
    };

    reader.readAsDataURL(file);
};

interface GenerateVideoThumbnailOptions {
    file: File;
    callback: (previewUrl: string) => void;
}

export const generateVideoThumbnail = ({ file, callback }: GenerateVideoThumbnailOptions) => {
    const canvas = document.createElement('canvas');
    const video = document.createElement('video');

    // this is important
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
        const ctx = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();

        callback(canvas.toDataURL('image/png'));
    };
};
