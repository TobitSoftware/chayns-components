import { AnimatePresence } from 'framer-motion';
import React, {
    ChangeEvent,
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { checkForValidAmount } from '../../utils/amountControl';
import Icon from '../icon/Icon';
import {
    StyledAmountControl,
    StyledAmountControlInput,
    StyledAmountControlPseudoInput,
    StyledMotionAmountControlButton,
} from './AmountControl.styles';

export type DisplayState = 'default' | 'delete' | 'normal' | 'maxAmount';

export type AmountControlProps = {
    /**
     * The amount that should be displayed.
     */
    amount?: number;
    /**
     * The icon that should be displayed if no amount is selected.
     */
    icon?: string;
    /**
     * The color of the icon.
     */
    iconColor?: string;
    /**
     * A Text that should be displayed, if no amount is selected;
     */
    label?: string;
    /**
     * The maximum allowed amount. If the maxAmount is set to one, a delete button is displayed on the left side.
     */
    maxAmount?: number;
    /**
     * The minimum allowed amount.
     */
    minAmount?: number;
    /**
     * A Function that is executed when the amount is changed
     */
    onChange?: (amount: number) => void;
    /**
     * Whether the icon should be displayed if no amount is selected
     */
    shouldShowIcon?: boolean;
    /**
     * Whether the input should be wider
     */
    shouldShowWideInput?: boolean;
    /**
     * Defines the amount that will change when adjusted
     */
    step?: number;
};

const AmountControl: FC<AmountControlProps> = ({
    amount,
    icon,
    shouldShowIcon = true,
    label,
    iconColor,
    maxAmount,
    minAmount = 0,
    onChange,
    shouldShowWideInput = false,
    step: stepProp = 1,
}) => {
    const [amountValue, setAmountValue] = useState(minAmount);
    const [inputValue, setInputValue] = useState(minAmount.toString());
    const [displayState, setDisplayState] = useState<DisplayState>('default');

    const step = useMemo(
        () => (Number.isSafeInteger(stepProp) && stepProp >= 1 ? stepProp : 1),
        [stepProp],
    );

    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * This function controls the displayState
     */
    useEffect(() => {
        switch (true) {
            case maxAmount === 1 && amountValue === 1:
                setDisplayState('delete');
                return;
            case maxAmount && amountValue >= maxAmount:
                setDisplayState('maxAmount');
                return;
            case amountValue > minAmount:
                setDisplayState('normal');
                return;
            default:
                setDisplayState('default');
        }
    }, [amountValue, maxAmount, minAmount]);

    const hasFocus = useMemo(() => displayState !== 'default', [displayState]);

    /**
     * Function that sets the amountValue to the amount
     */
    useEffect(() => {
        if (!amount) {
            return;
        }

        setAmountValue(checkForValidAmount({ amount, maxAmount, minAmount }));
        setInputValue(checkForValidAmount({ amount, maxAmount, minAmount }).toString());
    }, [amount, maxAmount, minAmount]);

    const handleAmountAdd = useCallback(() => {
        setAmountValue((prevState) => {
            const newAmount = checkForValidAmount({
                amount: prevState + step,
                minAmount,
                maxAmount,
            });

            if (typeof onChange === 'function') {
                onChange(newAmount);
            }

            return typeof amount === 'number' ? prevState : newAmount;
        });
        setInputValue((prevState) =>
            checkForValidAmount({
                amount: Number(prevState) + step,
                minAmount,
                maxAmount,
            }).toString(),
        );
    }, [amount, maxAmount, minAmount, onChange, step]);

    const handleAmountRemove = useCallback(() => {
        if (displayState === 'default') {
            return;
        }

        setAmountValue((prevState) => {
            const newAmount = checkForValidAmount({
                amount: prevState - step,
                minAmount,
                maxAmount,
            });

            if (typeof onChange === 'function') {
                onChange(newAmount);
            }

            return newAmount;
        });
        setInputValue((prevState) =>
            checkForValidAmount({
                amount: Number(prevState) - step,
                minAmount,
                maxAmount,
            }).toString(),
        );
    }, [displayState, maxAmount, minAmount, onChange, step]);

    const handleFirstAmount = useCallback(() => {
        if (amountValue !== minAmount) {
            return;
        }

        if (typeof onChange === 'function') {
            onChange(minAmount + step);
        }

        setAmountValue(minAmount + step);
        setInputValue((minAmount + step).toString());
    }, [amountValue, minAmount, onChange, step]);

    const handleDeleteIconClick = useCallback(() => {
        if (inputValue === '0') {
            window.setTimeout(() => {
                inputRef.current?.focus();
            }, 500);
        } else {
            handleAmountRemove();
        }
    }, [handleAmountRemove, inputValue]);

    const handleInputBlur = useCallback(() => {
        const checkedValue = checkForValidAmount({
            minAmount,
            maxAmount,
            amount: Math.round(Number(inputValue) / step) * step,
        });

        setAmountValue(checkedValue);
        setInputValue(checkedValue.toString());

        if (typeof onChange === 'function') {
            onChange(checkedValue);
        }

        if (inputValue === '') {
            setInputValue(minAmount.toString());
        }
    }, [inputValue, maxAmount, minAmount, onChange, step]);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;

            const valueBefore = Number(value.replace(/\D/g, ''));

            if (valueBefore < minAmount && minAmount === 0) {
                setInputValue('0');

                return;
            }

            setInputValue(valueBefore === 0 ? '' : valueBefore.toString());
        },
        [minAmount],
    );

    const leftIcon = useMemo(() => {
        let item: ReactElement | null = null;

        switch (displayState) {
            case 'default':
                item = <Icon icons={[icon ?? 'fa fa-cart-shopping']} size={15} color={iconColor} />;
                break;
            case 'delete':
                item = <Icon icons={['fa ts-check']} size={20} color="white" />;
                break;
            case 'normal':
                item = <Icon icons={['fa fa-minus']} size={15} color="red" />;
                break;
            case 'maxAmount':
                item = <Icon icons={['fa fa-minus']} size={15} color="red" />;
                break;
            default:
                break;
        }

        return item;
    }, [displayState, icon, iconColor]);

    const shouldShowLeftIcon = useMemo(() => {
        if (shouldShowIcon) {
            return true;
        }

        return !(displayState === 'default' && !shouldShowIcon);
    }, [displayState, shouldShowIcon]);

    return useMemo(
        () => (
            <StyledAmountControl onClick={handleFirstAmount}>
                <AnimatePresence initial={false}>
                    {shouldShowLeftIcon && (
                        <StyledMotionAmountControlButton
                            key="right_button"
                            initial={{ width: 0, opacity: 0, padding: 0 }}
                            animate={{
                                width:
                                    displayState === 'normal' || displayState === 'maxAmount'
                                        ? 40
                                        : 28,
                                opacity: 1,
                                padding: 0,
                            }}
                            exit={{ width: 0, opacity: 0, padding: 0 }}
                            $isWide={displayState === 'normal' || displayState === 'maxAmount'}
                            transition={{ duration: 0.2, type: 'tween' }}
                            onClick={handleAmountRemove}
                            $color={displayState === 'delete' ? 'rgb(32, 198, 90)' : undefined}
                            disabled={amountValue !== 0 && amountValue <= minAmount}
                            $isDisabled={amountValue !== 0 && amountValue <= minAmount}
                        >
                            {leftIcon}
                        </StyledMotionAmountControlButton>
                    )}
                </AnimatePresence>
                {displayState === 'delete' || inputValue === '0' ? (
                    <StyledAmountControlPseudoInput
                        onClick={handleDeleteIconClick}
                        $shouldShowWideInput={shouldShowWideInput}
                    >
                        {displayState === 'default' && label ? label : inputValue}
                    </StyledAmountControlPseudoInput>
                ) : (
                    <StyledAmountControlInput
                        ref={inputRef}
                        $displayState={displayState}
                        $shouldShowIcon={shouldShowIcon}
                        $shouldShowWideInput={shouldShowWideInput}
                        $hasFocus={hasFocus}
                        onBlur={handleInputBlur}
                        onChange={handleInputChange}
                        value={displayState === 'default' && label ? label : inputValue}
                    />
                )}
                <AnimatePresence initial={false}>
                    {displayState === 'normal' && (
                        <StyledMotionAmountControlButton
                            key="right_button"
                            initial={{ width: 0, opacity: 0, padding: 0 }}
                            animate={{
                                width: 40,
                                opacity: 1,
                                padding: 0,
                            }}
                            exit={{ width: 0, opacity: 0, padding: 0 }}
                            transition={{ duration: 0.2, type: 'tween' }}
                            onClick={handleAmountAdd}
                            $isWide={displayState === 'normal' || displayState === 'maxAmount'}
                            disabled={maxAmount ? amountValue >= maxAmount : false}
                            $isDisabled={maxAmount ? amountValue >= maxAmount : false}
                        >
                            <Icon icons={['fa fa-plus']} size={15} color="green" />
                        </StyledMotionAmountControlButton>
                    )}
                </AnimatePresence>
            </StyledAmountControl>
        ),
        [
            amountValue,
            displayState,
            handleAmountAdd,
            handleAmountRemove,
            handleDeleteIconClick,
            handleFirstAmount,
            handleInputBlur,
            handleInputChange,
            hasFocus,
            inputValue,
            label,
            leftIcon,
            maxAmount,
            minAmount,
            shouldShowIcon,
            shouldShowLeftIcon,
            shouldShowWideInput,
        ],
    );
};

AmountControl.displayName = 'AmountControl';

export default AmountControl;
