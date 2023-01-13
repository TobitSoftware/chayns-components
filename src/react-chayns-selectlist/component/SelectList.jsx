/**
 * @component
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SelectListContext from './selectListContext';

const ANIMATION_TIMEOUT = 500;

/**
 * A vertical list of radio buttons that reveal content when selected.
 */
export default class SelectList extends Component {
    constructor(props) {
        super(props);

        const preselectId =
            props.defaultValue || props.defaultValue === 0
                ? props.defaultValue
                : props.value;

        this.state = {
            selectedId: preselectId || 0,
        };

        this.selectListId = `cc_selectlist__${SelectList.maxId}`;
        SelectList.maxId += 1;
    }

    componentDidMount() {
        const { selectFirst, children } = this.props;
        if (selectFirst) {
            this.calculateFirst(children);
        }
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props;

        if (prevProps && prevProps.value !== value) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                selectedId: value,
            });
        }
    }

    changeActiveItem = (id, value) => {
        const { selectedId } = this.state;

        if (id === selectedId) return;

        if (this.changing) return;

        const { onChange, value: propValue } = this.props;

        if (onChange) {
            onChange(id, value);
        }

        if (propValue !== undefined && propValue !== null) {
            return;
        }

        this.changing = true;

        window.setTimeout(() => {
            this.changing = false;
        }, ANIMATION_TIMEOUT);

        this.setState({
            selectedId: id,
        });
    };

    calculateFirst(children) {
        if (!children) {
            return;
        }

        let firstItemId = 0;

        for (let i = 0, z = children.length; i < z; i += 1) {
            const child = children[i];
            if (React.isValidElement(child)) {
                if (
                    child &&
                    child.props &&
                    child.props.id &&
                    !child.props.disabled
                ) {
                    firstItemId = child.props.id;
                    break;
                }
            }
        }

        this.setState({
            selectedId: firstItemId,
        });
    }

    render() {
        const { className, children, style } = this.props;
        const { selectedId } = this.state;

        return (
            <div className={className} style={style}>
                <SelectListContext.Provider
                    value={{
                        selectListSelectedId: selectedId,
                        changeListItem: this.changeActiveItem,
                        selectListId: this.selectListId,
                    }}
                >
                    {children}
                </SelectListContext.Provider>
            </div>
        );
    }
}

SelectList.maxId = 0;

SelectList.contextType = SelectListContext;

SelectList.propTypes = {
    /**
     * A callback that is invoked when the selected item changes.
     */
    onChange: PropTypes.func,

    /**
     * Specifies the `SelectItem` that is selected by default with its `id`.
     */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The currently selected `SelectItem` by its `id`.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The children elements of the list. Should contain `SelectItem`
     * components.
     */
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),

    /**
     * Wether the first entry should be selected by default. **(deprecated)**
     */
    selectFirst: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types

    /**
     * A classname string that will be applied to the container element.
     */
    className: PropTypes.string,

    /**
     * A React style object
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
};

SelectList.defaultProps = {
    className: null,
    defaultValue: null,
    value: null,
    onChange: null,
    selectFirst: null,
    children: null,
    style: null,
};

SelectList.displayName = 'SelectList';
