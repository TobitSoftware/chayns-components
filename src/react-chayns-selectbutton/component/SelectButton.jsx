/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';

export default class SelectButton extends Component {
    static propTypes = {
        onSelect: PropTypes.func,
        title: PropTypes.string,
        description: PropTypes.string,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        list: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
        listKey: PropTypes.string.isRequired,
        listValue: PropTypes.string.isRequired,
        multiSelect: PropTypes.bool,
        quickFind: PropTypes.bool,
        className: PropTypes.string,
        showSelection: PropTypes.bool,
        htmlSelect: PropTypes.bool,
    };

    static defaultProps = {
        quickFind: false,
        multiSelect: false,
        title: 'Select Dialog',
        description: 'Please select an item',
        label: 'Select',
        showSelection: true,
        className: null,
        onSelect: null,
        htmlSelect: false,
        disabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/no-unused-state
            selected: []
        };

        this.onClick = this.onClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSelect(selected) {
        const { onSelect, htmlSelect } = this.props;
        const { selection } = selected;

        if (selection.length === 1 && !htmlSelect) {
            this.setLabel(selection[0].name);
        }

        if (onSelect) {
            onSelect(this.getReturnList(selected));
        }
    }

    onClick() {
        const {
            quickFind,
            multiSelect,
            title,
            description,
            list,
            listKey,
            listValue,
        } = this.props;
        const _list = SelectButton.getDialogList(list, listKey, listValue);

        chayns.dialog.select({
            title,
            message: description,
            quickfind: quickFind,
            multiselect: multiSelect,
            list: _list
        }).then((selected) => {
            this.onSelect(selected);
        }).catch((e) => {
            console.error(e);
        });
    }

    onChange(e) {
        this.onSelect({ selection: [{ value: e.target.value }], buttonType: 1 });
    }

    static getDialogList(_list, listKey, listValue) {
        const list = [];

        if (_list) {
            _list.map((item, i) => {
                const curListKey = listKey || i;
                if (item[curListKey] && item[listValue]) {
                    list.push({ name: item[listValue], value: item[curListKey], isSelected: !!item.isSelected });
                }
            });
        }

        return list;
    }

    getReturnList(selected) {
        const { list, listKey } = this.props;
        const { buttonType, selection: selectedItems } = selected;
        const result = [];

        selectedItems.map((item) => {
            list.map((listItem) => {
                if (listItem[listKey] === item.value) result.push(listItem);
            });
        });
        return { buttonType, selection: result };
    }

    setLabel(text) {
        const { showSelection } = this.props;

        if (showSelection) {
            this._btn.innerText = text;
        }
    }

    render() {
        const {
            className, label, htmlSelect, list, disabled
        } = this.props;
        if (htmlSelect) {
            return (
                <div className={classNames('select', className, { 'select--disabled': disabled })}>
                    <select disabled={disabled} onChange={this.onChange}>
                        {
                            label
                                ? <option value="" disabled selected>{label}</option>
                                : null
                        }
                        {list.map(item => (
                            <option value={item.id}>
                                {item.name}
                            </option>
                        ))}

                    </select>
                </div>
            );
        }
        return (
            <ChooseButton
                className={className}
                disabled={disabled}
                onClick={this.onClick}
                buttonRef={(ref) => {
                    this._btn = ref;
                }}
            >
                {label}
            </ChooseButton>
        );
    }
}
