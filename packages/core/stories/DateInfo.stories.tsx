import { ComponentMeta, ComponentStory } from '@storybook/react';

import DateInfo from '../src/components/date-info/DateInfo';
import { DateFormat } from '../src/components/date-info/types/props';

export default {
    title: 'Core/DateInfo',
    component: DateInfo,
    args: {},
} as ComponentMeta<typeof DateInfo>;

const SimpleDateTemplate: ComponentStory<typeof DateInfo> = () => (
    <div>
        <div>
            Available formatOptions: <br />
            useMonthAsNumber, useShortMonth, hideYear, hideThisYear, useShortYear
        </div>
        <DateInfo date={new Date('2023-06-09T08:40:00.000Z')} format={DateFormat.SimpleDate} />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            format={DateFormat.SimpleDate}
            formatOptions={{
                useMonthAsNumber: true,
            }}
        />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            format={DateFormat.SimpleDate}
            formatOptions={{
                useShortMonth: true,
            }}
        />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            format={DateFormat.SimpleDate}
            formatOptions={{
                useShortYear: true,
            }}
        />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            format={DateFormat.SimpleDate}
            formatOptions={{
                hideYear: true,
            }}
        />
        <div>Same formatOptions are available for periods</div>
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            secondDate={new Date('2023-08-09T14:30:00.000Z')}
            format={DateFormat.SimpleDatePeriod}
        />
    </div>
);

export const SimpleDate = SimpleDateTemplate.bind({});

const SimpleTimeTemplate: ComponentStory<typeof DateInfo> = () => (
    <div>
        <div>
            Available formatOptions: <br />
            none
        </div>
        <DateInfo date={new Date('2023-06-09T08:40:00.000Z')} format={DateFormat.SimpleTime} />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            secondDate={new Date('2023-08-09T14:30:00.000Z')}
            format={DateFormat.SimpleTimePeriod}
        />
    </div>
);

export const SimpleTime = SimpleTimeTemplate.bind({});

const DateWithTimeTemplate: ComponentStory<typeof DateInfo> = () => (
    <div>
        <div>
            Available formatOptions: <br />
            useToday, useTomorrowOrYesterday
        </div>
        <DateInfo date={new Date('2023-06-09T08:40:00.000Z')} format={DateFormat.DateWithTime} />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            format={DateFormat.DateWithTime}
            formatOptions={{
                useToday: true,
                useTomorrowOrYesterday: true,
            }}
        />
        <div>Same formatOptions are available for periods</div>
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            secondDate={new Date('2023-08-09T14:30:00.000Z')}
            format={DateFormat.DateWithTimePeriod}
        />
    </div>
);

export const DateWithTime = DateWithTimeTemplate.bind({});

const DayWithDateTemplate: ComponentStory<typeof DateInfo> = () => (
    <div>
        <div>
            Available formatOptions: <br />
            useShortWeekDay and all from SimpleDate
        </div>
        <DateInfo date={new Date('2023-06-09T08:40:00.000Z')} format={DateFormat.DayWithDate} />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            format={DateFormat.DayWithDate}
            formatOptions={{
                useShortWeekDay: true,
            }}
        />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            secondDate={new Date('2023-08-09T14:30:00.000Z')}
            format={DateFormat.DayWithDatePeriod}
        />
    </div>
);

export const DayWithDate = DayWithDateTemplate.bind({});

const DayWithTimeTemplate: ComponentStory<typeof DateInfo> = () => (
    <div>
        <div>
            Available formatOptions: <br />
            useShortWeekDay
        </div>
        <DateInfo date={new Date('2023-06-09T08:40:00.000Z')} format={DateFormat.DayWithTime} />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            format={DateFormat.DayWithTime}
            formatOptions={{
                useShortWeekDay: true,
            }}
        />
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            secondDate={new Date('2023-08-09T14:30:00.000Z')}
            format={DateFormat.DayWithTimePeriod}
        />
    </div>
);

export const DayWithTime = DayWithTimeTemplate.bind({});

const TimeTillNowTemplate: ComponentStory<typeof DateInfo> = () => (
    <div>
        <div>
            Available formatOptions: <br />
            hideTimeTillNowText
        </div>
        <DateInfo
            date={new Date('2023-06-09T08:40:00.000Z')}
            secondDate={new Date()}
            format={DateFormat.TimeTillNow}
        />
        <DateInfo
            date={new Date('2060-06-09T08:40:00.000Z')}
            secondDate={new Date()}
            format={DateFormat.TimeTillNow}
        />
        <DateInfo
            date={new Date('2060-06-09T08:40:00.000Z')}
            secondDate={new Date()}
            format={DateFormat.TimeTillNow}
            formatOptions={{
                hideTimeTillNowText: true,
            }}
        />
    </div>
);

export const TimeTillNow = TimeTillNowTemplate.bind({});
