import React, { FC } from 'react';
import { StyledLine, StyledLineWrapper } from './Line.styles';

interface LineProps {
    color: string;
    isDashed?: boolean;
}

const Line: FC<LineProps> = ({ color, isDashed }) => (
    <StyledLineWrapper minHeight={isDashed ? 30 : 70}>
        <StyledLine
            isDashed={isDashed}
            color={color}
        />
    </StyledLineWrapper>
);

Line.displayName = 'Line';

export default Line;
