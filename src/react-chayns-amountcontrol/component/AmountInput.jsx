import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as equalizer from '../../utils/equalizer';
import { ChooseButton, Input } from '../../index';


const AUTO_HIDE_INPUT_MAX_AMOUNT = 9;

export default class AmountInput extends React.Component {
    static propTypes = {
        amount: PropTypes.number.isRequired,
        onAdd: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        buttonText: PropTypes.string.isRequired,
        showInput: PropTypes.bool.isRequired,
        equalize: PropTypes.string,
        disabled: PropTypes.bool,
        disableInput: PropTypes.bool,
        autoInput: PropTypes.bool,
        shopStyle: PropTypes.bool,
        buttonFormatHandler: PropTypes.func,
    };

    static defaultProps = {
        equalize: null,
        disabled: false,
        disableInput: false,
        autoInput: false,
        shopStyle: false,
        buttonFormatHandler: undefined,
    };

    constructor() {
        super();

        this.state = {
            showInput: false
        };
    }

    componentWillMount() {
        const { amount } = this.props;

        if (window.chayns.utils.isNumber(amount)) {
            this.setState({
                value: amount
            });
        }
    }

    componentDidMount() {
        const { equalize } = this.props;

        if(equalize) {
            equalizer.init();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.amount !== this.props.amount && this.state.value !== nextProps.amount) {
            this.setState({
                value: nextProps.amount
            });
        }

        if(nextProps.equalize) {
            equalizer.init();
        }
    }

    onButtonClick = () => {
        const { amount, onAdd } = this.props;

        if(amount > 0) {
            this.setState({
                showInput: true
            });
        } else {
            onAdd();
        }
    };

    onInputChange = (value) => {
        let inputValue = value.replace(/[\D\s]+/g, '');
        inputValue = parseInt(inputValue, 10);

        if(!window.chayns.utils.isNumber(inputValue)) {
            inputValue = null;
        }

        this.setState({
            value: inputValue
        });

        if(this.props.onInput) {
            this.props.onInput(inputValue);
        }
    };

    onInputBlur = () => {
        const { onChange } = this.props;
        const { value } = this.state;

        if(onChange) {
            onChange(value);
        }

        this.setState({
            showInput: false
        });
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
        const { amount } = this.props.amount;
        const inputValue = this.state.value;

        if(inputValue || inputValue === 0 || inputValue === '') {
            return inputValue;
        }

        if(window.chayns.utils.isNumber(amount)) {
            return amount;
        }

        return '';
    }

    render() {
        const {
            amount,
            equalize,
            disabled,
            disableInput,
            autoInput,
            showInput: showInputProp,
            shopStyle,
        } = this.props;
        const { showInput } = this.state;

        if(((!autoInput || amount <= AUTO_HIDE_INPUT_MAX_AMOUNT) && !showInput && !showInputProp) || disableInput || disabled) {
            const buttonClassName = classnames('cc__amount-control__button', {
                'cc__amount-control__button--price': !amount,
                'cc__amount-control__button--amount': amount
            });

            return (
                <ChooseButton
                    onClick={this.onButtonClick}
                    className={buttonClassName}
                    data-cc-equalize-width={equalize}
                    disabled={disabled}
                >
                    {this.getButtonValue()}
                </ChooseButton>
            );
        }

        return (
            <Input
                type="number"
                value={this.getInputValue()}
                onChange={this.onInputChange}
                className="cc__amount-control__input"
                onBlur={this.onInputBlur}
                data-cc-equalize-width={equalize}
                disabled={disabled}
                autoFocus={!shopStyle && window.chayns.env.isDesktop}
            />
        );
    }
}
