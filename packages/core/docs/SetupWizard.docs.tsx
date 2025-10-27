import React, { FC } from 'react';
import { SetupWizard, SetupWizardItem } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <SetupWizard>
            <SetupWizardItem id={1} step={1} title="Start">
                Lorem
            </SetupWizardItem>
            <SetupWizardItem id={2} step={2} title="Ende">
                Lorem
            </SetupWizardItem>
        </SetupWizard>
    );
};

Component.displayName = 'Component';

export default Component;
