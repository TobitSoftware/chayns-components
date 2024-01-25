import React, { FC, type ReactElement, useEffect, useMemo, useState } from 'react';
import { StyledOpeningTimes, StyledOpeningTimesWrapper } from './OpeningTimes.styles';
import type { OpeningTime, Weekday } from '../../types/openingTimes';
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

    useEffect(() => {
        if (newOpeningTimes && typeof onChange === 'function') {
            onChange(newOpeningTimes);
        }
    }, [newOpeningTimes, onChange]);

    const handleCheckBoxChange = (id: string) => {
        setNewOpeningTimes((prevOpeningTimes) =>
            (prevOpeningTimes ?? []).map((openingTime) => {
                if (openingTime.id === id) {
                    return { ...openingTime, isDisabled: !openingTime.isDisabled };
                }
                return openingTime;
            }),
        );
    };

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
                    <OpeningInputs times={times} isDisabled={isDisabled} />
                </StyledOpeningTimesWrapper>,
            );
        });

        return items;
    }, [newOpeningTimes, weekdays]);

    return useMemo(() => <StyledOpeningTimes>{content}</StyledOpeningTimes>, [content]);
};

OpeningTimes.displayName = 'OpeningTimes';

export default OpeningTimes;
