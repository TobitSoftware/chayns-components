import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    StyledMotionProgressBarProgress,
    StyledProgressBar,
    StyledProgressBarBackground,
} from './ProgressBar.styles';

export type ProgressBarProps = {
    /**
     * The percentage of the progress. Number between 0 and 100.
     */
    percentage: number;
};

const ProgressBar: FC<ProgressBarProps> = ({ percentage }) => {
    const [internalPercentage, setInternalPercentage] = useState(0);

    useEffect(() => {
        if (percentage >= 0 && percentage <= 100) {
            setInternalPercentage(percentage);
        }
    }, [percentage]);

    return useMemo(
        () => (
            <StyledProgressBar>
                <StyledMotionProgressBarProgress
                    initial={{ width: '0%' }}
                    animate={{ width: `${internalPercentage}%` }}
                    exit={{ width: '0%' }}
                    transition={{ type: 'tween' }}
                />
                <StyledProgressBarBackground />
            </StyledProgressBar>
        ),
        [internalPercentage]
    );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
