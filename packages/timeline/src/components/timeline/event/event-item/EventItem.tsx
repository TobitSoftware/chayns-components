import React, { type FC } from 'react';
import { DateInfo, Icon } from '@chayns-components/core';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { StyledEventItem, StyledEventItemContent, StyledEventItemDay, StyledIconWrapper } from './EventItem.styles';

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
}

const EventItem: FC<EventItemProps> = ({ icon, color, name, arrow, date, day }) => {
    return (
        <StyledEventItem>
            <StyledEventItemDay>{day}</StyledEventItemDay>
            <StyledIconWrapper
                color={color}
            >
                <Icon color="#fff" icons={[`far ${icon}`]}/>
            </StyledIconWrapper>
            <StyledEventItemContent>
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
