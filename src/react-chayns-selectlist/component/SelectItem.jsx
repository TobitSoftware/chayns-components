import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default class SelectItem extends Component {
    static propTypes = {
        id: PropTypes.number,
        changeListItem: PropTypes.func,
        selectListId: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        children: PropTypes.node,
        name: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        selectListSelectedId: PropTypes.number,
    };

    static defaultProps = {
        id: null,
        className: '',
        disabled: false,
        children: null,
        changeListItem: null,
        name: '',
        value: null,
        selectListSelectedId: null,
    };

    constructor(props) {
        super(props);

        this.radioId = this._getRadioId(props.id);
    }

    _handleChange = () => {
        const { changeListItem, id, value } = this.props;

        if (changeListItem) {
            changeListItem(id, value);
        }
    };

    _getRadioId(id) {
        const { selectListId } = this.props;

        return `${selectListId}-${id}`;
    }

    render() {
        const {
            id,
            className,
            selectListId,
            disabled,
            name,
            selectListSelectedId,
            children,
        } = this.props;

        const checked = (id === selectListSelectedId);

        return (
            <div
                key={id}
                className={className}
            >
                <input
                    name={selectListId}
                    type="radio"
                    className="radio"
                    id={this.radioId}
                    checked={checked}
                    onChange={this._handleChange}
                    disabled={disabled}
                />

                <label htmlFor={this.radioId}>
                    {name}
                </label>

                {children && (
                    <TransitionGroup>
                        {checked && (
                            <CSSTransition
                                key="children"
                                classNames="react-fade"
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <div className="selectlist__selectitem">
                                    {children}
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                )}
            </div>
        );
    }
}
