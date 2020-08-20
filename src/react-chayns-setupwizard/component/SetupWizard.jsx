/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SetupWizardContext from './setupWizardContext';
import SetupItem from './SetupItem';
import { isDisabled } from '../utils/setupWizardHelper';

/**
 * ############################
 * # HARRY, YOU ARE A WIZARD! #
 * ############################
 */
class SetupWizard extends Component {
    constructor(props) {
        super(props);
        const { initialStep } = this.props;

        this.initialStep = 0;
        this.completedSteps = [-1]; // Used to fix state timing problem

        if (initialStep > 0) {
            this.initialStep = initialStep;
        }

        this.state = {
            currentStep: this.initialStep,
            maxProgress: 0,
            completedSteps: this.completedSteps,
            requiredSteps: [],
            enabledSteps: [0],
        };

        this.stepComplete = this.stepComplete.bind(this);
        this.stepEnabled = this.stepEnabled.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.toStep = this.toStep.bind(this);
        this.resetToStep = this.resetToStep.bind(this);
        this.ready = this.ready.bind(this);
        this.notComplete = this.notComplete.bind(this);
        this.allRequiredStepsCompleted = this.allRequiredStepsCompleted.bind(this);
    }

    getChildContext() {
        return {
            stepComplete: this.stepComplete,
            stepEnabled: this.stepEnabled,
            previousStep: this.previousStep,
            nextStep: this.nextStep,
            toStep: this.toStep,
            resetToStep: this.resetToStep,
        };
    }

    componentDidMount() {
        const { initialStep } = this.props;
        if (initialStep > 0) {
            this.toStep(initialStep);
        }
    }

    /**
     * Complete or uncomplete a step
     * @param value: true/false to complete/uncomplete
     * @param step: step that should be changed
     */
    stepComplete = (value, step) => {
        const { currentStep } = this.state;

        const selectedStep = step === undefined ? currentStep : step;

        if (value && this.completedSteps.indexOf(selectedStep) === -1) {
            this.completedSteps.push(selectedStep);
            this.setState({
                completedSteps: this.completedSteps,
            });
            this.allRequiredStepsCompleted();
        } else if (!value && this.completedSteps.indexOf(selectedStep) >= 0) {
            this.completedSteps.splice(this.completedSteps.indexOf(selectedStep), 1);
            this.setState({
                completedSteps: this.completedSteps,
            });
        }
    };

    /**
     * Enable or disable a step
     * @param value: true/false to enable/disable
     * @param step: step that should be changed
     */
    stepEnabled = (value, step) => {
        const { enabledSteps } = this.state;
        const index = enabledSteps.indexOf(step);
        if (value && index < 0) { // enable step
            enabledSteps.push(step);
        } else if (!value && index >= 0) { // disable step
            enabledSteps.splice(index, 1);
        }
        this.setState({ enabledSteps });
    };

    /**
     * Set a step required/not required
     * @param value: true/false for required/not required
     * @param step: step that should be changed
     */
    stepRequired = (value, step) => {
        const { requiredSteps } = this.state;

        if (value && requiredSteps.indexOf(step) < 0) {
            requiredSteps.push(step);
        } else if (requiredSteps.indexOf(step) >= 0) {
            requiredSteps.splice(requiredSteps.indexOf(step), 1);
        }
        this.setState({ requiredSteps });
    };

    /**
     * Go one step back
     */
    previousStep = () => {
        const { currentStep } = this.state;
        this.toStep(currentStep - 1);
    };

    /**
     * Go one step forward
     */
    nextStep = () => {
        const { currentStep } = this.state;
        this.toStep(currentStep + 1);
    };

    /**
     * Go to a step
     * @param step: the chosen step
     */
    toStep = (step) => {
        const {
            children,
            numberOfSteps,
        } = this.props;
        const {
            currentStep,
            enabledSteps,
            requiredSteps,
        } = this.state;

        if (((numberOfSteps || (Array.isArray(children) && children.length)) - 1) >= step) {
            if (requiredSteps.indexOf(currentStep) < 0 || this.completedSteps.indexOf(currentStep) >= 0 || !isDisabled(enabledSteps, step)) {
                for (let i = 0; i <= step; i += 1) {
                    this.stepEnabled(true, i);
                }
                this.setState({
                    currentStep: step,
                });
            } else {
                this.notComplete();
            }
        } else {
            this.ready();
        }
    };

    /**
     * Reset the wizard to a step and go to this step
     * @param step: the chosen step
     */
    resetToStep = (step) => {
        const { enabledSteps } = this.state;
        this.completedSteps = this.completedSteps.filter((s) => !(step <= s && s < enabledSteps));
        this.setState({
            enabledSteps: enabledSteps.filter((s) => s <= step),
            currentStep: step,
            completedSteps: this.completedSteps,
        });
    };

    ready = () => {
        const { ready } = this.props;
        const { currentStep, requiredSteps } = this.state;
        if (!(requiredSteps.indexOf(currentStep) >= 0 && this.completedSteps.indexOf(currentStep) === -1)) {
            if (ready) {
                ready();
            }
        } else {
            this.notComplete();
        }
    };

    allRequiredStepsCompleted = () => {
        const { allRequiredStepsCompleted } = this.props;
        if (allRequiredStepsCompleted) {
            const { requiredSteps } = this.state;
            if (requiredSteps.every((v) => this.completedSteps.includes(v))) {
                allRequiredStepsCompleted();
            }
        }
    };

    notComplete = () => {
        const { notComplete } = this.props;
        if (notComplete) {
            notComplete();
        }
    };

    render() {
        const {
            style,
            contentStyle,
            title,
            description,
            children,
            className,
            disableShowStep,
        } = this.props;
        const {
            maxProgress, currentStep, completedSteps, requiredSteps, enabledSteps,
        } = this.state;

        let visibleIndex = -1;

        return (
            <div style={style} className={className}>
                {title && (
                    <h1>
                        {title}
                    </h1>
                )}
                {description && (
                    <p dangerouslySetInnerHTML={{ __html: description }}/>
                )}
                <SetupWizardContext.Provider value={{
                    maxProgress,
                    completedSteps,
                    requiredSteps,
                    currentStep,
                    contentStyle,
                    enabledSteps,
                    stepComplete: this.stepComplete,
                    stepEnabled: this.stepEnabled,
                    stepRequired: this.stepRequired,
                    previousStep: this.previousStep,
                    nextStep: this.nextStep,
                    toStep: this.toStep,
                    resetToStep: this.resetToStep,
                    notComplete: this.notComplete,
                }}
                >
                    {children.map((child, index) => {
                        if (child.type === SetupItem) {
                            if (child) {
                                visibleIndex += 1;
                            }
                            return React.cloneElement(child, {
                                step: index,
                                showStep: child && !disableShowStep ? visibleIndex : null,
                                // eslint-disable-next-line react/no-array-index-key
                                key: index,
                            });
                        }
                        return child;
                    })}
                </SetupWizardContext.Provider>
            </div>
        );
    }
}

SetupWizard.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    ready: PropTypes.func,
    notComplete: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    contentStyle: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.node,
    numberOfSteps: PropTypes.number,
    allRequiredStepsCompleted: PropTypes.func,
    initialStep: PropTypes.number,
    disableShowStep: PropTypes.bool,
};

SetupWizard.defaultProps = {
    ready: null,
    notComplete: null,
    children: null,
    style: null,
    contentStyle: null,
    title: null,
    description: null,
    className: null,
    numberOfSteps: null,
    allRequiredStepsCompleted: null,
    initialStep: 0,
    disableShowStep: false,
};

SetupWizard.childContextTypes = {
    stepComplete: PropTypes.func,
    stepEnabled: PropTypes.func,
    previousStep: PropTypes.func,
    nextStep: PropTypes.func,
    toStep: PropTypes.func,
    resetToStep: PropTypes.func,
};

SetupWizard.displayName = 'SetupWizard';

SetupWizard.contextType = SetupWizardContext;

export default SetupWizard;
