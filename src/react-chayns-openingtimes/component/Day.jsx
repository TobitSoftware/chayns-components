import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Checkbox from '../../react-chayns-checkbox/component/Checkbox';

import TimeSpan from './TimeSpan';

class Day extends Component {
    constructor(props) {
        super(props);

        this.onDayActivation = this.onDayActivation.bind(this);
    }

    onDayActivation(status) {
        const {
            onDayRemove,
            onDayAdd,
            times,
            weekday,
            defaultStart,
            defaultEnd,
        } = this.props;

        if (status && times.length === 0 && onDayAdd) {
            onDayAdd(weekday.number, defaultStart, defaultEnd);
        } else {
            onDayRemove(weekday.number);
        }
    }

    render() {
        const {
            weekday,
            times,
            onAdd,
            onRemove,
            onChange,
            disabled,
        } = this.props;

        // eslint-disable-next-line no-nested-ternary

        const timeSpans = times.slice();

        return (
            <div
                className={`flex times${timeSpans.length > 1 ? ' multiple' : ''}${disabled ? ' times--disabled' : ''}`}
            >
                <div className="flex__left">
                    <Checkbox
                        label={weekday.name}
                        onChange={this.onDayActivation}
                        checked={!disabled}
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
                                invalid={index > 0 && ((t.start <= timeSpans[index - 1].end) || (t.start <= timeSpans[index - 1].start) || (timeSpans[index - 1].end <= timeSpans[index - 1].start))}
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                start={t.start}
                                end={t.end}
                                disabled={disabled}
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
    defaultStart: PropTypes.string.isRequired,
    defaultEnd: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDayAdd: PropTypes.func.isRequired,
    onDayRemove: PropTypes.func.isRequired,
};
Day.defaultProps = {
    disabled: false,
};
export default Day;
