import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Input extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        onKeyUp: PropTypes.func,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        responsive: PropTypes.bool,
        regExp: PropTypes.string
    };

    constructor() {
        super();
        this.state = {
            value: null
    };
    }

    setValid() {
        this._node.style.color = 'inherit';
        this._node.style.fontWeight = 'inherit';
    }

    setInvalid() {
        this._node.style.color = '#d23f31';
        this._node.style.fontWeight = '700';
    }

    handleEvent = (callback, doInvalidate = false) => {
        const { regExp } = this.props;

        const isValid = !regExp || (regExp && this._node.value.match(new RegExp(regExp)));

        if (isValid) {
            if (regExp) {
                this.setValid();
            }

            if (callback) {
                callback(this._node.value);
            }
        } else {
            if (doInvalidate) {
                this.setInvalid();
            }

            if (callback) {
                callback(null);
            }
        }
    };

    onBlur = () => this.handleEvent(this.props.onBlur, true);

    /**
     * @deprecated
     */
    onKeyUp = () => this.handleEvent(this.props.onKeyUp);

    onInput = () => this.handleEvent(this.props.onChange);

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
                    style={{ width: '100%', marginBottom: '5px' }}
                        ref={(ref) => {this._node = ref}}
                    onKeyUp={this.onKeyUp}
                    onInput={this.onInput}
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
                    onInput={this.onInput}
                    onBlur={this.onBlur}
                    type="text"
                    required
                />
            );
        };

        return (this.props.responsive ? responsiveInput() : input());
    }
    }
