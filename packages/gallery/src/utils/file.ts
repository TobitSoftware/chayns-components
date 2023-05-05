import type { FileItem } from '../types/file';

interface SelectFilesOptions {
    type: string;
    multiple: boolean;
}

export const selectFiles = ({ type, multiple }: SelectFilesOptions): Promise<File[]> =>
    new Promise((resolve) => {
        const input = document.createElement('input');

        input.type = 'file';
        input.style.visibility = 'none';
        input.style.width = '0';
        input.style.height = '0';
        input.style.display = 'none';

        if (type !== '*/*' && type) {
            input.accept = type;
        }

        if (multiple) {
            input.multiple = true;
        }

        document.body.appendChild(input);

        input.addEventListener('change', (event) => {
            document.body.removeChild(input);

            const target = event.target as HTMLInputElement;

            const { files } = target;

            if (!files) {
                resolve([]);

                return;
            }

            const fileArray = Object.values(files);

            const filteredFileArray = fileArray.filter((file) => {
                const sizeInMB = file.size / 1024 / 1024;

                if (file.type.includes('video/') && sizeInMB > 500) {
                    return false;
                }

                return !(file.type.includes('image/') && sizeInMB > 64);
            });

            if (fileArray.length !== filteredFileArray.length) {
                // ToDo show dialog that some files are to big
            }

            if (filteredFileArray.length === 0) {
                // ToDo show dialog that all files are to big
            }

            resolve(filteredFileArray);
        });

        input.click();
    });

interface FilerDuplicateFileOptions {
    files: FileItem[];
    newFile: File;
}

export const filterDuplicateFile = ({ newFile, files }: FilerDuplicateFileOptions) => {
    const duplicates = files.filter((fileItem) => {
        const { file } = fileItem;
        return file && file.name === newFile.name && file.size === newFile.size;
    });

    return duplicates.length > 0;
};

export const getFileAsArrayBuffer = (file: File): Promise<string | ArrayBuffer> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target?.result) {
                resolve(e.target.result);
            } else {
                reject(Error('Could not get array buffer.'));
            }
        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);
    });

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
