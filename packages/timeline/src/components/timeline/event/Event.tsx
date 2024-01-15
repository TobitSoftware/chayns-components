import React, { FC } from 'react';
import type { TimelineEvent } from '../../../types/timeline';
import CirclePulse from './circle/CirclePulse';
import EventItem from './event-item/EventItem';
import Line from '../../shared/line/Line';
import { EventContent, StyledChildEventsWrapper, StyledDuration, StyledEvent } from './Event.styles';

export const arrows = {
    left: {
        icon: 'fa-arrow-left',
        color: 'var(--chayns-color--green)'
    },
    right: {
        icon: 'fa-arrow-right',
        color: 'var(--chayns-color--red)'
    }
};

interface EventProps {
    event: TimelineEvent;
    isSubEvent?: boolean;
    day?: string;
    startOffset: number;
    eventOffset: number;
}

const Event: FC<EventProps> = ({ event, isSubEvent, day, eventOffset, startOffset }) => {
    const { events, name, color, duration, startTime, startIcon, endTime, endIcon, id } = event;

    const hasSubEvents = events && events.length > 0;

    return (
        <StyledEvent>
            {endTime && endIcon ? (
                <EventItem
                    icon={endIcon}
                    color={color}
                    name={name}
                    date={endTime}
                    arrow={arrows.right}
                    day={day}
                    startOffset={startOffset}
                    eventOffset={eventOffset}
                />
            ) : (
                <CirclePulse
                    startOffset={startOffset}
                    day={day}
                    color={color}
                />
            )}
            <EventContent>
                <Line color={color} startOffset={startOffset} eventOffset={eventOffset}/>
                {hasSubEvents && (
                    <StyledChildEventsWrapper>
                        {events.map((childEvent, i) => (
                            <Event event={childEvent} key={childEvent.id} isSubEvent startOffset={startOffset + 1} eventOffset={i}/>
                        ))}
                    </StyledChildEventsWrapper>
                )}
                {(!isSubEvent || !hasSubEvents) && (
                    <StyledDuration
                        isSubEvent={isSubEvent}
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 0.7
                        }}
                        transition={{
                            easeIn: 0.6,
                            delay: 0.8 // (counterDuration * 0.1) + 0.8
                        }}
                    >
                        {convertMinutes(duration)}
                    </StyledDuration>
                )}
            </EventContent>
            <EventItem
                icon={startIcon}
                color={color}
                name={name}
                arrow={arrows.left}
                date={startTime}
            />
        </StyledEvent>
    );
};

Event.displayName = 'Event';

export default Event;

// convert minutes (100) to hours (01:40 Std.)
const convertMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${min < 10 ? '0' : ''}${min} Std.`;
};
