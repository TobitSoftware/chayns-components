import React, { FC } from 'react';
import type { TimelineEvent } from '../../types/timeline';
import Event from './event/Event';
import { StyledTimeline } from './Timeline.styles';
import { isSameDay } from 'date-fns';
import { toRelativeShortDateString } from '../../utils/date';

type TimelineProps = {
    /*
    * Make sure, that the events are sorted by date.
    * First element should be the newest one.
    */
    events: TimelineEvent[];
};

const Timeline: FC<TimelineProps> = ({ events }) => {

    return (
        <StyledTimeline>
            {events.map((event, i) => {
                const prevEvent = events[i - 1];

                const isDifferentDay = prevEvent ? !isSameDay(new Date(event.startTime), new Date(prevEvent.startTime)) : true;

                return (
                    <Event
                        key={event.id}
                        event={event}
                        day={isDifferentDay ? toRelativeShortDateString(event.startTime) : undefined}
                    />
                );
            })}
        </StyledTimeline>
    );
};

Timeline.displayName = 'Timeline';

export default Timeline;
