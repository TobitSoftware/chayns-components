export const getStackSizeFactor = (icon: string) => {
    const sizeFactorString = icon.match(/fa-stack-([\d])x/)?.[1];

    return typeof sizeFactorString === 'string' ? parseInt(sizeFactorString, 10) : undefined;
};
