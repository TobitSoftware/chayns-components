/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';
import './FilterButton.scss';

const isValue = (val) => typeof val !== 'undefined' && val !== null;

const PREFIX = 'CC_FB_';
let currentId = 0;

/**
 * A chip-like component that is used to filter lists. Usually used in a group
 * of 2 or more.
 */
const FilterButton = ({
    icon,
    label,
    count,
    checked,
    onChange,
    name,
    value,
    className,
    style,
    id,
    disabled,
    stopPropagation,
    small,
    rectangular,
}) => {
    const htmlId = useRef(id || `${PREFIX}${(currentId += 1)}`);

    if (!isValue(label) && !isValue(icon)) {
        return null;
    }

    const captureClick = stopPropagation
        ? (e) => e.stopPropagation()
        : undefined;

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <label
            className={classNames(className, 'button--filter', {
                'button--filter--disabled': disabled,
                'button--filter--active': checked,
                'chayns__color--headline': checked && !className,
                'button--filter--small': small,
                'button--filter--rectangular': rectangular,
            })}
            style={style}
            htmlFor={htmlId.current}
            onClick={captureClick}
        >
            <input
                id={htmlId.current}
                type={name ? 'radio' : 'checkbox'}
                name={name}
                className="button--filter__input"
                onChange={(e) => {
                    if (onChange) {
                        if (e.target.type === 'checkbox') {
                            onChange(e.target.checked, htmlId.current);
                        } else {
                            onChange(isValue(value) ? value : e.target.value);
                        }
                    }
                }}
                checked={checked}
                disabled={disabled}
            />
            <span className="label chayns__color--text">
                {icon ? (
                    <Icon
                        icon={icon}
                        className="button--filter__icon chayns__color--headlinei"
                    />
                ) : null}
                {/* eslint-disable-next-line no-nested-ternary */}
                {isValue(label) ? <span>{label}</span> : null}
                {isValue(count) ? <b>{count}</b> : null}
            </span>
        </label>
    );
};

FilterButton.propTypes = {
    /**
     * A string or `ReactNode` that is shown inside of the filter button.
     */
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.element,
    ]),

    /**
     * A number that is shown in bold on the right side of the button.
     */
    count: PropTypes.number,

    /**
     * A function that will be called when the state of the button changes.
     */
    onChange: PropTypes.func,

    /**
     * Wether the button is checked or not.
     */
    checked: PropTypes.bool,

    /**
     * Multiple filter buttons with the same name belong to one group. Only one
     * of the buttons in a group can be active at one time.
     */
    name: PropTypes.string,

    /**
     * The value that is provided as the first argument to the
     * `onChanged`-callback when the `name`-property is set.
     */
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types

    /**
     * An icon that will be shown in the button. Use a FontAwesome icon like
     * this: `"fa fa-plane"`.
     */
    icon: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.shape({
            iconName: PropTypes.string.isRequired,
            prefix: PropTypes.string.isRequired,
        }).isRequired,
    ]),

    /**
     * A classname string that will be set on the `<label>`-element. To change
     * the color of the filter button give it a class that sets the CSS
     * `color`-attribute, not `background-color`.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be applied to the `<label>`-element. To
     * change the color of the filter button, add a `color`-style attribute to
     * the button, not `background-color`.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * An HTML id that will be set on the (invisible) `<input>`-element. This is
     * given as the second argument to onChange if `name` is unset.
     */
    id: PropTypes.string,

    /**
     * Disables any interaction and renders the filter button as disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Wether to stop propagation of click events to parent elements.
     */
    stopPropagation: PropTypes.bool,

    /**
     * Shrinks the filter button in size.
     */
    small: PropTypes.bool,

    /**
     * Changes the filter button shape to that of a button.
     */
    rectangular: PropTypes.bool,
};

FilterButton.defaultProps = {
    label: undefined,
    count: undefined,
    icon: undefined,
    onChange: undefined,
    checked: false,
    name: undefined,
    value: undefined,
    className: undefined,
    style: undefined,
    id: undefined,
    disabled: false,
    stopPropagation: false,
    small: false,
    rectangular: false,
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
