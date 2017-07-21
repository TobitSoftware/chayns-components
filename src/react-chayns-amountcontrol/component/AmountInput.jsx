import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {ChooseButton} from '../../index';
import {Input} from '../../index';


const AUTO_HIDE_INPUT_MAX_AMOUNT = 9;

export default class AmountInput extends React.Component {

    static propTypes = {
        amount: PropTypes.number,
        onChange: PropTypes.func,
        buttonText: PropTypes.string,
        equalize: PropTypes.string,
        disabled: PropTypes.bool,
        disableInput: PropTypes.bool
    };

    constructor() {
        super();

        this.state = {
            showInput: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.amount !== this.props.amount && this.state.value !== nextProps.amount) {
            this.setState({
                value: nextProps.amount
            });
        }
    }

    componentDidMount() {
        window.chayns.ui.equalizer.init();

        this.setState({
            width: this.node.style.width
        });
    }

    onButtonClick = () => {
        const {amount, onAdd} = this.props;

        if(amount > 0) {
            this.setState({
                showInput: true
            });
        } else {
            onAdd();
        }
    };

    onInputChange = (value) => {
        value = value.replace(/[\D\s]+/g, '');
        value = parseInt(value, 10);
        if(!window.chayns.utils.isNumber(value)) value = null;

        this.setState({
            value: value
        });

        if(this.props.onInput) {
            this.props.onInput(value);
        }
    };

    onInputBlur = () => {
        const {onChange} = this.props;
        const {value} = this.state;

        if(onChange) {
            onChange(value);
        }

        this.setState({
            showInput: false
        });
    };

    getButtonValue() {
        if(this.props.amount > 0) {
            return this.props.amount + '';
        }

        return this.props.buttonText;
    }

    getInputValue() {
        const {amount} = this.props.amount;

        let inputValue = this.state.value;
        if(inputValue || inputValue === 0 ||inputValue === '') return inputValue;

        if(window.chayns.utils.isNumber(amount)) {
            return amount;
        }

        return '';
    }

    render() {
        const {amount, equalize, disabled, disableInput} = this.props;
        const {showInput} = this.state;

        const buttonClassName = classnames('amount-control__button', {
            "amount-control__button--price": !amount,
            "amount-control__button--amount": amount
        });

        if((amount <= AUTO_HIDE_INPUT_MAX_AMOUNT && !showInput) || disableInput || disabled) {
            return (
                <ChooseButton
                    onClick={this.onButtonClick}
                    className={buttonClassName}
                    data-equalize-width={equalize}
                    buttonRef={(node) => this.node = node}
                    style={{width: this.state.width}}
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
                inputRef={(node) => this.node = node}
                style={{width: this.state.width}}
                disabled={disabled}
                autoFocus
            />
        )
    }
}