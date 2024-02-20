import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useEffect, useMemo, useState, type ReactElement } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { OpeningTimesButtonType, type Time } from '../../../types/openingTimes';
import OpeningInput from './opening-input/OpeningInput';
import { StyledOpeningInputPreview, StyledOpeningInputs } from './OpeningInputs.styles';

export type OpeningInputsProps = {
    times: Time[];
    isDisabled?: boolean;
    onChange: (time: Time) => void;
    onAdd: (time: Time, id: string) => void;
    onRemove: (id: Time['id']) => void;
    id: string;
    editMode: boolean;
    closedText: string;
};

const OpeningInputs: FC<OpeningInputsProps> = ({
    times,
    isDisabled,
    onRemove,
    onAdd,
    id,
    onChange,
    editMode,
    closedText,
}) => {
    const [newTimes, setNewTimes] = useState<Time[]>();

    useEffect(() => {
        setNewTimes(times);
    }, [times]);

    const handleAdd = useCallback(() => {
        const defaultTime: Time = { start: '08:00', end: '18:00', id: uuidV4() };

        setNewTimes((prevState) => (prevState ? [...prevState, defaultTime] : [defaultTime]));

        onAdd(defaultTime, id);
    }, [id, onAdd]);

    const handleRemove = useCallback(
        (timeId: string) => {
            setNewTimes((prevState) => (prevState ?? []).filter((time) => time.id !== timeId));

            onRemove(timeId);
        },
        [onRemove],
    );

    const handleChange = useCallback(
        (newTime: Time) => {
            setNewTimes((prevState) => {
                const updatedTimes = (prevState ?? []).map((time) => {
                    if (time.id === newTime.id) {
                        return newTime;
                    }
                    return time;
                });

                onChange(newTime);

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

                items.push(<StyledOpeningInputPreview>{text}</StyledOpeningInputPreview>);

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
        isDisabled,
        newTimes,
        times.length,
    ]);

    return useMemo(
        () => (
            <StyledOpeningInputs>
                <AnimatePresence initial={false}>{content}</AnimatePresence>
            </StyledOpeningInputs>
        ),
        [content],
    );
};

OpeningInputs.displayName = 'OpeningInputs';

export default OpeningInputs;
