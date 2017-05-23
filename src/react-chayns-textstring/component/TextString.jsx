import React from 'react';
import PropTypes from 'prop-types';


import Loader from '../helper/Loader';

//Loader.loadScript("https://chayns-res.tobit.com/API/v3/intern/chaynsLangRes/js/chaynsLangRes.min.js");

class TextString extends React.Component {
    static propTypes = {
        textString: PropTypes.string.isRequired,
        render: PropTypes.bool,
        replace: PropTypes.object,
        renderHtml: PropTypes.bool
    };

    constructor() {
        super();

        this.state = {
            editmode: false
        };

        this.editorInitialized = false;
    }

    render() {
        if(this.props.textString) {
            this._textString = window.chayns.utils.lang.get(this.props.textString);

            if(this._showTextString() && this._textString != '') {
                if(this.props.renderHtml)
                return (
                    <div className={this.props.classNames} ref={(div) => this._div = div} dangerouslySetInnerHTML={{__html: this._replacePlaceholder( this._textString )}}>
                    </div>
                );


                return (
                    <div className={this.props.classNames} ref={(div) => this._div = div} >
                        {this._replacePlaceholder( this._textString )}
                    </div>
                );
            } else if(this._showTextString()) {
                return (
                    <div className={this.props.classNames} ref={(div) => this._div = div}>
                        No textstring found.
                    </div>
                );
            }
        }

        return null;
    }

    _replacePlaceholder(value) {
        if(value && this.props.replace) {
            Object.keys(this.props.replace).map((key) => {
                value = value.replace(new RegExp(key, "g"), this.props.replace[key]);
            });
        }

        return value;
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

    updateTextStrings() {
        if(!this.editorInitialized && this.state.editmode && this._showTextString() && window.chayns.env.user.isAuthenticated) {
            this._div.setAttribute('chayns-lang', this.props.textString);

            if(this.props.render == null || this.props.render)
                window.chayns.utils.lang.renderTextStrings(this._div.parentNode);

            document.addEventListener('click', this._closed);

            this.editorInitialized = true;
        }
    }

    _closed = (event) => {
        let target = this.getEditableParent(event.target || event.srcElement || this);
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


    getEditableParent($element) {
        while ($element && !$element.hasAttribute('chayns-lang')) {
            if ($element.nodeName.toLowerCase() === 'body' || !$element) {
                return null;
            }
            $element = $element.parentNode;
        }
        return $element;
    }

    _showTextString() {
        return (this._textString != null && this._textString != '') || window.showTextStrings;
    }

    _isAdmin() {
        if (window.chayns.env.user.isAuthenticated) {
            var groups = window.chayns.env.user.groups;
            for (var i = 0, l = groups.length; i < l; i++) {
                if (groups[i].id === 1) {
                    return true;
                }
            }
        }

        return false;
    }
}

export default TextString;