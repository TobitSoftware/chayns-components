import React, { FC, KeyboardEventHandler, useCallback } from 'react';
import {
    StyledHighlightSliderItem,
    StyledHighlightSliderItemBackground,
    StyledHighlightSliderItemProgress,
} from './HighlightSliderItem.styles';
import { StyledProgressBarProgressWrapper } from '../../progress-bar/ProgressBar.styles';
import { useUuid } from '../../../hooks/uuid';

export interface HighlightSliderItemColors {
    backgroundColor: string;
    fillColor: string;
}

export type HighlightSliderItemProps = {
    index: number;
    isActive: boolean;
    isFinished: boolean;
    onClick: (index: number) => void;
    onFinish: (index: number) => void;
    duration: number;
    colors: HighlightSliderItemColors;
    isInteractive: boolean;
    shouldEnableKeyboardHighlighting?: boolean;
    shouldShowKeyboardHighlighting?: boolean;
};

const HighlightSliderItem: FC<HighlightSliderItemProps> = ({
    colors,
    isActive,
    isFinished,
    onFinish,
    index,
    onClick,
    duration,
    isInteractive,
    shouldEnableKeyboardHighlighting,
    shouldShowKeyboardHighlighting = false,
}) => {
    const uuid = useUuid();
    const isKeyboardFocusable = isInteractive && shouldEnableKeyboardHighlighting;

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (!isInteractive) {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick(index);
            }
        },
        [index, isInteractive, onClick],
    );

    return (
        <StyledHighlightSliderItem
            onClick={isInteractive ? () => onClick(index) : undefined}
            onKeyDown={isKeyboardFocusable ? handleKeyDown : undefined}
            tabIndex={isKeyboardFocusable ? 0 : -1}
            role={isInteractive ? 'button' : undefined}
            $shouldShowKeyboardHighlighting={shouldShowKeyboardHighlighting}
        >
            <StyledProgressBarProgressWrapper>
                {isActive && (
                    <StyledHighlightSliderItemProgress
                        key={`highlight-slider-item-active--${uuid}`}
                        initial={{ width: '100%', left: '-100%' }}
                        animate={{ width: '100%', left: '0%' }}
                        exit={{ width: '100%', left: '0%' }}
                        onAnimationComplete={() => onFinish(index)}
                        $backgroundColor={colors.fillColor}
                        transition={{
                            ease: 'linear',
                            duration,
                        }}
                    />
                )}
                {isFinished && (
                    <StyledHighlightSliderItemProgress
                        key={`highlight-slider-item-finished--${uuid}`}
                        style={{ width: '100%', left: '0%' }}
                        $backgroundColor={colors.fillColor}
                    />
                )}
                <StyledHighlightSliderItemBackground $backgroundColor={colors.backgroundColor} />
            </StyledProgressBarProgressWrapper>
        </StyledHighlightSliderItem>
    );
};

HighlightSliderItem.displayName = 'HighlightSliderItem';

export default HighlightSliderItem;
