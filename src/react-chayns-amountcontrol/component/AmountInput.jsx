import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    };

    static defaultProps = {
        disabled: false,
        disableInput: false,
        autoInput: false,
        buttonFormatHandler: undefined,
        tempAmount: 0,
    };

    onButtonClick = () => {
        const { amount, onAdd, setInput } = this.props;

        if(amount > 0) {
            setInput();
        } else {
            onAdd();
        }
    };

    onInputChange = (value) => {
        let inputValue = value.target.value.replace(/[\D\s]+/g, '');
        inputValue = parseInt(inputValue, 10);

        if(!window.chayns.utils.isNumber(inputValue)) {
            inputValue = null;
        }

        const { onInput } = this.props;

        if(onInput) {
            onInput(inputValue);
        }
    };

    onInputBlur = () => {
        const { onChange, tempAmount } = this.props;
console.log("onInputBlur")
        if(onChange) {
            onChange(tempAmount);
        }
    };

    getButtonValue() {
        const { amount, buttonText, buttonFormatHandler } = this.props;

        if(buttonFormatHandler) {
            return buttonFormatHandler({ amount, buttonText });
        }

        if(amount > 0) {
            return `${amount}`;
        }

        return buttonText;
    }

    getInputValue() {
        const { amount, tempAmount } = this.props;

        if(tempAmount || tempAmount === 0 || tempAmount === '') {
            return tempAmount;
        }

        if(window.chayns.utils.isNumber(amount) && parseInt(amount, 10) !== 0) {
            return amount;
        }

        return '';
    }

    render() {
        const {
            amount,
            disabled,
            disableInput,
            autoInput,
            showInput: showInputProp,
            showInput,
        } = this.props;
console.log("input render",amount)
        if(((!autoInput || amount <= AUTO_HIDE_INPUT_MAX_AMOUNT) && !showInput && !showInputProp) || disableInput || disabled) {
            const buttonClassName = classnames('cc__amount-control__button', {
                'cc__amount-control__button--price': !amount,
                'cc__amount-control__button--amount': amount
            });

            return (
                <div
                    onClick={this.onButtonClick}
                    className={buttonClassName}
                    disabled={disabled}
                >
                    {this.getButtonValue()}
                </div>
            );
        }

        return (
            <Input
                type="number"
                value={this.getInputValue()}
                onChange={this.onInputChange}
                className="cc__amount-control__input"
                onBlur={this.onInputBlur}
                disabled={disabled}
                autoFocus={window.chayns.env.isDesktop}
            />
        );
    }
}
