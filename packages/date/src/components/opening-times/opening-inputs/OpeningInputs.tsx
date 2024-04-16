import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useEffect, useMemo, useState, type ReactElement } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { OpeningTimesButtonType, type Time } from '../../../types/openingTimes';
import OpeningInput from './opening-input/OpeningInput';
import { StyledOpeningInputPreview, StyledOpeningInputs } from './OpeningInputs.styles';

export type OpeningInputsProps = {
    times: Time[];
    isDisabled?: boolean;
    onChange?: (time: Time) => void;
    onAdd?: (time: Time, id: string) => void;
    onRemove?: (id: Time['id']) => void;
    onInvalid?: (openingTimeId: string, timeIds: string[]) => void;
    id: string;
    editMode: boolean;
    closedText: string;
};

const OpeningInputs: FC<OpeningInputsProps> = ({
    times,
    isDisabled,
    onRemove,
    onAdd,
    onInvalid,
    id,
    onChange,
    editMode,
    closedText,
}) => {
    const [newTimes, setNewTimes] = useState<Time[]>();
    const [invalidTimes, setInvalidTimes] = useState<string[]>([]);

    useEffect(() => {
        setNewTimes(times);
    }, [times]);

    const handleAdd = useCallback(() => {
        const defaultTime: Time = { start: '08:00', end: '18:00', id: uuidV4() };

        setNewTimes((prevState) => (prevState ? [...prevState, defaultTime] : [defaultTime]));

        if (typeof onAdd === 'function') {
            onAdd(defaultTime, id);
        }
    }, [id, onAdd]);

    const handleRemove = useCallback(
        (timeId: string) => {
            setNewTimes((prevState) => (prevState ?? []).filter((time) => time.id !== timeId));

            if (typeof onRemove === 'function') {
                onRemove(timeId);
            }
        },
        [onRemove],
    );

    useEffect(() => {
        const result: Time[] = [];

        for (let i = 0; i < times.length; i++) {
            const currentTime = times[i];
            const prevTime = times[i - 1];

            if (currentTime) {
                const currStart = new Date(`2000-01-01T${currentTime.start}`);
                const currEnd = new Date(`2000-01-01T${currentTime.end}`);

                if (currStart >= currEnd) {
                    result.push(currentTime);
                }

                if (prevTime) {
                    const prevEnd = new Date(`2000-01-01T${prevTime.end}`);

                    if (prevEnd > currStart) {
                        result.push(prevTime, currentTime);
                    }
                }
            }
        }

        const invalidTimeIds = result.map(({ id: invalidId }) => invalidId);

        setInvalidTimes(invalidTimeIds);

        if (typeof onInvalid === 'function') {
            onInvalid(id, invalidTimeIds);
        }
    }, [id, onInvalid, times]);

    const handleChange = useCallback(
        (newTime: Time) => {
            setNewTimes((prevState) => {
                const updatedTimes = (prevState ?? []).map((time) => {
                    if (time.id === newTime.id) {
                        return newTime;
                    }
                    return time;
                });

                if (typeof onChange === 'function') {
                    onChange(newTime);
                }

                return updatedTimes;
            });
        },
        [onChange],
    );

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        if (!newTimes) {
            return items;
        }

        newTimes.forEach(({ end, start, id: timeId }, index) => {
            if (!editMode) {
                const text = isDisabled ? closedText : `${start} - ${end}`;

                items.push(
                    <StyledOpeningInputPreview key={`opening-times-preview__${id}.${timeId}`}>
                        {text}
                    </StyledOpeningInputPreview>,
                );

                return;
            }

            if (index > 1) {
                return;
            }

            let buttonType = OpeningTimesButtonType.NONE;

            if (index === 0 && times.length === 1 && !isDisabled) {
                buttonType = OpeningTimesButtonType.ADD;
            } else if (index === 1 && !isDisabled) {
                buttonType = OpeningTimesButtonType.REMOVE;
            }

            items.push(
                <OpeningInput
                    key={`opening-times-input__${id}.${timeId}`}
                    start={start}
                    id={timeId}
                    end={end}
                    isDisabled={isDisabled}
                    isInvalid={invalidTimes.includes(timeId)}
                    buttonType={buttonType}
                    onAdd={handleAdd}
                    onChange={(time) => handleChange(time)}
                    onRemove={() => handleRemove(timeId)}
                />,
            );
        });

        return items;
    }, [
        closedText,
        editMode,
        handleAdd,
        handleChange,
        handleRemove,
        id,
        invalidTimes,
        isDisabled,
        newTimes,
        times.length,
    ]);

    return useMemo(
        () => (
            <StyledOpeningInputs
                key={`opening-inputs__${id}`}
                animate={{ gap: newTimes && newTimes.length > 1 ? '8px' : 0 }}
                initial={{ gap: 0 }}
            >
                <AnimatePresence initial={false}>{content}</AnimatePresence>
            </StyledOpeningInputs>
        ),
        [content, id, newTimes],
    );
};

OpeningInputs.displayName = 'OpeningInputs';

export default OpeningInputs;
