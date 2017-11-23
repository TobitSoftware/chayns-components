import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ControlButton from './ControlButton';
import AmountInput from './AmountInput';

export default class AmountControl extends React.Component {
    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        amount: PropTypes.number,
        onChange: PropTypes.func,
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
    };

    static defaultProps = {
        amount: 0,
        onChange: null,
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
        const { onChange } = this.props;

        if(onChange) {
            onChange(amount);
        }
    };

    render() {
        const { amount, buttonText, equalize, disabled, disableInput, disableAdd, disableRemove, className, autoInput, buttonFormatHandler, showInput } = this.props;

        const classNames = classnames('amount-control', {
            'amount-control--active': amount > 0,
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
                    className="amount-control__remove"
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
                />
                <ControlButton
                    icon="fa-plus"
                    onClick={this.addItem}
                    disabled={disabled || disableAdd}
                    className="amount-control__add"
                />
            </div>
        );
    }
}
