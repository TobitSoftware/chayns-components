import AccordionGroup from '@chayns-components/core/lib/components/accordion/accordion-group/AccordionGroup';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { StyledSetupWizard } from './SetupWizard.styles';

type IUpdateSelectedId = (id: number) => void;

interface ISetupWizardContext {
    selectedId: number | undefined;
    updateSelectedId?: IUpdateSelectedId;
}

export const SetupWizardContext = React.createContext<ISetupWizardContext>({
    selectedId: undefined,
    updateSelectedId: undefined,
});

SetupWizardContext.displayName = 'SetupWizardContext';

export type SetupWizardProps = {
    /**
     * The steps of the setup. Use the SetupWizardItem component.
     */
    children?: ReactNode;
};

const SetupWizard: FC<SetupWizardProps> = ({ children }) => {
    const [selectedId, setSelectedId] = useState<ISetupWizardContext['selectedId']>(1);

    const updateSelectedId = useCallback<IUpdateSelectedId>(
        (id) => {
            setSelectedId((currentId) => {
                if (currentId === id) {
                    return undefined;
                }

                return id;
            });
        },
        [setSelectedId]
    );

    const providerValue = useMemo<ISetupWizardContext>(
        () => ({
            selectedId,
            updateSelectedId,
        }),
        [selectedId, updateSelectedId]
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
};

SetupWizard.displayName = 'SetupWizard';

export default SetupWizard;
