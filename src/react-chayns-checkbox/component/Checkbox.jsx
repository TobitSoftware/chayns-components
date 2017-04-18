import React from 'react';
import classnames from 'classnames';

export default class Checkbox extends React.Component {
    static propTypes = {
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        label: React.PropTypes.string,
        children: React.PropTypes.string,
        onChange: React.PropTypes.func,
        toggleButton: React.PropTypes.bool,
        checked: React.PropTypes.bool,
        disabled: React.PropTypes.bool
    };

    static defaultProps = {
        checked: false
    };

    constructor() {
        super();
        this.id = Math.random();
        this.state = {
            value: null
        };
    }

    componentDidMount() {
        const {tooltip, checked} = this.props;

        this._node.checked = checked;
        this.setState({
            value: checked
        });

        if(tooltip)
            this._container.setAttribute('tooltip', tooltip);
    }

    onChange = () => {
        const {onChange, disabled} = this.props;

        if(!disabled)
        if (onChange) onChange(this._node.checked);
    };

    render() {
        let {className, style, disabled, children, label} = this.props;
        let classNames = classnames({
            [className]: className
        });

        let checkbox = () => {
            return(
                <div style={style}
                     className={classNames}
                     ref={(ref) => {this._container = ref}}
                >
                    <input
                        className="checkbox"
                        ref={(ref) => {this._node = ref}}
                        onChange={this.onChange}
                        type="checkbox"
                        id={this.id}
                        disabled={disabled}
                        checked={this.state.checked}
                    />
                    <label htmlFor={this.id} >
                        {children || label || ''}
                    </label>
                </div>
            );
        };

        let toggleButton = () => {
            return (
                <div style={style}
                     className={classNames}
                     ref={(ref) => {this._container = ref}}
                >
                    <input
                        className="switch"
                        ref={(ref) => {this._node = ref}}
                        onChange={this.onChange}
                        disabled={disabled}
                        type="checkbox"
                        id={this.id}
                    />
                    <label
                        htmlFor={this.id}
                        style={label ? {marginRight: '10px'} : null}
                    />
                    {children || label || ''}
                </div>
            )
        };

        return ( this.props.toggleButton ? toggleButton() : checkbox() );
    }
}