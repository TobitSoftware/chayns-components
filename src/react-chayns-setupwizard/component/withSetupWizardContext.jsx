import React from 'react';
import SetupWizardContext from './setupWizardContext';

// HOC
const withSetupWizardContext = (WrappedComponent) => (props) => (
    <SetupWizardContext.Consumer>
        {(context) => <WrappedComponent {...context} {...props} />}
    </SetupWizardContext.Consumer>
);

export default withSetupWizardContext;
