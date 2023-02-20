/**
 * @component
 */

import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RadioButton from '../../react-chayns-radiobutton/component/RadioButton';
import Tooltip from '../../react-chayns-tooltip/component/Tooltip';
import SelectListContext from './selectListContext';

/**
 * A radio button that expands its content when selected. Should be used inside
 * of a `SelectList`.
 */
const SelectListItem = ({
    children,
    id,
    htmlId,
    value,
    className,
    tooltipProps,
    disabled,
    name,
}) => {
    const { selectListSelectedId, changeListItem, selectListId } =
        useContext(SelectListContext);

    const handleChange = () => {
        if (changeListItem) {
            changeListItem(id, value);
        }
    };

    const checked = id === selectListSelectedId;

    return (
        <div key={id} className={className}>
            {tooltipProps ? (
                <Tooltip {...tooltipProps}>
                    <RadioButton
                        style={{ display: 'inline' }}
                        id={htmlId}
                        name={selectListId}
                        checked={checked}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        {name}
                    </RadioButton>
                </Tooltip>
            ) : (
                <RadioButton
                    id={htmlId}
                    name={selectListId}
                    checked={checked}
                    onChange={handleChange}
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
};

SelectListItem.propTypes = {
    /**
     * The select item id. It identifies the `SelectItem` for the
     * `defaultValue`- and `value`-props of the `SelectList`-component and will
     * be given as the first argument to the `onChange`-callback of the
     * `SelectList`-component.
     */
    id: PropTypes.number,

    /**
     * The html id which will be used for the input of the radio button
     */
    htmlId: PropTypes.string,

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
};

SelectListItem.defaultProps = {
    id: null,
    htmlId: null,
    className: '',
    disabled: false,
    children: null,
    name: '',
    value: null,
    tooltipProps: null,
};

SelectListItem.displayName = 'SelectItem';

export default SelectListItem;
