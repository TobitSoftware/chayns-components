import React, {
    forwardRef,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

type IUpdateSelectedRadioButtonId = (id: string | undefined) => void;

interface IRadioButtonGroupContext {
    selectedRadioButtonId: string | undefined;
    updateSelectedRadioButtonId?: IUpdateSelectedRadioButtonId;
    radioButtonsCanBeUnchecked?: boolean;
}

export const RadioButtonGroupContext = React.createContext<IRadioButtonGroupContext>({
    selectedRadioButtonId: undefined,
    updateSelectedRadioButtonId: undefined,
    radioButtonsCanBeUnchecked: false,
});

RadioButtonGroupContext.displayName = 'RadioButtonGroupContext';

export type RadioButtonGroupRef = {
    updateSelectedRadioButtonId: IUpdateSelectedRadioButtonId;
};

export type RadioButtonGroupProps = {
    /**
     * The RadioButtons that should be grouped. Radio buttons with the same group are
     * automatically unchecked when an `RadioButton` of the group is checked.
     */
    children: ReactNode;
    radioButtonsCanBeUnchecked?: boolean;
};

const RadioButtonGroup = forwardRef<RadioButtonGroupRef, RadioButtonGroupProps>(
    ({ children, radioButtonsCanBeUnchecked }, ref) => {
        const [selectedRadioButtonId, setSelectedRadioButtonId] =
            useState<IRadioButtonGroupContext['selectedRadioButtonId']>(undefined);
        console.log('selectedRadioButtonId', selectedRadioButtonId);
        const isInitialRenderRef = useRef(true);

        const updateSelectedRadioButtonId = useCallback<IUpdateSelectedRadioButtonId>((id) => {
            setSelectedRadioButtonId(id);
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                updateSelectedRadioButtonId,
            }),
            [updateSelectedRadioButtonId],
        );

        useEffect(() => {
            if (isInitialRenderRef.current) {
                isInitialRenderRef.current = false;
            }
        }, [selectedRadioButtonId]);

        const providerValue = useMemo<IRadioButtonGroupContext>(
            () => ({
                selectedRadioButtonId,
                updateSelectedRadioButtonId,
                radioButtonsCanBeUnchecked,
            }),
            [radioButtonsCanBeUnchecked, selectedRadioButtonId, updateSelectedRadioButtonId],
        );

        return (
            <RadioButtonGroupContext.Provider value={providerValue}>
                {children}
            </RadioButtonGroupContext.Provider>
        );
    },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';

export default RadioButtonGroup;
