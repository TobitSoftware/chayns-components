import React, { type FC } from 'react';
import { StyledCirclePulse, StyledCirclePulseWrapper } from './CirclePulse.styles';

interface CirclePulseProps {
    color: string;
}

const CirclePulse: FC<CirclePulseProps> = ({ color }) => (
    <div style={{height: '20px'}}>
        <StyledCirclePulseWrapper>
            <div>
                <StyledCirclePulse color={color}/>
            </div>
        </StyledCirclePulseWrapper>
    </div>
);

CirclePulse.displayName = 'CirclePulse';

export default CirclePulse;
