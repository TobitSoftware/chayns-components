import { AnimatePresence } from 'motion/react';
import React, {
    ChangeEvent,
    FC,
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
    StyledInputWrapper,
    StyledMotionAmountControlButton,
} from './AmountControl.styles';

export type DisplayState = 'default' | 'normal' | 'maxAmount' | 'minAmount';

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
     * Whether the control should be disabled
     */
    isDisabled?: boolean;
    /**
     * A Text that should be displayed if no amount is selected;
     */
    label?: string;
    /**
     * The maximum allowed amount. If the maxAmount is reached, a check icon is displayed on the left side.
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
     * Whether the label should be displayed even if an amount is selected.
     */
    shouldForceLabel?: boolean;
    /**
     * Whether the "add"-icon should be displayed if the minAmount is reached.
     */
    shouldShowAddIconOnMinAmount?: boolean;
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
    iconColor,
    isDisabled = false,
    label,
    maxAmount,
    minAmount = 0,
    onChange,
    shouldForceLabel = false,
    shouldShowAddIconOnMinAmount = false,
    shouldShowIcon = true,
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
            case maxAmount && amountValue >= maxAmount:
                setDisplayState('maxAmount');
                return;
            case amountValue > minAmount:
                setDisplayState('normal');
                return;
            case amountValue === minAmount && amountValue >= 0 && shouldShowAddIconOnMinAmount:
                setDisplayState('minAmount');
                return;
            default:
                setDisplayState('default');
        }
    }, [amountValue, maxAmount, minAmount, shouldShowAddIconOnMinAmount]);

    const hasFocus = useMemo(() => displayState !== 'default', [displayState]);

    /**
     * Function that sets the amountValue to the amount
     */
    useEffect(() => {
        if (typeof amount !== 'number') {
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

    let inputLabel = inputValue;

    if (typeof label === 'string' && (displayState === 'default' || shouldForceLabel)) {
        inputLabel = label;
    }

    return useMemo(
        () => (
            <StyledAmountControl onClick={handleFirstAmount} $isDisabled={isDisabled}>
                <AnimatePresence initial={false}>
                    {['normal'].includes(displayState) && (
                        <StyledMotionAmountControlButton
                            key="left_button"
                            initial={{ width: 0, opacity: 0, padding: 0 }}
                            animate={{
                                width: 40,
                                opacity: 1,
                                padding: 0,
                            }}
                            exit={{ width: 0, opacity: 0, padding: 0 }}
                            transition={{ duration: 0.2, type: 'tween' }}
                            onClick={handleAmountRemove}
                            disabled={amountValue !== 0 && amountValue <= minAmount}
                            $isDisabled={amountValue !== 0 && amountValue <= minAmount}
                        >
                            <Icon icons={['fa fa-minus']} size={14} color="white" />
                        </StyledMotionAmountControlButton>
                    )}
                </AnimatePresence>
                <StyledInputWrapper>
                    {displayState === 'maxAmount' ||
                    inputValue === '0' ||
                    (shouldForceLabel && typeof label === 'string') ||
                    inputLabel === label ? (
                        <StyledAmountControlPseudoInput
                            onClick={handleDeleteIconClick}
                            $shouldShowWideInput={shouldShowWideInput}
                            $shouldShowRightIcon={!['maxAmount'].includes(displayState)}
                        >
                            {inputLabel}
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
                            value={inputLabel}
                        />
                    )}
                </StyledInputWrapper>
                <AnimatePresence initial={false}>
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
                        $color={displayState === 'maxAmount' ? 'rgb(32, 198, 90)' : undefined}
                        onClick={
                            displayState === 'maxAmount' ? handleAmountRemove : handleAmountAdd
                        }
                        disabled={maxAmount ? amountValue >= maxAmount : false}
                        $isDisabled={maxAmount ? amountValue >= maxAmount : false}
                    >
                        <Icon
                            icons={
                                !['normal'].includes(displayState) && icon
                                    ? [displayState === 'maxAmount' ? 'fa fa-check' : icon]
                                    : [displayState === 'maxAmount' ? 'fa fa-check' : 'fa fa-plus']
                            }
                            size={14}
                            color={iconColor ?? 'white'}
                        />
                    </StyledMotionAmountControlButton>
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
            icon,
            iconColor,
            inputLabel,
            inputValue,
            isDisabled,
            label,
            maxAmount,
            minAmount,
            shouldForceLabel,
            shouldShowIcon,
            shouldShowWideInput,
        ],
    );
};

AmountControl.displayName = 'AmountControl';

export default AmountControl;
