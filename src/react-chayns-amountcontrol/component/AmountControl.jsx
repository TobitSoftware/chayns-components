import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import ControlButton from './ControlButton';
import AmountInput from './AmountInput';

export default class AmountControl extends PureComponent {
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
        plusIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        minusIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        removeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        removeColor: PropTypes.string,
        addColor: PropTypes.string,
        iconColor: PropTypes.string,
        equalize: PropTypes.string,
        focusOnClick: PropTypes.bool,
        contentWidth: PropTypes.number,
        stopPropagation: PropTypes.bool,
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
        contentWidth: null,
        stopPropagation: false,
        plusIcon: faPlus,
        minusIcon: faMinus,
        removeIcon: faMinus,
    };

    constructor(props) {
        super(props);

        this.state = {
            tempAmount: props.amount,
            tempValue: props.amount,
            showInput: false,
        };

        this.setInput = this.setInput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tempAmount: nextProps.amount,
            tempValue: nextProps.amount,
        });
    }

    onInput = (value) => {
        const { onInput } = this.props;
        let numberValue = 0;

        if (chayns.utils.isNumber(value)) {
            numberValue = value;
        }

        this.setState({
            tempAmount: numberValue,
            tempValue: value,
        });

        if (onInput && (numberValue || numberValue >= 0)) {
            onInput(numberValue);
        }
    };

    getRemoveIcon() {
        const {
            amount, icon, removeIcon, minusIcon,
        } = this.props;
        const { tempAmount } = this.state;

        if (icon && !tempAmount) {
            return icon;
        }

        if (tempAmount > 1 || amount > 1) {
            return minusIcon;
        }

        return removeIcon;
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
            this.setInput(false);
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
            contentWidth,
            stopPropagation,
            plusIcon,
        } = this.props;
        const { tempAmount, tempValue, showInput } = this.state;

        return (
            <div className={classNames('cc__amount-control choosebutton', className, {
                'cc__amount-control--active': amount > 0,
                'cc__amount-control--disabled': disabled,
            })}
            >
                <ControlButton
                    stopPropagation={stopPropagation}
                    icon={this.getRemoveIcon()}
                    onClick={this.removeItem}
                    disabled={disabled || disableRemove}
                    className={classNames('cc__amount-control__remove', { 'cc__amount-control--icon': amount > 0 || icon })}
                    color={(icon && !tempAmount) ? iconColor : removeColor}
                />
                <AmountInput
                    stopPropagation={stopPropagation}
                    contentWidth={contentWidth}
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
                    tempValue={tempValue}
                    setInput={this.setInput}
                    focusOnClick={focusOnClick}
                />
                <ControlButton
                    stopPropagation={stopPropagation}
                    icon={plusIcon}
                    onClick={this.addItem}
                    disabled={disabled || disableAdd}
                    className={classNames('cc__amount-control__add', { 'cc__amount-control--icon': amount > 0 })}
                    color={addColor}
                />
            </div>
        );
    }
}
