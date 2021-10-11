import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

type IUpdateOpenAccordionUuid = (uuid: string, options?: { shouldOnlyOpen?: boolean }) => void;

interface IAccordionGroupContext {
    openAccordionUuid: string | undefined;
    updateOpenAccordionUuid?: IUpdateOpenAccordionUuid;
}

export const AccordionGroupContext = React.createContext<IAccordionGroupContext>({
    openAccordionUuid: undefined,
    updateOpenAccordionUuid: undefined,
});

AccordionGroupContext.displayName = 'AccordionGroupContext';

type AccordionGroupProps = {
    /**
     * The Accordions that should be grouped. Accordions with the same group are
     * automatically closed when an `Accordion` of the group is opened.
     */
    children: ReactNode;
};

const AccordionGroup: FC<AccordionGroupProps> = ({ children }) => {
    const [openAccordionUuid, setOpenAccordionUuid] =
        useState<IAccordionGroupContext['openAccordionUuid']>(undefined);

    const updateOpenAccordionUuid = useCallback<IUpdateOpenAccordionUuid>(
        (uuid, { shouldOnlyOpen } = {}) => {
            setOpenAccordionUuid((currentOpenAccordionUuid) => {
                if (currentOpenAccordionUuid === uuid && shouldOnlyOpen !== true) {
                    return undefined;
                }

                return uuid;
            });
        },
        [setOpenAccordionUuid]
    );

    const providerValue = useMemo<IAccordionGroupContext>(
        () => ({
            openAccordionUuid,
            updateOpenAccordionUuid,
        }),
        [openAccordionUuid, updateOpenAccordionUuid]
    );

    return (
        <AccordionGroupContext.Provider value={providerValue}>
            {children}
        </AccordionGroupContext.Provider>
    );
};

AccordionGroup.displayName = 'AccordionGroup';

export default AccordionGroup;
