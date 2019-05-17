import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TimeSpan from './TimeSpan';
import Checkbox from '../../react-chayns-checkbox/component/Checkbox';

class Day extends Component {
    constructor(props) {
        super(props);

        this.onDayActivation = this.onDayActivation.bind(this);
    }

    onDayActivation(status) {
        const {
            onDayActivation,
            onAdd,
            times,
            weekday,
        } = this.props;

        if (status && times.length === 0 && onAdd) {
            onAdd(weekday.number, TimeSpan.defaultStart, TimeSpan.defaultEnd);
        } else {
            onDayActivation(weekday.number, status);
        }
    }

    render() {
        const {
            weekday,
            times,
            onAdd,
            onRemove,
            onChange,
        } = this.props;

        // eslint-disable-next-line no-nested-ternary
        const timeSpans = times.slice().sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
        const isDisabled = !times.some(t => !t.disabled);

        return (
            <div className={`flex times${timeSpans.length > 1 ? ' multiple' : ''}${isDisabled ? ' times--disabled' : ''}`}>
                <div className="flex__left">
                    <Checkbox
                        label={weekday.name}
                        onChange={this.onDayActivation}
                        checked={!isDisabled}
                    />
                </div>
                <div className="flex__right">
                    {
                        timeSpans.length === 0 ? (
                            <TimeSpan
                                active={false}
                                disabled
                                buttonType={TimeSpan.ADD}
                            />
                        ) : timeSpans.map((t, index) => (
                            <TimeSpan
                                key={index}
                                start={t.start}
                                end={t.end}
                                disabled={isDisabled}
                                // eslint-disable-next-line no-nested-ternary
                                buttonType={timeSpans.length === 1 ? TimeSpan.ADD : index === 0 ? TimeSpan.OFF : TimeSpan.REMOVE}
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
        number: PropTypes.number.isRequired,
    }).isRequired,
    times: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
    })).isRequired,
    onDayActivation: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Day;
