import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ChooseButton, Input } from '../../index';


const AUTO_HIDE_INPUT_MAX_AMOUNT = 9;

export default class AmountInput extends React.Component {
    static propTypes = {
        amount: PropTypes.number.isRequired,
        onAdd: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        buttonText: PropTypes.string.isRequired,
        equalize: PropTypes.string,
        disabled: PropTypes.bool,
        disableInput: PropTypes.bool,
    };

    static defaultProps = {
        equalize: null,
        disabled: false,
        disableInput: false
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
        window.chayns.ui.equalizer.init();

        this.setState({
            width: this.node.style.width
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.amount !== this.props.amount && this.state.value !== nextProps.amount) {
            this.setState({
                value: nextProps.amount
            });
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
        const { amount, buttonText } = this.props;

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
        const { amount, equalize, disabled, disableInput } = this.props;
        const { showInput } = this.state;

        if((amount <= AUTO_HIDE_INPUT_MAX_AMOUNT && !showInput) || disableInput || disabled) {
            const buttonClassName = classnames('amount-control__button', {
                'amount-control__button--price': !amount,
                'amount-control__button--amount': amount
            });

            return (
                <ChooseButton
                    onClick={this.onButtonClick}
                    className={buttonClassName}
                    data-equalize-width={equalize}
                    buttonRef={(node) => { this.node = node; }}
                    style={{ width: this.state.width }}
                    disabled={disabled}
                >
                    {this.getButtonValue()}
                </ChooseButton>
            );
        }

        return (
            <Input
                value={this.getInputValue()}
                onChange={this.onInputChange}
                className="amount-control__input"
                onBlur={this.onInputBlur}
                data-equalize-width={equalize}
                inputRef={(node) => { this.node = node; }}
                style={{ width: this.state.width }}
                disabled={disabled}
                autoFocus
            />
        );
    }
}
