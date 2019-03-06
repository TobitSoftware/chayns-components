import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from '../../react-chayns-input/component/Input';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';
import Icon from '../../react-chayns-icon/component/Icon';

class TimeSpan extends Component {
    static propTypes = {
        start: PropTypes.string,
        end: PropTypes.string,
        disabled: PropTypes.bool,
        buttonType: PropTypes.number.isRequired,
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        onChange: PropTypes.func,
        invalid: PropTypes.bool,
    };

    static defaultProps = {
        invalid: false,
        start: '08:00',
        end: '18:00',
        disabled: false,
        onAdd: null,
        onRemove: null,
        onChange: null,

    };

    static OFF = 0;

    static ADD = 1;

    static REMOVE = 2;

    static defaultStart = '08:00';

    static defaultEnd = '18:00';

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.state = {
            start: props.start || TimeSpan.defaultStart,
            end: props.end || TimeSpan.defaultEnd,
        };
        this.timeout = null;
        this.t = null;
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            start,
            end,
        } = this.state;
        const { onChange } = this.props;

        if (onChange) {
            if (prevState.end !== end || prevState.start !== start) {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    onChange(this.toHHMM(start), this.toHHMM(end));
                }, 800);
            } else if (start !== this.props.start || end !== this.props.end) {
                this.setState({
                    start: this.props.start,
                    end: this.props.end,
                });
            }
        }
    }

    onClick() {
        const { buttonType, onAdd, onRemove } = this.props;
        const {
            end,
        } = this.state;
        if (buttonType === TimeSpan.ADD) onAdd(this.addHours(end, 1), this.addHours(end, 2));
        if (buttonType === TimeSpan.REMOVE) onRemove();
    }

    addHours = (text, num) => {
        const output = text;
        let number = Number(`${text.charAt(0)}${text.charAt(1)}`) + num;
        if (number > 23) {
            number = Math.abs((24 * ((num / 24) + 1).toFixed()) - number);
            if (number < 10) {
                return `0${number}${output.substring(2)}`;
            }
            return `${number}${output.substring(2)}`;
        }
        return `${`${number}`.length === 1 ? `0${number}` : number}${output.substring(2)}`;
    };

    toHHMM = (hrNum) => {
        let output = hrNum;
        if (/^:/.test(output)) {
            output = `00${output}`;
        }
        if (/^([0-9]):/.test(output)) {
            output = `0${output}`;
        }
        if (/^(0[0-9]|1[0-9]|2[0-3]):$/.test(output)) {
            output = `${output}00`;
        }
        if (/^(0[0-9]|1[0-9]|2[0-3]):[0-5]$/.test(output)) {
            output = `${output}0`;
        }
        if (/^(0[0-9]|1[0-9]|2[0-3]):[6-9]$/.test(output)) {
            output = `${output.substring(0, 3)}0${output.substring(3)}`;
        }
        if (/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(output)) {
            return output;
        }
        let hours = Math.floor(hrNum);
        let minutes = Math.floor(60 * (hrNum % 1));

        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`;
    };

    render() {
        const {
            disabled,
            buttonType,
            invalid,
        } = this.props;

        const {
            start,
            end,
        } = this.state;
        return (
            <div className={`${disabled ? 'time--disabled' : 'time--active'} time__span`}>
                <div className="time__span--input">
                    <Input
                        invalid={invalid}
                        value={start}
                        onChange={(val) => {
                            if (/^((([0]?[0-9]?|1?[0-9]?|2?[0-3]?):([0-5]?[0-9]?)?)?|([0][0-9]|[1][0-9]|[2][0-3])|([0-9]))$|^[ ]*$/.test(val)) {
                                this.setState({
                                    start: val,
                                });
                            }
                        }}
                    />
                </div>
                <span>-</span>
                <div className="time__span--input">
                    <Input
                        invalid={invalid}
                        value={end}
                        onChange={(val) => {
                            if (/^((([0]?[0-9]?|1?[0-9]?|2?[0-3]?):([0-5]?[0-9]?)?)?|([0][0-9]|[1][0-9]|[2][0-3])|([0-9]))$|^[ ]*$/.test(val)) {
                                this.setState({
                                    end: val,
                                });
                            }
                        }}
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
