import React, { type FC } from 'react';
import { DateInfo, Icon } from '@chayns-components/core';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { StyledEventItem, StyledEventItemContent, StyledEventItemDay, StyledIconWrapper } from './EventItem.styles';
import { EVENT_OFFSET, START_OFFSET } from '../../../../constants/time';

interface EventItemProps {
    icon: string;
    color: string;
    name: string;
    arrow: {
        icon: string;
        color: string;
    };
    date: string;
    day?: string;
    startOffset: number;
    eventOffset: number;
}

const EventItem: FC<EventItemProps> = ({ icon, color, name, arrow, date, day, eventOffset, startOffset }) => {
    return (
        <StyledEventItem>
            <StyledEventItemDay
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    easeIn: 0.6,
                    delay: (startOffset * START_OFFSET) + (eventOffset * EVENT_OFFSET)
                }}
            >{day}</StyledEventItemDay>
            <StyledIconWrapper
                color={color}
                initial={{
                    opacity: 0
                }}
                animate={{ x: [-10, -5, 0], opacity: 1, scale: 1 }}
                transition={{
                    easeIn: 0.5,
                    delay: (startOffset * START_OFFSET) + (eventOffset * EVENT_OFFSET)
                }}
            >
                <Icon color="#fff" icons={[`far ${icon}`]}/>
            </StyledIconWrapper>
            <StyledEventItemContent
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    easeIn: 0.6,
                    delay: (startOffset * START_OFFSET) + (eventOffset * EVENT_OFFSET)
                }}
            >
                <div
                    style={{ paddingTop: '1px', lineHeight: '1' }}
                >
                    {name}
                </div>
                <div
                    style={{ fontSize: '14px' }}
                >
                    <Icon
                        size={12}
                        color={arrow.color}
                        icons={[`fas ${arrow.icon}`]}
                    />
                    {`${format(new Date(date), 'HH:mm', { locale: de })} Uhr`}
                </div>
            </StyledEventItemContent>
        </StyledEventItem>
    );
};

EventItem.displayName = 'EventItem';

export default EventItem;
