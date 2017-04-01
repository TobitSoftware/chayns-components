import '../css/index.scss';
import React from 'react';
import classnames from 'classnames';

export default class Checkbox extends React.Component {
    static propTypes = {
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        label: React.PropTypes.string,
        onChange: React.PropTypes.func,
        toggleButton: React.PropTypes.bool
    };



    constructor() {
        super();
        this.id = Math.random();
        this.state = {
            value: null
        };
    }

    onChange = () => {
        const {onChange} = this.props;

        if (onChange) onChange(this._node.checked);
    }

    render() {
        let {className, style} = this.props;
        let classNames = classnames({
            [className]: className
        });

        let checkbox = () => {
            return(
                <div style={style} className={classNames}>
                    <input
                        className="checkbox"
                        ref={(ref) => {this._node = ref}}
                        onChange={this.onChange}
                        type="checkbox"
                        id={this.id}
                    />
                    <label htmlFor={this.id} >
                        {this.props.label}
                    </label>
                </div>
            );
        };

        let toggleButton = () => {
            return (
                <div style={style} className={classNames}>
                    <input
                        className="switch"
                        ref={(ref) => {this._node = ref}}
                        onChange={this.onChange}
                        type="checkbox"
                        id={this.id}
                    />
                    <label
                        htmlFor={this.id}
                        style={this.props.label ? {marginRight: '10px'} : null}
                    />
                    {this.props.label ? this.props.label : ''}
                </div>
            )
        }


        return ( this.props.toggleButton ? toggleButton() : checkbox() );
    }
}