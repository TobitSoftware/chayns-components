import React, { FC } from 'react';
import { StyledLine, StyledLineWrapper } from './Line.styles';

interface LineProps {
    color: string;
    isDashed?: boolean;
    delay: number;
    duration: number;
}

const Line: FC<LineProps> = ({ color, isDashed, delay, duration }) => (
    <StyledLineWrapper minHeight={isDashed ? 30 : 70}>
        <StyledLine
            isDashed={isDashed}
            color={color}
            initial={{height: 0}}
            animate={{height: "auto"}}
            transition={{
                duration,
                delay,
            }}
            exit={{height: 0}}
        />
    </StyledLineWrapper>
);

Line.displayName = 'Line';

export default Line;
