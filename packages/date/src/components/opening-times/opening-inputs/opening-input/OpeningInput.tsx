import { Icon, NumberInput, NumberInputType } from '@chayns-components/core';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { OpeningTimesButtonType, type Time } from '../../../../types/openingTimes';
import {
    StyledOpeningInput,
    StyledOpeningInputButtonWrapper,
    StyledOpeningInputPseudoButton,
    StyledOpeningInputText,
    StyledOpeningInputWrapper,
} from './OpeningInput.styles';

export type OpeningInputProps = {
    start: Time['start'];
    end: Time['end'];
    isDisabled?: boolean;
    isInvalid?: boolean;
    id: string;
    buttonType: OpeningTimesButtonType;
    onAdd: () => void;
    onRemove: () => void;
    onChange: (time: Time) => void;
};

const OpeningInput: FC<OpeningInputProps> = ({
    end,
    start,
    isDisabled,
    isInvalid,
    buttonType,
    onRemove,
    onAdd,
    onChange,
    id,
}) => {
    const parseTimeString = (str: string): number | undefined => {
        if (!str || typeof str !== 'string') return undefined;
        const digits = str.replace(/[^0-9]/g, '');
        if (digits.length !== 4) return undefined;
        const num = parseInt(digits, 10);
        if (Number.isNaN(num)) return undefined;
        return num;
    };

    const [startTime, setStartTime] = useState<number | undefined>(() => parseTimeString(start));
    const [endTime, setEndTime] = useState<number | undefined>(() => parseTimeString(end));

    useEffect(() => {
        setStartTime(parseTimeString(start));
    }, [start]);
    useEffect(() => {
        setEndTime(parseTimeString(end));
    }, [end]);

    const button = useMemo(() => {
        switch (buttonType) {
            case OpeningTimesButtonType.ADD:
                return (
                    <StyledOpeningInputButtonWrapper onClick={onAdd}>
                        <Icon icons={['ts-plus']} size={15} />
                    </StyledOpeningInputButtonWrapper>
                );
            case OpeningTimesButtonType.REMOVE:
                return (
                    <StyledOpeningInputButtonWrapper onClick={onRemove}>
                        <Icon icons={['ts-wrong']} size={15} />
                    </StyledOpeningInputButtonWrapper>
                );
            default:
                return <StyledOpeningInputPseudoButton />;
        }
    }, [buttonType, onAdd, onRemove]);

    const toTimeString = (val: number) => {
        if (val === undefined || val === null || Number.isNaN(val)) return '';
        const str = val.toString().padStart(4, '0');
        const hours = str.slice(0, 2);
        const minutes = str.slice(2, 4);
        return `${hours}:${minutes}`;
    };

    const handleStartTimeChange = useCallback(
        (value: number, isTimeInvalid: boolean) => {
            if (isTimeInvalid || Number.isNaN(value)) {
                return;
            }
            setStartTime(value);
            const valueStr = toTimeString(value);
            onChange({ end, start: valueStr, id });
        },
        [end, id, onChange],
    );

    const handleEndTimeChange = useCallback(
        (value: number, isTimeInvalid: boolean) => {
            if (isTimeInvalid || Number.isNaN(value)) {
                return;
            }
            setEndTime(value);
            const valueStr = toTimeString(value);
            onChange({ end: valueStr, start, id });
        },
        [id, onChange, start],
    );

    return useMemo(
        () => (
            <StyledOpeningInput
                key={id}
                animate={{ opacity: 1, height: 'auto' }}
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, type: 'tween' }}
            >
                <StyledOpeningInputWrapper>
                    <NumberInput
                        shouldShowOnlyBottomBorder
                        type={NumberInputType.Time}
                        isInvalid={isInvalid}
                        value={startTime}
                        onChange={handleStartTimeChange}
                        isDisabled={isDisabled}
                    />
                </StyledOpeningInputWrapper>
                <StyledOpeningInputText $isDisabled={isDisabled}>-</StyledOpeningInputText>
                <StyledOpeningInputWrapper>
                    <NumberInput
                        shouldShowOnlyBottomBorder
                        type={NumberInputType.Time}
                        isInvalid={isInvalid}
                        value={endTime}
                        onChange={handleEndTimeChange}
                        isDisabled={isDisabled}
                    />
                </StyledOpeningInputWrapper>
                {button}
            </StyledOpeningInput>
        ),
        [
            button,
            endTime,
            handleEndTimeChange,
            handleStartTimeChange,
            id,
            isDisabled,
            isInvalid,
            startTime,
        ],
    );
};

OpeningInput.displayName = 'OpeningInput';

export default OpeningInput;
