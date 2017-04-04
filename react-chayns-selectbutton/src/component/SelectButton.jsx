import React from 'react';
import classnames from 'classnames';

export default class SelectButton extends React.Component {

    static propTypes = {
        onSelect: React.PropTypes.func,
        title: React.PropTypes.string,
        description: React.PropTypes.string,
        label: React.PropTypes.string,
        list: React.PropTypes.array.isRequired,
        listKey: React.PropTypes.string.isRequired,
        listValue: React.PropTypes.string.isRequired,
        multiSelect: React.PropTypes.bool,
        quickFind: React.PropTypes.bool,
        className: React.PropTypes.string,
        style: React.PropTypes.object
    };

    static defaultProps = {
        quickFind: false,
        multiSelect: false,
        title: 'Select Dialog',
        description: 'Please select an item',
        label: 'Select'
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };

        this.onClick = this.onClick.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    getDialogList(_list, listKey, listValue) {
        let list = [];
        if (_list)
            _list.map((item, i) => {
                listKey = (listKey ? listKey : i);
                if (item[listKey] && item[listValue])
                    list.push({name: item[listValue], value: item[listKey]});
            });

        return list;
    }

    getReturnList(selectedItems) {
        const {list, listKey} = this.props;
        let result = [];
        selectedItems.map((item, i) => {
            list.map((listItem, j) => {
               if (listItem[listKey] === item.value) result.push(listItem);
            });
        });
        return result;
    }

    onCancel() {
        const onSelect = this.props.onSelect;
        if (onSelect)
            onSelect(null);
    }

    onSelect(selection) {
        const {onSelect} = this.props;
        if (onSelect)
            onSelect(this.getReturnList(selection));
    }

    onClick() {
        let {quickFind, multiSelect, title, description, list, listKey, listValue} = this.props;
        let _list = this.getDialogList(list, listKey, listValue);

        chayns.dialog.select({
            title: title,
            message: description,
            quickfind: quickFind,
            multiselect: multiSelect,
            list: _list
        }).then((selected) => {
            if (selected.selection.length > 0)
                this.onSelect(selected.selection);
            else
                this.onCancel();
        }).catch((e) => {
            console.error(e)
        });
    }

    render() {
        let {className, label} = this.props;
        let classNames = classnames({
            'chooseButton': true,
            [className]: className
        });

        return (
            <div
                className={classNames}
                onClick={this.onClick}
            >
                {label}
            </div>
        );
    }
}