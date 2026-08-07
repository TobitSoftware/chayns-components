import { Icon, NumberInput, useFocusRingPortal } from '@chayns-components/core';
import React, { FC, KeyboardEventHandler, useCallback, useMemo, useRef, useState } from 'react';
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
    shouldEnableKeyboardHighlighting: boolean;
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
    shouldEnableKeyboardHighlighting,
}) => {
    const [startTime, setStartTime] = useState(start);
    const [endTime, setEndTime] = useState(end);
    const buttonRef = useRef<HTMLDivElement>(null);

    useFocusRingPortal(buttonRef, {
        isEnabled: buttonType !== OpeningTimesButtonType.NONE,
        borderRadius: 3,
        padding: 2,
    });

    const handleButtonKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            event.preventDefault();

            if (buttonType === OpeningTimesButtonType.ADD) {
                onAdd();
            } else if (buttonType === OpeningTimesButtonType.REMOVE) {
                onRemove();
            }
        },
        [buttonType, onAdd, onRemove],
    );

    const button = useMemo(() => {
        switch (buttonType) {
            case OpeningTimesButtonType.ADD:
                return (
                    <StyledOpeningInputButtonWrapper
                        ref={buttonRef}
                        role="button"
                        tabIndex={shouldEnableKeyboardHighlighting ? 0 : -1}
                        onClick={onAdd}
                        onKeyDown={handleButtonKeyDown}
                    >
                        <Icon icons={['ts-plus']} size={15} />
                    </StyledOpeningInputButtonWrapper>
                );
            case OpeningTimesButtonType.REMOVE:
                return (
                    <StyledOpeningInputButtonWrapper
                        ref={buttonRef}
                        role="button"
                        tabIndex={shouldEnableKeyboardHighlighting ? 0 : -1}
                        onClick={onRemove}
                        onKeyDown={handleButtonKeyDown}
                    >
                        <Icon icons={['ts-wrong']} size={15} />
                    </StyledOpeningInputButtonWrapper>
                );
            default:
                return <StyledOpeningInputPseudoButton />;
        }
    }, [buttonType, handleButtonKeyDown, onAdd, onRemove, shouldEnableKeyboardHighlighting]);

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
                        shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
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
                        shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
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
