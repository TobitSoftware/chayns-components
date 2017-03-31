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

    static defaultProps = {
        style: {}
    };

    constructor() {
        super();
    }

    componentDidMount() {
        if (this.props.regExp)
            this._node.setAttribute('validate', this.props.regExp);
    }

    onChange = () => {
        const {onChange} = this.props;

        if (this.props.onChange)
            if (this.props.regExp) {
                if (this._node.value.match(new RegExp(this.props.regExp)))
                    onChange(this._node.value);
            }
            else
                onChange(this._node.value);
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
                        onChange={this.onChange}
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
                    onChange={this.onChange}
                    type="text"
                    required
                />
            );
        };

        return (this.props.responsive ? responsiveInput() : input());
    }
}