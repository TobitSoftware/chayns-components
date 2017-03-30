import React from 'react';
import classnames from 'classnames';

export default class Input extends React.Component {
    static propTypes = {
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        responsive: React.PropTypes.bool,
        regExp: React.PropTypes.string
    };

    defaultStyle = {
        width: '100%',
        marginBottom: '5px'
    };

    constructor() {
        super();
    }

    render() {
        const {placeholder, className, style} = this.props;

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
                        ref={this.ref}
                        onChange={this.onChange}
                        className="input"
                    >
                    </input>
                    <label>{placeholder}</label>
                </div>
            );
        }

        let input = () => {
            return (
                <input
                    className={classNames}
                    ref={this.ref}
                    placeholder={placeholder}
                    style={style}
                    onChange={this.onChange}
                >
                </input>
            );
        }

        return (this.props.responsive ? responsiveInput() : input());
    }

    componentDidMount() {
        if (this.props.regExp)
            this._node.setAttribute('validate', this.props.regExp);

        this._node.setAttribute('required', '')

        this._node.setAttribute('type', 'text');
    }

    onChange = (event) => {
        const {onChange} = this.props;

        if (this.props.onChange)
            if (this.props.regExp) {
                if (this._node.value.match(new RegExp(this.props.regExp)))
                    onChange(this._node.value);
            }
            else
                onChange(this._node.value);
    };

    ref = (node) => {
        this._node = node;
    };
}