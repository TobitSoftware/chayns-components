import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectListContext from './selectListContext';

const ANIMATION_TIMEOUT = 500;

export default class SelectList extends Component {
    static maxId = 0;

    // eslint-disable-next-line react/static-property-placement
    static contextType = SelectListContext;

    constructor(props) {
        super(props);

        const preselectId = ((props.defaultValue || props.defaultValue === 0) ? props.defaultValue : props.value);

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

        if (propValue) {
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
                if (child && child.props && child.props.id && !child.props.disabled) {
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
                <SelectListContext.Provider value={{
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

SelectList.propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    selectFirst: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    className: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
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
