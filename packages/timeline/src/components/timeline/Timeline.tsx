import React, { FC } from 'react';
import type { TimelineEvent } from '../../types/timeline';
import Event from './event/Event';

type TimelineProps = {
    /*
    * Make sure, that the events are sorted by date.
    * First element should be the newest one.
    */
    events: TimelineEvent[];
};

const Timeline: FC<TimelineProps> = ({ events }) => {

    return (
        <div>
            {events.map((event) => (
                <Event key={event.id} event={event}/>
            ))}
        </div>
    );
};

Timeline.displayName = 'Timeline';

export default Timeline;
