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
    }

    onClick() {
        const { buttonType, onAdd, onRemove } = this.props;
        if (buttonType === TimeSpan.ADD) onAdd(TimeSpan.defaultStart, TimeSpan.defaultEnd);
        if (buttonType === TimeSpan.REMOVE) onRemove();
    }

    onChange(_) {
        if (_.length <= 5) {
            const { onChange } = this.props;
            if (this.checkValidInput(_) && this.startTime && this.endTime) {
                onChange(this.startTime.value, this.endTime.value);
            }
        }
    }

    // eslint-disable-next-line react/sort-comp
    autoFormat(inputField) {
        const { onChange } = this.props;
        let value = null;
        let newVal = '';

        switch (inputField) {
        case 'start':
            value = this.startTime.value;
            break;
        case 'end':
            value = this.endTime.value;
            break;
        default:
            break;
        }

        const digits = this.getDigits(value);
        while (digits.length < 4) digits.push('0');

        for (let i = 0; i < digits.length; i += 1) {
            if (i === 2) newVal += ':';
            newVal += digits[i];
        }

        switch (inputField) {
        case 'start':
            onChange(newVal, this.endTime.value);
            break;
        case 'end':
            onChange(this.startTime.value, newVal);
            break;
        default:
            break;
        }
    }

    getDigits(str) {
        const digits = [];
        
        for (let i = 0; i < str.length; i += 1) {
            const charCode = str.charCodeAt(i);
            const char = str.charAt(i);

            if (charCode > 47 && charCode < 58) {
                digits.push(char);
            }
        }

        return digits.length > 0 ? digits : null;
    }

    setRef = (name, ref) => {
        this[name] = ref;
    };

    // eslint-disable-next-line class-methods-use-this
    checkValidInput(str) {
        for (let i = 0; i < str.length; i += 1) {
            const char = str.charCodeAt(i);
            if (!(char > 47 && char < 59)) return false;
        }

        return true;
    }

    render() {
        const {
            start,
            end,
            disabled,
            buttonType,
        } = this.props;

        return (
            <div className={`${disabled ? 'time--disabled' : 'time--active'} time__span`}>
                <div className="time__span--input">
                    <Input
                        inputRef={this.setStartTimeRef}
                        value={disabled ? TimeSpan.defaultStart : start}
                        onChange={this.onChange}
                        onBlur={() => this.autoFormat('start')}
                    />
                </div>
                <span>-</span>
                <div className="time__span--input">
                    <Input
                        inputRef={this.setEndTimeRef}
                        value={disabled ? TimeSpan.defaultEnd : end}
                        onChange={this.onChange}
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
