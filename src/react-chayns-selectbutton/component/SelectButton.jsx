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
        listKey: PropTypes.string,
        listValue: PropTypes.string,
        multiSelect: PropTypes.bool,
        quickFind: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        showSelection: PropTypes.bool,
        selectedFlag: PropTypes.string,
        stopPropagation: PropTypes.bool,
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
        listKey: 'name',
        listValue: 'value',
        selectedFlag: 'isSelected',
        stopPropagation: false,
        style: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: props.list.filter(item => item[props.selectedFlag]),
        };

        this.onClick = this.onClick.bind(this);
        this.getDialogList = this.getDialogList.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {
            list,
            listKey,
            listValue,
            selectedFlag,
        } = this.props;

        if (list !== prevProps.list
            || listKey !== prevProps.listKey
            || listValue !== prevProps.listValue
            || selectedFlag !== prevProps.selectedFlag) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ selected: list.filter(item => item[selectedFlag]) });
        }
    }

    onClick(e) {
        const {
            quickFind,
            multiSelect,
            title,
            description,
            list,
            onSelect,
            stopPropagation,
        } = this.props;
        const _list = this.getDialogList(list);

        chayns.dialog.select({
            title,
            message: description,
            quickfind: quickFind,
            multiselect: multiSelect,
            list: _list,
            buttons: multiSelect || [],
        }).then((result) => {
            if (onSelect && result.buttonType > 0) {
                onSelect(this.getReturnList(result));
            }
        }).catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
        });

        if (stopPropagation) e.stopPropagation();
    }

    getDialogList(_list) {
        const { selected } = this.state;
        const { showSelection, listKey, listValue } = this.props;
        const list = [];

        if (_list) {
            _list.forEach((item, i) => {
                const curListKey = listKey || i;
                if (item[curListKey] && item[listValue]) {
                    list.push({
                        name: item[listValue],
                        value: item[curListKey],
                        isSelected: selected.indexOf(item) >= 0 && showSelection,
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

        selectedItems.forEach((item) => {
            list.forEach((listItem) => {
                if (listItem[listKey] === item.value) {
                    result.push(listItem);
                }
            });
        });

        this.setState({ selected: result });

        return {
            buttonType,
            selection: result,
        };
    }

    render() {
        const {
            className,
            label,
            disabled,
            listValue,
            showSelection,
            style,
        } = this.props;
        const { selected } = this.state;

        return (
            <ChooseButton
                className={className}
                disabled={disabled}
                onClick={this.onClick}
                style={style}
            >
                {selected && selected.length > 0 && showSelection ? selected.map((item, index) => {
                    let str = (index === 1) ? ', ' : '';
                    str += (index < 2) ? item[listValue] : '';
                    str += (index === 2) ? '...' : '';
                    return str;
                }) : label}
            </ChooseButton>
        );
    }
}
