import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import Icon from '../icon/Icon';
import {
    StyledAmountControl,
    StyledAmountControlButton,
    StyledAmountControlInput,
} from './AmountControl.styles';
import { checkForValidAmount } from './utils/amountControl';

export type AmountControlProps = {
    /**
     * The amount that should be displayed.
     */
    amount?: number;
    /**
     * The maximum allowed amount.
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
};

const AmountControl: FC<AmountControlProps> = ({ amount, maxAmount, minAmount = 0, onChange }) => {
    const [amountValue, setAmountValue] = useState(0);
    const [inputValue, setInputValue] = useState('0');

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

    /**
     * Function that updates the onChange event
     */
    useEffect(() => {
        if (onChange) {
            onChange(amountValue);
        }
    }, [amountValue, onChange]);

    const handleAmountAdd = () => {
        setAmountValue((prevState) => prevState + 1);
        setInputValue((prevState) => (Number(prevState) + 1).toString());
    };

    const handleAmountRemove = () => {
        setAmountValue((prevState) => prevState - 1);
        setInputValue((prevState) => (Number(prevState) - 1).toString());
    };

    const handleInputBlur = useCallback(() => {
        setAmountValue(inputValue === '' ? 0 : Number(inputValue));

        if (inputValue === '') {
            setInputValue('0');
        }
    }, [inputValue]);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const valueBeforeCheck = Number(event.target.value);

            const checkedValue = checkForValidAmount({
                minAmount,
                maxAmount,
                amount: Number(event.target.value),
            });

            if (valueBeforeCheck < minAmount && minAmount === 0) {
                setInputValue('0');

                return;
            }

            setInputValue(checkedValue === 0 ? '' : checkedValue.toString());
        },
        [maxAmount, minAmount]
    );

    return useMemo(
        () => (
            <StyledAmountControl>
                <StyledAmountControlButton
                    onClick={handleAmountRemove}
                    disabled={amountValue <= minAmount}
                >
                    <Icon icons={['fa fa-minus']} size={15} color="red" />
                </StyledAmountControlButton>
                <StyledAmountControlInput
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={inputValue}
                    type="number"
                />
                <StyledAmountControlButton
                    onClick={handleAmountAdd}
                    disabled={maxAmount ? amountValue >= maxAmount : false}
                >
                    <Icon icons={['fa fa-plus']} size={15} color="green" />
                </StyledAmountControlButton>
            </StyledAmountControl>
        ),
        [amountValue, handleInputBlur, handleInputChange, inputValue, maxAmount, minAmount]
    );
};

AmountControl.displayName = 'AmountControl';

export default AmountControl;
