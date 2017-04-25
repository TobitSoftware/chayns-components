import FormElement from '../../react-chayns-form/component/FormElement.jsx';
import React from 'react';
import classnames from 'classnames';

export default class PersonFinder extends FormElement {

    static propTypes = {
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        required: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        defaultValue: React.PropTypes.string,
        value: React.PropTypes.string,
        onKeyUp: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        autogrow: React.PropTypes.bool,
        reference: React.PropTypes.func
    };

    static defaultStyle = {
        width: '100%',
        paddingBottom: '12px'
    };

    constructor() {
        super();
        this.state = {
            value: null
        }
    }

    render() {
        let style = Object.assign({}, this.defaultStyle, this.props.style);
        const props = this.props;

        let className = classnames({
            input: true,
            [this.props.className]: this.props.className
        });

        return (
            <textarea
                   className={className}
                   ref={this.ref}
                   placeholder={props.placeholder}
                   style={style}
                   defaultValue={props.defaultValue}
                   onChange={this.onChange}
                   onKeyUp={props.onKeyUp}
                   onKeyDown={props.onKeyDown}
                   value={props.value}
            />
        );
    }

    componentDidMount() {
        super.componentDidMount();
        if(this.props.required)
            this._node.setAttribute('required', '');

        if(this.props.autogrow) {
            this.offset = this._node.offsetHeight - this._node.clientHeight;

            this.initialHeight = `${this._node.scrollHeight + this.offset}px`;

            if(!this.props.defaultValue) {
                this.grow();
            } else {
                this.grow('0');
            }
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    onChange = (event) => {

        //if (event.target.value) //should not define the values to return in a component itself
            this.setState({
                value: event.target.value
            });

        if(this.props.onChange)
            this.props.onChange(event);

        if(this.props.autogrow) {
            if(this._node.value === '')
                this.grow(this.initialHeight);
            else
                this.grow('0');
        }
    };

    ref = (node) => {
        this._node = node;

        if(this.props.reference)
            this.props.reference(node);
    };

    grow(initHeight) {
        if (initHeight) {
            this._node.style.height = initHeight;
        }

        if (this._node.scrollHeight + this.offset > 0) {
            this._node.style.height = `${this._node.scrollHeight + this.offset}px`;
        }
    }
}