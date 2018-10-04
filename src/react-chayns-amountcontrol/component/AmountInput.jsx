/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as equalizer from '../../utils/equalizer';

import Input from '../../react-chayns-input/component/Input';

const AUTO_HIDE_INPUT_MAX_AMOUNT = 9;

export default class AmountInput extends PureComponent {
    static propTypes = {
        amount: PropTypes.number.isRequired,
        onAdd: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        buttonText: PropTypes.string.isRequired,
        showInput: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        disableInput: PropTypes.bool,
        autoInput: PropTypes.bool,
        buttonFormatHandler: PropTypes.func,
        tempAmount: PropTypes.number,
        setInput: PropTypes.func.isRequired,
        equalize: PropTypes.string,
        focusOnClick: PropTypes.bool,
        contentWidth: PropTypes.number,
    };

    static defaultProps = {
        disabled: false,
        disableInput: false,
        autoInput: false,
        buttonFormatHandler: undefined,
        tempAmount: 0,
        equalize: null,
        focusOnClick: true,
        contentWidth: null,
    };

    static moveCaretAtEnd(e) {
        const tempValue = e.target.value;
        e.target.value = '';
        e.target.value = tempValue;
    }

    componentDidMount() {
        const {equalize} = this.props;

        if (equalize) {
            equalizer.init();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {equalize} = this.props;

        if (nextProps.equalize !== equalize) {
            equalizer.init();
        }
    }

    onButtonClick = () => {
        const {amount, onAdd, setInput} = this.props;
        if (amount > 0) {
            setInput(true);
        } else {
            onAdd();
        }
    };

    onInputChange = (value) => {
        let inputValue = value.target.value.replace(/[\D\s]+/g, '');
        inputValue = parseInt(inputValue, 10);

        if (!window.chayns.utils.isNumber(inputValue)) {
            inputValue = null;
        }

        const {onInput} = this.props;

        if (onInput) {
            onInput(inputValue);
        }
    };

    onInputBlur = () => {
        const {setInput, onChange} = this.props;
        let {tempAmount} = this.props;
        tempAmount = tempAmount === null ? 0 : tempAmount;
        setInput(false);
        onChange(tempAmount);
    };

    onKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.onInputBlur();
        }
    };

    getButtonValue() {
        const {amount, buttonText, buttonFormatHandler} = this.props;

        if (buttonFormatHandler) {
            return buttonFormatHandler({amount, buttonText});
        }

        if (amount > 0) {
            return `${amount}`;
        }

        return buttonText;
    }

    render() {
        const {
            amount,
            disabled,
            disableInput,
            autoInput,
            showInput,
            equalize,
            focusOnClick,
            tempAmount,
            contentWidth,
        } = this.props;

        const renderInput = !disabled && !disableInput && ((autoInput && amount > AUTO_HIDE_INPUT_MAX_AMOUNT) || showInput);

        return (
            <div data-cc-equalize-width={equalize} style={(contentWidth) ? {width: `${contentWidth}px`} : undefined}>
                {
                    renderInput
                        ? (
                            <Input
                                type="number"
                                value={tempAmount}
                                onChange={this.onInputChange}
                                className="cc__amount-control__input"
                                onBlur={this.onInputBlur}
                                disabled={disabled}
                                autoFocus={focusOnClick}
                                onFocus={this.moveCaretAtEnd}
                                onKeyUp={this.onKeyUp}
                                style={{width: '100%', display: 'inline-block'}}
                            />
                        )
                        : (
                            <div
                                onClick={this.onButtonClick}
                                className={classNames('cc__amount-control__button', {
                                    'cc__amount-control__button--price': !amount,
                                    'cc__amount-control__button--amount': amount,
                                    disabled,
                                })}
                                style={{width: '100%'}}
                            >
                                {this.getButtonValue()}
                            </div>
                        )
                }
            </div>
        );
    }
}
