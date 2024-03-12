import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    StyledMotionProgressBarProgress,
    StyledProgressBar,
    StyledProgressBarBackground,
    StyledProgressBarLabel,
    StyledProgressBarProgressWrapper,
} from './ProgressBar.styles';

export type ProgressBarProps = {
    /**
     * The label that should be displayed under the progressbar.
     */
    label?: string;
    /**
     * The percentage of the progress. Number between 0 and 100.
     */
    percentage?: number;
    /**
     * Whether the progress should be hide and just display the label.
     */
    shouldHideProgress?: boolean;
};

const ProgressBar: FC<ProgressBarProps> = ({ percentage, label, shouldHideProgress = false }) => {
    const [internalPercentage, setInternalPercentage] = useState(0);

    useEffect(() => {
        if (!percentage) {
            return;
        }

        if (percentage >= 0 && percentage <= 100) {
            setInternalPercentage(percentage);
        }
    }, [percentage]);

    const progressBar = useMemo(() => {
        if (shouldHideProgress) {
            return null;
        }

        if (!percentage) {
            return (
                <StyledProgressBarProgressWrapper>
                    <StyledMotionProgressBarProgress
                        initial={{ width: '200px', left: '-200px' }}
                        animate={{ width: '200px', left: '100%' }}
                        exit={{ width: '200px', left: '100%' }}
                        transition={{
                            type: 'tween',
                            repeat: Infinity,
                            repeatDelay: 0,
                            duration: 1,
                        }}
                    />
                    <StyledProgressBarBackground />
                </StyledProgressBarProgressWrapper>
            );
        }

        return (
            <>
                <StyledMotionProgressBarProgress
                    initial={{ width: '0%' }}
                    animate={{ width: `${internalPercentage}%` }}
                    exit={{ width: '0%' }}
                    transition={{ type: 'tween' }}
                />
                <StyledProgressBarBackground />
            </>
        );
    }, [internalPercentage, percentage, shouldHideProgress]);

    return useMemo(
        () => (
            <StyledProgressBar>
                {progressBar}
                {label && <StyledProgressBarLabel>{label}</StyledProgressBarLabel>}
            </StyledProgressBar>
        ),
        [progressBar, label],
    );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
