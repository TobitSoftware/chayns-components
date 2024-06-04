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
import { checkForValidAmount } from '../../utils/amountControl';
import Icon from '../icon/Icon';
import {
    StyledAmountControl,
    StyledAmountControlInput,
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
};

const AmountControl: FC<AmountControlProps> = ({
    amount,
    icon,
    shouldShowIcon = true,
    label,
    iconColor,
    maxAmount,
    onChange,
    shouldShowWideInput = false,
}) => {
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
            case maxAmount && amountValue >= maxAmount:
                setDisplayState('maxAmount');
                return;
            case amountValue > 0:
                setDisplayState('normal');
                return;
            default:
                setDisplayState('default');
        }
    }, [amountValue, maxAmount]);

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
            const { value } = event.target;

            const valueBeforeCheck = Number(value.replace(/\D/g, ''));

            const checkedValue = checkForValidAmount({
                minAmount,
                maxAmount,
                amount: valueBeforeCheck,
            });

            if (valueBeforeCheck < minAmount && minAmount === 0) {
                setInputValue('0');

                return;
            }

            setInputValue(checkedValue === 0 ? '' : checkedValue.toString());
        },
        [maxAmount, minAmount],
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
                <StyledAmountControlInput
                    $displayState={displayState}
                    $shouldShowIcon={shouldShowIcon}
                    $shouldShowWideInput={shouldShowWideInput}
                    $hasFocus={hasFocus}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={displayState === 'default' && label ? label : inputValue}
                />
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
            handleFirstAmount,
            handleInputBlur,
            handleInputChange,
            hasFocus,
            inputValue,
            label,
            leftIcon,
            maxAmount,
            shouldShowIcon,
            shouldShowLeftIcon,
            shouldShowWideInput,
        ],
    );
};

AmountControl.displayName = 'AmountControl';

export default AmountControl;
