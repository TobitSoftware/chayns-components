import React, { useMemo } from 'react';
import { createSecondImageClipPath } from '../../../utils/groupedImage';

const SecondImageClipPath = ({
    containerHeight,
    uuid,
    shouldShowRoundImage,
}: {
    containerHeight: number;
    uuid: string;
    shouldShowRoundImage: boolean;
}) => {
    const d = useMemo(
        () => createSecondImageClipPath({ containerHeight, shouldShowRoundImage }),
        [containerHeight, shouldShowRoundImage],
    );

    return (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
                <clipPath id={`second-image-mask--${uuid}`} clipPathUnits="objectBoundingBox">
                    <path d={d} />
                </clipPath>
            </defs>
        </svg>
    );
};

SecondImageClipPath.dsiplayName = 'SecondImageClipPath';

export default SecondImageClipPath;
