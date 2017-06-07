import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Checkbox extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
        label: PropTypes.any,
        children: PropTypes.any,
        onChange: PropTypes.func,
        toggleButton: PropTypes.bool,
        checked: PropTypes.bool,
        staticChecked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        tooltip: PropTypes.string
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

        if((checked === true || checked === false ) &&
            (process && process.env && process.env.NODE_ENV !== "production") &&
            window.env !== "production") {

            console.warn('The prop "checked" is deprecated and will be changed in future releases. Please use "defaultChecked" or "staticChecked" (will be checked-prop in next major release) instead.');
        }

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
        const {className, style, disabled, children, label, staticChecked, defaultChecked} = this.props;
        let classNames = classnames({
            [className]: className
        });
        let {checked} = this.state;

        if(staticChecked === false || staticChecked === true) checked = staticChecked;

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
                        checked={checked}
                        defaultChecked={defaultChecked}
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