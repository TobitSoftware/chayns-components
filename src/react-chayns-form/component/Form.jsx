import React, { Component PropTypes } from 'react';
import classnames from 'classnames';

export default class Form extends Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        onValid: PropTypes.func,
        onInvalid: PropTypes.func,
        className: PropTypes.object,
        children: PropTypes.children
    };

    componentDidMount() {
        this.inputs = [];
    }

    getChildContext() {
        return {
            form: {
                attachToForm: this.attachToForm,
                detachFromForm: this.detachFromForm
            }
        }
    }

    attachToForm = (element) => {
        this.inputs.push(element);
    };

    componentShouldUpdate(newProps, newState) {
        return true; // this.props.children !== newProps.children || this.props.className !== newProps.className;
    }

    onSubmit = (event) => {
        const onSub = this.props.onSubmit;
        if (onSub) {
            onSub(event);
        }
    };

    render() {
        let {className, children} = this.props;
        let classNames = classnames({
            [className]: className
        });

        return (
            <form
                className={classNames}
                onSubmit={this.onSubmit}>
                {children}
            </form>
        );
    }
}