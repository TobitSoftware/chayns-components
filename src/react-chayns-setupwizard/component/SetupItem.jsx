import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SetupItem = ({
    step,
    title,
    open,
    ready,
    disabled,
    onClick,
    contentStyle,
    children,
}) => (
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
                {step}
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

SetupItem.propTypes = {
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    open: PropTypes.bool,
    ready: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    contentStyle: PropTypes.object,
    children: PropTypes.element,
    required: PropTypes.bool, /* eslint-disable-line react/no-unused-prop-types */
};

SetupItem.defaultProps = {
    open: false,
    ready: false,
    disabled: false,
    onClick: null,
    contentStyle: {},
    children: null,
    required: false,
};

export default SetupItem;
