import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../../react-chayns-input/component/Input';

import { getTimeStringMinutes, getTimeStringFromMinutes } from '../../utils/dateTimeHelper';
import { checkTimeSpan } from '../utils/checkTimeSpan';
import { validateTimeSpan } from '../utils/validateTimeSpan';

function checkInputChars(str) {
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

function inspectTimeStr(str) {
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

function generateTimePart(digits, type) {
    if (digits.length === 1) {
        if (type === 'minutes') return `${digits[0]}0`;
        return `0${digits[0]}`;
    }
    if (digits.length === 2) return `${digits[0]}${digits[1]}`;
    return '00';
}

const TimeSpan = React.memo(({ startTime, endTime, onChange, childrenRef, isInvalid, disabled }) => {
    const [time, setTime] = useState({
        startTime,
        endTime,
    });

    const handleChange = useCallback((inputField) => (value) => setTime((currentState) => {
        let newState = currentState;
        // Apply input value only if chars are valid
        if (checkInputChars(value)) {
            newState = { ...currentState };

            if (inputField === 'start') {
                newState.startTime = value;
            } else {
                newState.endTime = value;
            }
        }

        window.setTimeout(() => { // call in non-blocking way
            // Call onChange if time string is valid
            onChange(newState.startTime, newState.endTime);
        }, 0);

        return newState;
    }), [onChange, setTime]);

    const handleStartChange = useMemo(() => handleChange('start'), [handleChange]);
    const handleEndChange = useMemo(() => handleChange('end'), [handleChange]);

    useEffect(() => {
        if (validateTimeSpan(startTime, endTime)) {
            setTime({
                startTime,
                endTime,
            });
        }
    }, [startTime, endTime, setTime]);

    const handleAutoFormat = useCallback((inputField) => () => setTime((currentState) => {
        const newState = { ...currentState };
        const val = inputField === 'start' ? newState.startTime : newState.endTime;
        const inspectResult = inspectTimeStr(val);

        let minutePart = generateTimePart(inspectResult.right, 'minutes');
        let hourPart = generateTimePart(inspectResult.left, 'hours');

        if (parseInt(minutePart, 0) > 59) minutePart = '59';
        if (parseInt(hourPart, 0) > 23) hourPart = '23';

        const timeStr = `${hourPart}:${minutePart}`;

        if (inputField === 'start') newState.startTime = timeStr;
        else newState.endTime = timeStr;

        if (newState.startTime === newState.endTime) {
            newState.endTime = getTimeStringFromMinutes(getTimeStringMinutes(newState.endTime + 60));
        }

        window.setTimeout(() => { // call in non-blocking way
            // Call onChange if time string is valid
            onChange(newState.startTime, newState.endTime);
        }, 0);

        return newState;
    }), [setTime, onChange]);

    const handleStartAutoFormat = useMemo(() => handleAutoFormat('start'), [handleAutoFormat]);
    const handleEndAutoFormat = useMemo(() => handleAutoFormat('end'), [handleAutoFormat]);

    const timeSpanValid = checkTimeSpan(time.startTime, time.endTime);

    return (
        <div className={`${disabled ? 'time--disabled' : 'time--active'} time__span`} ref={childrenRef}>
            <div className="time__span--input">
                <Input
                    value={time.startTime}
                    onChange={handleStartChange}
                    onBlur={handleStartAutoFormat}
                    onEnter={handleStartAutoFormat}
                    invalid={!timeSpanValid || isInvalid}
                />
            </div>
            <span>-</span>
            <div className="time__span--input">
                <Input
                    value={time.endTime}
                    onChange={handleEndChange}
                    onBlur={handleEndAutoFormat}
                    onEnter={handleEndAutoFormat}
                    invalid={!timeSpanValid || isInvalid}
                />
            </div>
        </div>
    );
});

TimeSpan.OFF = 0;

TimeSpan.ADD = 1;

TimeSpan.REMOVE = 2;

TimeSpan.defaultStart = '08:00';

TimeSpan.defaultEnd = '18:00';

TimeSpan.propTypes = {
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool,
    childrenRef: PropTypes.func,
};

TimeSpan.defaultProps = {
    disabled: false,
    isInvalid: false,
    childrenRef: null,
};

TimeSpan.displayName = 'TimeSpan';

export default TimeSpan;
