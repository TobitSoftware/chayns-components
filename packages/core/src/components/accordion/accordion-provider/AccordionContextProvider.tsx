import React from 'react';

interface IAccordionWrappedContextProvider {
    isWrapped?: boolean;
}

export const AccordionWrappedContext = React.createContext<IAccordionWrappedContextProvider>({
    isWrapped: undefined,
});

AccordionWrappedContext.displayName = 'AccordionWrappedContext';
