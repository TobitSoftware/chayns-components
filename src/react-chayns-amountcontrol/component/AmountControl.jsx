import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ControlButton from './ControlButton';
import AmountInput from './AmountInput';

export default class AmountControl extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tempAmount: props.amount,
            tempValue: props.amount,
        };
    }

    componentDidUpdate(prevProps) {
        const { amount } = this.props;
        if (prevProps.amount !== amount) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                tempAmount: amount,
                tempValue: amount,
            });
        }
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
            amount,
            icon,
            removeIcon,
            minusIcon,
            hasAlwaysControls,
        } = this.props;
        const { tempAmount } = this.state;

        if (icon && !tempAmount && !hasAlwaysControls) {
            return icon;
        }

        if (tempAmount > 1 || amount > 1) {
            return minusIcon;
        }

        return removeIcon;
    }

    addItem = () => {
        const { amount, onAdd, max } = this.props;

        if (max && amount + 1 > max) {
            return;
        }

        if (onAdd) onAdd();

        this.changeAmount(amount + 1);
    };

    removeItem = () => {
        const { amount, onRemove, min, hasAlwaysControls } = this.props;

        if (min && amount - 1 < min) {
            return;
        }

        if (onRemove) onRemove();

        if (amount > 0) {
            this.changeAmount(amount - 1);
        } else if (!hasAlwaysControls) {
            this.addItem();
        }
    };

    changeAmount = (amount) => {
        const {
            onChange,
            onInput,
            amount: oldAmount,
            disableAdd,
            disableRemove,
            min,
            max,
        } = this.props;

        if (onInput) {
            onInput(amount);
        }

        if (onChange) {
            if (
                (disableAdd && amount > oldAmount) ||
                (disableRemove && amount < oldAmount) ||
                (min && amount < min) ||
                (max && amount > max)
            ) {
                this.setState({
                    tempValue: oldAmount,
                });

                return;
            }
            onChange(amount);
        }
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
            max,
            min,
            hasAlwaysControls,
        } = this.props;
        const { tempAmount, tempValue } = this.state;

        return (
            <div
                className={classNames(
                    'cc__amount-control choosebutton',
                    className,
                    {
                        'cc__amount-control--active':
                            amount > 0 || hasAlwaysControls,
                        'cc__amount-control--disabled': disabled,
                    }
                )}
            >
                <ControlButton
                    stopPropagation={stopPropagation}
                    icon={this.getRemoveIcon()}
                    onClick={this.removeItem}
                    disabled={
                        disabled ||
                        disableRemove ||
                        (min && amount <= (min || 0))
                    }
                    className={classNames('cc__amount-control__remove', {
                        'cc__amount-control--icon':
                            amount > 0 || icon || hasAlwaysControls,
                    })}
                    color={
                        icon && !tempAmount && !hasAlwaysControls
                            ? iconColor
                            : removeColor
                    }
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
                    showInput={
                        tempAmount !== 0 ||
                        tempValue !== 0 ||
                        showInputProp ||
                        hasAlwaysControls
                    }
                    tempAmount={tempAmount}
                    tempValue={tempValue}
                    focusOnClick={focusOnClick}
                />
                <ControlButton
                    stopPropagation={stopPropagation}
                    icon={plusIcon}
                    onClick={this.addItem}
                    disabled={disabled || disableAdd || (max && amount >= max)}
                    className={classNames('cc__amount-control__add', {
                        'cc__amount-control--icon':
                            amount > 0 || hasAlwaysControls,
                    })}
                    color={addColor}
                />
            </div>
        );
    }
}

AmountControl.propTypes = {
    buttonText: PropTypes.string,
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
    min: PropTypes.number,
    max: PropTypes.number,
    stopPropagation: PropTypes.bool,
    hasAlwaysControls: PropTypes.bool,
};

AmountControl.defaultProps = {
    buttonText: null,
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
    min: null,
    max: null,
    plusIcon: 'fa fa-plus',
    minusIcon: 'fa fa-minus',
    removeIcon: 'fa fa-minus',
    hasAlwaysControls: false,
};

AmountControl.displayName = 'AmountControl';
