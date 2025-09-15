import { createDialog, DialogType } from 'chayns-api';

interface SelectFilesOptions {
    type?: string;
    multiple: boolean;
    maxFileSizeInMB?: number;
}

export const selectFiles = ({
    type,
    multiple,
    maxFileSizeInMB,
}: SelectFilesOptions): Promise<File[]> =>
    new Promise((resolve, reject) => {
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

        const abortController = new AbortController();
        const { signal } = abortController;

        const onChange = (event: Event) => {
            document.body.removeChild(input);
            abortController.abort();

            if (!event.target) {
                resolve([]);
                return;
            }

            const { files } = event.target as HTMLInputElement;

            if (!files) {
                resolve([]);

                return;
            }

            const fileArray = Object.values(files).map((file) => {
                if (file.type === '') {
                    return new File([file], file.name, { type: getMimeType(file) });
                }

                return file;
            });

            let filteredFileArray = fileArray.filter((file) => {
                const sizeInMB = file.size / 1024 / 1024;

                if (maxFileSizeInMB && maxFileSizeInMB < sizeInMB) {
                    return false;
                }

                if (file.type.includes('video/') && sizeInMB > 500) {
                    return false;
                }

                return !(file.type.includes('image/') && sizeInMB > 64);
            });

            if (fileArray.length !== filteredFileArray.length) {
                void createDialog({
                    type: DialogType.ALERT,
                    text: 'Einige Deiner ausgewählten Dateien sind zu groß.',
                }).open();
            }

            if (typeof type === 'string') {
                filteredFileArray = filterFilesByMimeType(filteredFileArray, type) as File[];
            }

            resolve(filteredFileArray);
        };

        const onCancel = () => {
            document.body.removeChild(input);
            abortController.abort();
            reject(new Error('File selection was cancelled.'));
        };

        input.addEventListener('change', onChange, { signal });
        input.addEventListener('focusout', onCancel, { signal });

        input.click();
    });

export const filterFilesByMimeType = (
    files: FileList | File[],
    mimeTypes: string,
): FileList | File[] => {
    const allowedTypes = mimeTypes.split(',').map((type) => type.trim());

    const isAllowedType = (fileType: string) =>
        allowedTypes.some((allowedType) => {
            if (allowedType.endsWith('/*')) {
                const convertedAllowedType = allowedType.split('/*')[0];

                if (!convertedAllowedType) {
                    return false;
                }

                return fileType.startsWith(convertedAllowedType);
            }

            return fileType === allowedType;
        });

    return Array.from(files).filter((file) => isAllowedType(file.type));
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

/**
 * Mapping file extensions to MIME types
 * (expandable if necessary)
 */
const extensionToMime: Record<string, string> = {
    // Text & Code
    txt: 'text/plain',
    md: 'text/markdown',
    csv: 'text/csv',
    json: 'application/json',
    xml: 'application/xml',
    yaml: 'application/x-yaml',
    yml: 'application/x-yaml',
    html: 'text/html',
    htm: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ts: 'application/typescript',

    // Image
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',

    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    flac: 'audio/flac',
    m4a: 'audio/mp4',

    // Video
    mp4: 'video/mp4',
    webm: 'video/webm',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',

    // Document
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

    // Archive & binary
    zip: 'application/zip',
    rar: 'application/vnd.rar',
    '7z': 'application/x-7z-compressed',
    tar: 'application/x-tar',
    gz: 'application/gzip',
    exe: 'application/vnd.microsoft.portable-executable',
};

/**
 * Ermittelt den MIME-Type eines Files
 * - nutzt File.type, falls vorhanden
 * - sonst Fallback über Dateiendung
 */
const getMimeType = (file: File): string => {
    if (file.type) return file.type;

    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

    return extensionToMime[ext] || '';
};
