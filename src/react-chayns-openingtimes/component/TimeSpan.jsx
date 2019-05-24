import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Input from '../../react-chayns-input/component/Input';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';
import Icon from '../../react-chayns-icon/component/Icon';

class TimeSpan extends Component {
    static propTypes = {
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        buttonType: PropTypes.number.isRequired,
        onAdd: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        disabled: false,
    };

    static OFF = 0;

    static ADD = 1;

    static REMOVE = 2;

    static defaultStart = '08:00';

    static defaultEnd = '18:00';

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setStartTimeRef = this.setRef.bind(this, 'startTime');
        this.setEndTimeRef = this.setRef.bind(this, 'endTime');

        this.state = {
            startTime: props.disabled ? TimeSpan.defaultStart : props.start,
            endTime: props.disabled ? TimeSpan.defaultEnd : props.end,
        };
    }

    componentWillReceiveProps(nextProps) {
        const newState = Object.assign({}, this.state);
        newState.startTime = nextProps.start;
        newState.endTime = nextProps.end;
        this.setState(newState);
    }

    onClick() {
        const { buttonType, onAdd, onRemove } = this.props;
        if (buttonType === TimeSpan.ADD) onAdd(TimeSpan.defaultStart, TimeSpan.defaultEnd);
        if (buttonType === TimeSpan.REMOVE) onRemove();
    }

    onChange(value, inputField) {
        const { onChange } = this.props;
        const newState = Object.assign(this.state);

        if (this.checkInputChars(value)) {
            if (inputField === 'start' && this.startTime) newState.startTime = value;
            else newState.endTime = value;

            this.setState(newState);
        }

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
        const newState = Object.assign({}, this.state);
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
        onChange(newState.startTime, newState.endTime);
    }

    // eslint-disable-next-line class-methods-use-this
    checkInputChars(str) {
        if (str.length > 6) return false;

        let alreadyFoundColon = false;

        for (let i = 0; i < str.length; i += 1) {
            const charCode = str.charCodeAt(i);
            if (charCode === 58) {
                if (alreadyFoundColon) return false;
                alreadyFoundColon = true;
            }

            if (charCode > 58 || charCode < 48) return false;
        }

        return true;
    }

    // eslint-disable-next-line class-methods-use-this
    isValidTime(str) {
        if (str.length === 5 && str.search(':') === 2) {
            const parts = str.split(':');

            const hours = parseInt(parts[0], 0);
            const minutes = parseInt(parts[1], 0);

            if (hours > -1 && hours < 24 && minutes > -1 && minutes < 60) return true;
        }

        return false;
    }

    render() {
        const {
            disabled,
            buttonType,
        } = this.props;

        const { state } = this;

        return (
            <div className={`${disabled ? 'time--disabled' : 'time--active'} time__span`}>
                <div className="time__span--input">
                    <Input
                        inputRef={this.setStartTimeRef}
                        value={state.startTime}
                        onChange={val => this.onChange(val, 'start')}
                        onBlur={() => this.autoFormat('start')}
                    />
                </div>
                <span>-</span>
                <div className="time__span--input">
                    <Input
                        inputRef={this.setEndTimeRef}
                        value={state.endTime}
                        onChange={val => this.onChange(val, 'end')}
                        onBlur={() => this.autoFormat('end')}
                    />
                </div>
                <div className="time__span--button">
                    {
                        buttonType !== TimeSpan.OFF && (
                            <ChooseButton
                                onClick={this.onClick}
                            >
                                <Icon
                                    icon={faPlus}
                                    className={`fa-xs openingTimesIcon ${buttonType === TimeSpan.ADD ? 'add' : 'remove'}`}
                                />
                            </ChooseButton>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default TimeSpan;
