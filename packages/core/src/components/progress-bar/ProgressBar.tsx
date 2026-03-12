import React, {
    FC,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useUuid } from '../../hooks/uuid';
import {
    StyledMotionProgressBarProgress,
    StyledProgressBar,
    StyledProgressBarBackground,
    StyledProgressBarLabel,
    StyledProgressBarProgressWrapper,
    StyledProgressBarShine,
    StyledProgressBarStep,
    StyledProgressBarStepWrapper,
    StyledProgressBarThumbLabel,
} from './ProgressBar.styles';
import { PopupAlignment, PopupRef } from '../../types/popup';
import { ThemeContext, ThemeProvider } from 'styled-components';
import { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import Popup from '../popup/Popup';

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
    thumbLabelColor?: string;
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
    /**
     * The label that should be displayed on the thumb of the progress bar.
     */
    thumbLabel?: React.ReactNode;
    /**
     * Whether a shine animation should be shown on the progress bar. The amount of shine is based on the percentage value.
     */
    showShine?: boolean;
    /**
     * The height of the progress bar in pixels. If not provided, it will be 10px if shouldShowLabelInline is false and 20px if shouldShowLabelInline is true.
     */
    height?: number;
};

const ProgressBar: FC<ProgressBarProps> = ({
    percentage,
    label,
    shouldHideProgress = false,
    shouldShowLabelInline = false,
    steps,
    colors,
    thumbLabel,
    showShine = false,
    height,
}) => {
    'use memo';

    const uuid = useUuid();
    const [coordinates, setCoordinates] = useState<{ x: number; y: number }>();
    const popupRef = useRef<PopupRef | null>(null);
    const [hostContainer, setHostContainer] = useState<HTMLDivElement | null>(null);

    const theme = useContext(ThemeContext) as Theme | undefined;

    const shineEffect = useMemo(() => {
        if (!showShine || percentage === undefined) return null;
        const MIN_ANIMATION_LENGTH = 1;
        const MAX_ANIMATION_LENGTH = 5;
        const MAX_SHINE_COUNT = 6;
        const t = percentage / 100;

        const shineCount = Math.ceil(MAX_SHINE_COUNT * t);

        const speed = MIN_ANIMATION_LENGTH + (MAX_ANIMATION_LENGTH - MIN_ANIMATION_LENGTH) * t;

        return Array.from({ length: shineCount }).map((_, index) => (
            <StyledProgressBarShine
                /* eslint-disable-next-line react/no-array-index-key */
                key={`progress-bar-shine__${shineCount}__${index}`}
                $speed={speed}
                $delay={-(speed / shineCount) * index}
            />
        ));
    }, [percentage, showShine]);

    useLayoutEffect(() => {
        if (thumbLabel) setCoordinates(hostContainer?.getBoundingClientRect());
    }, [hostContainer, thumbLabel]);

    useEffect(() => {
        if (coordinates) popupRef.current?.show();
    }, [coordinates]);

    const progressBar = useMemo(() => {
        if (shouldHideProgress) {
            return null;
        }

        if (percentage === undefined) {
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
            <div
                ref={(instance) => setHostContainer(instance)}
                style={{ border: 0, position: 'relative' }}
            >
                <StyledProgressBarProgressWrapper $isBig={shouldShowLabelInline} $height={height}>
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
                        $height={height}
                        $color={colors?.progressColor}
                        key={`progress-bar__${uuid}`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${percentage}%` }}
                        exit={{ width: '0%' }}
                        transition={{ type: 'tween' }}
                        onUpdate={() => popupRef.current?.show()}
                        onAnimationComplete={() => popupRef.current?.show()}
                    >
                        {showShine && shineEffect}
                        {thumbLabel && (
                            <StyledProgressBarThumbLabel
                                $height={height}
                                onClick={(event) => event.stopPropagation()}
                            >
                                <ThemeProvider
                                    theme={{
                                        '000': colors?.thumbLabelColor ?? theme?.['104'],
                                        text: colors?.secondaryTextColor ?? theme?.['300'],
                                    }}
                                >
                                    <Popup
                                        ref={popupRef}
                                        content={thumbLabel}
                                        alignment={PopupAlignment.TopCenter}
                                        onHide={() => popupRef.current?.show()}
                                        container={hostContainer ?? undefined}
                                        shouldBeOpen
                                        shouldScrollWithContent
                                        yOffset={-12}
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
                            $colorSplitPosition={percentage}
                        >
                            {label}
                        </StyledProgressBarLabel>
                    )}

                    <StyledProgressBarBackground $color={colors?.backgroundColor} />
                </StyledProgressBarProgressWrapper>
            </div>
        );
    }, [
        colors?.backgroundColor,
        colors?.primaryTextColor,
        colors?.progressColor,
        colors?.secondaryTextColor,
        colors?.stepColor,
        colors?.thumbLabelColor,
        height,
        hostContainer,
        label,
        percentage,
        shineEffect,
        shouldHideProgress,
        shouldShowLabelInline,
        showShine,
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
