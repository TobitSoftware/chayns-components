import React, { FC } from 'react';
import type { TimelineEvent } from '../../types/timeline';
import Event from './event/Event';
import { StyledTimeline } from './Timeline.styles';
import { isSameDay } from 'date-fns';
import { toRelativeShortDateString } from '../../utils/date';
import Line from '../shared/line/Line';

type TimelineProps = {
    /*
    * Make sure, that the events are sorted by date.
    * First element should be the newest one.
    */
    events: TimelineEvent[];
};

// StartOffset für die Spalten der Events
// EventsOffset für die Zeilen

const Timeline: FC<TimelineProps> = ({ events }) => {

    return (
        <StyledTimeline>
            {events.map((event, i) => {
                const prevEvent = events[i - 1];
                const nextEvent = events[i + 1];

                // if latest entry, show day
                const isPrevDayDifferent = prevEvent ? !isSameDay(event.startTime, prevEvent.startTime) : true;
                // if next entry is on different day, show line, hide if no following entry
                const isNextDayDifferent = nextEvent ? !isSameDay(event.startTime, nextEvent.startTime) : false;

                return (
                    <>
                        <Event
                            eventOffset={i}
                            startOffset={0}
                            key={event.id}
                            event={event}
                            day={isPrevDayDifferent ? toRelativeShortDateString(event.startTime) : undefined}
                        />
                        {isNextDayDifferent && (
                            <Line color={event.color} isDashed startOffset={0} eventOffset={i}/>
                        )}
                    </>
                );
            })}
        </StyledTimeline>
    );
};

Timeline.displayName = 'Timeline';

export default Timeline;
