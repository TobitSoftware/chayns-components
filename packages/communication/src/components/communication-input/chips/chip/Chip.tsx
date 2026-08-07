import React, { FC, useMemo, useRef } from 'react';
import { StyledChip, StyledChipLabel, StyledChipXMark } from './Chip.styles';
import { Chip as IChip, CommunicationInputSize } from '../../CommunicationInput.types';
import { Icon, useFocusRingPortal, useKeyboardFocusHighlighting } from '@chayns-components/core';

interface ChipProps extends IChip {
    size: CommunicationInputSize;
    shouldEnableKeyboardHighlighting?: boolean;
}

const Chip: FC<ChipProps> = ({
    label,
    onClick,
    onRemove,
    icons,
    size,
    shouldEnableKeyboardHighlighting,
}) => {
    const chipRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    const sizes = useMemo(
        () => ({
            fontSize: size === CommunicationInputSize.MEDIUM ? 13 : 12,
            radius: size === CommunicationInputSize.MEDIUM ? 3 : 2,
            gap: size === CommunicationInputSize.MEDIUM ? 3 : 2,
            padding: size === CommunicationInputSize.MEDIUM ? '6px' : '4px 5px',
        }),
        [size],
    );

    useFocusRingPortal(labelRef, {
        borderRadius: sizes.radius,
        isEnabled: shouldShowKeyboardHighlighting,
        overlayRef: chipRef,
    });

    return (
        <StyledChip
            ref={chipRef}
            $radius={sizes.radius}
            $padding={sizes.padding}
            $gap={sizes.gap}
            $fontSize={sizes.fontSize}
        >
            <StyledChipLabel
                as={typeof onClick === 'function' ? 'button' : 'div'}
                $isClickable={typeof onClick === 'function'}
                onClick={onClick}
                ref={labelRef}
                type={typeof onClick === 'function' ? 'button' : undefined}
            >
                {icons && <Icon icons={icons} size={sizes.fontSize} />}
                <span>{label}</span>
            </StyledChipLabel>
            {typeof onRemove === 'function' && (
                <StyledChipXMark>
                    <Icon icons={['fa fa-xmark']} onClick={onRemove} size={sizes.fontSize} />
                </StyledChipXMark>
            )}
        </StyledChip>
    );
};

Chip.displayName = 'Chip';

export default Chip;
