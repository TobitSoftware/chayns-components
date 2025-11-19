const GAP = 3;

interface CreateCareOfClipPathOptions {
    imageHeight: number;
    containerHeight: number;
}

export const createCareOfClipPath = ({
    imageHeight,
    containerHeight,
}: CreateCareOfClipPathOptions) => {
    const iconSize = containerHeight * 0.35;
    const radius = 3;

    const cutStart =
        containerHeight -
        (imageHeight === containerHeight ? 0 : containerHeight - imageHeight) -
        iconSize -
        GAP;
    const normalizedCut = cutStart / imageHeight;
    const normalizedRadius = radius / containerHeight;

    const endY = imageHeight === containerHeight ? 0.65 : 0.55;

    return `
        M0,0
        H1
        V${normalizedCut}
        H${endY}
        A${normalizedRadius} ${normalizedRadius} 0 0 0 ${normalizedCut} ${endY}
        V1
        H0
        Z
    `;
};

interface CreateSecondImageClipPathOptions {
    containerHeight: number;
    shouldShowRoundImage: boolean;
}

export const createSecondImageClipPath = ({
    containerHeight,
    shouldShowRoundImage,
}: CreateSecondImageClipPathOptions) => {
    const imageHeight = containerHeight * 0.8;
    const imageScale = imageHeight / containerHeight;

    const startContainer = 0.2;

    const gapNormContainer = GAP / containerHeight;

    const totalStartContainer = startContainer - (shouldShowRoundImage ? 0 : gapNormContainer);

    const startImage = shouldShowRoundImage
        ? totalStartContainer
        : totalStartContainer / imageScale;

    const radius = 0.6;

    if (shouldShowRoundImage) {
        return `
        
        M0,0
        H1
        V${startImage}
        H1
        A${radius} ${radius} 0 0 0 ${startImage} 1
        V1
        H0
        Z
        
        `;
    }

    return `
        M0,0
        H1
        V${startImage}
        H${startImage}
        V1
        H0
        Z
    `;
};
