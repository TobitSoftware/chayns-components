import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../../react-chayns-input/component/Input';

import { getTimeStringMinutes, getTimeStringFromMinutes } from '../../utils/dateTimeHelper';

class TimeSpan extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.setStartTimeRef = this.setRef.bind(this, 'startTime');
        this.setEndTimeRef = this.setRef.bind(this, 'endTime');

        this.state = {
            startTime: props.start,
            endTime: props.end,
        };
    }

    componentDidUpdate(prevProps) {
        const { start, end } = this.props;
        if (prevProps.start !== start || prevProps.end !== end) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ startTime: start, endTime: end });
        }
    }

    onChange(value, inputField) {
        const { onChange } = this.props;
        const newState = Object.assign(this.state);

        // Apply input value only if chars are valid
        if (this.checkInputChars(value)) {
            if (inputField === 'start' && this.startTime) newState.startTime = value;
            else newState.endTime = value;

            this.setState(newState);
        }

        // Call onChange if time string is valid
        if (this.isValidTime(value)) onChange(newState.startTime, newState.endTime);
    }

    setRef = (name, ref) => {
        this[name] = ref;
    };

    // eslint-disable-next-line class-methods-use-this
    inspectTimeStr(str) {
        const leftDigits = [];
        const rightDigits = [];

        let foundColons = 0;

        for (let i = 0; i < str.length; i += 1) {
            const char = str.charAt(i);
            const charCode = str.charCodeAt(i);

            if (char === ':') foundColons += 1;
            else if (charCode > 47 && charCode < 58) {
                if (foundColons === 0 && leftDigits.length < 2) leftDigits.push(char);
                else if (rightDigits.length < 2) rightDigits.push(char);
            }
        }

        return {
            left: leftDigits,
            right: rightDigits,
            colons: foundColons,
        };
    }

    // eslint-disable-next-line class-methods-use-this
    generateTimePart(digits, type) {
        if (digits.length === 1) {
            if (type === 'minutes') return `${digits[0]}0`;
            return `0${digits[0]}`;
        }
        if (digits.length === 2) return `${digits[0]}${digits[1]}`;
        return '00';
    }

    autoFormat(inputField) {
        const { onChange } = this.props;
        const newState = { ...this.state };
        const val = inputField === 'start' ? newState.startTime : newState.endTime;
        const inspectResult = this.inspectTimeStr(val);

        let minutePart = this.generateTimePart(inspectResult.right, 'minutes');
        let hourPart = this.generateTimePart(inspectResult.left, 'hours');

        if (parseInt(minutePart, 0) > 59) minutePart = '59';
        if (parseInt(hourPart, 0) > 23) hourPart = '23';

        const timeStr = `${hourPart}:${minutePart}`;

        if (inputField === 'start') newState.startTime = timeStr;
        else newState.endTime = timeStr;

        this.setState(newState);

        if (newState.startTime === newState.endTime) {
            newState.endTime = getTimeStringFromMinutes(getTimeStringMinutes(newState.endTime + 60));
            this.setState(newState);
        }

        onChange(newState.startTime, newState.endTime);
    }

    // eslint-disable-next-line class-methods-use-this
    checkInputChars(str) {
        if (str.length > 5) return false;

        let alreadyFoundColon = false;

        for (let i = 0; i < str.length; i += 1) {
            const charCode = str.charCodeAt(i);
            if (charCode === 58) {
                // If char is colon and amount colons < 1 add colon
                if (alreadyFoundColon) return false;
                alreadyFoundColon = true;
            }

            // If not digit or colon return false
            if (charCode > 58 || charCode < 48) return false;
        }

        return true;
    }

    // eslint-disable-next-line class-methods-use-this
    isValidTime(str) {
        const regexRes = new RegExp('[0-9]{2}:[0-9]{2}').exec(str);

        if (regexRes) {
            const parts = regexRes[0].split(':');

            const hours = parseInt(parts[0], 0);
            const minutes = parseInt(parts[1], 0);

            // check time if its not like '24:60'
            if (hours > -1 && hours < 24 && minutes > -1 && minutes < 60) return true;
        }

        return false;
    }

    render() {
        const {
            disabled,
            childrenRef,
        } = this.props;

        const { startTime, endTime } = this.state;

        return (
            <div className={`${disabled ? 'time--disabled' : 'time--active'} time__span`} ref={childrenRef}>
                <div className="time__span--input">
                    <Input
                        inputRef={this.setStartTimeRef}
                        value={startTime}
                        onChange={(val) => this.onChange(val, 'start')}
                        onBlur={() => this.autoFormat('start')}
                        onEnter={() => this.autoFormat('start')}
                    />
                </div>
                <span>-</span>
                <div className="time__span--input">
                    <Input
                        inputRef={this.setEndTimeRef}
                        value={endTime}
                        onChange={(val) => this.onChange(val, 'end')}
                        onBlur={() => this.autoFormat('end')}
                        onEnter={() => this.autoFormat('end')}
                    />
                </div>
            </div>
        );
    }
}

TimeSpan.OFF = 0;

TimeSpan.ADD = 1;

TimeSpan.REMOVE = 2;

TimeSpan.defaultStart = '08:00';

TimeSpan.defaultEnd = '18:00';

TimeSpan.propTypes = {
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    childrenRef: PropTypes.func,
};

TimeSpan.defaultProps = {
    disabled: false,
    childrenRef: null,
};

export default TimeSpan;
