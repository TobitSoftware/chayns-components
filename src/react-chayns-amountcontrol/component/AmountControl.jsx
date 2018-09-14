import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ControlButton from './ControlButton';
import AmountInput from './AmountInput';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';
import '../index.scss';

export default class AmountControl extends Component {
    static propTypes = {
        buttonText: PropTypes.string.isRequired,
        amount: PropTypes.number,
        onChange: PropTypes.func,
        onInput: PropTypes.func,
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        disabled: PropTypes.bool,
        disableInput: PropTypes.bool,
        disableAdd: PropTypes.bool,
        disableRemove: PropTypes.bool,
        className: PropTypes.string,
        autoInput: PropTypes.bool,
        buttonFormatHandler: PropTypes.func,
        showInput: PropTypes.bool,
        icon: PropTypes.string,
    };

    static defaultProps = {
        amount: 0,
        onChange: null,
        onInput: null,
        onAdd: null,
        onRemove: null,
        disabled: false,
        disableInput: false,
        disableAdd: false,
        disableRemove: false,
        className: '',
        autoInput: false,
        buttonFormatHandler: undefined,
        showInput: false,
        icon: null
    };

    constructor() {
        super();

        this.state = {
            tempAmount: null,
            showInput: false
        };

        this.showInput = this.showInput.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            tempAmount: null
        });
    }

    onInput = (value) => {
        this.setState({
            tempAmount: value
        });

        const { onInput } = this.props;

        if (onInput && (value || value >= 0)) {
            onInput(value);
        }
    };

    getRemoveIcon() {
        const { amount, icon } = this.props;
        const { tempAmount } = this.state;

        if (icon && ((tempAmount && tempAmount < 1) || (amount < 1 && !tempAmount))) {
            return icon;
        }

        if (tempAmount > 1 || (amount > 1 && !tempAmount)) {
            return 'fa-minus';
        }

        return 'fa-trash';
    }

    addItem = () => {
        const { amount, onAdd } = this.props;

        if (onAdd) onAdd();
        console.log('addItem', amount);
        this.changeAmount(amount + 1);
    };

    removeItem = () => {
        const { amount, onRemove } = this.props;

        if (onRemove) onRemove();
        console.log('removeItem', amount);
        if (amount > 0) {
            this.changeAmount(amount - 1);
        } else {
            this.addItem();
        }
    };

    changeAmount = (amount) => {
        console.log('changeAmount', amount);
        const { onChange, onInput } = this.props;

        if (onChange) {
            onChange(amount);
            this.setState({
                tempValue: null,
                showInput: false,
            });
        }

        if (onInput) {
            onInput(amount);
        }
    };

    showInput = () => {
        this.setState({ showInput: true });
    };

    render() {
        const {
            amount,
            buttonText,
            disabled,
            disableInput,
            disableAdd,
            disableRemove,
            className,
            autoInput,
            buttonFormatHandler,
            showInput,
            icon,
        } = this.props;
        const { tempAmount } = this.state;
        console.log('render', amount);
        if (window.debugLevel >= 3) {
            console.debug('render amount-control component', this.props, this.state);
        }

        const classNames = classnames('cc__amount-control', {
            'cc__amount-control--active': amount > 0,
            [className]: className
        });

        return (
            <ChooseButton className={classNames}>
                <ControlButton
                    icon={this.getRemoveIcon()}
                    onClick={this.removeItem}
                    disabled={disabled || disableRemove}
                    className={classnames('cc__amount-control__remove', { 'cc__amount-control--icon': amount > 0 || icon })}
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
                    buttonFormatHandler={buttonFormatHandler}
                    showInput={showInput}
                    tempAmount={tempAmount}
                    setInput={this.showInput}
                />
                <ControlButton
                    icon="fa-plus"
                    onClick={this.addItem}
                    disabled={disabled || disableAdd}
                    className={classnames('cc__amount-control__add', { 'cc__amount-control--icon': amount > 0 })}
                />
            </ChooseButton>
        );
    }
}
