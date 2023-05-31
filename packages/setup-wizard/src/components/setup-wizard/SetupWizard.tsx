import AccordionGroup from '@chayns-components/core/lib/components/accordion/accordion-group/AccordionGroup';
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import type { SetupWizardItemProps } from '../setup-wizard-item/SetupWizardItem';
import { StyledSetupWizard } from './SetupWizard.styles';

type UpdateSelectedId = (id: number) => void;

interface SetupWizardContextProps {
    allIds: number[];
    selectedId: number | undefined;
    updateSelectedId?: UpdateSelectedId;
}

export const SetupWizardContext = React.createContext<SetupWizardContextProps>({
    allIds: [],
    selectedId: undefined,
    updateSelectedId: undefined,
});

SetupWizardContext.displayName = 'SetupWizardContext';

export type SetupWizardProps = {
    /**
     * The steps of the setup. Use the SetupWizardItem component.
     */
    children: ReactElement<SetupWizardItemProps> | ReactElement<SetupWizardItemProps>[];
};

const SetupWizard: FC<SetupWizardProps> = ({ children }) => {
    const [selectedId, setSelectedId] = useState<SetupWizardContextProps['selectedId']>(0);
    const [allIds, setAllIds] = useState<SetupWizardContextProps['allIds']>([]);

    useEffect(() => {
        React.Children.map(children, (child) => {
            setAllIds((prevState) => [...prevState, child.props.id]);
        });
    }, [children]);

    const updateSelectedId = useCallback<UpdateSelectedId>(
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

    const providerValue = useMemo<SetupWizardContextProps>(
        () => ({
            selectedId,
            allIds,
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
