import React, { FC, type ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { OpeningTimesButtonType, type Time } from '../../../types/openingTimes';
import { StyledOpeningInputs } from './OpeningInputs.styles';
import OpeningInput from './opening-input/OpeningInput';
import { AnimatePresence } from 'framer-motion';

export type OpeningInputsProps = {
    times: Time[];
    isDisabled?: boolean;
    onChange: (times: Time[]) => void;
    id: string;
};

const OpeningInputs: FC<OpeningInputsProps> = ({ times, isDisabled, id, onChange }) => {
    const [newTimes, setNewTimes] = useState<Time[]>();

    useEffect(() => {
        setNewTimes(times);
    }, [times]);

    const handleAdd = useCallback(() => {
        const defaultTime: Time = { start: '08:00', end: '18:00' };

        setNewTimes((prevState) => {
            const updatedTimes = prevState ? [...prevState, defaultTime] : [defaultTime];

            onChange(updatedTimes);

            return updatedTimes;
        });
    }, [onChange]);

    const handleRemove = useCallback(
        (indexToRemove: number) => {
            setNewTimes((prevState) => {
                const updatedTimes = (prevState ?? []).filter(
                    (_, index) => index !== indexToRemove,
                );

                onChange(updatedTimes);

                return updatedTimes;
            });
        },
        [onChange],
    );

    const handleChange = useCallback(
        (newTime: Time, indexToUpdate: number) => {
            setNewTimes((prevState) => {
                const updatedTimes = (prevState ?? []).map((time, index) => {
                    if (index === indexToUpdate) {
                        return newTime;
                    }
                    return time;
                });

                onChange(updatedTimes);

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

        newTimes.forEach(({ end, start }, index) => {
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
                    key={`opening-times-input__${id}.${index}`}
                    start={start}
                    id={`opening-times__${id}.${index}`}
                    end={end}
                    isDisabled={isDisabled}
                    buttonType={buttonType}
                    onAdd={handleAdd}
                    onChange={(time) => handleChange(time, index)}
                    onRemove={() => handleRemove(index)}
                />,
            );
        });

        return items;
    }, [handleAdd, handleChange, handleRemove, id, isDisabled, newTimes, times.length]);

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
