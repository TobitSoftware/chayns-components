import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { OpeningTimesButtonType, type Time } from '../../../../types/openingTimes';
import {
    StyledOpeningInput,
    StyledOpeningInputButtonWrapper,
    StyledOpeningInputText,
    StyledOpeningInputWrapper,
} from './OpeningInput.styles';
import NumberInput from '../../../number-input/NumberInput';
import Icon from '../../../icon/Icon';

export type OpeningInputProps = {
    start: Time['start'];
    end: Time['end'];
    isDisabled?: boolean;
    buttonType: OpeningTimesButtonType;
    onAdd: () => void;
    onRemove: () => void;
    onChange: (time: Time) => void;
};

const OpeningInput: FC<OpeningInputProps> = ({
    end,
    start,
    isDisabled,
    buttonType,
    onRemove,
    onAdd,
    onChange,
}) => {
    const [startTime, setStartTime] = useState(start);
    const [endTime, setEndTime] = useState(end);

    useEffect(() => {
        onChange({ start: startTime, end: endTime });
    }, [endTime, onChange, startTime]);

    const button = useMemo(() => {
        switch (buttonType) {
            case OpeningTimesButtonType.ADD:
                return (
                    <StyledOpeningInputButtonWrapper onClick={onAdd}>
                        <Icon icons={['fa fa-plus']} size={15} color="white" />
                    </StyledOpeningInputButtonWrapper>
                );
            case OpeningTimesButtonType.REMOVE:
                return (
                    <StyledOpeningInputButtonWrapper onClick={onRemove}>
                        <Icon icons={['fa fa-x']} size={10} color="white" />
                    </StyledOpeningInputButtonWrapper>
                );
            default:
                return null;
        }
    }, [buttonType, onAdd, onRemove]);

    const handleStartTimeChange = useCallback((value: string) => {
        setStartTime(value);
    }, []);

    const handleEndTimeChange = useCallback((value: string) => {
        setEndTime(value);
    }, []);

    return useMemo(
        () => (
            <StyledOpeningInput>
                <StyledOpeningInputWrapper>
                    <NumberInput
                        isTimeInput
                        value={startTime}
                        onChange={handleStartTimeChange}
                        isDisabled={isDisabled}
                    />
                </StyledOpeningInputWrapper>
                <StyledOpeningInputText isDisabled={isDisabled}>-</StyledOpeningInputText>
                <StyledOpeningInputWrapper>
                    <NumberInput
                        isTimeInput
                        value={endTime}
                        onChange={handleEndTimeChange}
                        isDisabled={isDisabled}
                    />
                </StyledOpeningInputWrapper>
                {button}
            </StyledOpeningInput>
        ),
        [button, endTime, handleEndTimeChange, handleStartTimeChange, isDisabled, startTime],
    );
};

OpeningInput.displayName = 'OpeningInput';

export default OpeningInput;
