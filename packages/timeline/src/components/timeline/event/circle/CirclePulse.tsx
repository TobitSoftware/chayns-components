import React, { type FC } from 'react';
import { StyledCirclePulse, StyledCirclePulseDay, StyledCirclePulseWrapper } from './CirclePulse.styles';
import { START_OFFSET } from '../../../../constants/time';

interface CirclePulseProps {
    color: string;
    day?: string;
    startOffset: number;
}

const CirclePulse: FC<CirclePulseProps> = ({ color, day, startOffset }) => (
    <StyledCirclePulseWrapper
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1
        }}
        transition={{
            easeIn: 0.6,
            delay: (startOffset * START_OFFSET)
        }}
    >
        <StyledCirclePulseDay>{day}</StyledCirclePulseDay>
        <StyledCirclePulse color={color}/>
    </StyledCirclePulseWrapper>
);

CirclePulse.displayName = 'CirclePulse';

export default CirclePulse;
