import React from 'react';
import classnames from 'classnames';

export default class PersonFinder extends React.Component {

    static propTypes = {
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        required: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };

    defaultStyle = {
        width: '100%'
    };

    render() {
        let style = Object.assign({}, this.defaultStyle, this.props.style);

        let className = classnames({
            input: true,
            [this.props.className]: this.props.className
        });

        return (
            <input type="text"
                   className={className}
                   ref={(node) => this._node = node}
                   placeholder={this.props.placeholder || ''}
                   style={style}/>
        );
    }

    componentDidMount() {
        this._node.setAttribute('finder', 'person');

        this._node.addEventListener('finderChange', (data) => {
            let user = data.user;
            this.props.onChange({user: user, node: this._node});
        });

        if(this.props.required)
            this._node.setAttribute('required', '');
    }
}