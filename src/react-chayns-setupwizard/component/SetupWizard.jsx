import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SetupWizardContext from './setupWizardContext';
import SetupItem from './SetupItem';

/**
 * ############################
 * # HARRY, YOU ARE A WIZARD! #
 * ############################
 */
export default class SetupWizard extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
        ]),
        ready: PropTypes.func,
        notComplete: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        contentStyle: PropTypes.object,
        title: PropTypes.string,
        description: PropTypes.node,
        numberOfSteps: PropTypes.number.isRequired,
    };

    static defaultProps = {
        ready: null,
        notComplete: null,
        children: null,
        style: null,
        contentStyle: null,
        title: null,
        description: null,
        className: null,
    };

    static childContextTypes = {
        stepComplete: PropTypes.func,
        previousStep: PropTypes.func,
        nextStep: PropTypes.func,
        toStep: PropTypes.func,
        resetToStep: PropTypes.func,
    };

    static contextType = SetupWizardContext;

    constructor(props) {
        super(props);

        this.completedSteps = [-1]; // Used to fix state timing problem
        this.state = {
            currentStep: 0,
            maxProgress: 0,
            completedSteps: this.completedSteps,
            requiredSteps: [],
        };

        this.stepComplete = this.stepComplete.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.toStep = this.toStep.bind(this);
        this.resetToStep = this.resetToStep.bind(this);
        this.ready = this.ready.bind(this);
        this.notComplete = this.notComplete.bind(this);
    }

    getChildContext() {
        return {
            stepComplete: this.stepComplete,
            previousStep: this.previousStep,
            nextStep: this.nextStep,
            toStep: this.toStep,
            resetToStep: this.resetToStep,
        };
    }

    stepComplete = (value) => {
        const { currentStep } = this.state;

        if (value && this.completedSteps.indexOf(currentStep) === -1) {
            this.completedSteps = this.completedSteps.concat(currentStep);
            this.setState({
                completedSteps: this.completedSteps,
            });
        } else if (!value && this.completedSteps.indexOf(currentStep) >= 0) {
            this.completedSteps = this.completedSteps.slice(0, this.completedSteps.indexOf(currentStep));
            this.setState({
                completedSteps: this.completedSteps,
                maxProgress: currentStep,
            });
        }
    };

    stepRequired = (value, currentStep) => {
        const { requiredSteps } = this.state;

        if (value && requiredSteps.indexOf(currentStep) < 0) {
            requiredSteps.push(currentStep);
        } else if (requiredSteps.indexOf(currentStep) >= 0) {
            requiredSteps.splice(requiredSteps.indexOf(currentStep), 1);
        }
        this.setState({ requiredSteps });
    };

    previousStep = () => {
        const { currentStep } = this.state;
        if (currentStep > 0) {
            this.updateContent(currentStep - 1);
        }
    };

    nextStep = () => {
        const { children, numberOfSteps } = this.props;
        const { currentStep } = this.state;
        if ((numberOfSteps || (chayns.utils.isArray(children) && children.length)) - 1 > currentStep) {
            this.updateContent(currentStep + 1);
        } else {
            this.ready();
        }
    };

    toStep = (step) => {
        const { children, numberOfSteps } = this.props;
        if (((numberOfSteps || (chayns.utils.isArray(children) && children.length)) - 1) >= step) {
            this.updateContent(step);
        } else {
            this.ready();
        }
    };

    resetToStep = (step) => {
        const { maxProgress } = this.state;
        this.completedSteps = this.completedSteps.filter(s => !(step <= s && s < maxProgress));
        this.setState({
            maxProgress: step,
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

    notComplete = () => {
        const { notComplete } = this.props;
        if (notComplete) {
            notComplete();
        }
    };

    updateContent = (newCurrentStep) => {
        const {
            currentStep, maxProgress, requiredSteps,
        } = this.state;
        if (requiredSteps.indexOf(currentStep) < 0 || this.completedSteps.indexOf(currentStep) >= 0 || newCurrentStep <= maxProgress - 1) {
            this.setState({
                currentStep: newCurrentStep,
                maxProgress: (newCurrentStep > maxProgress) ? newCurrentStep : maxProgress,
            });
        } else {
            this.notComplete();
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
        } = this.props;
        const {
            maxProgress, currentStep, completedSteps, requiredSteps,
        } = this.state;

        return (
            <div style={style} className={className}>
                {title && (
                    <h1>
                        {title}
                    </h1>
                )}
                {description && (
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                )}
                <SetupWizardContext.Provider value={{
                    maxProgress,
                    completedSteps,
                    requiredSteps,
                    currentStep,
                    contentStyle,
                    stepComplete: this.stepComplete,
                    stepRequired: this.stepRequired,
                    previousStep: this.previousStep,
                    nextStep: this.nextStep,
                    toStep: this.toStep,
                    resetToStep: this.resetToStep,
                    notComplete: this.notComplete,
                }}
                >
                    {children.map((child, index) => {
                        if (child.type === SetupItem && !child.props.step) {
                            // eslint-disable-next-line no-console
                            console.warn('[chayns-components] SetupWizard: You did not set the step property to your SetupWizardItem. It´s deprecated since chayns-components 4.12 and will be removed in a future version. Please consider docs for migration.');
                            // eslint-disable-next-line react/no-array-index-key
                            return React.cloneElement(child, { step: index, key: index });
                        }
                        return child;
                    })}
                </SetupWizardContext.Provider>
            </div>
        );
    }
}
