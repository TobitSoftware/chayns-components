import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useUuid } from '../../hooks/uuid';
import {
    StyledMotionProgressBarProgress,
    StyledProgressBar,
    StyledProgressBarBackground,
    StyledProgressBarLabel,
    StyledProgressBarProgressWrapper,
    StyledProgressBarStep,
    StyledProgressBarStepWrapper,
    StyledProgressBarThumbLabel,
} from './ProgressBar.styles';
import { PopupAlignment, PopupRef } from '../../types/popup';
import { ThemeContext, ThemeProvider } from 'styled-components';
import { Popup, Theme } from '../../index';

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
    thumbLabel?: React.ReactNode;
};

const ProgressBar: FC<ProgressBarProps> = ({
    percentage,
    label,
    shouldHideProgress = false,
    shouldShowLabelInline = false,
    steps,
    colors,
    thumbLabel,
}) => {
    const [internalPercentage, setInternalPercentage] = useState(0);
    const uuid = useUuid();
    const popupRef = useRef<PopupRef | null>(null);

    const theme = useContext(ThemeContext) as Theme | undefined;

    useEffect(() => {
        if (typeof percentage !== 'number') {
            return;
        }

        if (percentage >= 0 && percentage <= 100) {
            setInternalPercentage(percentage);
        }
    }, [percentage]);

    popupRef.current?.show();

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
                    onUpdate={() => popupRef.current?.show()}
                    onAnimationComplete={() => popupRef.current?.show()}
                >
                    {thumbLabel && (
                        <StyledProgressBarThumbLabel>
                            <ThemeProvider
                                theme={{
                                    '000': colors?.backgroundColor ?? theme?.['104'],
                                    text: colors?.secondaryTextColor ?? theme?.['300'],
                                }}
                            >
                                <Popup
                                    ref={popupRef}
                                    content={thumbLabel}
                                    alignment={PopupAlignment.TopCenter}
                                    onHide={() => popupRef.current?.show()}
                                >
                                    {}
                                </Popup>
                            </ThemeProvider>
                        </StyledProgressBarThumbLabel>
                    )}
                </StyledMotionProgressBarProgress>

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
        colors?.backgroundColor,
        colors?.primaryTextColor,
        colors?.progressColor,
        colors?.secondaryTextColor,
        colors?.stepColor,
        internalPercentage,
        label,
        percentage,
        shouldHideProgress,
        shouldShowLabelInline,
        steps,
        theme,
        thumbLabel,
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
        [colors?.primaryTextColor, label, progressBar, shouldShowLabelInline],
    );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
