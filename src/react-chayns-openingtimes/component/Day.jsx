import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../../index';

import TimeSpan from './TimeSpan';

class Day extends Component {
    static OFF = 0

    static ADD = 1

    static REMOVE = 2

    render() {
        const {
            weekday,
            times,
            onDayActivation,
            onAdd,
            onRemove,
            onChange
        } = this.props;

        // eslint-disable-next-line no-nested-ternary
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
                        ) : timeSpans.map((t, index) => (
                                <TimeSpan
                                    key={t.start}
                                    start={t.start}
                                    end={t.end}
                                    disabled={isDisabled}
                                    // eslint-disable-next-line no-nested-ternary
                                    buttonType={timeSpans.length === 1 ? Day.ADD : index === 0 ? Day.OFF : Day.REMOVE}
                                    onAdd={(start, end) => onAdd(weekday.number, start, end)}
                                    onRemove={() => onRemove(weekday.number, index)}
                                    onChange={(start, end) => onChange(weekday.number, index, start, end)}
                                />
                            ))
                    }
                </div>
            </div>
        );
    }
}

Day.propTypes = {
    weekday: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired
    }).isRequired,
    times: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
    })).isRequired,
    onDayActivation: PropTypes.func.isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onChange: PropTypes.func
};

Day.defaultProps = {
    onAdd: null,
    onRemove: null,
    onChange: null
};

export default Day;
