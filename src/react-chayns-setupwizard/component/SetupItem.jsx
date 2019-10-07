import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withSetupWizardContext from './withSetupWizardContext';

const SetupItem = (
    {
        step,
        title,
        open: openProp,
        ready: readyProp,
        disabled: disabledProp,
        onClick: onClickProp,
        required,
        contentStyle,
        children,
        maxProgress,
        completedSteps,
        currentStep,
        toStep,
        stepRequired,
    },
) => {
    useEffect(() => {
        stepRequired(required, step);
    }, []);

    const disabled = step > maxProgress || disabledProp;
    const open = step === currentStep || openProp;
    const ready = completedSteps.indexOf(step) >= 0 || readyProp;
    const onClick = (event) => {
        if (!disabled) {
            if (step === currentStep) {
                toStep(-1);
            } else {
                toStep(step);
            }
            if (onClickProp) {
                onClickProp(event);
            }
        }
    };
    return (
        <div
            className={classNames('accordion', 'accordion--fixed', {
                'accordion--open': open,
                'accordion--disabled': disabled,
            })}
        >
            <div
                className={classNames('accordion__head', 'no-arrow', 'ellipsis', 'wizardHead', { pointer: !disabled })}
                onClick={onClick}
            >
                <div
                    className={classNames('number', {
                        'wizard_step--ready': ready,
                        'wizard_step--notReady': !ready,
                    })}
                >
                    {step + 1}
                </div>
                <div className="title">
                    {title}
                </div>
            </div>
            <div className="accordion__body" style={contentStyle}>
                {children}
            </div>
        </div>
    );
};

SetupItem.propTypes = {
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    toStep: PropTypes.func.isRequired,
    stepRequired: PropTypes.func.isRequired,
    open: PropTypes.bool,
    ready: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    contentStyle: PropTypes.object,
    children: PropTypes.element,
    required: PropTypes.bool,
    maxProgress: PropTypes.number,
    completedSteps: PropTypes.arrayOf(PropTypes.number),
    currentStep: PropTypes.number,
};

SetupItem.defaultProps = {
    open: false,
    ready: false,
    disabled: false,
    onClick: null,
    contentStyle: {},
    children: null,
    required: false,
    maxProgress: 0,
    completedSteps: [],
    currentStep: -1,
};

export default withSetupWizardContext(SetupItem);
