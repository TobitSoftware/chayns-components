import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../../index';

import OpeningTimes from './OpeningTimes';
import TimeSpan from './TimeSpan';

const Day = ({ weekday, times, onDayActivation, onAdd, onRemove, onChange }) => {
    const timeSpans = times.slice().sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
    const isDisabled = !times.some(t => !t.disabled);
    return (
        <div className={`flex times ${timeSpans.length > 1 ? 'multiple' : ''}`}>
            <div className="flex__left">
                <Checkbox
                    label={weekday.name}
                    onChange={(val) => {
                        onDayActivation(weekday.number, val);
                    }}
                    checked={!isDisabled}
                />
            </div>
            <div className="flex__right">
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
                                    onAdd={(start, end) => onAdd(weekday.number, start, end)}
                                    onRemove={() => onRemove(weekday.number, index)}
                                    onChange={(start, end) => onChange(weekday.number, index, start, end)}
                                />
                            );
                        })
                }
            </div>
        </div>
    );
};

Day.propTypes = {
    weekday: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired
    }).isRequired,
    ...OpeningTimes.propTypes
};

Day.defaultProps = {
    ...OpeningTimes.defaultProps
};

export default Day;
