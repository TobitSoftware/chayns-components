import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assign from 'object-assign';

export default class TextArea extends Component {
    static defaultStyle = {
        width: '100%',
        paddingBottom: '12px'
    };

    static propTypes = {
        style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        className: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        onKeyUp: PropTypes.func,
        onKeyDown: PropTypes.func,
        autogrow: PropTypes.bool,
        reference: PropTypes.func,
        stopPropagation: PropTypes.bool,
    };

    static defaultProps = {
        style: null,
        className: null,
        placeholder: null,
        required: null,
        onChange: null,
        onBlur: null,
        defaultValue: undefined,
        value: undefined,
        onKeyUp: null,
        onKeyDown: null,
        autogrow: null,
        reference: null,
        stopPropagation: false,
    };

    componentDidMount() {
        const { required, autogrow } = this.props;

        if (required) {
            this._node.setAttribute('required', '');
        }

        this._node.setAttribute('row', '1');
        this._node.style.overflow = 'hidden';

        if (autogrow) {
            this.offset = this._node.offsetHeight - this._node.clientHeight;

            this.initialHeight = '0px';

            this.grow('0');
        }
    }

    onChange = () => {
        const { onChange, autogrow } = this.props;

        if (onChange) {
            onChange(this._node.value);
        }

        if (autogrow) {
            if (this._node.value === '') {
                this.grow(this.initialHeight);
            } else {
                this.grow('0');
            }
        }
    };

    onBlur = () => {
        const { onBlur } = this.props;

        if (onBlur) {
            onBlur(this._node.value); // TODO: Get data from event
        }
    };

    ref = (node) => {
        const { reference } = this.props;

        this._node = node;

        if (reference) {
            reference(node);
        }
    };

    grow(initHeight) {
        if (initHeight) {
            this._node.style.height = initHeight;
        }

        if (this._node.scrollHeight + this.offset > 0) {
            this._node.style.height = `${this._node.scrollHeight + this.offset}px`;
        }
    }

    render() {
        const {
            style: styleProp,
            className,
            placeholder,
            defaultValue,
            onChange,
            autogrow,
            onBlur,
            onKeyUp,
            onKeyDown,
            value,
            stopPropagation,
        } = this.props;

        const style = assign({}, this.defaultStyle, styleProp);

        const classNames = classnames('input', className);

        return (
            <textarea
                className={classNames}
                ref={this.ref}
                placeholder={placeholder}
                style={style}
                defaultValue={defaultValue}
                onChange={(onChange || autogrow) ? this.onChange : null}
                onBlur={onBlur ? this.onBlur : null}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                value={value}
                onClick={stopPropagation ? event => event.stopPropagation() : null}
            />
        );
    }
}
