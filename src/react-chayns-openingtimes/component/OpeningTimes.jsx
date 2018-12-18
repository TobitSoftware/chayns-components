import React from 'react';
import Day from './Day';
import './styles.scss';

const weekdays = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag',
];

const OpeningTimes = ({ times }) => (
    <div style={{
        margin: '10px 25px 15px 25px'
    }}
    >
        {
            weekdays.map((day, index) => (
                <Day
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    weekday={{
                        name: day,
                        number: index
                    }}
                    times={times.filter(t => t.weekDay === index)}
                />
            ))
        }
    </div>
);


export default OpeningTimes;
