import React from 'react';
import classnames from 'classnames';

export default class Form extends React.Component {
    static propTypes = {
        submit: React.PropTypes.func.isRequired,
        submitButton: React.PropTypes.bool,
        className: React.PropTypes.object,
        form: React.PropTypes.array
    };

    static defaultProps = {
        submitButton: false,
        form: []
    };

    constructor() {
        super();
        this.form = {};
        this.refElems = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.form.map((key, i) => {
            this.form[key] = null;
        });

        if (this.props && this.props.children)
            this.getFormProps(this.props.children);
        
        console.log(this.form)
        console.log(this.refElems)
    }

    isValid() {
        let valid = true;
        Object.keys(this.form ? this.form : null).forEach((key) => {
            if (this.form[key] === null)
                valid = false;
        });
        return valid;
    }

    getFormProps(elems) {
        if (elems && elems.map)
            elems.map((elem, i) => {
                if (elem.props && elem.props.children)
                    this.getFormProps(elem.props.children);
                if (elem.props && elem.props.formProp) {
                    this.form[elem.props.formProp] = null;
                    this.refElems[elem.props.formProp] = elem;
                }

            });
        else if (elems && elems.props && elems.props.formProp)
        {
            this.form[elems.props.formProp] = null;
            this.refElems[elems.props.formProp] = elems;
        }
    }

    setValue(key, value) {
        this.form[key] = value;
        if (this.isValid() && this.props.submitButton)
            this._submit.classList.remove('button--disabled');
        else if (this.props.submitButton)
            this._submit.classList.add('button--disabled');
    }

    onSubmit() {
        if (this.isValid())
            this.props.submit ? this.props.submit(this.form ? this.form : null) : null;
    }


    render() {
        let {className, submitButton} = this.props;
        let classNames = classnames({
            [className]: className
        });

        let _submitButton = (
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px'}}>
                <div
                    ref={ref => {this._submit = ref;}}
                    className="button button--disabled"
                    onClick={() => { this.onSubmit() } }
                >
                    Submit
                </div>
            </div>
        );

        return (
            <div className={classNames}>
                <div>
                    {this.props.children}
                </div>
                {submitButton ? _submitButton : null}
            </div>
        );
    }
}