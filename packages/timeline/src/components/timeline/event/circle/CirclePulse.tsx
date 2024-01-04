import React, { type FC } from 'react';
import { StyledCirclePulse, StyledCirclePulseDay, StyledCirclePulseWrapper } from './CirclePulse.styles';

interface CirclePulseProps {
    color: string;
    day?: string;
}

const CirclePulse: FC<CirclePulseProps> = ({ color, day }) => (
    <StyledCirclePulseWrapper>
        {day && (
            <StyledCirclePulseDay>{day}</StyledCirclePulseDay>
        )}
        <StyledCirclePulse color={color}/>
    </StyledCirclePulseWrapper>
);

CirclePulse.displayName = 'CirclePulse';

export default CirclePulse;
