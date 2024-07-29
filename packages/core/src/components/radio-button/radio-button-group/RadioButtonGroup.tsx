import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type IUpdateSelectedRadioButtonId = (id: string) => void;

interface IRadioButtonGroupContext {
    selectedRadioButtonId: string | undefined;
    updateSelectedRadioButtonId?: IUpdateSelectedRadioButtonId;
}

export const RadioButtonGroupContext = React.createContext<IRadioButtonGroupContext>({
    selectedRadioButtonId: undefined,
    updateSelectedRadioButtonId: undefined,
});

RadioButtonGroupContext.displayName = 'RadioButtonGroupContext';

export type RadioButtonGroupProps = {
    /**
     * The RadioButtons that should be grouped. Radio buttons with the same group are
     * automatically unchecked when an `RadioButton` of the group is checked.
     */
    children: ReactNode;
    /**
     * Whether the selection should be reset.
     */
    shouldResetSelection?: boolean;
};

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({ children, shouldResetSelection }) => {
    const [selectedRadioButtonId, setSelectedRadioButtonId] =
        useState<IRadioButtonGroupContext['selectedRadioButtonId']>(undefined);

    const isInitialRenderRef = useRef(true);

    const updateSelectedRadioButtonId = useCallback<IUpdateSelectedRadioButtonId>((id) => {
        setSelectedRadioButtonId(id);
    }, []);

    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
        }
    }, [selectedRadioButtonId]);

    useEffect(() => {
        if (shouldResetSelection) {
            setSelectedRadioButtonId(undefined);
        }
    }, [shouldResetSelection]);

    const providerValue = useMemo<IRadioButtonGroupContext>(
        () => ({
            selectedRadioButtonId,
            updateSelectedRadioButtonId,
        }),
        [selectedRadioButtonId, updateSelectedRadioButtonId],
    );

    return (
        <RadioButtonGroupContext.Provider value={providerValue}>
            {children}
        </RadioButtonGroupContext.Provider>
    );
};

RadioButtonGroup.displayName = 'RadioButtonGroup';

export default RadioButtonGroup;
