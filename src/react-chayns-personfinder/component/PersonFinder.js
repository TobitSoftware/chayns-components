import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class PersonFinder extends React.Component {

    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        reference: PropTypes.func,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func
    };

    defaultStyle = {
        width: '100%'
    };

    reference = (node) => {
        this._node = node;

        if(this.props.reference)
            this.props.reference(node);
    };

    componentDidMount() {
        this._node.setAttribute('finder', 'person');

        this._node.addEventListener('finderChange', (data) => {
            let user = data.user;
            this.props.onChange({user: user, node: this._node});
        });

        if(this.props.required)
            this._node.setAttribute('required', '');
    }

    render() {
        let style = Object.assign({}, this.defaultStyle, this.props.style);

        let className = classnames({
            input: true,
            [this.props.className]: this.props.className
        });

        return (
            <input type="text"
                   className={className}
                   ref={(node) => this.reference(node)}
                   placeholder={this.props.placeholder || ''}
                   defaultValue={this.props.defaultValue}
                   style={style}/>
        );
    }
}