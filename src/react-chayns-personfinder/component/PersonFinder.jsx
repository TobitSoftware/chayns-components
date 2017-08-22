import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class PersonFinder extends React.Component {
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
        this._node.setAttribute('finder', 'person');

        this._node.addEventListener('finderChange', (data) => {
            const user = data.user;
            this.props.onChange({ user, node: this._node });
        });

        if(this.props.required) { this._node.setAttribute('required', ''); }
    }

    reference = (node) => {
        this._node = node;

        if(this.props.reference) { this.props.reference(node); }
    };

    render() {
        const style = Object.assign({}, this.props.style);

        const className = classnames({
            input: true,
            [this.props.className]: this.props.className
        });

        return (
            <input
                type="text"
                className={className}
                ref={node => this.reference(node)}
                placeholder={this.props.placeholder || ''}
                defaultValue={this.props.defaultValue}
                style={style}
            />
        );
    }
}
