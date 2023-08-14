import React, {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { RadioButtonItem } from '../types';

type IUpdateSelectedRadioButtonId = (id: string) => void;

interface IRadioButtonGroupContext {
    selectedRadioButtonId: string | undefined;
    setSelectedRadioButtonId?: Dispatch<SetStateAction<string | undefined>>;
    updateSelectedRadioButtonId?: IUpdateSelectedRadioButtonId;
}

export const RadioButtonGroupContext = React.createContext<IRadioButtonGroupContext>({
    selectedRadioButtonId: undefined,
    setSelectedRadioButtonId: undefined,
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
     * Function to be executed when a button is checked.
     */
    onChange?: (item: RadioButtonItem) => void;
};

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({ children, onChange }) => {
    const [selectedRadioButtonId, setSelectedRadioButtonId] =
        useState<IRadioButtonGroupContext['selectedRadioButtonId']>(undefined);

    const isInitialRenderRef = useRef(true);

    const updateSelectedRadioButtonId = useCallback<IUpdateSelectedRadioButtonId>((id) => {
        setSelectedRadioButtonId((currentSelectedRadioButtonId) => {
            if (currentSelectedRadioButtonId === id) {
                return undefined;
            }

            return id;
        });
    }, []);

    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
        } else if (typeof selectedRadioButtonId === 'string') {
            if (typeof onChange === 'function') {
                onChange({ id: selectedRadioButtonId ?? '', isChecked: true });
            }
        }
    }, [onChange, selectedRadioButtonId]);

    const providerValue = useMemo<IRadioButtonGroupContext>(
        () => ({
            selectedRadioButtonId,
            setSelectedRadioButtonId,
            updateSelectedRadioButtonId,
        }),
        [selectedRadioButtonId, updateSelectedRadioButtonId]
    );

    return (
        <RadioButtonGroupContext.Provider value={providerValue}>
            {children}
        </RadioButtonGroupContext.Provider>
    );
};

RadioButtonGroup.displayName = 'RadioButtonGroup';

export default RadioButtonGroup;
