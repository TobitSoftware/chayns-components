/* eslint-disable jsx-a11y/label-has-associated-control,react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import CheckboxView from '../views/Checkbox';
import ToggleButton from '../views/ToggleButton';

let checkboxId = 1;

const Checkbox = ({ id, toggleButton, onChange, disabled, ...props }) => {
    const idRef = useRef(`cc_checkbox_${checkboxId++}`);

    const handleChange = (e) => {
        if (!disabled && onChange) {
            onChange(e.target.checked);
        }
    };

    const currentId = id || idRef.current;

    if (toggleButton) {
        return (
            <ToggleButton {...props} id={currentId} onChange={handleChange}/>
        );
    }

    return <CheckboxView {...props} id={currentId} onChange={handleChange}/>;
};

export default Checkbox;

Checkbox.propTypes = {
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
    toggleButton: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    dangerouslySetLabel: PropTypes.object,
    stopPropagation: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Checkbox.defaultProps = {
    style: null,
    className: null,
    label: null,
    labelClassName: null,
    labelStyle: null,
    children: null,
    onChange: null,
    toggleButton: false,
    checked: undefined,
    defaultChecked: undefined,
    disabled: false,
    dangerouslySetLabel: null,
    stopPropagation: false,
    id: null,
};

Checkbox.displayName = 'Checkbox';
