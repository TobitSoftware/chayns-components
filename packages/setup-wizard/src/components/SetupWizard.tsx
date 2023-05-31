import React, { FC, ReactNode, useMemo } from 'react';
import { StyledSetupWizard } from './SetupWizard.styles';

export type SetupWizardProps = {
    /**
     * The steps of the setup. Use the SetupWizardItem component.
     */
    children?: ReactNode;
};

const SetupWizard: FC<SetupWizardProps> = ({ children }) =>
    useMemo(() => <StyledSetupWizard>{children}</StyledSetupWizard>, [children]);

SetupWizard.displayName = 'SetupWizard';

export default SetupWizard;
