export const getStackSizeFactor = (icon: string) => {
    const sizeFactorString = icon.match(/fa-stack-([\d])x/)?.[1];

    return typeof sizeFactorString === 'string' ? parseInt(sizeFactorString, 10) : undefined;
};

export const getIsExpandableIcon = (accordionIcon?: string) => {
    let unicodeIcon = 'f105';

    if (
        accordionIcon &&
        (accordionIcon as unknown as number) !== 110 &&
        (accordionIcon as unknown as number) !== 1110100
    ) {
        unicodeIcon = (accordionIcon as unknown as number).toString(16);
    }

    return unicodeIcon;
};
