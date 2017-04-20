import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Form extends Component {

    static propTypes = {
        onSubmit: PropTypes.func, //called onSubmit, receives the form values
        rules: PropTypes.array, //validate an input by any function you provide. Structure: [{name, check}, ..] where name is equal to the inputs name. check returns the valid state
        showValidation: PropTypes.bool, //if true, valid/invalid inputs will be highlighted (currently for input, textarea, selectList, selectButton
        className: PropTypes.object, //add additional styles to the form using a class
        submitButton: PropTypes.bool //If true displays a submitButton on the bottom of the form
    };

    static defaultPropTypes = {
        rules: []
    };

    static childContextTypes = {
        form: PropTypes.object
    };

    constructor() {
        super();
        this.inputs = []; //retrieves all inputs inside the form, they are specified via the extended chayns-component 'FormElement'
        this.rules = []; // [{name, check}] -> rules consist of an input name and a function to determine its validity. If check isn't set, the rule will be ignored

        //provisional classes to include error highlighting. Final versions should be included into the chayns API itself
        var valid = document.createElement('style');
        valid.type = 'text/css';
        valid.innerHTML = '.input.valid { border-bottom: 1px solid green } .selectList.valid { border-left: 1px solid green; padding-left: 5px; }';
        var invalid = document.createElement('style');
        invalid.type = 'text/css';
        invalid.innerHTML = '.input.invalid { border-bottom: 1px solid red } .selectList.invalid { border-left: 1px solid red; padding-left: 5px; } .choosebutton.invalid { border: 1px solid red }';
        document.getElementsByTagName('head')[0].appendChild(valid);
        document.getElementsByTagName('head')[0].appendChild(invalid);
    }

    /** example rule
     * [{
     * name: 'siteId',
     * check: function (text) { return (text.match('^[0-9]+$') ? true : false);  }
     * }]; //input name, check (rule function) -> will be ignored if not set
     */

    componentDidMount() {
        window.inputs = this.inputs;
        this.rules = this.props.rules;
    }

    /**
     * lifts down functions required by form children (input elements) to register/unRegister to the form
     * @returns {{form: {attachToForm: Form.attachToForm, detachFromForm: Form.detachFromForm}}}
     */
    getChildContext() {
        return {
            form: {
                attachToForm: this.attachToForm,
                detachFromForm: this.detachFromForm,
                runRules: this.runRules,
                showValidation: this.props.showValidation
            }
        }
    }

    /**
     * registers an input via the childContext to this form (on componentDidMount)
     * @param element
     */
    attachToForm = (element) => {
        this.inputs && element ? this.inputs.push(element) : null;
    };

    /**
     * removes an input via the childContext from this form (on componentWillUnmount)
     * @param element
     */
    detachFromForm = (element) => {
        this.inputs.map((input, i) => {
            if (input.props.name === element.props.name)
                this.inputs.splice(i, 1);
        });
    };

    /**
     * Retrieves all the values from the inputs and creates an array containing objects
     * @returns {Array} { name, value }
     */
    getCurrentValues() {
        const inputs = this.inputs;
        let retVal = [];
        inputs.map(input => {
            retVal.push({
                name: input.props.name ? input.props.name : '',
                required: input.props.required ? input.props.required : false,
                value: input.state.value ? input.state.value : null
            });
        });
        return retVal;
    }

    /**
     * Checks if the values are required and if a check rule is provided. If not the value counts as true.
     * If any of the values is invalid the form is invalid and won't be submitted.
     * @param values
     * @returns {boolean}
     */
    runValidation(values) {
        const _values = values;
        let valid = true;

        _values.map((_value, i) => {
            let _valueValid = true;
            if (_value.required) {
                if (_value.value) {
                    if (typeof _value.value === 'string' && _value.value === '') {
                        valid = false;
                        _valueValid = false;
                    } else if (_value.name) {
                        const ruleResult = this.runRules(_value);
                        valid = (!ruleResult ? ruleResult : valid); //if value is invalid the whole form is invalid
                        _valueValid = (!ruleResult ? ruleResult : valid);
                    }
                } else {
                    valid = false;
                    _valueValid = false;
                }
            }
            if (this.props.showValidation && !_valueValid) this.inputs[i].highlight();
        });
        return valid;
    }

    /**
     * Checks the given value with a specified function and returns the result.
     * Only returns the result if it is bool, 0 or 1. Otherwise it returns true.
     * Returns true if no rule for that value is specified.
     * @param value
     * @returns {boolean}
     */
    runRules = (value) => {
        const rules = this.rules;
        let checked = false; //fallback in case no name or rule for the value is provided
        if (rules && rules.length > 0) {
            for (let i=0;i<rules.length;i++) {
                const rule = rules[i];
                if (value.name === rule.name) {
                    checked = true;
                    if (rule.check) {
                        i = rules.length;
                        let result = rule.check(value.value);
                        return ((typeof result == 'boolean' || result === 0 || result === 1) ? result : true);
                    } else {
                        return true;
                    }
                }
            }
        }
        if(!checked) return true;
    }

    /**
     * Called after submit.
     * Resets the inputs values and states
     */
    resetForm = ()  => {
        setTimeout(() => {
            this.inputs.map(input => {
                input.reset ? input.reset() : null; //reset in FormElement implementieren
            });
        }, 0);
    };

    /**
     * 1. Retrieves all values from the inputs
     * 2. checks if they're valid
     * 3. performs the submit action provided as prop
     * @param event
     */
    onSubmit = (event) => {
        if (event)
            event.preventDefault();
        const onSub = this.props.onSubmit;
        const formValues = this.getCurrentValues();

        if (onSub && formValues) {
            const isValid = formValues ? this.runValidation(formValues) : false;
            if (isValid)
            {
                this.resetForm();
                onSub(formValues);
            }
        }
    };

    submit() {
        this.onSubmit();
    }

    render() {
        let {className, children, submitButton} = this.props;
        let classNames = classnames({
            [className]: className
        });

        const _submitButton = (
            <div style={{marginTop: '30px', width: '100%', textAlign: 'center'}}>
                <button
                    className="button"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        );

        return (
            <form
                noValidate={true}
                className={classNames}
                onSubmit={this.onSubmit}
            >
                {children}
                {submitButton ? _submitButton : null}
            </form>
        );
    }
}