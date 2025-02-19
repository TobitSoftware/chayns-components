import React, {
    forwardRef,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import { getRadioButtonOrder } from '../../../utils/radioButton';

type IUpdateSelectedRadioButtonId = (id: string | undefined) => void;

type IUpdateHasRightElement = (id: string, hasRightElement: boolean) => void;

type IRadioButtonRightElements = { id: string; hasRightElement: boolean }[];

interface IRadioButtonGroupContext {
    selectedRadioButtonId: string | undefined;
    updateSelectedRadioButtonId?: IUpdateSelectedRadioButtonId;
    radioButtonRightElements: IRadioButtonRightElements;
    updateHasRightElement?: IUpdateHasRightElement;
    radioButtonsCanBeUnchecked?: boolean;
}

export const RadioButtonGroupContext = React.createContext<IRadioButtonGroupContext>({
    selectedRadioButtonId: undefined,
    updateSelectedRadioButtonId: undefined,
    radioButtonsCanBeUnchecked: false,
    radioButtonRightElements: [],
    updateHasRightElement: undefined,
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
        const [radioButtonRightElements, setRadioButtonRightElements] =
            useState<IRadioButtonRightElements>([]);

        const isControlled = typeof selectedId === 'string';

        useEffect(() => {
            setSelectedRadioButtonId(selectedId);
        }, [selectedId]);

        const updateSelectedRadioButtonId = useCallback<IUpdateSelectedRadioButtonId>(
            (id) => {
                if (typeof onSelect === 'function') {
                    onSelect(id);
                }

                if (!isControlled) {
                    setSelectedRadioButtonId(id);
                }
            },
            [isControlled, onSelect],
        );

        const updateHasRightElement = useCallback<IUpdateHasRightElement>((id, hasRightElement) => {
            setRadioButtonRightElements((prevState) =>
                prevState.map((prev) => (id === prev.id ? { id, hasRightElement } : prev)),
            );
        }, []);

        useEffect(() => {
            const ids = getRadioButtonOrder(children);

            const rightElements = ids.map((id) => ({ id, hasRightElement: false }));

            setRadioButtonRightElements(rightElements);
        }, [children]);

        useImperativeHandle(
            ref,
            () => ({
                updateSelectedRadioButtonId,
            }),
            [updateSelectedRadioButtonId],
        );

        const providerValue = useMemo<IRadioButtonGroupContext>(
            () => ({
                selectedRadioButtonId,
                updateSelectedRadioButtonId,
                radioButtonsCanBeUnchecked: canUncheckRadioButtons,
                updateHasRightElement,
                radioButtonRightElements,
            }),
            [
                canUncheckRadioButtons,
                radioButtonRightElements,
                selectedRadioButtonId,
                updateHasRightElement,
                updateSelectedRadioButtonId,
            ],
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
