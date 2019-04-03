import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import loadOptionalDependency from '../../utils/loadOptionalDependency';

function requireEmojione(returnPromise) {
    return loadOptionalDependency('emojione', 'emojione', [
        'https://cdn.jsdelivr.net/npm/emojione@3.1.7/lib/js/emojione.min.js'
    ], [
        'https://cdn.jsdelivr.net/npm/emojione@3.1.7/extras/css/emojione.min.css'
    ], returnPromise);
}

export default class EmojiInput extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        onInput: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        hideBorder: PropTypes.bool,
        onKeyDown: PropTypes.func,
        disabled: PropTypes.bool,
        style: PropTypes.object,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };

    static defaultProps = {
        hideBorder: false,
        onKeyDown: null,
        disabled: false,
        onFocus: null,
        onBlur: null,
        style: null
    };

    lastKeyPressed = null;

    firstRender = true;

    activeNode = 0;

    cursorPos = 0;

    componentWillMount() {
        requireEmojione().then((emojione) => {
            emojione.ascii = true; // eslint-disable-line no-param-reassign
            emojione.imageTitleTag = false; // eslint-disable-line no-param-reassign
            emojione.blacklistChars = '*,#'; // eslint-disable-line no-param-reassign
            emojione.imagePathPNG = 'https://sub54.tobit.com/frontend/assets/emojione/3.1/png/64/'; // eslint-disable-line no-param-reassign
        });
    }

    componentWillReceiveProps(nextProps) {
        const { placeholder, disabled, value } = this.props;

        if (nextProps.value.trim() === '') {
            this.placeholder.classList.remove('emoji-input__placeholder--hidden');
        } else {
            this.placeholder.classList.add('emoji-input__placeholder--hidden');
        }

        if (nextProps.placeholder !== placeholder) {
            this.placeholder.innerText = nextProps.placeholder;
        }

        if (nextProps.disabled !== disabled) {
            this.input.contentEditable = !nextProps.disabled;
        }

        if (nextProps.value !== value || this.firstRender) {
            this.updateDOM(nextProps);
            this.firstRender = false;
        }
    }

    static shouldComponentUpdate() {
        return false;
    }

    static getCaretCharacterOffsetWithin(element) {
        let caretOffset = -1;

        if (typeof window.getSelection !== 'undefined') {
            const sel = window.getSelection();

            if (sel.anchorNode && (sel.anchorNode.nodeType === 3 || !sel.anchorNode.classList.contains('icon-smile-o'))) {
                const range = sel.getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if (typeof document.selection !== 'undefined' && document.selection.type !== 'Control') {
            const sel = document.selection;

            if (sel.anchorNode && (sel.anchorNode.nodeType === 3 || !sel.anchorNode.classList.contains('icon-smile-o'))) {
                const textRange = document.selection.createRange();
                const preCaretTextRange = document.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint('EndToEnd', textRange);
                caretOffset = preCaretTextRange.text.length;
            }
        }
        return caretOffset;
    }

    getActiveChildNode = () => {
        const inputDiv = this.input;
        const selection = window.getSelection();
        const { anchorNode } = selection;
        const { childNodes } = inputDiv;
        let activeChildNode = -1;

        if (anchorNode && anchorNode !== inputDiv) {
            for (let i = 0; i < childNodes.length; i += 1) {
                let curNode = childNodes[i];

                if (chayns.env.isIOS && curNode.nodeName.toUpperCase() === 'I') {
                    // eslint-disable-next-line prefer-destructuring
                    curNode = curNode.childNodes[0];
                }

                if (curNode === anchorNode || (curNode.wholeText === anchorNode.wholeText && curNode.nextElementSibling === anchorNode.nextElementSibling && curNode.previousElementSibling === anchorNode.previousElementSibling)) {
                    activeChildNode = curNode.nodeType === 1 ? i + 1 : i;
                    break;
                }
            }
        } else {
            activeChildNode = this.activeNode;
        }

        return activeChildNode;
    };

    setCursorPos = () => {
        const inputDiv = this.input;
        const { activeNode, cursorPos } = this;

        if (cursorPos > -1) {
            inputDiv.focus();
            const inputChildNodes = inputDiv.childNodes;

            const range = document.createRange();

            if (activeNode > -1) {
                const cursorNode = inputChildNodes[activeNode];

                if (cursorNode) {
                    if (cursorNode.nodeType === 1 || cursorNode.length < cursorPos) {
                        const nextSibling = cursorNode.nextSibling ? cursorNode.nextSibling.nextSibling : undefined;

                        if (nextSibling && nextSibling.nodeType === 3) {
                            range.setStart(nextSibling, 0);
                            range.setEnd(nextSibling, 0);
                        } else {
                            const newTextNode = document.createTextNode('');

                            inputDiv.insertBefore(newTextNode, nextSibling);

                            range.setStart(newTextNode, 0);
                            range.setEnd(newTextNode, 0);
                        }
                    } else {
                        range.setStart(cursorNode, cursorPos);
                        range.setEnd(cursorNode, cursorPos);
                    }
                }
            } else {
                const newTextNode = document.createTextNode('');
                inputDiv.appendChild(newTextNode);

                range.setStart(newTextNode, 0);
                range.setEnd(newTextNode, 0);
            }

            const sel = window.getSelection();

            sel.removeAllRanges();
            sel.addRange(range);
        }
    };

    getPureInnerText = (elem) => {
        const emojione = requireEmojione(false);

        const textLines = [''];
        let lineIndex = 0;
        let curChild = elem.firstChild;

        const isInDavid = navigator.userAgent.toLowerCase().indexOf('david client') >= 0;

        while (curChild !== null) {
            if (curChild.nodeType === 1) {
                switch (curChild.tagName) {
                case 'IMG':
                    textLines[lineIndex] += curChild.getAttribute('alt');
                    break;
                case 'DIV':
                    textLines.push('');
                    lineIndex += 1;
                    break;
                case 'BR':
                    if (chayns.env.browser.name.toLowerCase() !== 'chrome' || isInDavid) {
                        textLines[lineIndex] += '\n';
                    }
                    break;
                default:
                    break;
                }
            } else if (curChild.nodeType === 3) {
                textLines[lineIndex] += curChild.nodeValue;
            }

            if (curChild.hasChildNodes()) {
                curChild = curChild.firstChild;
            } else {
                while (curChild.nextSibling === null) {
                    curChild = curChild.parentNode;

                    if (curChild === elem) {
                        return textLines.join('\n');
                    }
                }
                curChild = curChild.nextSibling;
            }
        }

        if (!emojione) {
            return emojione.shortnameToUnicode(textLines.join('\n'));
        }

        return textLines.join('\n');
    };

    handleInput = (event) => {
        const { onInput } = this.props;

        // eslint-disable-next-line no-param-reassign
        event.target.pureInnerText = this.getPureInnerText(event.target);

        onInput(event);
    };

    handleKeyDown = (event) => {
        const { onKeyDown } = this.props;

        this.lastKeyPressed = event.keyCode;

        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    handleKeyUp = (event) => {
        if (chayns.env.browser.name.toLowerCase() === 'ie' && event.keyCode !== 16) {
            this.handleInput(event);
        }
        if (chayns.env.browser.name.toLowerCase() === 'edge' && event.keyCode === 13 && event.shiftKey) {
            this.handleInput(event);
        }
    };

    handleFocus = (event) => {
        const { onFocus } = this.props;

        if (onFocus) {
            onFocus(event);
        }
    };

    handleBlur = (event) => {
        const { onBlur } = this.props;

        if (onBlur) {
            onBlur(event);
        }
    };

    scrollToCursor = (scrollTop, scrollHeight) => {
        const inputDiv = this.input;
        const elemScrollHeight = inputDiv.scrollHeight;
        const elemClientHeight = inputDiv.clientHeight;

        if (!(elemScrollHeight <= elemClientHeight)) {
            const diff = elemScrollHeight - scrollHeight;
            this.input.scrollTop = (scrollTop || 0) + diff;
        }
    };

    formatText = (text) => {
        const emojione = requireEmojione(false);

        let result = '';
        let newText = text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/™/g, '&#153;')
            .replace(/©/g, '&copy;')
            .replace(/®/g, '&reg;')
            .replace(/\(y\)/g, '👍')
            .replace(/\(n\)/g, '👎');

        if (emojione) {
            newText = emojione.toImage(newText);
        }

        newText = newText.replace(/(<img[^<]*)\/>/g, '$1>')
            .replace(/&#153;/g, '™')
            .replace(/&copy;/g, '©')
            .replace(/&reg;/g, '®');

        const lines = newText.split('\n');
        const isInDavid = navigator.userAgent.toLowerCase().indexOf('david client') >= 0;

        if (chayns.env.browser.name.toLowerCase() === 'chrome' && !isInDavid) {
            if (lines[lines.length - 1] === '' && this.lastKeyPressed === 8 && lines.length > 1) {
                lines[lines.length - 1] = '<br>';
            }

            result = lines.join('\n');
        } else {
            if (lines.length === 1 && chayns.env.browser.name.toLowerCase() === 'edge' && lines[0] === '') {
                lines[0] = '<br>';
            }

            result = lines.join('<br>');
        }

        return result.replace(String.fromCharCode(160), String.fromCharCode(32))
            .replace(/&nbsp;/gm, String.fromCharCode(32))
            .replace(/&amp;/gm, String.fromCharCode(38));
    };

    updateDOM = (newProps) => {
        const inputDiv = this.input;
        const newHtml = this.formatText(newProps.value);
        const oldHtml = inputDiv.innerHTML
            .replace(/&nbsp;/gm, String.fromCharCode(32))
            .replace(/&amp;/gm, String.fromCharCode(38))
            .replace(String.fromCharCode(160), String.fromCharCode(32));

        if (newHtml !== oldHtml) {
            this.activeNode = this.getActiveChildNode();
            const activeElem = inputDiv.childNodes[this.activeNode];
            if (activeElem) {
                this.cursorPos = EmojiInput.getCaretCharacterOffsetWithin(activeElem);

                const { scrollTop, scrollHeight } = inputDiv.scrollTop;

                inputDiv.innerHTML = newHtml;

                this.scrollToCursor(scrollTop, scrollHeight);
                this.setCursorPos();
            } else {
                inputDiv.innerHTML = newHtml;
            }
        }
    };

    render() {
        const {
            hideBorder,
            disabled,
            style,
            id,
        } = this.props;

        const messageInputClasses = classNames('emoji-input__message-input', {
            'emoji-input__message-input--hide-border': hideBorder,
            'emoji-input__message-input--disabled': disabled,
            input: !disabled
        });

        return (
            <div className="emoji-input notranslate">
                <div
                    dangerouslySetInnerHTML={{ __html: '<br />' }}
                    ref={(ref) => {
                        this.input = ref;
                    }}
                    className={messageInputClasses}
                    onKeyDown={this.handleKeyDown}
                    contentEditable={!disabled}
                    onKeyUp={this.handleKeyUp}
                    onInput={this.handleInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    style={style}
                    dir="auto"
                    id={id}
                />
                <div
                    className="emoji-input__placeholder"
                    ref={(ref) => {
                        this.placeholder = ref;
                    }}
                />
            </div>
        );
    }
}
