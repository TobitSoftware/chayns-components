import React, { FC, type ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { StyledOpeningTimes, StyledOpeningTimesWrapper } from './OpeningTimes.styles';
import type { OpeningTime, Time, Weekday } from '../../types/openingTimes';
import Checkbox from '../checkbox/Checkbox';
import OpeningInputs from './opening-inputs/OpeningInputs';

export type OpeningTimesProps = {
    /**
     * Function to be executed when a time is changed.
     * @param openingTimes
     */
    onChange?: (openingTimes: OpeningTime[]) => void;
    /**
     * The opening times corresponding to its weekday.
     */
    openingTimes: OpeningTime[];
    /**
     * The weekdays that should be displayed.
     */
    weekdays: Weekday[];
};

const OpeningTimes: FC<OpeningTimesProps> = ({ openingTimes, weekdays, onChange }) => {
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
                    onChange(updatedOpeningTimes);
                }

                return updatedOpeningTimes;
            });
        },
        [onChange],
    );

    const handleChange = useCallback(
        (newTimes: Time[], id: string) => {
            setNewOpeningTimes((prevOpeningTimes) => {
                const updatedOpeningTimes = (prevOpeningTimes ?? []).map((openingTime) => {
                    if (openingTime.id === id) {
                        return { ...openingTime, times: newTimes };
                    }
                    return openingTime;
                });

                if (typeof onChange === 'function') {
                    onChange(updatedOpeningTimes);
                }

                return updatedOpeningTimes;
            });
        },
        [onChange],
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
                        times={times}
                        isDisabled={isDisabled}
                        onChange={(newTimes) => handleChange(newTimes, id)}
                    />
                </StyledOpeningTimesWrapper>,
            );
        });

        return items;
    }, [handleChange, handleCheckBoxChange, newOpeningTimes, weekdays]);

    return useMemo(() => <StyledOpeningTimes>{content}</StyledOpeningTimes>, [content]);
};

OpeningTimes.displayName = 'OpeningTimes';

export default OpeningTimes;
