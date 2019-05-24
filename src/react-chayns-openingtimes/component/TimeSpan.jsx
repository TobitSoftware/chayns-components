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

    // eslint-disable-next-line react/sort-comp
    autoFormat(inputField) {
        const { onChange } = this.props;
        const newState = Object.assign({}, this.state);

        let newVal = inputField === 'start' ? newState.startTime : newState.endTime;

        const digits = this.getTimeDigits(newVal);

        console.log(this.inspectTimeStr(newVal));

        switch (digits.length) {
        case 1:
            newVal = `0${digits[0]}:00`;
            break;
        case 2:
            newVal = `${digits[0]}${digits[1]}:00`;
            break;
        case 3:
            newVal = `${digits[0]}${digits[1]}:${digits[2]}0`;
            break;
        case 4:
            newVal = `${digits[0]}${digits[1]}:${digits[2]}${digits[3]}`;
            break;
        case 5:
            newVal = `${digits[0]}${digits[1]}:${digits[2]}${digits[3]}`;
            break;
        default:
            newVal = '00:00';
            break;
        }

        const parts = newVal.split(':');
        const hours = parseInt(parts[0], 0);
        const minutes = parseInt(parts[1], 0);

        if (hours > 24) parts[0] = '23';
        if (minutes > 59) parts[1] = '59';

        newVal = `${parts[0]}:${parts[1]}`;

        if (inputField === 'start') newState.startTime = newVal;
        else newState.endTime = newVal;

        this.setState(newState);
        onChange(newState.startTime, newState.endTime);
    }

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
    getTimeDigits(str) {
        const digits = [];

        for (let i = 0; i < str.length; i += 1) {
            const charCode = str.charCodeAt(i);
            const char = str.charAt(i);

            if (charCode > 47 && charCode < 58) {
                digits.push(char);
            }
        }

        return digits;
    }

    setRef = (name, ref) => {
        this[name] = ref;
    };

    // eslint-disable-next-line class-methods-use-this
    checkInputChars(str) {
        if (str.length > 5) return false;

        let alreadyFoundColon = false;

        for (let i = 0; i < str.length; i += 1) {
            const char = str.charCodeAt(i);
            if (char === 58) {
                if (alreadyFoundColon) return false;
                alreadyFoundColon = true;
            } else if (!(char > 47 && char < 58)) return false;
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
