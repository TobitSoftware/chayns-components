interface IsValidFileTypeOptions {
    file: File;
    types: string;
}

export const isValidFileType = ({ types, file }: IsValidFileTypeOptions): boolean => {
    const allowedTypesArray = types.split(',').map((type) => type.trim());
    const fileType = file.type;

    return allowedTypesArray.some((type) => {
        if (type.endsWith('/*')) {
            const baseType = type.slice(0, -2);

            return fileType.startsWith(baseType);
        }

        return fileType === type;
    });
};
