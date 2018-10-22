import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextString extends Component {
    static propTypes = {
        stringName: PropTypes.string.isRequired,
        replacements: PropTypes.objectOf(PropTypes.string),
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {
        replacements: [],
    };

    static textStrings = {};

    static language = (chayns.env.language || navigator.language || 'de').substring(0, 2);

    static getTextString(stringName, language) {
        return new Promise((resolve, reject) => {
            const lang = TextString.languages.find(l => l.code === (language || TextString.language)).value;
            Object.keys(TextString.textStrings[lang]).forEach((key) => {
                if (TextString.textStrings[lang][key][stringName]) {
                    resolve(TextString.textStrings[lang][key][stringName]);
                }
            });
            reject(new Error(`TextString ${stringName} could not be found in loaded libraries.`));
        });
    }

    static loadLibrary(projectName, middle = 'langRes', language) {
        return new Promise((resolve, reject) => {
            const lang = TextString.languages.find(l => l.code === (language || TextString.language)).value;
            if (!(TextString.textStrings[lang] && TextString.textStrings[lang][projectName])) {
                fetch(`https://chayns-res.tobit.com/LangStrings/${projectName}/${projectName}${middle}_${lang}.json`).then((response) => {
                    if (response.status === 200) {
                        response.json().then((json) => {
                            TextString.textStrings[lang] = { [projectName]: json };
                            console.log(TextString.textStrings);
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
        TextString.language = language.substring(0, 2);
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
        this.childrenRef = React.createRef();
        this.childrenOnClick = this.childrenOnClick.bind(this);
    }

    componentDidMount() {
        const { stringName, replacements } = this.props;
        TextString.getTextString(stringName).then((txt) => {
            let textString = txt;
            Object.keys(replacements).forEach((replacement) => {
                textString = textString.replace(replacement, replacements[replacement]);
            });
            this.setState({ textString });
        });
        this.childrenRef.current.addEventListener('click', this.childrenOnClick);
    }

    childrenOnClick(e) {
        const { stringName } = this.props;
        const { textString } = this.state;
        if (e.ctrlKey) { // TODO Check if user is manufacturer
            chayns.dialog.select({
                title: `TextString bearbeiten: ${stringName}`,
                message: 'Wähle die Sprache:',
                quickfind: 0,
                multiselect: 0,
                list: TextString.languages
            }).then((data1) => {
                if (data1.buttonType === 1 && data1.selection && data1.selection.length > 0) {
                    const language = data1.selection[0];
                    if (language.code !== TextString.language) {
                        // TODO Check if language is loaded
                        // TODO Load string in corresponding language
                    }
                    chayns.dialog.input({
                        title: `TextString bearbeiten: ${stringName}`,
                        message: `Sprache: ${language.name}`,
                        text: textString,
                        buttons: [{
                            text: 'Speichern',
                            buttonType: 1
                        }, {
                            text: 'Abbrechen',
                            buttonType: -1
                        }]
                    }).then((data2) => {
                        if (data2.buttonType === 1 && data2.text) {
                            TextString.changeTextString(stringName, data2.text, language.value).then(() => {
                                chayns.dialog.alert('', 'Die Änderungen wurden erfolgreich gespeichert. Es kann bis zu 5 Minuten dauern, bis die Änderung sichtbar wird.');
                            }).catch(() => {
                                chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten.');
                            });
                        }
                    });
                }
            });
        }
    }

    render() {
        const { textString } = this.state;
        const { children } = this.props;
        return React.cloneElement(
            children,
            { dangerouslySetInnerHTML: { __html: textString }, ref: this.childrenRef }
        );
    }
}
