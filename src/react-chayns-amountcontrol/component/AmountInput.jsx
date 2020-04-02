/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import equalizer from '../../utils/equalizer';

import Input from '../../react-chayns-input/component/Input';

const AUTO_HIDE_INPUT_MAX_AMOUNT = 9;

export default class AmountInput extends PureComponent {
    componentDidMount() {
        const { equalize } = this.props;

        if (equalize) {
            equalizer();
        }
    }

    componentDidUpdate(prevProps) {
        const { equalize, showInput, focusOnClick } = this.props;

        if (prevProps.equalize !== equalize) {
            equalizer();
        }
        if (showInput && !prevProps.showInput && focusOnClick) {
            if (this.inputRef) {
                this.inputRef.focus();
            }
        }
    }

    onButtonClick = (e) => {
        const {
            amount, onAdd, stopPropagation,
        } = this.props;
        if (amount <= 0) {
            onAdd();
        }
        if (stopPropagation) e.stopPropagation();
    };

    onInputChange = (value) => {
        let inputValue = value.replace(/[\D\s]+/g, '');
        inputValue = parseInt(inputValue, 10);

        if (Number.isNaN(inputValue)) {
            inputValue = '';
        }

        const { onInput } = this.props;

        if (onInput) {
            onInput(inputValue);
        }
    };

    onInputBlur = () => {
        const { onChange } = this.props;
        let { tempAmount } = this.props;
        tempAmount = tempAmount === null ? 0 : tempAmount;
        onChange(tempAmount);
    };

    setRef = (ref) => {
        this.inputRef = ref;
    };

    getButtonValue() {
        const { amount, buttonText, buttonFormatHandler } = this.props;

        if (buttonFormatHandler) {
            return buttonFormatHandler({
                amount,
                buttonText,
            });
        }

        if (amount > 0) {
            return `${amount}`;
        }

        return buttonText || 0;
    }

    render() {
        const {
            amount,
            disabled,
            disableInput,
            autoInput,
            showInput,
            equalize,
            tempValue,
            contentWidth,
            stopPropagation,
        } = this.props;

        const renderInput = !disabled && !disableInput && ((autoInput && amount > AUTO_HIDE_INPUT_MAX_AMOUNT) || showInput);

        return [
            <Input
                onClick={stopPropagation ? (event) => event.stopPropagation() : null}
                key="amountInput"
                type="number"
                value={tempValue.toString()}
                onChange={this.onInputChange}
                className="cc__amount-control__input"
                onBlur={this.onInputBlur}
                disabled={disabled}
                onEnter={this.onInputBlur}
                customProps={{ 'data-cc-equalize-width': equalize }}
                inputRef={this.setRef}
                style={{ ...{ width: `${contentWidth || 55}px` }, ...(renderInput ? null : { display: 'none' }) }}
            />,
            <div
                key="amountDiv"
                onClick={this.onButtonClick}
                className={classNames('cc__amount-control__button', {
                    'cc__amount-control__button--price': !amount,
                    'cc__amount-control__button--amount': amount,
                    disabled,
                })}
                data-cc-equalize-width={equalize}
                style={{ ...(contentWidth ? { width: `${contentWidth}px` } : null), ...(!renderInput ? null : { display: 'none' }) }}
            >
                {this.getButtonValue()}
            </div>,
        ];
    }
}

AmountInput.propTypes = {
    amount: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired,
    onInput: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    showInput: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    disableInput: PropTypes.bool,
    autoInput: PropTypes.bool,
    buttonFormatHandler: PropTypes.func,
    tempAmount: PropTypes.number,
    tempValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    equalize: PropTypes.string,
    focusOnClick: PropTypes.bool,
    contentWidth: PropTypes.number,
    stopPropagation: PropTypes.bool.isRequired,
};

AmountInput.defaultProps = {
    buttonText: null,
    disabled: false,
    disableInput: false,
    autoInput: false,
    buttonFormatHandler: undefined,
    tempAmount: 0,
    tempValue: '0',
    equalize: null,
    focusOnClick: true,
    contentWidth: null,
};

AmountInput.displayName = 'AmountInput';
