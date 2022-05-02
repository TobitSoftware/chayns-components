/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AmountInput from './AmountInput';
import ControlButton from './ControlButton';

// region icon default values
// default icon to add one step to the AmountControl
const DEFAULT_PLUS_ICON = 'fa fa-plus';

// default remove icon when there are more than one item
const DEFAULT_MINUS_ICON = 'fa fa-minus';

// default remove icon for the last item (value = 1)
const DEFAULT_REMOVE_ICON = 'fa fa-minus';

// default remove icon when there is only one item available (max = 1)
const DEFAULT_SINGLE_REMOVE_ICON = 'fa fa-trash-can';
// endregion

/**
 * The AmountControl is a three-segment control used to increase or decrease an
 * incremental value.
 */
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
            max,
        } = this.props;
        const { tempAmount } = this.state;

        if (icon && !tempAmount && !hasAlwaysControls) {
            return icon;
        }

        if (tempAmount > 1 || amount > 1) {
            return minusIcon;
        }

        // the default removeIcon will become a trash-can when the max-value is 1
        return removeIcon ?? (max === 1 ? DEFAULT_SINGLE_REMOVE_ICON : DEFAULT_REMOVE_ICON);
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
                    tempAmount: oldAmount,
                });

                return;
            }
            onChange(amount);
        }
    };

    /**
     * Checks whether the add button should be shown.
     * @returns {boolean}
     */
    isAddButtonShown() {
        const { showAddButton, max } = this.props;

        // When the showAddButton prop is explicitly set, we will use the value
        if (showAddButton !== undefined) {
            return showAddButton;
        }

        // When using the default value (undefined) and the max prop is set to 1
        // the add button should be removed (only the remove button will be displayed as trash-can)
        if (max === 1) {
            return false;
        }

        // when we do not have max set or it is greater than 1, we will use the default value (show the add button)
        return true;
    }

    /**
     * Checks whether the input element should be enabled
     * @returns {boolean}
     */
    isInputEnabled() {
        const { disableInput, max } = this.props;

        // When the disableInput-prop is manually set (not defaultValue: undefined)
        // this value has precedence over all default behaviour
        if (disableInput !== undefined) {
            return !disableInput;
        }

        // When the max value is only one, the input should be disabled
        if (max === 1) {
            return false;
        }

        // normally the input-field should be shown (default)
        return true;
    }

    render() {
        const {
            amount,
            buttonText,
            disabled,
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
                    disableInput={!this.isInputEnabled()}
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
                {this.isAddButtonShown() && (
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
                )}
            </div>
        );
    }
}

AmountControl.propTypes = {
    /**
     * This text will be shown in the button when the `amount`-prop is 0.
     */
    buttonText: PropTypes.string,

    /**
     * This component works as a controlled input and this prop defines its
     * current state.
     */
    amount: PropTypes.number,

    /**
     * This callback will be called when the amount is changed by the user.
     */
    onChange: PropTypes.func,

    /**
     * Alias for onChange.
     */
    onInput: PropTypes.func,

    /**
     * Called when the user clicks the increment-button.
     */
    onAdd: PropTypes.func,

    /**
     * Called when the user clicks the decrement-button.
     */
    onRemove: PropTypes.func,

    /**
     * Disables any interaction and switches to a disabled style.
     */
    disabled: PropTypes.bool,

    /**
     * Disables the input field and forces the user to use the buttons to
     * control the value.
     */
    disableInput: PropTypes.bool,

    /**
     * Disables the increment-button and disables the ability to increment the
     * value.
     */
    disableAdd: PropTypes.bool,

    /**
     * Disables the decrement-button and disables the ability to decrement the
     * value.
     */
    disableRemove: PropTypes.bool,

    /**
     * A classname that is applied to the wrapper of the component.
     */
    className: PropTypes.string,

    /**
     * Shows an input field once the amount is greater than 10.
     */
    autoInput: PropTypes.bool,

    /**
     * A function that returns the content of the button.
     */
    buttonFormatHandler: PropTypes.func,

    /**
     * Whether to show the input.
     */
    showInput: PropTypes.bool,

    /**
     * Whether the add button should be shown/rendered.
     */
    showAddButton: PropTypes.bool,

    /**
     * Displays an icon on the left side of the button if the amount is 0.
     * Supply a FontAwesome-string like `"fa fa-plane"`.
     */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * The icon shown on the increment-button.
     */
    plusIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * The icon shown on the decrement-button.
     */
    minusIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * The icon the reset the amount to 0.
     */
    removeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    /**
     * The color of the remove icon.
     */
    removeColor: PropTypes.string,

    /**
     * The color of the icon in the increment-button.
     */
    addColor: PropTypes.string,

    /**
     * The color of the icon to the left of the button.
     */
    iconColor: PropTypes.string,

    /**
     * Multiple `AmountControl` with the same `equalize`-prop will sync their
     * width.
     */
    equalize: PropTypes.string,

    /**
     * Enables the input autofocus.
     */
    focusOnClick: PropTypes.bool,

    /**
     * The width of the AmountControl content.
     */
    contentWidth: PropTypes.number,

    /**
     * The minimum value of the AmountControl (the input field is not validated).
     */
    min: PropTypes.number,

    /**
     * The maximum value of the AmountControl (the input field is not validated).
     */
    max: PropTypes.number,

    /**
     * Stop propagation of click events to parent components.
     */
    stopPropagation: PropTypes.bool,

    /**
     * Always show the increment and decrement buttons.
     */
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
    plusIcon: DEFAULT_PLUS_ICON,
    minusIcon: DEFAULT_MINUS_ICON,
    removeIcon: undefined,
    hasAlwaysControls: false,
    disableInput: undefined,
    showAddButton: undefined,
};

AmountControl.displayName = 'AmountControl';
