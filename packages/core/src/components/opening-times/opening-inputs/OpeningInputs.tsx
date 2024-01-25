import React, { FC, type ReactElement, useMemo } from 'react';
import { OpeningTimesButtonType, type Time } from '../../../types/openingTimes';
import { StyledOpeningInputs } from './OpeningInputs.styles';
import OpeningInput from './opening-input/OpeningInput';

export type OpeningInputsProps = {
    times: Time[];
    isDisabled?: boolean;
};

const OpeningInputs: FC<OpeningInputsProps> = ({ times, isDisabled }) => {
    const content = useMemo(() => {
        const items: ReactElement[] = [];

        times.forEach(({ end, start }, index) => {
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
                />,
            );
        });

        return items;
    }, [isDisabled, times]);

    return useMemo(() => <StyledOpeningInputs>{content}</StyledOpeningInputs>, [content]);
};

OpeningInputs.displayName = 'OpeningInputs';

export default OpeningInputs;
