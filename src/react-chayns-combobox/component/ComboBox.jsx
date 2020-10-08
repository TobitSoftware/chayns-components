/* eslint-disable jsx-a11y/click-events-have-key-events,react/forbid-prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import isInIframeDialog from '../utils/isInIframeDialog';
import HTMLSelectComboBox from './HTMLSelectComboBox';
import DialogSelectComboBox from './DialogSelectComboBox';
import './ComboBox.scss';

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
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    list: PropTypes.array.isRequired,
    listKey: PropTypes.string.isRequired,
    listValue: PropTypes.string.isRequired,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    stopPropagation: PropTypes.bool,
    parent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
    ]),
    style: PropTypes.object,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
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
