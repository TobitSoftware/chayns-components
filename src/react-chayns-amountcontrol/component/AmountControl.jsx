import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ControlButton from './ControlButton';
import AmountInput from './AmountInput';

export default class AmountControl extends Component {
    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        amount: PropTypes.number,
        onChange: PropTypes.func,
        onInput: PropTypes.func,
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        equalize: PropTypes.string,
        disabled: PropTypes.bool,
        disableInput: PropTypes.bool,
        disableAdd: PropTypes.bool,
        disableRemove: PropTypes.bool,
        className: PropTypes.string,
        autoInput: PropTypes.bool,
        buttonFormatHandler: PropTypes.func,
        showInput: PropTypes.bool,
        shopStyle: PropTypes.bool,
    };

    static defaultProps = {
        amount: 0,
        onChange: null,
        onInput: null,
        onAdd: null,
        onRemove: null,
        equalize: null,
        disabled: false,
        disableInput: false,
        disableAdd: false,
        disableRemove: false,
        className: '',
        autoInput: false,
        buttonFormatHandler: undefined,
        showInput: false,
        shopStyle: false,
    };

    constructor() {
        super();

        this.state = {
            tempValue: null
        };
    }

    componentWillReceiveProps() {
        this.setState({
            tempValue: null
        });
    }

    onInput = (value) => {
        this.setState({
            tempValue: value
        });

        const { onInput } = this.props;

        if(onInput && (value || value === 0)) {
            onInput(value);
        }
    };

    getRemoveIcon() {
        const { amount } = this.props;
        const { tempValue } = this.state;

        if(amount > 1 && tempValue > 1) {
            return 'fa-minus';
        }

        if(tempValue > 1) {
            return 'fa-minus';
        }

        if(amount > 1 && tempValue === null) {
            return 'fa-minus';
        }

        return 'fa-trash fa-2x';
    }

    addItem = () => {
        const { amount, onAdd } = this.props;

        if(onAdd) onAdd();

        this.changeAmount(amount + 1);
    };

    removeItem = () => {
        const { amount, onRemove } = this.props;

        if(onRemove) onRemove();

        if(amount - 1 >= 0) {
            this.changeAmount(amount - 1);
        }
    };

    changeAmount = (amount) => {
        const { onChange, onInput } = this.props;

        if(onChange) {
            onChange(amount);
        }

        if(onInput) {
            onInput(amount);
        }
    };

    render() {
        const {
            amount,
            buttonText,
            equalize,
            disabled,
            disableInput,
            disableAdd,
            disableRemove,
            className,
            autoInput,
            buttonFormatHandler,
            showInput,
            shopStyle,
        } = this.props;

        if(window.debugLevel >= 3) {
            console.debug('render amount-control component', this.props, this.state);
        }

        const classNames = classnames('cc__amount-control', {
            'cc__amount-control--active': amount > 0,
            'cc__amount-control--shop': shopStyle,
            [className]: className
        });

        return(
            <div
                className={classNames}
                ref={(node) => { this.node = node; }}
            >
                <ControlButton
                    icon={this.getRemoveIcon()}
                    onClick={this.removeItem}
                    disabled={disabled || disableRemove}
                    className="cc__amount-control__remove"
                />
                <AmountInput
                    autoInput={autoInput}
                    amount={amount}
                    onChange={this.changeAmount}
                    onInput={this.onInput}
                    onAdd={this.addItem}
                    buttonText={buttonText}
                    disabled={disabled}
                    disableInput={disableInput}
                    equalize={equalize}
                    buttonFormatHandler={buttonFormatHandler}
                    showInput={!!showInput}
                    shopStyle={shopStyle}
                />
                <ControlButton
                    icon="fa-plus"
                    onClick={this.addItem}
                    disabled={disabled || disableAdd}
                    className="cc__amount-control__add"
                />
            </div>
        );
    }
}
