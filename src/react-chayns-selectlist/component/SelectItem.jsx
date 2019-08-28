import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SelectListContext from './SelectListContext';

import RadioButton from '../../react-chayns-radiobutton/component/RadioButton';

// HOC
export default function withContext(props) {
    return (
        <SelectListContext.Consumer>
            {
                context => <SelectItem {...context} {...props} />
            }
        </SelectListContext.Consumer>
    );
}

class SelectItem extends Component {
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

    _handleChange = () => {
        const { changeListItem, id, value } = this.props;

        if (changeListItem) {
            changeListItem(id, value);
        }
    };

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
                <RadioButton
                    name={selectListId}
                    checked={checked}
                    onChange={this._handleChange}
                    disabled={disabled}
                >
                    {name}
                </RadioButton>

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
