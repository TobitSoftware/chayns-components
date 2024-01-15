import React, { FC } from 'react';
import type { TransformedTimelineEvent } from '../../../types/timeline';
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
    event: TransformedTimelineEvent;
    isSubEvent?: boolean;
    day?: string;
}

const BASE_DURATION = 0.5;

const Event: FC<EventProps> = ({ event, isSubEvent, day }) => {
    const { events, name, color, duration, startTime, startIcon, endTime, endIcon, delay, offset } = event;

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
                    delay={(delay + offset) * BASE_DURATION}
                    duration={0.2 * (event.leafCount ?? 1) * BASE_DURATION}
                />
            ) : (
                <CirclePulse
                    delay={(delay + offset) * BASE_DURATION}
                    day={day}
                    color={color}
                />
            )}
            <EventContent>
                <Line color={color} delay={(delay + offset + 0.2 * (event.leafCount ?? 1)) * BASE_DURATION} duration={(event.leafCount ?? 1) * 0.8 * BASE_DURATION}/>
                {hasSubEvents && (
                    <StyledChildEventsWrapper>
                        {events.map((childEvent) => (
                            <Event
                                event={childEvent}
                                key={childEvent.id}
                                isSubEvent
                            />
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
                            delay: (delay + offset + 0.4 * (event.leafCount ?? 1)) * BASE_DURATION,
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
                delay={(delay + offset + 0.8 * (event.leafCount ?? 1)) * BASE_DURATION}
                duration={0.3 * (event.leafCount ?? 1) * BASE_DURATION}
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
