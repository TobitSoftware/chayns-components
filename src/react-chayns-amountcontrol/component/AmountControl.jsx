import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import ControlButton from './ControlButton';
import AmountInput from './AmountInput';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';

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
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        removeColor: PropTypes.string,
        addColor: PropTypes.string,
        iconColor: PropTypes.string,
        equalize: PropTypes.string,
        focusOnClick: PropTypes.bool,
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
        icon: null,
        removeColor: null,
        addColor: null,
        iconColor: null,
        equalize: null,
        focusOnClick: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            tempAmount: props.amount,
            showInput: false,
        };

        this.setInput = this.setInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tempAmount: nextProps.amount
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
            return faMinus;
        }

        return faTrashAlt;
    }

    addItem = () => {
        const { amount, onAdd } = this.props;

        if (onAdd) onAdd();

        this.changeAmount(amount + 1);
    };

    removeItem = () => {
        const { amount, onRemove } = this.props;

        if (onRemove) onRemove();

        if (amount > 0) {
            this.changeAmount(amount - 1);
        } else {
            this.addItem();
        }
    };

    changeAmount = (amount) => {
        const { onChange, onInput } = this.props;

        if (onChange) {
            onChange(amount);
            this.setState({
                showInput: false,
            });
        }

        if (onInput) {
            onInput(amount);
        }
    };

    setInput = (value) => {
        this.setState({ showInput: value });
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
            showInput: showInputProp,
            icon,
            removeColor,
            addColor,
            iconColor,
            equalize,
            focusOnClick,
        } = this.props;
        const { tempAmount, showInput } = this.state;
        if (window.debugLevel >= 3) {
            console.debug('render amount-control component', this.props, this.state);
        }

        const classnames = classNames('cc__amount-control', {
            'cc__amount-control--active': amount > 0,
            [className]: className
        });

        return (
            <ChooseButton className={classnames}>
                <ControlButton
                    icon={this.getRemoveIcon()}
                    onClick={this.removeItem}
                    disabled={disabled || disableRemove}
                    className={classNames('cc__amount-control__remove', { 'cc__amount-control--icon': amount > 0 || icon })}
                    color={(icon && ((tempAmount && tempAmount < 1) || (amount < 1 && !tempAmount))) ? iconColor : removeColor}
                />
                <AmountInput
                    equalize={equalize}
                    autoInput={autoInput}
                    amount={amount}
                    onChange={this.changeAmount}
                    onInput={this.onInput}
                    onAdd={this.addItem}
                    buttonText={buttonText}
                    disabled={disabled}
                    disableInput={disableInput}
                    buttonFormatHandler={buttonFormatHandler}
                    showInput={showInput || showInputProp}
                    tempAmount={tempAmount}
                    setInput={this.setInput}
                    focusOnClick={focusOnClick}
                />
                <ControlButton
                    icon={faPlus}
                    onClick={this.addItem}
                    disabled={disabled || disableAdd}
                    className={classNames('cc__amount-control__add', { 'cc__amount-control--icon': amount > 0 })}
                    color={addColor}
                />
            </ChooseButton>
        );
    }
}
