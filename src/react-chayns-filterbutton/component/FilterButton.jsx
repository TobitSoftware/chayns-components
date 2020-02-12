import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';
import './FilterButton.scss';

const isValue = val => typeof val !== 'undefined' && val !== null;

const PREFIX = 'CC_FB_';
let currentId = 0;

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
}) => {
    const htmlId = useRef(id || `${PREFIX}${(currentId += 1)}`);

    if (!isValue(label) && !isValue(icon)) {
        return null;
    }

    const captureClick = stopPropagation ? e => e.stopPropagation() : undefined;

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <label
            className={classNames(className, 'button--filter', {
                'button--filter--disabled': disabled,
                'button--filter--active': checked,
                'chayns__color--headline': checked,
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
                    if (e.target.type === 'checkbox') {
                        onChange(e.target.checked);
                    } else {
                        onChange(isValue(value) ? value : e.target.value);
                    }
                }}
                checked={checked}
            />
            <span className="chayns__color--text">
                {icon ? (
                    <Icon
                        icon={icon}
                        className="button--filter__icon chayns__color--headlinei"
                    />
                ) : null}
                {isValue(label) ? `${label} ` : null}
                {isValue(count) ? <b>{count}</b> : null}
            </span>
        </label>
    );
};

FilterButton.propTypes = {
    label: PropTypes.string,
    count: PropTypes.number,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    name: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
    icon: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.shape({
            iconName: PropTypes.string.isRequired,
            prefix: PropTypes.string.isRequired,
        }).isRequired,
    ]),
    className: PropTypes.string,
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
    id: PropTypes.string,
    disabled: PropTypes.bool,
    stopPropagation: PropTypes.bool,
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
};

export default FilterButton;
