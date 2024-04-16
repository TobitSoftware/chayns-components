import { Icon, NumberInput } from '@chayns-components/core';
import React, { FC, useCallback, useMemo, useState } from 'react';
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
    const [startTime, setStartTime] = useState(start);
    const [endTime, setEndTime] = useState(end);

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

    const handleStartTimeBlur = useCallback(
        (value: string | number | null, isTimeInvalid: boolean) => {
            if (isTimeInvalid || typeof value === 'number' || !value) {
                return;
            }

            setStartTime(value);

            onChange({ end: endTime, start: value, id });
        },
        [endTime, id, onChange],
    );

    const handleEndTimeBlur = useCallback(
        (value: string | number | null, isTimeInvalid: boolean) => {
            if (isTimeInvalid || typeof value === 'number' || !value) {
                return;
            }

            setEndTime(value);

            onChange({ end: value, start: startTime, id });
        },
        [id, onChange, startTime],
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
                        isTimeInput
                        isInvalid={isInvalid}
                        value={startTime}
                        onBlur={handleStartTimeBlur}
                        isDisabled={isDisabled}
                    />
                </StyledOpeningInputWrapper>
                <StyledOpeningInputText $isDisabled={isDisabled}>-</StyledOpeningInputText>
                <StyledOpeningInputWrapper>
                    <NumberInput
                        shouldShowOnlyBottomBorder
                        isTimeInput
                        isInvalid={isInvalid}
                        value={endTime}
                        onBlur={handleEndTimeBlur}
                        isDisabled={isDisabled}
                    />
                </StyledOpeningInputWrapper>
                {button}
            </StyledOpeningInput>
        ),
        [
            button,
            endTime,
            handleEndTimeBlur,
            handleStartTimeBlur,
            id,
            isDisabled,
            isInvalid,
            startTime,
        ],
    );
};

OpeningInput.displayName = 'OpeningInput';

export default OpeningInput;
