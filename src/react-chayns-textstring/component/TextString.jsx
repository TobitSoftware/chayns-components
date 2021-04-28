/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isServer } from '../../utils/isServer';
import getTappWidth from '../../utils/tappWidth';
import isTobitEmployee from '../../utils/tobitEmployee';

const CHAYNS_RES_URL = 'https://webapi.tobit.com/TextStringService/v1.0';

const promises = {};
const loadLibrary = async (projectName, middle, lang) => {
    // middle has to be removed in next major version
    if (
        TextString.textStrings[lang] &&
        TextString.textStrings[lang][projectName]
    ) {
        return;
    }
    try {
        const response = await fetch(
            `${CHAYNS_RES_URL}/LangStrings/${projectName}?language=${lang}`
        );
        if (response.status !== 200) {
            console.error(response.statusText);
            return;
        }

        const json = await response.json();
        TextString.textStrings[lang] = {
            ...TextString.textStrings[lang],
            [projectName]: {
                ...json,
            },
        };
        if (window.debugLevel >= 3) {
            // eslint-disable-next-line no-console
            console.debug('TextString Storage', TextString.textStrings);
        }
    } catch (e) {
        console.error(e);
    } finally {
        delete promises[lang][projectName];
    }
};

/**
 * Loads text strings from our database and displays them. Handles replacements
 * and changing the string via `CTRL` + `Click` (only internal).
 */
export default class TextString extends Component {
    static getTextString(stringName, language, fallback = null) {
        let lang = TextString.languages.find(
            (l) =>
                l.code ===
                (language || TextString.language || chayns.env.site.translang)
        );
        lang = lang ? lang.value : 'Ger';
        const { textStrings } = TextString;
        const strings =
            textStrings[lang] || textStrings[Object.keys(textStrings)[0]];
        if (!strings) return fallback;
        const result =
            Object.keys(strings)
                .map((lib) => strings[lib][stringName] || null)
                .filter((x) => x !== null)[0] || null;
        return result !== null ? result : fallback;
    }

    static async loadLibrary(projectName, middle, language) {
        let lang = TextString.languages.find(
            (l) =>
                l.code ===
                (language || TextString.language || chayns.env.site.translang)
        );
        lang = lang ? lang.value : 'Ger';

        let promise = promises[lang] && promises[lang][projectName];
        if (promise) return promise;

        if (!promises[lang]) promises[lang] = {};

        promise = loadLibrary(projectName, middle, lang);
        promises[lang][projectName] = promise;
        return promise;
    }

    static changeTextString(stringName, text, language) {
        const body = {
            stringName,
        };

        body[`text${language}`] = text;
        return new Promise((resolve, reject) => {
            fetch(`${CHAYNS_RES_URL}/V2/LangStrings`, {
                method: 'put',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
                },
                body: JSON.stringify(body),
            }).then((response) => {
                if (response.status === 200) {
                    resolve({ ResultCode: 0 });
                } else {
                    reject(response.statusText);
                }
            }, reject);
        });
    }

    static setLanguage(language) {
        TextString.language = language.substring(0, 2).toLowerCase();
    }

    static replace(text, replacements) {
        let textString = text;
        Object.keys(replacements).forEach((replacement) => {
            textString = textString.replace(
                replacement,
                replacements[replacement]
            );
        });
        return textString;
    }

    constructor(props) {
        super(props);
        const {
            stringName,
            language,
            setProps,
            replacements,
            fallback,
        } = props;

        let string = TextString.getTextString(stringName, language, fallback);

        const textStringProps = {};

        Object.keys(setProps).forEach((prop) => {
            if (prop !== 'fallback') {
                string = TextString.getTextString(setProps[prop]);
                if (string) {
                    textStringProps[prop] = TextString.replace(
                        string,
                        replacements
                    );
                } else if (setProps.fallback && setProps.fallback[prop]) {
                    textStringProps[prop] = TextString.replace(
                        setProps.fallback[prop],
                        replacements
                    );
                }
            }
        });

        this.state = {
            textString:
                (string && TextString.replace(string, replacements)) || null,
            textStringProps,
        };

        this.childrenOnClick = this.childrenOnClick.bind(this);
        this.changeStringDialog = this.changeStringDialog.bind(this);
        this.changeStringResult = this.changeStringResult.bind(this);
        this.selectStringToChange = this.selectStringToChange.bind(this);
        this.setTextStrings = this.setTextStrings.bind(this);
        this.selectLanguageToChange = this.selectLanguageToChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { replacements, stringName } = this.props;

        if (
            replacements !== prevProps.replacements ||
            stringName !== prevProps.stringName
        ) {
            this.setTextStrings(this.props);
        }
    }

    setTextStrings(props) {
        const {
            stringName,
            language,
            fallback,
            setProps,
            replacements,
        } = props;

        let string = TextString.getTextString(stringName, language);
        if (string) {
            this.setState({
                textString: TextString.replace(string, replacements),
            });
        } else {
            this.setState({
                textString: TextString.replace(fallback, replacements),
            });
        }

        const { textStringProps } = this.state;
        Object.keys(setProps).forEach((prop) => {
            if (prop !== 'fallback') {
                string = TextString.getTextString(setProps[prop]);
                if (string) {
                    textStringProps[prop] = TextString.replace(
                        string,
                        replacements
                    );
                } else if (setProps.fallback && setProps.fallback[prop]) {
                    textStringProps[prop] = TextString.replace(
                        setProps.fallback[prop],
                        replacements
                    );
                }
            }
        });
        this.setState({ textStringProps });
    }

    childrenOnClick() {
        isTobitEmployee()
            .then(this.selectStringToChange)
            .catch(() => {});
    }

    selectStringToChange() {
        const { stringName, setProps } = this.props;

        if (Object.keys(setProps).length > 0) {
            const stringList = [];
            if (stringName) {
                stringList.push({
                    name: `children: ${stringName}`,
                    value: stringName,
                });
            }

            Object.keys(setProps).forEach((key) => {
                if (key !== 'fallback') {
                    stringList.push({
                        name: `${key}: ${setProps[key]}`,
                        value: setProps[key],
                    });
                }
            });

            chayns.dialog
                .select({
                    title: 'TextString wählen',
                    message: 'Wähle den TextString, den du ändern möchtest:',
                    quickfind: 0,
                    multiselect: 0,
                    list: stringList,
                })
                .then((data) => {
                    if (
                        data.buttonType === 1 &&
                        data.selection &&
                        data.selection.length > 0
                    ) {
                        this.selectLanguageToChange(data.selection[0].value);
                    }
                });
        } else {
            this.selectLanguageToChange(stringName);
        }
    }

    selectLanguageToChange(stringName) {
        const { language, useDangerouslySetInnerHTML } = this.props;

        if (useDangerouslySetInnerHTML) {
            chayns.dialog
                .select({
                    title: `TextString bearbeiten: ${stringName}`,
                    message: `Wähle die Sprache: (angezeigt wird ${
                        TextString.languages.find(
                            (l) => l.code === (language || TextString.language)
                        ).name
                    })`,
                    quickfind: 0,
                    multiselect: 0,
                    list: TextString.languages,
                })
                .then((data) => {
                    if (
                        data.buttonType === 1 &&
                        data.selection &&
                        data.selection.length > 0
                    ) {
                        const lang = data.selection[0];
                        // language is already selected
                        if (
                            lang.value ===
                            TextString.languages.find(
                                (l) =>
                                    l.code === (language || TextString.language)
                            ).value
                        ) {
                            this.changeStringDialog(stringName, lang);
                        } else {
                            // Get lib
                            let library = null;
                            let middle = 'langRes';
                            const globalLang = TextString.languages.find(
                                (l) => l.code === TextString.language
                            ).value;
                            Object.keys(
                                TextString.textStrings[globalLang]
                            ).forEach((lib) => {
                                if (
                                    TextString.textStrings[globalLang][lib][
                                        stringName
                                    ]
                                ) {
                                    library = lib;
                                    // eslint-disable-next-line prefer-destructuring
                                    middle =
                                        TextString.textStrings[globalLang][lib]
                                            .middle;
                                }
                            });
                            TextString.loadLibrary(
                                library,
                                middle,
                                TextString.languages.find(
                                    (l) => l.value === lang.value
                                ).code
                            ).then(() => {
                                this.changeStringDialog(stringName, lang);
                            });
                        }
                    }
                });
        } else {
            chayns.dialog.iFrame({
                url:
                    'https://tapp-staging.chayns-static.space/text-string-tapp/v1/iframe-edit.html',
                buttons: [],
                input: { textstring: stringName },
            });
        }
    }

    changeStringDialog(stringName, lang) {
        const string = TextString.getTextString(
            stringName,
            TextString.languages.find((l) => l.value === lang.value).code
        );
        if (string) {
            chayns.register({ apiDialogs: true });
            chayns.dialog
                .iFrame({
                    width: getTappWidth() + 76,
                    url: 'https://frontend.tobit.com/dialog-html-editor/v1.0/',
                    input: string,
                    title: stringName,
                    message: `Sprache: ${lang.name}`,
                    buttons: [
                        {
                            text: 'Speichern',
                            buttonType: 1,
                        },
                        {
                            text: 'Abbrechen',
                            buttonType: -1,
                        },
                    ],
                })
                .then((result) => {
                    this.changeStringResult(result, lang);
                });
        } else {
            chayns.dialog.alert(stringName, 'Der TextString existiert nicht.');
        }
    }

    changeStringResult(data, lang) {
        const { stringName, useDangerouslySetInnerHTML } = this.props;
        if (data.buttonType === 1 && (data.text || data.value)) {
            TextString.changeTextString(
                stringName,
                useDangerouslySetInnerHTML ? data.value : data.text,
                lang.value
            )
                .then((result) => {
                    if (result.ResultCode === 0) {
                        chayns.dialog.alert(
                            '',
                            'Die Änderungen wurden erfolgreich gespeichert. Es kann bis zu 5 Minuten dauern, bis die Änderung sichtbar wird.'
                        );
                    } else {
                        chayns.dialog.alert(
                            '',
                            'Es ist ein Fehler aufgetreten.'
                        );
                    }
                })
                .catch(() => {
                    chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten.');
                });
        }
    }

    render() {
        const {
            children,
            useDangerouslySetInnerHTML,
            preventNoTranslate,
        } = this.props;
        const { textString, textStringProps } = this.state;

        const childrenProps = {
            ...{
                onClick: (e) => {
                    if (e.ctrlKey) {
                        this.childrenOnClick(e);
                        e.stopPropagation();
                    } else if (children.props.onClick) {
                        children.props.onClick(e);
                    }
                },
            },
            ...(useDangerouslySetInnerHTML
                ? { dangerouslySetInnerHTML: { __html: textString } }
                : null),
            ...textStringProps,
            ...(!preventNoTranslate && {
                className: classNames(
                    'no-translate',
                    'notranslate',
                    children.props.className
                ),
            }),
        };

        if (textString) {
            return React.cloneElement(
                children,
                childrenProps,
                useDangerouslySetInnerHTML ? null : textString
            );
        }
        return React.cloneElement(children, childrenProps);
    }
}

TextString.textStrings = {};

TextString.language = isServer()
    ? 'de'
    : (
          window.chayns?.env.parameters.translang ||
          window.chayns?.env.site.translang ||
          window.chayns?.env.language ||
          navigator.language ||
          'de'
      )
          .substring(0, 2)
          .toLowerCase();

TextString.languages = [
    {
        name: 'Deutsch',
        value: 'Ger',
        code: 'de',
    },
    {
        name: 'Englisch',
        value: 'Eng',
        code: 'en',
    },
    {
        name: 'Französisch',
        value: 'Fra',
        code: 'fr',
    },
    {
        name: 'Niederländisch',
        value: 'Ned',
        code: 'nl',
    },
    {
        name: 'Italienisch',
        value: 'Ita',
        code: 'it',
    },
    {
        name: 'Portugiesisch',
        value: 'Pt',
        code: 'pt',
    },
    {
        name: 'Spanisch',
        value: 'Es',
        code: 'es',
    },
    {
        name: 'Türkisch',
        value: 'Tr',
        code: 'tr',
    },
    {
        name: 'Polnisch',
        value: 'Pl',
        code: 'pl',
    },
];

TextString.propTypes = {
    /**
     * The string id of the text you want to display.
     */
    stringName: PropTypes.string,

    /**
     * An map of replacements in the form of an object with the string that
     * should be replaced as its key and the replacement as its value.
     */
    replacements: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * The child node the text should be rendered into.
     */
    children: PropTypes.node,

    /**
     * Wether the component should render HTML content in the string.
     */
    useDangerouslySetInnerHTML: PropTypes.bool,

    /**
     * The language of the string, provided as a
     * [ISO 639-1](https://de.wikipedia.org/wiki/ISO_639#ISO_639-1) code. Please
     * note that the language has to be loaded beforehand for this to work.
     */
    language: PropTypes.string,

    /**
     * A fallback string that will be displayed if the main string failed to
     * load.
     */
    fallback: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

    /**
     * The string names of the children props, e.g. placeholder or accordion
     * head.
     */
    setProps: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number,
        ])
    ),

    /**
     * Prevents setting the
     `no-translate`
     class to the children when the
     * language of the text string matches the current language of the user.
     */
    preventNoTranslate: PropTypes.bool,
};

TextString.defaultProps = {
    stringName: null,
    replacements: {},
    useDangerouslySetInnerHTML: false,
    language: null,
    fallback: '',
    setProps: {},
    preventNoTranslate: false,
    children: <p />,
};

TextString.displayName = 'TextString';
