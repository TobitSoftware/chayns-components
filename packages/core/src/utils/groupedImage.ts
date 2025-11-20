const GAP = 3;

interface CreateCareOfClipPathOptions {
    imageFactors: number[];
    height: number;
}

export const createCareOfClipPath = ({ imageFactors, height }: CreateCareOfClipPathOptions) => {
    const hasMultipleImages = imageFactors.length > 1;
    const radius = 3;

    const careOfSize = height * (hasMultipleImages ? 0.28 : 0.38);

    const imageHeight = height * (hasMultipleImages && imageFactors[1] ? imageFactors[1] : 1);

    const cutStart = height - (hasMultipleImages ? height - imageHeight : 0) - careOfSize - GAP;

    const normalizedCut = cutStart / imageHeight;
    const normalizedRadius = radius / height;

    const endY = 0.63;

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
    height: number;
    shouldShowRoundImage: boolean;
}

export const createSecondImageClipPath = ({
    height,
    shouldShowRoundImage,
}: CreateSecondImageClipPathOptions) => {
    const imageHeight = height * 0.8;
    const imageScale = imageHeight / height;

    const startContainer = 0.2;

    const gapNormContainer = GAP / height;

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
