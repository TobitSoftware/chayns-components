import React, { FC } from 'react';
import { StyledChip, StyledChipLabel, StyledChipXMark } from './Chip.styles';
import { Chip as IChip } from '../../CommunicationInput.types';
import { Icon } from '@chayns-components/core';

const Chip: FC<IChip> = ({ label, onClick, onRemove, icons }) => (
    <StyledChip>
        <StyledChipLabel onClick={onClick} $isClickable={typeof onClick === 'function'}>
            {icons && <Icon icons={icons} size={13} />}
            <span>{label}</span>
        </StyledChipLabel>
        {typeof onRemove === 'function' && (
            <StyledChipXMark>
                <Icon icons={['fa fa-xmark']} onClick={onRemove} size={13} />
            </StyledChipXMark>
        )}
    </StyledChip>
);

Chip.displayName = 'Chip';

export default Chip;
