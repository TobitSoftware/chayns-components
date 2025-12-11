import React, { useMemo } from 'react';
import { createSecondImageClipPath } from '../../../utils/groupedImage';

const SecondImageClipPath = ({
    height,
    uuid,
    shouldShowRoundImage,
}: {
    height: number;
    uuid: string;
    shouldShowRoundImage: boolean;
}) => {
    const d = useMemo(
        () => createSecondImageClipPath({ height, shouldShowRoundImage }),
        [height, shouldShowRoundImage],
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
