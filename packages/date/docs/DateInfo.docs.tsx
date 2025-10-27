import React, { FC } from 'react';
import { DateInfo } from '@chayns-components/date';

const Component: FC = () => {
    return <DateInfo date={new Date('2004-08-13')} />;
};

Component.displayName = 'Component';

export default Component;
