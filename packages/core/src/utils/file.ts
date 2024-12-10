export const hasDuplicate = <T>(
    items: T[],
    newItem: T,
    comparator: (a: T, b: T) => boolean,
): boolean => items.some((item) => comparator(item, newItem));

interface FilerDuplicateFileOptions {
    files: File[];
    newFile: File;
}

export const filterDuplicateFile = ({ files, newFile }: FilerDuplicateFileOptions) =>
    hasDuplicate(files, newFile, (a, b) => a.name === b.name && a.size === b.size);

interface FilterDuplicateFileUrlsOptions {
    files: string[];
    newFile: string;
}

export const filterDuplicateFileUrls = ({ files, newFile }: FilterDuplicateFileUrlsOptions) =>
    hasDuplicate(files, newFile, (a, b) => a === b);

export const getHumanSize = (bytes: number): string => {
    const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let size = bytes || 0;
    let unitIndex = 0;

    while (size >= 1024) {
        size /= 1024;
        unitIndex += 1;
    }

    size = Math.round(size * 10) / 10;

    return `${size.toString().replace('.', ',')} ${FILE_SIZE_UNITS[unitIndex] ?? ''}`;
};

interface IsValidFileTypeOptions {
    file: File;
    types: string;
}

export const isValidFileType = ({ types, file }: IsValidFileTypeOptions) => {
    const allowedTypesArray = types.split(',').map((type) => type.trim());
    const fileType = file.type;

    return allowedTypesArray.some((type) => {
        if (type.endsWith('/*')) {
            const baseType = type.slice(0, -2); // remove '/*'
            return fileType.startsWith(baseType);
        }
        return fileType === type;
    });
};

export const MIME_TYPE_MAPPING: Record<string, string> = {
    // Haupttypen
    'application/pdf': 'fa fa-file-pdf',
    'application/zip': 'fa fa-file-archive',
    'application/msword': 'fa fa-file-word',
    'application/vnd.ms-excel': 'fa fa-file-excel',
    // Typen mit Wildcards
    'application/vnd.openxmlformats-officedocument.': 'fa fa-file-word',
    'application/x-': 'fa fa-file-archive',
    // Addiere nur spezifische Fälle
    'text/pdf': 'fa fa-file-pdf',
};

export const getIconByMimeType = (mimeType?: string): string => {
    const matchedType = Object.keys(MIME_TYPE_MAPPING).find((type) => mimeType?.startsWith(type));
    return MIME_TYPE_MAPPING[matchedType!] || 'fa fa-file';
};
