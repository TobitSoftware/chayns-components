import React, { FC } from 'react';
import { StyledDayWrapper } from './DayWrapper.styles';

export type DayWrapperProps = {
    month: string;
};

const DayWrapper: FC<DayWrapperProps> = ({ month }) => {
    const maxStackSizeFactor = 1;

    return <StyledDayWrapper>test</StyledDayWrapper>;
};

DayWrapper.displayName = 'DayWrapper';

export default DayWrapper;
