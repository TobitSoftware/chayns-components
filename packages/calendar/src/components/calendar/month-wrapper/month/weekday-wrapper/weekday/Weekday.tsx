import React, { FC } from 'react';
import { StyledWeekday } from './Weekday.styles';

export type WeekdayProps = {
    name: string;
};

const Weekday: FC<WeekdayProps> = ({ name }) => <StyledWeekday>{name}</StyledWeekday>;

Weekday.displayName = 'Weekday';

export default Weekday;
