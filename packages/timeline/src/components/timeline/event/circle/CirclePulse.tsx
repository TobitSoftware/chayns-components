import React, { type FC } from 'react';
import { StyledCirclePulse, StyledCirclePulseDay, StyledCirclePulseWrapper } from './CirclePulse.styles';

interface CirclePulseProps {
    color: string;
    day?: string;
    delay: number;
}

const CirclePulse: FC<CirclePulseProps> = ({ color, day, delay }) => (
    <StyledCirclePulseWrapper
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1
        }}
        transition={{
            easeIn: 0.6,
            delay,
        }}
    >
        <StyledCirclePulseDay>{day}</StyledCirclePulseDay>
        <StyledCirclePulse color={color}/>
    </StyledCirclePulseWrapper>
);

CirclePulse.displayName = 'CirclePulse';

export default CirclePulse;
