import type { UploadedFile } from '../types/files';

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

export const filterDuplicateFiles = (
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
