import React from 'react';
import { Checkbox } from '../../index';

import TimeSpan from './TimeSpan';

const Day = ({ weekday, times }) => {
    const timeSpans = times.slice().sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
    const isDisabled = !times.some(t => !t.disabled);
    return (
        <div className={`flex times ${timeSpans.length > 1 ? 'multiple' : ''}`}>
            <div className="flex__left">
                <Checkbox
                    label={weekday.name}
                    onChange={(val) => {
                        console.log(weekday.number, val);
                    }}
                    checked={!isDisabled}
                />
            </div>
            <div className="flex__right flex--2">
                {
                    timeSpans.length === 0 ? (
                        <TimeSpan
                            active={false}
                            buttonType={0}
                        />
                    ) : timeSpans.map((t, index) => {
                            // eslint-disable-next-line no-nested-ternary
                            const buttonType = timeSpans.length === 1 ? 1 : index === 0 ? 0 : 2;
                            /*
                                0: No Button
                                1: Plus icon (add)
                                2: X icon (remove)
                            */
                            if (weekday.number === 0) console.log(t);
                            return (
                                <TimeSpan
                                    key={t.start}
                                    start={t.start}
                                    end={t.end}
                                    disabled={isDisabled}
                                    buttonType={buttonType}
                                />
                            );
                        })
                }
            </div>
        </div>
    );
};

export default Day;
