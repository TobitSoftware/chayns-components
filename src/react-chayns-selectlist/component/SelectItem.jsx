/**
 * @component
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RadioButton from '../../react-chayns-radiobutton/component/RadioButton';
import Tooltip from '../../react-chayns-tooltip/component/Tooltip';
import SelectListContext from './selectListContext';

// HOC
export default function withContext(props) {
    return (
        <SelectListContext.Consumer>
            {(context) => <SelectItem {...context} {...props} />}
        </SelectListContext.Consumer>
    );
}

/**
 * A radio button that expands its content when selected. Should be used inside
 * of a `SelectList`.
 */
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
    /**
     * The select item id. It identifies the `SelectItem` for the
     * `defaultValue`- and `value`-props of the `SelectList`-component and will
     * be given as the first argument to the `onChange`-callback of the
     * `SelectList`-component.
     */
    id: PropTypes.number,

    /**
     * A classname string that will be applied to the container element.
     */
    className: PropTypes.string,

    /**
     * Disables any user interaction and renders the `SelectItem` in a disabled
     * style.
     */
    disabled: PropTypes.bool,

    /**
     * The items content that will be revealed when it is selected.
     */
    children: PropTypes.node,

    /**
     * The name of the `SelectItem` that is shown as a label next to its radio
     * button.
     */
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /**
     * Any additional info for the item.
     */
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    /**
     * When specified, a `ToolTip`-component will wrap the radio button and these
     * props will be forwarded.
     */
    tooltipProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types

    /**
     * **WARNING:** Internal use only. Do not rely on this prop.
     */
    selectListSelectedId: PropTypes.number,

    /**
     * **WARNING:** Internal use only. Do not rely on this prop.
     */
    changeListItem: PropTypes.func,

    /**
     * **WARNING:** Internal use only. Do not rely on this prop.
     */
    selectListId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
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
