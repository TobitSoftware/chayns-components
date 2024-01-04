import React, { FC } from 'react';
import { StyledLine, StyledLineWrapper } from './Line.styles';

interface LineProps {
    color: string;
}

const Line: FC<LineProps> = ({ color }) => {
    return (
        <StyledLineWrapper>
            <StyledLine
                color={color}
            />
        </StyledLineWrapper>
    );
};

Line.displayName = 'Line';

export default Line;
