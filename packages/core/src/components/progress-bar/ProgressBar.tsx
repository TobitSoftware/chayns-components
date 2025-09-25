import React, { FC, useEffect, useMemo, useState } from 'react';
import { useUuid } from '../../hooks/uuid';
import {
    StyledMotionProgressBarProgress,
    StyledProgressBar,
    StyledProgressBarBackground,
    StyledProgressBarLabel,
    StyledProgressBarProgressWrapper,
    StyledProgressBarStep,
    StyledProgressBarStepWrapper,
} from './ProgressBar.styles';

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

interface Colors {
    backgroundColor?: string;
    progressColor?: string;
    stepColor?: string;
    primaryTextColor?: string;
    secondaryTextColor?: string;
}

export type ProgressBarProps = {
    /**
     * The colors of the ProgressBar.
     */
    colors?: Colors;
    /**
     * The label that should be displayed under the progressbar.
     */
    label?: string;
    /**
     * The percentage of the progress. Number between 0 and 100.
     */
    percentage?: Range<0, 101>;
    /**
     * Whether the progress should be hide and just display the label.
     */
    shouldHideProgress?: boolean;
    /**
     * Whether the label should be displayed inside the ProgressBar.
     */
    shouldShowLabelInline?: boolean;
    /**
     * Visual marked steps.
     */
    steps?: Range<0, 101>[];
};

const ProgressBar: FC<ProgressBarProps> = ({
    percentage,
    label,
    shouldHideProgress = false,
    shouldShowLabelInline = false,
    steps,
    colors,
}) => {
    const [internalPercentage, setInternalPercentage] = useState(0);
    const uuid = useUuid();

    useEffect(() => {
        if (typeof percentage !== 'number') {
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

        if (typeof percentage !== 'number') {
            return (
                <StyledProgressBarProgressWrapper>
                    <StyledMotionProgressBarProgress
                        key={`progress-bar-loop__${uuid}`}
                        $color={colors?.progressColor}
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
                    <StyledProgressBarBackground $color={colors?.backgroundColor} />
                </StyledProgressBarProgressWrapper>
            );
        }

        return (
            <StyledProgressBarProgressWrapper $isBig={shouldShowLabelInline}>
                {!!steps?.length && (
                    <StyledProgressBarStepWrapper>
                        {steps.map((step) => (
                            <StyledProgressBarStep
                                $position={step}
                                key={`progress-step-${step}`}
                                $color={colors?.stepColor}
                            />
                        ))}
                    </StyledProgressBarStepWrapper>
                )}
                <StyledMotionProgressBarProgress
                    $color={colors?.progressColor}
                    key={`progress-bar__${uuid}`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${internalPercentage}%` }}
                    exit={{ width: '0%' }}
                    transition={{ type: 'tween' }}
                />
                {shouldShowLabelInline && label && (
                    <StyledProgressBarLabel
                        $shouldShowLabelInline={shouldShowLabelInline}
                        $primaryColor={colors?.primaryTextColor}
                        $secondaryColor={colors?.secondaryTextColor}
                        $colorSplitPosition={internalPercentage}
                    >
                        {label}
                    </StyledProgressBarLabel>
                )}
                <StyledProgressBarBackground $color={colors?.backgroundColor} />
            </StyledProgressBarProgressWrapper>
        );
    }, [
        colors,
        internalPercentage,
        label,
        percentage,
        shouldHideProgress,
        shouldShowLabelInline,
        steps,
        uuid,
    ]);

    return useMemo(
        () => (
            <StyledProgressBar>
                {progressBar}
                {label && !shouldShowLabelInline && (
                    <StyledProgressBarLabel $primaryColor={colors?.primaryTextColor}>
                        {label}
                    </StyledProgressBarLabel>
                )}
            </StyledProgressBar>
        ),
        [
            progressBar,
            label,
            shouldShowLabelInline,
            colors?.primaryTextColor,
            colors?.secondaryTextColor,
        ],
    );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
