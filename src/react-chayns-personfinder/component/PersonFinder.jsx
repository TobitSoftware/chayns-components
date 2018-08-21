import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assign from 'object-assign';

export default class PersonFinder extends Component {
    static propTypes = {
        style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        className: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        reference: PropTypes.func,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        style: null,
        className: null,
        placeholder: null,
        required: null,
        reference: null,
        defaultValue: null,
        onChange: null
    };

    componentDidMount() {
        const { onChange, required } = this.props;

        this._node.setAttribute('finder', 'person');

        this._node.addEventListener('finderChange', (data) => {
            const { user } = data;
            onChange({ user, node: this._node });
        });

        if(required) { this._node.setAttribute('required', ''); }
    }

    reference = (node) => {
        const { reference } = this.props;

        this._node = node;

        if(reference) {
            reference(node);
        }
    };

    render() {
        const {
            style: styleProp,
            className,
            placeholder,
            defaultValue,
        } = this.props;

        const style = assign({}, styleProp);

        const classNames = classnames({
            input: true,
            [className]: className
        });

        return (
            <input
                type="text"
                className={classNames}
                ref={node => this.reference(node)}
                placeholder={placeholder || ''}
                defaultValue={defaultValue}
                style={style}
            />
        );
    }
}
