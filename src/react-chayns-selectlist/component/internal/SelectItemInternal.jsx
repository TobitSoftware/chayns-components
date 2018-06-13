import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

export default class SelectItemInternal extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        selectListId: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        className: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        children: PropTypes.node,
        name: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
    };

    static defaultProps = {
        id: null,
        className: '',
        checked: false,
        disabled: false,
        children: null,
        name: '',
        value: null,
    };

    constructor(props) {
        super(props);

        this.radioId = this._getRadioId(props.id);
    }

    _renderChildren() {
        const { checked, children } = this.props;

        if(checked) {
            return children;
        }

        return null;
    }

    _getRadioId(id) {
        return `${this.props.selectListId}-${id}`;
    }

    _handleChange = () => {
        const { onChange, id } = this.props;

        onChange(id);
    };

    render() {
        const {
            id,
            className,
            selectListId,
            disabled,
            name,
            checked,
        } = this.props;

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

                <CSSTransitionGroup
                    transitionName="react-fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this._renderChildren()}
                </CSSTransitionGroup>
            </div>
        );
    }
}
