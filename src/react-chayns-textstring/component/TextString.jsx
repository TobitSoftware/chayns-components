import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextString extends Component {
    static propTypes = {
        stringName: PropTypes.string.isRequired,
        replacements: PropTypes.objectOf(PropTypes.string),
        children: PropTypes.node.isRequired,
        useDangerouslySetInnerHTML: PropTypes.bool,
        language: PropTypes.string,
        fallback: PropTypes.string,
    };

    static defaultProps = {
        replacements: [],
        useDangerouslySetInnerHTML: false,
        language: null,
        fallback: '',
    };

    static textStrings = {};

    static language = (chayns.env.language || navigator.language || 'de').substring(0, 2).toLowerCase();

    static getTextString(stringName, language) {
        return new Promise((resolve, reject) => {
            const lang = TextString.languages.find(l => l.code === (language || TextString.language)).value;
            Object.keys(TextString.textStrings[lang]).forEach((lib) => {
                if (TextString.textStrings[lang][lib][stringName]) {
                    resolve(TextString.textStrings[lang][lib][stringName]);
                }
            });
            reject(new Error(`TextString ${stringName} could not be found in loaded libraries.`));
        });
    }

    static loadLibrary(projectName, middle = 'langRes', language) { // TODO is textstring in right language?
        return new Promise((resolve, reject) => {
            const lang = TextString.languages.find(l => l.code === (language || TextString.language)).value;
            if (!(TextString.textStrings[lang] && TextString.textStrings[lang][projectName])) {
                fetch(`https://chayns-res.tobit.com/LangStrings/${projectName}/${projectName}${middle}_${lang}.json`).then((response) => {
                    if (response.status === 200) {
                        response.json().then((json) => {
                            TextString.textStrings[lang] = { [projectName]: { ...json, ...{ middle } } };
                            if (window.debugLevel >= 3) {
                                // eslint-disable-next-line no-console
                                console.debug('TextString Storage', TextString.textStrings);
                            }
                            resolve();
                        }).catch((e) => {
                            reject(e);
                        });
                    } else {
                        reject(response.statusText);
                    }
                }).catch((e) => {
                    reject(e);
                });
            } else {
                resolve();
            }
        });
    }

    static changeTextString(stringName, text, language) {
        return new Promise((resolve, reject) => {
            fetch('https://chayns1.tobit.com/TappApi/LangRes/TextString', {
                mode: 'cors',
                method: 'post',
                headers: {
                    Accept: 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `StringName=${stringName}&Text=${encodeURIComponent(text)}&Language=${language}`
            }).then((response) => {
                if (response.status === 200) {
                    resolve(response.json());
                } else {
                    reject(response.statusText);
                }
            }, reject);
        });
    }

    static setLanguage(language) {
        TextString.language = language.substring(0, 2).toLowerCase();
    }

    static languages = [{
        name: 'Deutsch',
        value: 'Ger',
        code: 'de',
    }, {
        name: 'Englisch',
        value: 'Eng',
        code: 'en',
    }, {
        name: 'Französisch',
        value: 'Fra',
        code: 'fr',
    }, {
        name: 'Niederländisch',
        value: 'Ned',
        code: 'nl',
    }, {
        name: 'Italienisch',
        value: 'Ita',
        code: 'it',
    }, {
        name: 'Portugiesisch',
        value: 'Pt',
        code: 'pt',
    }, {
        name: 'Spanisch',
        value: 'Es',
        code: 'es',
    }, {
        name: 'Türkisch',
        value: 'Tr',
        code: 'tr',
    }];

    constructor() {
        super();
        this.state = { textString: null };
        this.childrenOnClick = this.childrenOnClick.bind(this);
        this.replace = this.replace.bind(this);
        this.changeStringDialog = this.changeStringDialog.bind(this);
        this.changeStringResult = this.changeStringResult.bind(this);
    }

    componentDidMount() {
        const { stringName, language, fallback } = this.props;
        TextString.getTextString(stringName, language).then(this.replace, () => {
            this.replace(fallback);
        });
    }

    replace(text) {
        const { replacements } = this.props;

        let textString = text;
        Object.keys(replacements).forEach((replacement) => {
            textString = textString.replace(replacement, replacements[replacement]);
        });
        this.setState({ textString });
    }

    childrenOnClick(e) {
        const { stringName, language } = this.props;
        if (e.ctrlKey) { // TODO Check if user is manufacturer
            chayns.dialog.select({
                title: `TextString bearbeiten: ${stringName}`,
                message: `Wähle die Sprache: (angezeigt wird ${TextString.languages.find(l => l.code === (language || TextString.language)).name})`,
                quickfind: 0,
                multiselect: 0,
                list: TextString.languages
            }).then((data1) => {
                if (data1.buttonType === 1 && data1.selection && data1.selection.length > 0) {
                    const lang = data1.selection[0];
                    if (lang.value === TextString.languages.find(l => l.code === (language || TextString.language)).value) { // language is already selected
                        this.changeStringDialog(lang);
                    } else {
                        // Get lib
                        let library = null;
                        let middle = 'langRes';
                        const globalLang = TextString.languages.find(l => l.code === TextString.language).value;
                        Object.keys(TextString.textStrings[globalLang]).forEach((lib) => {
                            if (TextString.textStrings[globalLang][lib][stringName]) {
                                library = lib;
                                // eslint-disable-next-line prefer-destructuring
                                middle = TextString.textStrings[globalLang][lib].middle;
                            }
                        });
                        TextString.loadLibrary(library, middle, TextString.languages.find(l => l.value === lang.value).code).then(() => {
                            this.changeStringDialog(lang);
                        });
                    }
                }
            });
        }
    }

    changeStringDialog(lang) {
        const { stringName, useDangerouslySetInnerHTML } = this.props;
        TextString.getTextString(stringName, TextString.languages.find(l => l.value === lang.value).code).then((textString) => {
            if (useDangerouslySetInnerHTML) {
                chayns.register({ apiDialogs: true });
                chayns.dialog.iFrame({
                    url: 'https://frontend.tobit.com/dialog-html-editor/v1.0/',
                    // url: 'https://w-jg.tobit.ag:8082/',
                    input: textString,
                    title: `TextString bearbeiten: ${stringName}`,
                    message: `Sprache: ${lang.name}`,
                    buttons: [{
                        text: 'Speichern',
                        buttonType: 1
                    }, {
                        text: 'Abbrechen',
                        buttonType: -1
                    }]
                }).then((result) => {
                    this.changeStringResult(result, lang);
                });
            } else {
                chayns.dialog.input({
                    title: `TextString bearbeiten: ${stringName}`,
                    message: `Sprache: ${lang.name}`,
                    text: textString,
                    buttons: [{
                        text: 'Speichern',
                        buttonType: 1
                    }, {
                        text: 'Abbrechen',
                        buttonType: -1
                    }]
                }).then((result) => {
                    this.changeStringResult(result, lang);
                });
            }
        });
    }

    changeStringResult(data2, lang) {
        const { stringName, useDangerouslySetInnerHTML } = this.props;
        if (data2.buttonType === 1 && (data2.text || data2.value)) {
            TextString.changeTextString(stringName, useDangerouslySetInnerHTML ? data2.value : data2.text, lang.value).then((result) => {
                if (result.ResultCode === 0) {
                    chayns.dialog.alert('', 'Die Änderungen wurden erfolgreich gespeichert. Es kann bis zu 5 Minuten dauern, bis die Änderung sichtbar wird.');
                } else {
                    chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten.');
                }
            }).catch(() => {
                chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten.');
            });
        }
    }

    render() {
        const { textString } = this.state;
        const { children, useDangerouslySetInnerHTML } = this.props;

        const childrenProps = {
            ...{ onClick: this.childrenOnClick },
            ...(
                useDangerouslySetInnerHTML
                    ? { dangerouslySetInnerHTML: { __html: textString } }
                    : null
            ),
        };

        return React.cloneElement(// TODO Add no-translate if language is right
            children,
            childrenProps,
            useDangerouslySetInnerHTML ? null : textString
        );
    }
}
