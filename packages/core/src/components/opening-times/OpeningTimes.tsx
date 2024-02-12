import React, { FC, useCallback, useEffect, useMemo, useState, type ReactElement } from 'react';
import type { OnChange, OnTimeAdd, OpeningTime, Time, Weekday } from '../../types/openingTimes';
import Checkbox from '../checkbox/Checkbox';
import OpeningInputs from './opening-inputs/OpeningInputs';
import { StyledOpeningTimes, StyledOpeningTimesWrapper } from './OpeningTimes.styles';

export type OpeningTimesProps = {
    /**
     * Function to be executed when a time is changed or a day is enabled/disabled.
     * @param openingTimes
     */
    onChange?: ({ time, enabledDays }: OnChange) => void;
    /**
     * Function to be executed when a time is added.
     */
    onTimeAdd?: ({ time, dayId }: OnTimeAdd) => void;
    /**
     * Function to be executed when a time is removed.
     */
    onTimeRemove?: (id: string) => void;
    /**
     * The opening times corresponding to its weekday.
     */
    openingTimes: OpeningTime[];
    /**
     * The weekdays that should be displayed.
     */
    weekdays: Weekday[];
};

const OpeningTimes: FC<OpeningTimesProps> = ({
    openingTimes,
    weekdays,
    onChange,
    onTimeAdd,
    onTimeRemove,
}) => {
    const [newOpeningTimes, setNewOpeningTimes] = useState<OpeningTime[]>();

    useEffect(() => {
        setNewOpeningTimes(openingTimes);
    }, [openingTimes]);

    const handleCheckBoxChange = useCallback(
        (id: string) => {
            setNewOpeningTimes((prevOpeningTimes) => {
                const updatedOpeningTimes = (prevOpeningTimes ?? []).map((openingTime) => {
                    if (openingTime.id === id) {
                        return { ...openingTime, isDisabled: !openingTime.isDisabled };
                    }
                    return openingTime;
                });

                if (typeof onChange === 'function') {
                    onChange({
                        enabledDays: updatedOpeningTimes
                            .filter((item) => !item.isDisabled)
                            .map((item) => item.id),
                    });
                }

                return updatedOpeningTimes;
            });
        },
        [onChange],
    );

    const handleChange = useCallback(
        (newTime: Time, id: string) => {
            setNewOpeningTimes((prevOpeningTimes) => {
                const updatedOpeningTimes = (prevOpeningTimes ?? []).map((openingTime) => {
                    if (openingTime.id === id) {
                        const newTimes = openingTime.times.map((time) => {
                            if (time.id === newTime.id) {
                                return newTime;
                            }

                            return time;
                        });

                        return { ...openingTime, times: newTimes };
                    }
                    return openingTime;
                });

                if (typeof onChange === 'function') {
                    onChange({ time: newTime });
                }

                return updatedOpeningTimes;
            });
        },
        [onChange],
    );

    const handleAdd = useCallback(
        (time: Time, id: string) => {
            setNewOpeningTimes((prevOpeningTimes) =>
                (prevOpeningTimes ?? []).map((openingTime) => {
                    if (openingTime.id === id) {
                        return { ...openingTime, times: [...openingTime.times, time] };
                    }
                    return openingTime;
                }),
            );

            if (typeof onTimeAdd === 'function') {
                onTimeAdd({ dayId: id, time });
            }
        },
        [onTimeAdd],
    );

    const handleRemove = useCallback(
        (id: string) => {
            setNewOpeningTimes((prevOpeningTimes) =>
                (prevOpeningTimes ?? []).map((openingTime) => {
                    const newTimes = openingTime.times.filter((time) => time.id !== id);

                    return { ...openingTime, times: newTimes };
                }),
            );

            if (typeof onTimeRemove === 'function') {
                onTimeRemove(id);
            }
        },
        [onTimeRemove],
    );

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        if (!newOpeningTimes) {
            return items;
        }

        newOpeningTimes.forEach(({ times, id, weekdayId, isDisabled }) => {
            const weekday = weekdays.find((weekDay) => weekDay.id === weekdayId)?.name;

            if (!weekday) {
                return;
            }

            items.push(
                <StyledOpeningTimesWrapper key={`openingTimes__${id}`}>
                    <Checkbox isChecked={!isDisabled} onChange={() => handleCheckBoxChange(id)}>
                        {weekday}
                    </Checkbox>
                    <OpeningInputs
                        id={id}
                        times={times}
                        isDisabled={isDisabled}
                        onChange={(newTime) => handleChange(newTime, id)}
                        onRemove={handleRemove}
                        onAdd={handleAdd}
                    />
                </StyledOpeningTimesWrapper>,
            );
        });

        return items;
    }, [handleAdd, handleChange, handleCheckBoxChange, handleRemove, newOpeningTimes, weekdays]);

    return useMemo(() => <StyledOpeningTimes>{content}</StyledOpeningTimes>, [content]);
};

OpeningTimes.displayName = 'OpeningTimes';

export default OpeningTimes;
