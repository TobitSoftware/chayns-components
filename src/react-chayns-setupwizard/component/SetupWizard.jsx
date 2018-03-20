/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * ############################
 * # HARRY, YOU ARE A WIZARD! #
 * ############################
 */
export default class SetupWizard extends React.Component {
    static defaultProps = {
        ready: null,
        notComplete: null,
        children: null,
        style: null,
        contentStyle: null,
        title: null,
        description: null
    };

    static childContextTypes = {
        stepComplete: PropTypes.func,
        previousStep: PropTypes.func,
        nextStep: PropTypes.func,
        toStep: PropTypes.func,
    };

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
        this.ready = this.ready.bind(this);
        this.notComplete = this.notComplete.bind(this);
    }

    getChildContext() {
        return {
            stepComplete: this.stepComplete,
            previousStep: this.previousStep,
            nextStep: this.nextStep,
            toStep: this.toStep
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
            completedSteps.splice(completedSteps.indexOf(currentStep));
            this.setState({ completedSteps });
            if(this.props.children[currentStep].props.required === true) {
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

    ready() {
        const { ready } = this.props;

        if(ready) {
            ready();
        }
    }


    notComplete() {
        const { notComplete } = this.props;

        if(notComplete) {
            notComplete();
        }
    }

    updateContent(newCurrentStep) {
        let { maxProgress } = this.state;
        const { completedSteps, currentStep } = this.state;
        if(!(this.props.children[currentStep].props.required === true && completedSteps.indexOf(currentStep) === -1)) {
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
                {(title !== null) ? <h1>{title}</h1> : null}
                {(description !== null) ? <p dangerouslySetInnerHTML={{ __html: description }}/> :
                    null}
                {
                    children.map((child, index) => {
                        return (
                            <div
                                className={classNames('accordion', 'accordion--fixed', {
                                    'accordion--open': (index === currentStep),
                                    'accordion--disabled': (index > maxProgress)
                                })}
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                            >
                                <div
                                    className={classNames('accordion__head', 'no-arrow', 'ellipsis', 'wizardHead', { pointer: (index <= maxProgress) })}
                                    onClick={() => {
                                        if (maxProgress >= index) {
                                            if (currentStep === index) {
                                                this.setState({ currentStep: -1 });
                                            } else {
                                                this.setState({ currentStep: index });
                                            }
                                        }
                                    }}
                                >
                                    <div
                                        className={classNames('number', {
                                            numberDarkComplete: (chayns.env.site.colorMode === 1 && completedSteps.indexOf(index) >= 0),
                                            numberDarkNotComplete: (chayns.env.site.colorMode === 1 && completedSteps.indexOf(index) === -1),
                                            'chayns__background-color--70 chayns__color--5': (chayns.env.site.colorMode !== 1 && completedSteps.indexOf(index) >= 0),
                                            'chayns__background-color--20 chayns__color--100': (chayns.env.site.colorMode !== 1 && completedSteps.indexOf(index) === -1)
                                        })}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="title">
                                        {child.props.title}
                                    </div>
                                </div>
                                <div className="accordion__body" style={contentStyle}>
                                    {child}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
