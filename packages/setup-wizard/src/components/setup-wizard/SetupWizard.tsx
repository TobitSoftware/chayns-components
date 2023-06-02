import AccordionGroup from '@chayns-components/core/lib/components/accordion/accordion-group/AccordionGroup';
import React, {
    forwardRef,
    ReactElement,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from 'react';
import type { SetupWizardItemProps } from '../setup-wizard-item/SetupWizardItem';
import { StyledSetupWizard } from './SetupWizard.styles';

type UpdateSelectedId = (id: number) => void;
type UpdateActiveId = (id: number) => void;

interface SetupWizardContextProps {
    selectedId: number | undefined;
    updateSelectedId?: UpdateSelectedId;
    activeId: number | undefined;
    updateActiveId?: UpdateActiveId;
}

export const SetupWizardContext = React.createContext<SetupWizardContextProps>({
    selectedId: undefined,
    updateSelectedId: undefined,
    activeId: undefined,
    updateActiveId: undefined,
});

SetupWizardContext.displayName = 'SetupWizardContext';

export type SetupWizardRef = {
    next: (stepId?: number) => void;
    reset: () => void;
};

export type SetupWizardProps = {
    /**
     * The steps of the setup. Use the SetupWizardItem component.
     */
    children: ReactElement<SetupWizardItemProps> | ReactElement<SetupWizardItemProps>[];
};

const SetupWizard = forwardRef<SetupWizardRef, SetupWizardProps>(({ children }, ref) => {
    const [selectedId, setSelectedId] = useState<SetupWizardContextProps['selectedId']>(0);
    const [activeId, setActiveId] = useState<SetupWizardContextProps['activeId']>(0);
    const [allIds, setAllIds] = useState<number[]>([]);

    useEffect(() => {
        React.Children.map(children, (child: ReactElement<SetupWizardItemProps>) => {
            setAllIds((prevState) => [...prevState, child.props.id]);
        });
    }, [children]);

    const updateSelectedId = useCallback<UpdateSelectedId>(
        (id) => {
            setSelectedId(id);
        },
        [setSelectedId]
    );

    const updateActiveId = useCallback<UpdateSelectedId>(
        (id) => {
            setActiveId(id);
        },
        [setActiveId]
    );

    const handleNext = useCallback(
        (stepId: number | undefined) => {
            if (typeof stepId === 'number') {
                updateSelectedId(stepId);

                if (typeof activeId === 'number' && stepId > activeId) {
                    updateActiveId(stepId);
                }
            } else {
                const index = allIds.findIndex((id) => id === selectedId);

                if (index < 0) {
                    return;
                }

                const numberAtIndex = allIds[index + 1];

                if (!numberAtIndex) {
                    return;
                }

                updateSelectedId(numberAtIndex);

                if (typeof activeId === 'number' && numberAtIndex > activeId) {
                    updateActiveId(numberAtIndex);
                }
            }
        },
        [activeId, allIds, selectedId, updateActiveId, updateSelectedId]
    );

    const handleReset = useCallback(() => {
        updateSelectedId(0);
        updateActiveId(0);
    }, [updateActiveId, updateSelectedId]);

    useImperativeHandle(
        ref,
        () => ({
            next: handleNext,
            reset: handleReset,
        }),
        [handleNext, handleReset]
    );

    const providerValue = useMemo<SetupWizardContextProps>(
        () => ({
            selectedId,
            updateSelectedId,
            activeId,
            updateActiveId,
        }),
        [activeId, selectedId, updateActiveId, updateSelectedId]
    );

    return useMemo(
        () => (
            <SetupWizardContext.Provider value={providerValue}>
                <StyledSetupWizard>
                    <AccordionGroup>{children}</AccordionGroup>
                </StyledSetupWizard>
            </SetupWizardContext.Provider>
        ),
        [children, providerValue]
    );
});

SetupWizard.displayName = 'SetupWizard';

export default SetupWizard;
