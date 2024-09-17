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
     * Whether the RadioButtons can be unchecked.
     */
    canUncheckRadioButtons?: boolean;
    /**
     * The RadioButtons that should be grouped. Radio buttons with the same group are
     * automatically unchecked when an `RadioButton` of the group is checked.
     */
    children: ReactNode;
    /**
     * Function to be executed when an id is selected.
     */
    onSelect?: (id?: string) => void;
    /**
     * The id of the current selected RadioButton.
     */
    selectedId?: string;
};

const RadioButtonGroup = forwardRef<RadioButtonGroupRef, RadioButtonGroupProps>(
    ({ children, canUncheckRadioButtons, selectedId, onSelect }, ref) => {
        const [selectedRadioButtonId, setSelectedRadioButtonId] =
            useState<IRadioButtonGroupContext['selectedRadioButtonId']>(undefined);

        const isInitialRenderRef = useRef(true);

        useEffect(() => {
            setSelectedRadioButtonId(selectedId);
        }, [selectedId]);

        const updateSelectedRadioButtonId = useCallback<IUpdateSelectedRadioButtonId>(
            (id) => {
                if (typeof onSelect === 'function') {
                    onSelect(id);
                }

                setSelectedRadioButtonId(id);
            },
            [onSelect],
        );

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
                canUncheckRadioButtons,
            }),
            [canUncheckRadioButtons, selectedRadioButtonId, updateSelectedRadioButtonId],
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
