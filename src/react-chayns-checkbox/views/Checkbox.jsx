/* eslint-disable jsx-a11y/label-has-associated-control,react/forbid-prop-types */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import stopPropagationListener from '../../utils/stopPropagationListener';

const CHECKBOX_LABEL_STYLE = { display: 'inline' };

const Checkbox = React.forwardRef((props, ref) => {
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
    if ((!label && !dangerouslySetLabel && !children)) {
        modifiedLabelStyle = {
            ...labelStyle,
            ...CHECKBOX_LABEL_STYLE,
        };
    }

    return (
        <div className={classnames('cc__checkbox', className)}>
            <input
                key="input"
                type="checkbox"
                className="checkbox"
                ref={ref}
                onClick={stopPropagation ? stopPropagationListener : null}
                onChange={onChange}
                id={id}
                disabled={disabled}
                checked={checked}
                defaultChecked={defaultChecked}
                style={style}
            />
            <label
                key="label"
                style={modifiedLabelStyle}
                className={labelClassName}
                onClick={stopPropagation ? stopPropagationListener : null}
                htmlFor={id}
                dangerouslySetInnerHTML={dangerouslySetLabel}
            >
                {!dangerouslySetLabel ? (children || label || '') : null}
            </label>
        </div>
    );
});

Checkbox.propTypes = {
    id: PropTypes.number.isRequired,
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

Checkbox.defaultProps = {
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
