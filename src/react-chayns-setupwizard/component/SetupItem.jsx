import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withSetupWizardContext from './withSetupWizardContext';
import Badge from '../../react-chayns-badge/component/Badge';
import { isDisabled } from '../utils/setupWizardHelper';

const SetupItem = ({
    step,
    showStep,
    title,
    open: openProp,
    ready: readyProp,
    disabled: disabledProp,
    onClick: onClickProp,
    required,
    contentStyle,
    children,
    enabledSteps,
    completedSteps,
    currentStep,
    toStep,
    stepRequired,
}) => {
    useEffect(() => {
        stepRequired(required, step);
    }, []);

    const disabled = isDisabled(enabledSteps, step) || disabledProp;
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
            className={classNames('accordion', {
                'accordion--open': open,
                'accordion--disabled': disabled,
            })}
        >
            <div
                className={classNames('accordion__head', 'no-arrow', 'ellipsis', 'wizardHead', { pointer: !disabled })}
                onClick={onClick}
            >
                <div className="accordion__head__icon">
                    <i className="react-chayns-icon ts-angle-right"/>
                </div>
                <div className="accordion__head__title">
                    {(typeof showStep === 'number' ? showStep : step) + 1}
                    {'. '}
                    {title}
                </div>
                <div className="accordion__head__right">
                    {ready
                        ? (
                            <Badge>
                                <i
                                    className="ts-check chayns__color--headline "
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '1rem',
                                    }}
                                />
                            </Badge>
                        )
                        : null}
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
    showStep: PropTypes.number,
    title: PropTypes.string.isRequired,
    toStep: PropTypes.func.isRequired,
    stepRequired: PropTypes.func.isRequired,
    open: PropTypes.bool,
    ready: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    contentStyle: PropTypes.object,
    children: PropTypes.element,
    required: PropTypes.bool,
    enabledSteps: PropTypes.arrayOf(PropTypes.number),
    completedSteps: PropTypes.arrayOf(PropTypes.number),
    currentStep: PropTypes.number,
};

SetupItem.defaultProps = {
    showStep: null,
    open: false,
    ready: false,
    disabled: false,
    onClick: null,
    contentStyle: {},
    children: null,
    required: false,
    enabledSteps: [],
    completedSteps: [],
    currentStep: -1,
};

export default withSetupWizardContext(SetupItem);
