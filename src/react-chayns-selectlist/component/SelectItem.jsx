import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SelectListContext from './selectListContext';

import RadioButton from '../../react-chayns-radiobutton/component/RadioButton';
import Tooltip from '../../react-chayns-tooltip/component/Tooltip';

// HOC
export default function withContext(props) {
    return (
        <SelectListContext.Consumer>
            {(context) => <SelectItem {...context} {...props} />}
        </SelectListContext.Consumer>
    );
}

class SelectItem extends Component {
    handleChange = () => {
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
            tooltipProps,
        } = this.props;

        const checked = id === selectListSelectedId;

        return (
            <div key={id} className={className}>
                {tooltipProps ? (
                    <Tooltip {...tooltipProps}>
                        <RadioButton
                            style={{ display: 'inline' }}
                            name={selectListId}
                            checked={checked}
                            onChange={this.handleChange}
                            disabled={disabled}
                        >
                            {name}
                        </RadioButton>
                    </Tooltip>
                ) : (
                    <RadioButton
                        name={selectListId}
                        checked={checked}
                        onChange={this.handleChange}
                        disabled={disabled}
                    >
                        {name}
                    </RadioButton>
                )}
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

SelectItem.propTypes = {
    id: PropTypes.number,
    changeListItem: PropTypes.func,
    selectListId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectListSelectedId: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    tooltipProps: PropTypes.object,
};

SelectItem.defaultProps = {
    id: null,
    className: '',
    disabled: false,
    children: null,
    changeListItem: null,
    name: '',
    value: null,
    selectListSelectedId: null,
    tooltipProps: null,
};

SelectItem.displayName = 'SelectItem';
