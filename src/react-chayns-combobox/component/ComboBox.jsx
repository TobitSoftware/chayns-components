/* eslint-disable jsx-a11y/click-events-have-key-events,react/forbid-prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import isInIframeDialog from '../utils/isInIframeDialog';
import HTMLSelectComboBox from './HTMLSelectComboBox';
import DialogSelectComboBox from './DialogSelectComboBox';
import './ComboBox.scss';

/**
 * A custom select component that allows the user to select one of a list of
 * options.
 */
const ComboBox = ({
    className,
    label,
    list,
    disabled,
    listValue,
    listKey,
    stopPropagation,
    defaultValue,
    parent,
    onSelect,
    style,
    value,
}) => {
    const iframeDialogView = useMemo(isInIframeDialog, []);

    return (
        <>
            {iframeDialogView
                ? (
                    <HTMLSelectComboBox
                        className={className}
                        label={label}
                        list={list}
                        disabled={disabled}
                        listValue={listValue}
                        listKey={listKey}
                        stopPropagation={stopPropagation}
                        defaultValue={defaultValue}
                        onSelect={onSelect}
                    />
                )
                : (
                    <DialogSelectComboBox
                        className={className}
                        label={label}
                        list={list}
                        disabled={disabled}
                        listValue={listValue}
                        listKey={listKey}
                        stopPropagation={stopPropagation}
                        defaultValue={defaultValue}
                        parent={parent}
                        onSelect={onSelect}
                        style={style}
                        value={value}
                    />
                )}
        </>
    );
};

export default ComboBox;

ComboBox.propTypes = {
    /**
     * This callback is called when an item is selected.
     */
    onSelect: PropTypes.func,

    /**
     * Disables any interactions and styles the combobox with a disabled style.
     */
    disabled: PropTypes.bool,

    /**
     * A placeholder value shown inside the combobox.
     */
    label: PropTypes.string,

    /**
     * An array of values to select from.
     */
    list: PropTypes.array.isRequired,

    /**
     * The name of the property on the list objects that uniquely identifies an
     * item.
     */
    listKey: PropTypes.string.isRequired,

    /**
     * The name of the property on the list objects that is shown as its name.
     */
    listValue: PropTypes.string.isRequired,

    /**
     * A classname string that will be applied to the Button component and the
     * overlay.
     */
    className: PropTypes.string,

    /**
     * The default value of the combobox. This does not work in combination with
     * the `label` or `value` props.
     */
    defaultValue: PropTypes.string,

    /**
     * Wether to stop the propagation of click events.
     */
    stopPropagation: PropTypes.bool,

    /**
     * The parent component of the combobox overlay.
     */
    parent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

    /**
     * A React style object that will be applied to the Button component and the
     *  overlay.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * The value of the combobox. This does not work in combination with the `
     * label`-prop.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ComboBox.defaultProps = {
    label: null,
    className: null,
    onSelect: null,
    disabled: false,
    stopPropagation: false,
    defaultValue: null,
    parent: null,
    style: null,
    value: null,
};

ComboBox.displayName = 'ComboBox';
