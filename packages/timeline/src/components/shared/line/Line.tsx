import React, { FC } from 'react';
import { StyledLine, StyledLineWrapper } from './Line.styles';
import { EVENT_OFFSET, START_OFFSET } from '../../../constants/time';

interface LineProps {
    color: string;
    isDashed?: boolean;
    startOffset: number;
    eventOffset: number;
}

const Line: FC<LineProps> = ({ color, isDashed, startOffset, eventOffset }) => (
    <StyledLineWrapper minHeight={isDashed ? 30 : 70}>
        <StyledLine
            isDashed={isDashed}
            color={color}
            initial={{height: 0}}
            animate={{height: "auto"}}
            transition={{
                duration: 0.7,
                delay: (startOffset * START_OFFSET) + (eventOffset * EVENT_OFFSET)
            }}
            exit={{height: 0}}
        />
    </StyledLineWrapper>
);

Line.displayName = 'Line';

export default Line;
