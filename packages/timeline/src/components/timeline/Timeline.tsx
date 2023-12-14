import React, { FC } from 'react';
import type { TimelineEvent } from '../../types/timeline';

type TimelineProps = {
    /*
    * Make sure, that the events are sorted by date.
    * First element should be the newest one.
    */
    events: TimelineEvent[];
};

const Timeline: FC<TimelineProps> = ({ events }) => {
    console.log(events);

    return (
        <div>Timeline</div>
    );
};

Timeline.displayName = 'Timeline';

export default Timeline;
