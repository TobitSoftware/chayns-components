import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SelectItemInternal extends React.Component {

    constructor(props) {
        super(props);

        this.radioId = this._getRadioId(props.id);
    }

    render() {
        return(
            <div key={this.props.id} className={this.props.className || ''}>
                <input name="sampleRadio"
                       type="radio"
                       className="radio"
                       id={this.radioId}
                       checked={this.props.checked}
                       onChange={this._handleChange}
                       disabled={this.props.disabled} />
                
                <label htmlFor={this.radioId}>
                    {this.props.name}
                </label>

                <ReactCSSTransitionGroup
                    transitionName="react-fade"
                    transitionEnterTimeout={350}
                    transitionLeaveTimeout={500}>

                    {this._renderChildren()}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    _renderChildren() {
        if(this.props.checked)
            return this.props.children;

        return null;
    }

    _getRadioId(id) {
        return `${this.props.selectListId}-${id}`;
    }

    _handleChange = () => {
        this.props.onChange(this.props.id)
    }
}