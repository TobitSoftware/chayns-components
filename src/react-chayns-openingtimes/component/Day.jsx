import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import TimeSpan from './TimeSpan';
import Checkbox from '../../react-chayns-checkbox/component/Checkbox';
import Icon from '../../react-chayns-icon/component/Icon';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';

class Day extends Component {
    constructor(props) {
        super(props);

        this.onDayActivation = this.onDayActivation.bind(this);
        this.timeSpanKey1 = Math.random().toString();
        this.timeSpanKey2 = Math.random().toString();
    }

    onDayActivation(status) {
        const {
            onDayActivation,
            weekday,
        } = this.props;

        onDayActivation(weekday.number, status);
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
        const timeSpans = times.slice();
        const isDisabled = !times.some(t => !t.disabled);

        return (
            <div
                className={`flex times${timeSpans.length > 1 ? ' multiple' : ''}${isDisabled ? ' times--disabled' : ''}`}
            >
                <div className="flex__left">
                    <Checkbox
                        label={weekday.name}
                        onChange={this.onDayActivation}
                        checked={!isDisabled}
                    />
                </div>
                <div className="flex__middle">
                    {
                        timeSpans.map((t, index) => (
                            <TimeSpan
                                key={index === 0 ? this.timeSpanKey1 : this.timeSpanKey2}
                                start={t.start}
                                end={t.end}
                                disabled={isDisabled}
                                onChange={(start, end) => onChange(weekday.number, index, start, end)}
                            />
                        ))
                    }
                </div>
                <ChooseButton
                    className="flex__right"
                    onClick={() => {
                        if (timeSpans.length < 2) {
                            onAdd(weekday.number, TimeSpan.defaultStart, TimeSpan.defaultEnd);
                        } else {
                            onRemove(weekday.number, 1);
                        }
                    }}
                >
                    <Icon
                        icon={faPlus}
                        className={`fa-xs openingTimesIcon ${timeSpans.length < 2 ? 'add' : 'remove'}`}
                    />
                </ChooseButton>
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
