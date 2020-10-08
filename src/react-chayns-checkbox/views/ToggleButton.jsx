/* eslint-disable jsx-a11y/label-has-associated-control,react/forbid-prop-types */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import stopPropagationListener from '../../utils/stopPropagationListener';

const SWITCH_LABEL_STYLE = { marginRight: '10px' };

const ToggleButton = React.forwardRef((props, ref) => {
    const {
        id,
        style,
        disabled,
        children,
        label,
        onChange,
        checked,
        className,
        defaultChecked,
        dangerouslySetLabel,
        labelStyle,
        labelClassName,
        stopPropagation,
    } = props;

    let modifiedLabelStyle = labelStyle;
    if (label) {
        modifiedLabelStyle = {
            ...labelStyle,
            ...SWITCH_LABEL_STYLE,
        };
    }

    return (
        <div className={classnames('cc__switch', className)}>
            <input
                key="input"
                type="checkbox"
                className="switch"
                ref={ref}
                onChange={onChange}
                id={id}
                disabled={disabled}
                checked={checked}
                defaultChecked={defaultChecked}
                style={style}
                onClick={stopPropagation ? stopPropagationListener : null}
            />
            <label
                key="label"
                className={labelClassName}
                htmlFor={id}
                dangerouslySetInnerHTML={dangerouslySetLabel}
                style={modifiedLabelStyle}
                onClick={stopPropagation ? stopPropagationListener : null}
            />
            {!dangerouslySetLabel ? children || label || '' : null}
        </div>
    );
});

ToggleButton.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    labelStyle: PropTypes.object,
    labelClassName: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    dangerouslySetLabel: PropTypes.object,
    stopPropagation: PropTypes.bool,
};

ToggleButton.defaultProps = {
    style: null,
    className: null,
    label: null,
    labelClassName: null,
    labelStyle: null,
    children: null,
    onChange: null,
    checked: undefined,
    defaultChecked: undefined,
    disabled: false,
    dangerouslySetLabel: null,
    stopPropagation: false,
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
