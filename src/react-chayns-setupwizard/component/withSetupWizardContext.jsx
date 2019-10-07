import React from 'react';
import SetupWizardContext from './setupWizardContext';

// HOC
const withContext = WrappedComponent => props => (
    <SetupWizardContext.Consumer>
        {
            context => <WrappedComponent {...context} {...props} />
        }
    </SetupWizardContext.Consumer>
);

export default withContext;
