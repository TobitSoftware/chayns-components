import React, { FC, ReactNode, useMemo, useState } from 'react';
import { StyledSetupWizardItem } from './SetupWizardItem.styles';

export type SetupWizardItemProps = {
    /**
     * The content that should be displayed inside the item.
     */
    children: ReactNode;
};

const SetupWizardItem: FC<SetupWizardItemProps> = ({ children }) => {
    const [currentChildrenIndex, setCurrentChildrenIndex] = useState(0);

    return useMemo(() => <StyledSetupWizardItem>{children}</StyledSetupWizardItem>, [children]);
};

SetupWizardItem.displayName = 'SetupWizardItem';

export default SetupWizardItem;
