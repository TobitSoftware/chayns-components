import React, { FC, useMemo } from 'react';
import type { TimelineEvent, TransformedTimelineEvent } from '../../types/timeline';
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

const transformEvents = (events: TimelineEvent[], delayObj: { delay: number }, depth: number): TransformedTimelineEvent[] => {
    return events.map((event) => {
        const transformedChildEvents = event.events ? transformEvents(event.events, delayObj, depth + 1) : undefined;
        return {
            ...event,
            events: transformedChildEvents,
            leafCount: transformedChildEvents?.reduce((acc, curr) => acc + (curr.events ? curr.leafCount : 1), 0),
            // eslint-disable-next-line no-param-reassign
            delay: transformedChildEvents?.[0] ? transformedChildEvents[0].delay : delayObj.delay++,
            offset: depth * 0.1,
        };
    })
}

const Timeline: FC<TimelineProps> = ({ events }) => {
    const ev = useMemo(() => {


        return transformEvents(events, { delay: 0 }, 0);
    }, [events]);

    return (
        <StyledTimeline>
            {ev.map((event, i) => {
                const prevEvent = events[i - 1];
                const nextEvent = events[i + 1];

                // if latest entry, show day
                const isPrevDayDifferent = prevEvent ? !isSameDay(event.startTime, prevEvent.startTime) : true;
                // if next entry is on different day, show line, hide if no following entry
                const isNextDayDifferent = nextEvent ? !isSameDay(event.startTime, nextEvent.startTime) : false;

                return (
                    <>
                        <Event
                            key={event.id}
                            event={event}
                            day={isPrevDayDifferent ? toRelativeShortDateString(event.startTime) : undefined}
                        />
                        {isNextDayDifferent && (
                            <Line color={event.color} isDashed delay={0} duration={0} />
                        )}
                    </>
                );
            })}
        </StyledTimeline>
    );
};

Timeline.displayName = 'Timeline';

export default Timeline;
