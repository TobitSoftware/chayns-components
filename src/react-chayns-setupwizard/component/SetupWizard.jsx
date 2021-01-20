/**
 * @component {./docs.md}
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isDisabled } from '../utils/setupWizardHelper';
import SetupWizardItem from './SetupItem';
import SetupWizardContext from './setupWizardContext';

/**
 * A set of steps the user has to go through sequentially.
 */
class SetupWizard extends Component {
    constructor(props) {
        super(props);
        const { initialStep } = this.props;

        this.completedSteps = [-1]; // Used to fix state timing problem

        this.state = {
            currentStep: initialStep,
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
        this.allRequiredStepsCompleted = this.allRequiredStepsCompleted.bind(
            this
        );
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
            this.toStep(initialStep); // needed to enable all steps until the initial step
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
            this.completedSteps.splice(
                this.completedSteps.indexOf(selectedStep),
                1
            );
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
        if (value && index < 0) {
            // enable step
            enabledSteps.push(step);
        } else if (!value && index >= 0) {
            // disable step
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
        const { children, numberOfSteps } = this.props;
        const { currentStep } = this.state;

        let next = currentStep + 1;
        for (
            ;
            (numberOfSteps || (Array.isArray(children) && children.length)) >
            next;
            next += 1
        ) {
            if (children[next]) {
                this.toStep(next);
                return;
            }
        }
        this.toStep(next);
    };

    /**
     * Go to a step
     * @param step: the chosen step
     */
    toStep = (step) => {
        const { children, numberOfSteps, operationMode } = this.props;
        const { currentStep, enabledSteps, requiredSteps } = this.state;

        if (
            (numberOfSteps || (Array.isArray(children) && children.length)) -
                1 >=
            step
        ) {
            if (
                requiredSteps.indexOf(currentStep) < 0 ||
                this.completedSteps.indexOf(currentStep) >= 0 ||
                !isDisabled(enabledSteps, step)
            ) {
                for (let i = 0; i <= step; i += 1) {
                    this.stepEnabled(
                        operationMode === SetupWizard.operationMode.DEFAULT
                            ? true
                            : operationMode ===
                                  SetupWizard.operationMode
                                      .ONLY_CURRENT_STEP_ENABLED && i === step,
                        i
                    );
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
        this.completedSteps = this.completedSteps.filter(
            (s) => !(step <= s && s < enabledSteps)
        );
        this.setState({
            enabledSteps: enabledSteps.filter((s) => s <= step),
            currentStep: step,
            completedSteps: this.completedSteps,
        });
    };

    ready = () => {
        const { ready } = this.props;
        const { currentStep, requiredSteps } = this.state;
        if (
            !(
                requiredSteps.indexOf(currentStep) >= 0 &&
                this.completedSteps.indexOf(currentStep) === -1
            )
        ) {
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
            maxProgress,
            currentStep,
            completedSteps,
            requiredSteps,
            enabledSteps,
            operationMode,
        } = this.state;

        let visibleIndex = -1;

        return (
            <div style={style} className={className}>
                {title && <h1>{title}</h1>}
                {description && (
                    // eslint-disable-next-line react/no-danger
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                )}
                <SetupWizardContext.Provider
                    value={{
                        maxProgress,
                        completedSteps,
                        requiredSteps,
                        currentStep,
                        contentStyle,
                        enabledSteps,
                        operationMode,
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
                        if (child.type === SetupWizardItem) {
                            if (child) {
                                visibleIndex += 1;
                            }
                            return React.cloneElement(child, {
                                step: index,
                                showStep:
                                    child && !disableShowStep
                                        ? visibleIndex
                                        : null,
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

SetupWizard.operationMode = {
    DEFAULT: 0,
    ONLY_CURRENT_STEP_ENABLED: 1,
};

SetupWizard.propTypes = {
    /**
     * An array of `SetupWizardItem` components.
     */
    children: PropTypes.node,

    /**
     * A callback that is invoked after `nextStep` is called when the last step
     * is active and all required steps are completed.
     */
    ready: PropTypes.func,

    /**
     * A callback that is invoked after `nextStep` is called but some required
     * steps are not completed.
     */
    notComplete: PropTypes.func,

    /**
     * A classname string that will be applied to the container element.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be applied to the container element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * A React style object that will be applied to the content elements.
     */
    contentStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * The title of the wizard.
     */
    title: PropTypes.string,

    /**
     * The description of the wizard. Can be a `string` or a `ReactNode`.
     */
    description: PropTypes.node,

    /**
     * The number of steps in the wizard.
     */
    numberOfSteps: PropTypes.number,

    /**
     * A callback that is invoked when all required steps have been completed.
     */
    allRequiredStepsCompleted: PropTypes.func,

    /**
     * The initial step of the wizard.
     */
    initialStep: PropTypes.number,

    /**
     * Removes the number that is displayed in front of the title.
     */
    disableShowStep: PropTypes.bool,

    /**
     * Specifies the mode of the wizard. `0` is the regular behavior, `1` means
     * that all steps except the current one will be disabled and the user
     * cannot manually navigate between steps.
     */
    operationMode: PropTypes.oneOf([0, 1]),
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
    operationMode: SetupWizard.operationMode.DEFAULT,
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
