/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    };

    static defaultProps = {
        quickFind: false,
        multiSelect: false,
        title: '',
        description: '',
        label: 'Select',
        showSelection: true,
        className: null,
        onSelect: null,
        disabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };

        this.onClick = this.onClick.bind(this);
        this.getDialogList = this.getDialogList.bind(this);
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
            onSelect,
        } = this.props;
        const _list = this.getDialogList(list, listKey, listValue);

        chayns.dialog.select({
            title,
            message: description,
            quickfind: quickFind,
            multiselect: multiSelect,
            list: _list
        }).then((result) => {
            if (onSelect && result.buttonType > 0) {
                onSelect(this.getReturnList(result));
            }
        }).catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
        });
    }

    getDialogList(_list, listKey, listValue) {
        const { selected } = this.state;
        const { showSelection } = this.props;
        const list = [];

        if (_list) {
            _list.map((item, i) => {
                const curListKey = listKey || i;
                if (item[curListKey] && item[listValue]) {
                    list.push({
                        name: item[listValue],
                        value: item[curListKey],
                        isSelected: selected.indexOf(item) >= 0 && showSelection
                    });
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
        this.setState({ selected: result });
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
            className, label, disabled, listValue
        } = this.props;
        const { selected } = this.state;
        return (
            <ChooseButton
                className={className}
                disabled={disabled}
                onClick={this.onClick}
            >
                {selected && selected.length > 0 ? selected.map((item, index) => {
                    let str = (index === 1) ? ', ' : '';
                    str += (index < 2) ? item[listValue] : '';
                    str += (index === 2) ? '...' : '';
                    return str;
                }) : label}
            </ChooseButton>
        );
    }
}
