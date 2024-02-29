import { Checkbox, Tooltip, useElementSize } from '@chayns-components/core';
import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactElement,
} from 'react';
import {
    HintTextPosition,
    type OnChange,
    type OnTimeAdd,
    type OpeningTime,
    type Time,
    type Weekday,
} from '../../types/openingTimes';
import HintText from './hint-text/HintText';
import OpeningInputs from './opening-inputs/OpeningInputs';
import {
    StyledOpeningTimes,
    StyledOpeningTimesTooltipContent,
    StyledOpeningTimesWeekDay,
    StyledOpeningTimesWrapper,
} from './OpeningTimes.styles';

export type OpeningTimesProps = {
    /**
     * The text that should be displayed when a day is closed.
     */
    closedText?: string;
    /**
     * If set just the current day is displayed and the whole week in a tooltip.
     */
    currentDayId?: OpeningTime['id'];
    /**
     * Whether the opening times can be edited.
     */
    editMode?: boolean;
    /**
     * The text that should be displayed if times are colliding.
     */
    hintText?: string;
    /**
     * The position of the hint text.
     */
    hintTextPosition?: HintTextPosition;
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
    closedText = 'closed',
    currentDayId,
    editMode = false,
    hintText,
    hintTextPosition = HintTextPosition.Bottom,
    openingTimes,
    weekdays,
    onChange,
    onTimeAdd,
    onTimeRemove,
}) => {
    const [newOpeningTimes, setNewOpeningTimes] = useState<OpeningTime[]>();

    const ref = useRef<HTMLDivElement>(null);

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
                    {editMode ? (
                        <Checkbox isChecked={!isDisabled} onChange={() => handleCheckBoxChange(id)}>
                            {weekday}
                        </Checkbox>
                    ) : (
                        <StyledOpeningTimesWeekDay>{weekday}</StyledOpeningTimesWeekDay>
                    )}
                    <OpeningInputs
                        closedText={closedText}
                        id={id}
                        times={times}
                        isDisabled={isDisabled}
                        onChange={(newTime) => handleChange(newTime, id)}
                        onRemove={handleRemove}
                        onAdd={handleAdd}
                        editMode={editMode}
                    />
                </StyledOpeningTimesWrapper>,
            );
        });

        return items;
    }, [
        closedText,
        editMode,
        handleAdd,
        handleChange,
        handleCheckBoxChange,
        handleRemove,
        newOpeningTimes,
        weekdays,
    ]);

    const size = useElementSize(ref);

    const displayedContent = useMemo(() => {
        if (!currentDayId || editMode) {
            return content;
        }

        const singleDay = newOpeningTimes?.find(({ id }) => id === currentDayId);

        if (!singleDay) {
            return content;
        }

        const { id, times, weekdayId } = singleDay;

        const weekday = weekdays.find((weekDay) => weekDay.id === weekdayId)?.name;

        const element = (
            <StyledOpeningTimesWrapper
                key={`currentDay__${currentDayId}`}
                style={size && { width: size.width }}
            >
                <StyledOpeningTimesWeekDay>{weekday}</StyledOpeningTimesWeekDay>
                <OpeningInputs closedText={closedText} id={id} times={times} editMode={editMode} />
            </StyledOpeningTimesWrapper>
        );

        return (
            <Tooltip
                item={
                    <StyledOpeningTimesTooltipContent key="opening-time-tooltip">
                        {content}
                    </StyledOpeningTimesTooltipContent>
                }
            >
                {element}
            </Tooltip>
        );
    }, [closedText, content, currentDayId, editMode, newOpeningTimes, weekdays, size]);

    const shouldShowHint = useMemo(() => {
        let tmp = false;

        openingTimes.forEach(({ times }) => {
            if (times.length > 1) {
                if (!times[0] || !times[1]) {
                    return;
                }

                if (times[0].start >= times[1].end) {
                    tmp = true;
                }
            }
        });

        return tmp;
    }, [openingTimes]);

    return useMemo(
        () => (
            <StyledOpeningTimes ref={ref}>
                {shouldShowHint && hintText && hintTextPosition === HintTextPosition.Top && (
                    <HintText text={hintText} />
                )}
                {displayedContent}
                {shouldShowHint && hintText && hintTextPosition === HintTextPosition.Bottom && (
                    <HintText text={hintText} />
                )}
            </StyledOpeningTimes>
        ),
        [displayedContent, hintText, hintTextPosition, shouldShowHint],
    );
};

OpeningTimes.displayName = 'OpeningTimes';

export default OpeningTimes;
