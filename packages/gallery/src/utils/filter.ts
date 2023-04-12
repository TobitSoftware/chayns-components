import type { UploadedFile } from '../types/files';

export const filterDuplicates = (
    oldFiles: UploadedFile[],
    newFiles: UploadedFile[]
): UploadedFile[] => {
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

    newFiles.forEach((file) => {
        let key: string;
        if ('id' in file) {
            key = file.id.toString();
        } else {
            key = file.key;
        }

        if (!seenKeys.has(key)) {
            seenKeys.add(key);
            filteredFiles.push(file);
        }
    });

    return filteredFiles;
};
