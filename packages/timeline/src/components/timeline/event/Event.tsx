import React, { FC } from 'react';
import type { TimelineEvent } from '../../../types/timeline';
import CirclePulse from './circle/CirclePulse';
import EventItem from './event-item/EventItem';
import Line from './line/Line';
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
}

const Event: FC<EventProps> = ({ event }) => {
    const { events, name, color, duration, startTime, startIcon, endTime, endIcon, id } = event;

    return (
        <StyledEvent>
            <div>
                {endTime && endIcon ? (
                    <EventItem
                        icon={endIcon}
                        color={color}
                        name={name}
                        date={endTime}
                        arrow={arrows.right}
                    />
                ) : (
                    <CirclePulse
                        color={color}
                    />
                )}
                <EventContent>
                    <Line color={color}/>
                    {events && events.length > 0 ? (
                        <StyledChildEventsWrapper>
                            {events.map((childEvent) => (
                                <Event event={childEvent} key={childEvent.id}/>
                            ))}
                        </StyledChildEventsWrapper>
                    ) : (
                        <StyledDuration>
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
            </div>
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
