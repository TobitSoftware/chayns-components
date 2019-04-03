/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SetupWizardItem from './SetupItem';

/**
 * ############################
 * # HARRY, YOU ARE A WIZARD! #
 * ############################
 */
export default class SetupWizard extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ]),
        ready: PropTypes.func,
        notComplete: PropTypes.func,
        style: PropTypes.object,
        contentStyle: PropTypes.object,
        title: PropTypes.string,
        description: PropTypes.node
    };

    static childContextTypes = {
        stepComplete: PropTypes.func,
        previousStep: PropTypes.func,
        nextStep: PropTypes.func,
        toStep: PropTypes.func,
        resetToStep: PropTypes.func
    };

    static defaultProps = {
        ready: null,
        notComplete: null,
        children: null,
        style: null,
        contentStyle: null,
        title: null,
        description: null
    };

    constructor() {
        super();
        this.state = {
            currentStep: 0,
            maxProgress: 0,
            completedSteps: []
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
            resetToStep: this.resetToStep
        };
    }

    stepComplete(value) {
        const { currentStep, completedSteps } = this.state;
        if (value === true) {
            if (completedSteps.indexOf(currentStep) === -1) {
                completedSteps.push(currentStep);
                this.setState({ completedSteps });
            }
        } else if (completedSteps.indexOf(currentStep) >= 0) {
            const { children } = this.props;

            completedSteps.splice(completedSteps.indexOf(currentStep));
            this.setState({ completedSteps });

            if(children[currentStep].props.required === true) {
                this.setState({ maxProgress: currentStep });
            }
        }
    }

    previousStep() {
        const { currentStep } = this.state;
        if (currentStep > 0) {
            this.updateContent(currentStep - 1);
        }
    }

    nextStep() {
        const { children } = this.props;
        const { currentStep } = this.state;
        if (chayns.utils.isArray(children) && children.length - 1 > currentStep) {
            this.updateContent(currentStep + 1);
        } else {
            this.ready();
        }
    }

    toStep(step) {
        const { children } = this.props;
        if (chayns.utils.isArray(children)) {
            if ((children.length - 1) >= step) {
                this.updateContent(step);
            } else if ((children.length - 1) === step + 1) {
                this.ready();
            }
        }
    }

    resetToStep(step) {
        const { completedSteps, maxProgress } = this.state;
        for(let i = step; i < maxProgress; i += 1) {
            if (completedSteps.indexOf(i) >= 0) {
                completedSteps.splice(completedSteps.indexOf(i));
            }
        }
        this.setState({ maxProgress: step, currentStep: step, completedSteps });
    }

    ready() {
        const { ready, children } = this.props;
        const { completedSteps, currentStep } = this.state;
        if(!(children[currentStep].props.required === true && completedSteps.indexOf(currentStep) === -1)) {
            if(ready) {
                ready();
            }
        } else {
            this.notComplete();
        }
    }

    notComplete() {
        const { notComplete } = this.props;
        if(notComplete) {
            notComplete();
        }
    }

    updateContent(newCurrentStep) {
        const { children } = this.props;
        let { maxProgress } = this.state;
        const { completedSteps, currentStep } = this.state;
        if(!(children[currentStep].props.required === true && completedSteps.indexOf(currentStep) === -1)) {
            maxProgress = (newCurrentStep > maxProgress) ? newCurrentStep : maxProgress;
            this.setState({
                currentStep: newCurrentStep,
                maxProgress
            });
        } else {
            this.notComplete();
        }
    }

    render() {
        const {
            style, contentStyle, title, description, children
        } = this.props;
        const { maxProgress, currentStep, completedSteps } = this.state;
        return (
            <div style={style}>
                {title && (
                    <h1>
                        {title}
                    </h1>
                )}
                {description && (
                    <p dangerouslySetInnerHTML={{ __html: description }}/>
                )}
                {
                    children.map((child, index) => (
                        <SetupWizardItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            title={child.props.title}
                            step={index + 1}
                            ready={completedSteps.indexOf(index) >= 0}
                            open={index === currentStep}
                            disabled={index > maxProgress}
                            onClick={() => {
                                if (maxProgress >= index) {
                                    if (currentStep === index) {
                                        this.setState({ currentStep: -1 });
                                    } else {
                                        this.setState({ currentStep: index });
                                    }
                                }
                            }}
                            contentStyle={contentStyle}
                        >
                            {child.props.children}
                        </SetupWizardItem>
                    ))
                }
            </div>
        );
    }
}
