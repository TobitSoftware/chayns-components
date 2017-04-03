import '../css/index.scss';
import React from 'react';
import classnames from 'classnames';

export default class Input extends React.Component {
    static propTypes = {
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        onKeyUp: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        responsive: React.PropTypes.bool,
        regExp: React.PropTypes.string
    };

    constructor() {
        super();
        this.state = {
            value: null
        };
    }

    onBlur = () => {
        const {onBlur, regExp} = this.props;

        //validates entered text when the input loses focus
        if (regExp) {
            if (this._node.value.match(new RegExp(regExp)))
                this._node.classList.remove('invalid');
            else
                this._node.classList.add('invalid');
        }

        if (onBlur)
            if (regExp) {
                if (this._node.value.match(new RegExp(regExp)))
                    onBlur(this._node.value);
                else
                    return null;
            } else
                onBlur(this._node.value);
    }

    onKeyUp = () => {
        const {onKeyUp, regExp} = this.props;

        if (regExp)
            if (this._node.value.match(new RegExp(regExp)))
                this._node.classList.remove('invalid'); //validates entered text if it turned invalid already

        if (onKeyUp)
            if (regExp) {
                if (this._node.value.match(new RegExp(regExp)))
                    onKeyUp(this._node.value);
                else
                    return null;
            }
            else
                onKeyUp(this._node.value);
    };

    render() {
        let {placeholder, className, style} = this.props;
        if (style === undefined) style = {};
        let classNames = classnames({
            'input-group': this.props.responsive,
            'input': !this.props.responsive,
            [className]: className
        });

        let responsiveInput = () => {
            return (
                <div
                    className={classNames}
                    style={style}
                >
                    <input
                        style={{width: '100%', marginBottom: '5px'}}
                        ref={(ref) => {this._node = ref}}
                        onKeyUp={this.onKeyUp}
                        onBlur={this.onBlur}
                        className="input"
                        type="text"
                        required
                    />
                    <label>{placeholder}</label>
                </div>
            );
        };

        let input = () => {
            style.width = '100%';
            style.marginBottom = '5px';
            return (
                <input
                    className={classNames}
                    ref={(ref) => {this._node = ref}}
                    placeholder={placeholder}
                    style={style}
                    onKeyUp={this.onKeyUp}
                    onBlur={this.onBlur}
                    type="text"
                    required
                />
            );
        };

        return (this.props.responsive ? responsiveInput() : input());
    }
}