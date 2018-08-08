import React from 'react';
import PropTypes from 'prop-types';


export default class TextString extends React.Component {
    static propTypes = {
        textString: PropTypes.string.isRequired,
        render: PropTypes.bool,
        replace: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        renderHtml: PropTypes.bool,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        render: null,
        replace: null,
        renderHtml: null,
        classNames: null,
    };

    constructor() {
        super();

        this.state = {
            editmode: false
        };

        this.editorInitialized = false;
    }

    componentDidMount() {
        this.updateTextStrings();

        this._div.addEventListener('click', (event) => {
            if(event.ctrlKey) {
                this._div.innerHTML = this._textString;

                this.setState({
                    editmode: true
                });
            }
        });
    }

    componentDidUpdate() {
        this.updateTextStrings();
    }

    static getEditableParent(element) {
        let $element = element;

        while ($element && !$element.hasAttribute('chayns-lang')) {
            if($element.nodeName.toLowerCase() === 'body' || !$element) {
                return null;
            }
            $element = $element.parentNode;
        }
        return $element;
    }

    _closed = (event) => {
        const target = TextString.getEditableParent(event.target || event.srcElement || this);
        if(target !== this._div) {
            window.setTimeout(() => {
                this._textString = this._div.innerHTML;

                this._div.innerHTML = this._replacePlaceholder(this._textString);

                this.setState({
                    editmode: false
                });
            }, 100);
        }
    };

    updateTextStrings() {
        const { editmode } = this.state;

        if(!this.editorInitialized && editmode && this._showTextString() && window.chayns.env.user.isAuthenticated) {
            const { textString, render } = this.props;

            this._div.setAttribute('chayns-lang', textString);

            if(render === null || render) {
                window.chayns.utils.lang.renderTextStrings(this._div.parentNode);
            }

            document.addEventListener('click', this._closed);

            this.editorInitialized = true;
        }
    }

    _replacePlaceholder(value) {
        const { replace } = this.props;
        let retVal = value;

        if(retVal && replace) {
            Object.keys(replace).map((key) => {
                retVal = retVal.replace(new RegExp(key, 'g'), replace[key]);
            });
        }

        return retVal;
    }


    _showTextString() {
        return (this._textString !== null && this._textString !== '') || window.showTextStrings;
    }

    render() {
        const { textString, renderHtml, classNames } = this.props;

        if(textString) {
            this._textString = window.chayns.utils.lang.get(textString);

            if(this._showTextString() && this._textString !== '') {
                if(renderHtml) {
                    return (
                        <div
                            className={classNames}
                            ref={(div) => { this._div = div; }}
                            dangerouslySetInnerHTML={{ __html: this._replacePlaceholder(this._textString) }}
                        />
                    );
                }


                return (
                    <div
                        className={classNames}
                        ref={(div) => { this._div = div; }}
                    >
                        {this._replacePlaceholder(this._textString)}
                    </div>
                );
            }

            if(this._showTextString()) {
                return (
                    <div
                        className={classNames}
                        ref={(div) => { this._div = div; }}
                    >
                        {'No textstring found.'}
                    </div>
                );
            }
        }

        return null;
    }
}
