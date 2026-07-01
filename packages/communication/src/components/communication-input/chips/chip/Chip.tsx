import React, { FC, useMemo } from 'react';
import { StyledChip, StyledChipLabel, StyledChipXMark } from './Chip.styles';
import { Chip as IChip, CommunicationInputSize } from '../../CommunicationInput.types';
import { Icon } from '@chayns-components/core';

interface ChipProps extends IChip {
    size: CommunicationInputSize;
}

const Chip: FC<ChipProps> = ({ label, onClick, onRemove, icons, size }) => {
    const sizes = useMemo(
        () => ({
            fontSize: size === CommunicationInputSize.MEDIUM ? 13 : 12,
            radius: size === CommunicationInputSize.MEDIUM ? 3 : 2,
            gap: size === CommunicationInputSize.MEDIUM ? 3 : 2,
            padding: size === CommunicationInputSize.MEDIUM ? '6px' : '4px 5px',
        }),
        [size],
    );

    return (
        <StyledChip
            $radius={sizes.radius}
            $padding={sizes.padding}
            $gap={sizes.gap}
            $fontSize={sizes.fontSize}
        >
            <StyledChipLabel onClick={onClick} $isClickable={typeof onClick === 'function'}>
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
