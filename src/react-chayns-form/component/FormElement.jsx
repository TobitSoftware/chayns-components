import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class FormElement extends Component {
    static contextTypes = {
        form: PropTypes.object
    };
    constructor(){
        super();
    }

    /**
     * ----- make sure to use super.componentDidMount() or super.componentWillUnmount() if you're using these events inside the children of this class -----
     */


    componentDidMount() {
        if (this.context && this.context.form ) {
            if (this.context.form.attachToForm)
                this.context.form.attachToForm(this);
            if (this.context.form.showValidation) {
                this._node.addEventListener('blur', () => {
                    this.highlight(); //the classes used for highlighting are called 'valid' and 'invalid' . They should be provided via the chayns API or defined in this class
                });
            }
        };
    }
    componentWillUnmount() {
        this.context && this.context.form && this.context.form.detachFromForm ? this.context.form.detachFromForm(this) : null;
    }

    componentDidUpdate() {
        this.context && this.context.form && this.context.form.showValidation ? this.highlight() : null;
    }

    removeHighlight() {
        this._node.classList.remove('valid');
        this._node.classList.remove('invalid');
    }

    highlight = () => {
        if (this.props.required && this.context && this.context.form && this.context.form.runRules) {
            if (this.state.selectedId === undefined) {
                if (this._node.className.indexOf('choosebutton') ===  -1) { // ( && this.state.value !== null && this.state.value != '') add these conditions to prevent empty text fields from being highlighted
                    let valid = true;
                    if (this.state.value !== null && this.state.value != '') {
                        let formObj = {
                            value: this.state.value,
                            required: this.props.required,
                            name: this.props.name ? this.props.name : ''
                        };
                        valid = this.context.form.runRules(formObj);
                    } else {
                        valid = false;
                    }

                    if (valid !== null) {
                        this._node.classList.remove(!valid ? 'valid' : 'invalid');
                        this._node.classList.add(valid ? 'valid' : 'invalid');
                    }
                } else {
                    if (this._node.className.indexOf('choosebutton') > -1) {
                        !this.state.value ? this._node.classList.add('invalid') : this._node.classList.remove('invalid');
                    } else {
                        this.removeHighlight();
                    }
                }
            } else if (this.state.selectedId !== undefined) {
                if (this.state.value == (this.props.defaultId || 0)) {
                    this._node.classList.add('invalid');
                } else {
                    this._node.classList.remove('invalid');
                }
            }
        }
    };

    reset() {
        if (this.context && this.context.form) {
            this.setState({
                value: null
            });
            if (this._node) this._node.value = null; //inputs & textareas
            if (this._node.className.indexOf('choosebutton') > -1) this._node.innerText = this.props.label; //selectButton
            if (this.state.selectedId)
                this.setState({ //selectList
                    selectedId: this.props.defaultId || 0,
                    value: this.props.defaultId || 0
                });
            this.removeHighlight();
        }
    }
}