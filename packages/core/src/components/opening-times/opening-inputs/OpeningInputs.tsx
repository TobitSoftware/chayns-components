import React, { FC, type ReactElement, useEffect, useMemo, useState } from 'react';
import { OpeningTimesButtonType, type Time } from '../../../types/openingTimes';
import { StyledOpeningInputs } from './OpeningInputs.styles';
import OpeningInput from './opening-input/OpeningInput';

export type OpeningInputsProps = {
    times: Time[];
    isDisabled?: boolean;
    onChange: (times: Time[]) => void;
};

const OpeningInputs: FC<OpeningInputsProps> = ({ times, isDisabled, onChange }) => {
    const [newTimes, setNewTimes] = useState<Time[]>();

    useEffect(() => {
        setNewTimes(times);
    }, [times]);

    useEffect(() => {}, []);

    const handleAdd = () => {
        const defaultTime: Time = { start: '00:00', end: '00:00' };

        setNewTimes((prevState) =>
            // onChange();

            prevState ? [...prevState, defaultTime] : [defaultTime],
        );
    };

    const handleRemove = (indexToRemove: number) => {
        setNewTimes((prevState) => (prevState ?? []).filter((_, index) => index !== indexToRemove));
    };

    const handleChange = (newTime: Time, indexToUpdate: number) => {
        setNewTimes((prevState) =>
            (prevState ?? []).map((time, index) => {
                if (index === indexToUpdate) {
                    return newTime;
                }
                return time;
            }),
        );
    };

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

            if (index === 0 && times.length === 1) {
                buttonType = OpeningTimesButtonType.ADD;
            } else if (index === 1) {
                buttonType = OpeningTimesButtonType.REMOVE;
            }

            items.push(
                <OpeningInput
                    start={start}
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
    }, [isDisabled, newTimes, times.length]);

    return useMemo(() => <StyledOpeningInputs>{content}</StyledOpeningInputs>, [content]);
};

OpeningInputs.displayName = 'OpeningInputs';

export default OpeningInputs;
