import React, { useMemo } from 'react';
import { createCareOfClipPath } from '../../../utils/groupedImage';

const CareOfClipPath = ({
    imageHeight,
    containerHeight,
    uuid,
}: {
    imageHeight: number;
    containerHeight: number;
    uuid: string;
}) => {
    const d = useMemo(
        () => createCareOfClipPath({ imageHeight, containerHeight }),
        [containerHeight, imageHeight],
    );

    return (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
                <clipPath id={`care-of-mask--${uuid}`} clipPathUnits="objectBoundingBox">
                    <path d={d} />
                </clipPath>
            </defs>
        </svg>
    );
};

CareOfClipPath.dsiplayName = 'CareOfClipPath';

export default CareOfClipPath;
