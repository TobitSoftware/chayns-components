import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

export default class SelectItemInternal extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        children: PropTypes.node,
        selectListId: PropTypes.number.isRequired,
        name: PropTypes.string
    };

    static defaultProps = {
        id: null,
        className: '',
        checked: false,
        disabled: false,
        children: null,
        name: ''
    };

    constructor(props) {
        super(props);

        this.radioId = this._getRadioId(props.id);
    }

    _renderChildren() {
        if(this.props.checked) {
            return this.props.children;
        }

        return null;
    }

    _getRadioId(id) {
        return `${this.props.selectListId}-${id}`;
    }

    _handleChange = () => {
        this.props.onChange(this.props.id);
    };

    render() {
        const { selectListId } = this.props;

        return (
            <div key={this.props.id} className={this.props.className}>
                <input
                    name={selectListId}
                    type="radio"
                    className="radio"
                    id={this.radioId}
                    checked={this.props.checked}
                    onChange={this._handleChange}
                    disabled={this.props.disabled}
                />

                <label htmlFor={this.radioId}>
                    {this.props.name}
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
