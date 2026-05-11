import React, { FC, useMemo } from 'react';
import { StyledDateMessage } from './DateMessage.styles';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';

interface DateMessageProps {
    date: string;
}

const DateMessage: FC<DateMessageProps> = ({ date }) => {
    const { t, language } = useTranslation();

    const formattedDate = useMemo(() => {
        const newDate = new Date(date);

        const now = new Date();

        const isToday =
            newDate.getDate() === now.getDate() &&
            newDate.getMonth() === now.getMonth() &&
            newDate.getFullYear() === now.getFullYear();

        const yesterdayDate = new Date();
        yesterdayDate.setDate(now.getDate() - 1);

        const isYesterday =
            newDate.getDate() === yesterdayDate.getDate() &&
            newDate.getMonth() === yesterdayDate.getMonth() &&
            newDate.getFullYear() === yesterdayDate.getFullYear();

        if (isToday) {
            return t(textStrings.communicationMessage.dateMessage.today);
        }

        if (isYesterday) {
            return t(textStrings.communicationMessage.dateMessage.yesterday);
        }

        return new Intl.DateTimeFormat(language, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(newDate);
    }, [date, language, t]);

    return <StyledDateMessage>{formattedDate}</StyledDateMessage>;
};

DateMessage.displayName = 'CommunicationMessage.Date';

export default DateMessage;
