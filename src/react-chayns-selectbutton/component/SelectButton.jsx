/**
 * @component
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';
import { isNumber } from '../../utils/is';

/**
 * A choose button that opens a selection dialog when clicked.
 */
export default class SelectButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.list.filter((item) => item[props.selectedFlag]),
        };

        this.onClick = this.onClick.bind(this);
        this.getDialogList = this.getDialogList.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { list, listKey, listValue, selectedFlag } = this.props;

        if (
            list !== prevProps.list ||
            listKey !== prevProps.listKey ||
            listValue !== prevProps.listValue ||
            selectedFlag !== prevProps.selectedFlag
        ) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                selected: list.filter((item) => item[selectedFlag]),
            });
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
        const dialogList = this.getDialogList(list);

        chayns.dialog
            .select({
                title,
                message: description,
                quickfind: quickFind,
                multiselect: multiSelect,
                list: dialogList,
                buttons: multiSelect || [],
            })
            .then((result) => {
                if (onSelect && result.buttonType > 0) {
                    onSelect(this.getReturnList(result));
                }
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
            });

        if (stopPropagation) e.stopPropagation();
    }

    getDialogList(_list) {
        const { selected } = this.state;
        const { showListSelection, listKey, listValue } = this.props;
        const list = [];

        if (_list) {
            _list.forEach((item, i) => {
                const curListKey = listKey || i;
                if (item[curListKey] && item[listValue]) {
                    list.push({
                        name: item[listValue],
                        value: item[curListKey],
                        isSelected:
                            selected.indexOf(item) >= 0 && showListSelection,
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

        const numberOfItems = isNumber(showSelection) ? showSelection : 2;

        return (
            <ChooseButton
                className={className}
                disabled={disabled}
                onClick={this.onClick}
                style={style}
            >
                {selected && selected.length > 0 && showSelection
                    ? selected.map((item, index) => {
                          let str =
                              index > 0 &&
                              index < selected.length &&
                              index < numberOfItems
                                  ? ', '
                                  : '';
                          str += index < numberOfItems ? item[listValue] : '';
                          str += index === numberOfItems ? '...' : '';
                          return str;
                      })
                    : label}
            </ChooseButton>
        );
    }
}

SelectButton.propTypes = {
    /**
     * A callback that is invoked when the selection has changed.
     */
    onSelect: PropTypes.func,

    /**
     * A string that will be shown as a title in the selection dialog.
     */
    title: PropTypes.string,

    /**
     * A string that will be shown as a description in the selection dialog.
     */
    description: PropTypes.string,

    /**
     * Disables any user interaction and renders the button in a disabled style.
     */
    disabled: PropTypes.bool,

    /**
     * The content of the button.
     */
    label: PropTypes.string,

    /**
     * An array of items to select from. Items are provided in an object shape.
     */
    list: PropTypes.arrayOf(PropTypes.object).isRequired,

    /**
     * The property name of the list item objects that will uniquely identify
     * each one.
     */
    listKey: PropTypes.string,

    /**
     * The property name of the list item objects that will be shown as its name
     * in the selection dialog.
     */
    listValue: PropTypes.string,

    /**
     * The property name of the list item objects that mark an item as selected.
     */
    selectedFlag: PropTypes.string,

    /**
     * Wether multiple options can be selected.
     */
    multiSelect: PropTypes.bool,

    /**
     * Wether a search field should be shown in the selection dialog.
     */
    quickFind: PropTypes.bool,

    /**
     * A classname string that will be applied to the button.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be applied ot the button
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * Wether the current selection should be shown in the button. Use a number
     * to specify the maximum amount of items selected.
     */
    showSelection: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),

    /**
     * Wether the current selection should be shown in the dialog list.
     */
    showListSelection: PropTypes.bool,

    /**
     * Wether to stop propagation of click events to parent elements.
     */
    stopPropagation: PropTypes.bool,
};

SelectButton.defaultProps = {
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
    showListSelection: true,
    style: null,
};

SelectButton.displayName = 'SelectButton';
