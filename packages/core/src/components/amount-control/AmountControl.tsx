import { AnimatePresence } from 'framer-motion';
import React, {
    ChangeEvent,
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import Icon from '../icon/Icon';
import {
    StyledAmountControl,
    StyledAmountControlInput,
    StyledMotionAmountControlButton,
} from './AmountControl.styles';
import { checkForValidAmount } from './utils';

export type DisplayState = 'default' | 'delete' | 'normal';

export type AmountControlProps = {
    /**
     * The amount that should be displayed.
     */
    amount?: number;
    /**
     * A Text that should be displayed, if no amount is selected;
     */
    label?: string;
    /**
     * The maximum allowed amount. If the maxAmount is set to one, a delete button is displayed on the left side.
     */
    maxAmount?: number;
    /**
     * A Function that is executed when the amount is changed
     */
    onChange?: (amount: number) => void;
};

const AmountControl: FC<AmountControlProps> = ({ amount, label, maxAmount, onChange }) => {
    const [amountValue, setAmountValue] = useState(0);
    const [inputValue, setInputValue] = useState('0');
    const [displayState, setDisplayState] = useState<DisplayState>('default');

    const minAmount = 0;

    /**
     * This function controls the displayState
     */
    useEffect(() => {
        switch (true) {
            case maxAmount === 1 && amountValue === 1:
                setDisplayState('delete');
                return;
            case amountValue > 0:
                setDisplayState('normal');
                return;
            default:
                setDisplayState('default');
        }
    }, [amountValue, maxAmount]);

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

    const handleFirstAmount = useCallback(() => {
        if (amountValue !== 0) {
            return;
        }

        setAmountValue(1);
        setInputValue('1');
    }, [amountValue]);

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

    const leftIcon = useMemo(() => {
        let item: ReactElement | null = null;

        switch (displayState) {
            case 'default':
                item = <Icon icons={['fa fa-cart-shopping']} size={15} />;
                break;
            case 'delete':
                item = <Icon icons={['fa ts-trash']} size={25} />;
                break;
            case 'normal':
                item = <Icon icons={['fa fa-minus']} size={15} color="red" />;
                break;
            default:
                break;
        }

        return item;
    }, [displayState]);

    return useMemo(
        () => (
            <StyledAmountControl onClick={handleFirstAmount}>
                <StyledMotionAmountControlButton
                    onClick={handleAmountRemove}
                    disabled={amountValue !== 0 && amountValue <= minAmount}
                >
                    {leftIcon}
                </StyledMotionAmountControlButton>
                <StyledAmountControlInput
                    displayState={displayState}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={displayState === 'default' && label ? label : inputValue}
                    type={amountValue === 0 ? 'text' : 'number'}
                />
                <AnimatePresence initial={false}>
                    {displayState === 'normal' && (
                        <StyledMotionAmountControlButton
                            key="right_button"
                            initial={{ width: 0, opacity: 0, padding: 0 }}
                            animate={{ width: 40, opacity: 1, padding: 0 }}
                            exit={{ width: 0, opacity: 0, padding: 0 }}
                            transition={{ duration: 0.2, type: 'tween' }}
                            onClick={handleAmountAdd}
                            disabled={maxAmount ? amountValue >= maxAmount : false}
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
            handleFirstAmount,
            handleInputBlur,
            handleInputChange,
            inputValue,
            label,
            leftIcon,
            maxAmount,
            minAmount,
        ]
    );
};

AmountControl.displayName = 'AmountControl';

export default AmountControl;
