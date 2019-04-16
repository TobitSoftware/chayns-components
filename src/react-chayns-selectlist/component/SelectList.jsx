import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ANIMATION_TIMEOUT = 500;

export default class SelectList extends Component {
    static maxId = 0;

    static propTypes = {
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
        style: PropTypes.object,
    };

    static defaultProps = {
        className: null,
        defaultValue: null,
        value: null,
        onChange: null,
        selectFirst: null,
        children: null,
        style: null,
    };

    constructor(props) {
        super(props);

        const preselectId = ((props.defaultValue || props.defaultValue === 0) ? props.defaultValue : props.value);

        this.state = {
            selectedId: preselectId || 0,
        };

        if (props.defaultValue && props.onChange) {
            props.onChange(props.defaultValue);
        }
    }

    componentWillMount() {
        this.selectListId = `cc_selectlist__${SelectList.maxId}`;
        SelectList.maxId += 1;

        const { children, selectFirst } = this.props;
        if (selectFirst) {
            this.calculateFirst(children);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { value } = this.props;

        if (nextProps.value && nextProps.value !== value) {
            this.setState({
                selectedId: nextProps.value,
            });
        }
    }

    _changeActiveItem = (id, value) => {
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

        if (children.length > 0) {
            return (
                <div className={className} style={style}>
                    {React.Children.map(children, (child) => {
                        if (!React.isValidElement(child)) {
                            return null;
                        }

                        return React.cloneElement(child, {
                            changeListItem: this._changeActiveItem,
                            selectListId: this.selectListId,
                            selectListSelectedId: selectedId,
                        });
                    })}
                </div>
            );
        }

        return null;
    }
}
