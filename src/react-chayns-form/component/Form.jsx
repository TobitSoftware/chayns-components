import React from 'react';
import classnames from 'classnames';

export default class Form extends React.Component {
    static propTypes = {
        submit: React.PropTypes.func.isRequired,
        submitButton: React.PropTypes.bool,
        intro: React.PropTypes.string,
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
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.form.map((key, i) => {
            this.form[key] = null;
        });
    }

    isValid() {
        let valid = true;
        Object.keys(this.form ? this.form : null).forEach((key) => {
            if (this.form[key] === null)
                valid = false;
        });
        return valid;
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
        let {className, intro, submitButton} = this.props;
        let classNames = classnames({
            'content__card': true,
            [className]: className
        });

        let _intro = (
            <div style={{marginBottom: '40px'}}>
                {intro ? intro : null}
            </div>
        );

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
                {intro ? _intro : null}
                <div>
                    {this.props.children}
                </div>
                {submitButton ? _submitButton : null}
            </div>
        );
    }
}