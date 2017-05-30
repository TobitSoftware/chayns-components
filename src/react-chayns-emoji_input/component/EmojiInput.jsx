import React from 'react';
import PropTypes from 'prop-types';
import emojione from 'emojione';
import classNames from 'classnames';

export default class EmojiInput extends React.Component {

    static PropTypes = {
        placeholder: PropTypes.string.isRequired,
        onInput: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        hideBorder: PropTypes.bool,
        onKeyDown: PropTypes.func
    };

    lastKeyPressed = null;
    firstRender = true;
    activeNode = 0;
    cursorPos = 0;

    static shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        const {value, placeholder} = this.props;

        if (nextProps.value.trim() === '') {
            this.placeholder.classList.remove('invisible');
        } else {
            this.placeholder.classList.add('invisible');
        }

        if (nextProps.placeholder !== placeholder) {
            this.placeholder.innerText = nextProps.placeholder;
        }

        if (nextProps.value !== value || this.firstRender) {
            this.updateDOM(nextProps);
            this.firstRender = false;
        }
    }

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

                const scrollTop = inputDiv.scrollTop;
                const scrollHeight = inputDiv.scrollHeight;

                inputDiv.innerHTML = newHtml;

                this.scrollToCursor(scrollTop, scrollHeight);
                this.setCursorPos();
            } else {
                inputDiv.innerHTML = newHtml;
            }
        }
    };

    getActiveChildNode = () => {
        const inputDiv = this.input;
        const selection = window.getSelection();
        const anchorNode = selection.anchorNode;
        const childNodes = inputDiv.childNodes;
        let activeChildNode = -1;

        if (anchorNode && anchorNode !== inputDiv) {
            for (let i = 0; i < childNodes.length; i++) {
                let curNode = childNodes[i];

                if (chayns.env.isIOS && curNode.nodeName.toUpperCase() === 'I') {
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

    static getCaretCharacterOffsetWithin(element) {
        let caretOffset = -1;

        if (typeof window.getSelection !== "undefined") {
            const sel = window.getSelection();

            if (sel.anchorNode && (sel.anchorNode.nodeType === 3 || !sel.anchorNode.classList.contains('icon-smile-o'))) {
                const range = sel.getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if (typeof document.selection !== "undefined" && document.selection.type !== "Control") {
            const sel = document.selection;

            if (sel.anchorNode && (sel.anchorNode.nodeType === 3 || !sel.anchorNode.classList.contains('icon-smile-o'))) {
                const textRange = document.selection.createRange();
                const preCaretTextRange = document.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                caretOffset = preCaretTextRange.text.length;
            }
        }
        return caretOffset;
    }

    formatText = (text) => {
        let result = '';
        let newText = text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/™/g, '&#153;')
            .replace(/©/g, '&copy;')
            .replace(/®/g, '&reg;')
            .replace(/\(y\)/g, '👍')
            .replace(/\(n\)/g, '👎');

        emojione.ascii = true;

        newText = emojione.toImage(newText);
        newText = newText.replace(/(<img[^<]*)\/>/g, '$1>')
            .replace(/&#153;/g, '™')
            .replace(/&copy;/g, '©')
            .replace(/&reg;/g, '®');

        const lines = newText.split('\n');

        if (chayns.env.browser.name.toLowerCase() === 'chrome') {
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

        result = result.replace(String.fromCharCode(160), String.fromCharCode(32));
        return result.replace(/&nbsp;/gm, String.fromCharCode(32));
    };

    setCursorPos = () => {
        const inputDiv = this.input;
        const {activeNode, cursorPos} = this;

        if (cursorPos > -1) {
            inputDiv.focus();
            const inputChildNodes = inputDiv.childNodes;

            const range = document.createRange();

            if (activeNode > -1) {
                let cursorNode = inputChildNodes[activeNode];

                if (cursorNode) {
                    if (cursorNode.nodeType === 1 || cursorNode.length < cursorPos) {
                        let nextSibling = cursorNode.nextSibling ? cursorNode.nextSibling.nextSibling : undefined;

                        if (nextSibling && nextSibling.nodeType === 3) {
                            range.setStart(nextSibling, 0);
                            range.setEnd(nextSibling, 0);
                        } else {
                            let newTextNode = document.createTextNode('');

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
                let newTextNode = document.createTextNode('');
                inputDiv.appendChild(newTextNode);

                range.setStart(newTextNode, 0);
                range.setEnd(newTextNode, 0);
            }

            let sel = window.getSelection();

            sel.removeAllRanges();
            sel.addRange(range);
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

    handleInput = (event) => {
        const {onInput} = this.props;

        event.target.pureInnerText = this.getPureInnerText(event.target);

        onInput(event);
    };

    handleKeyDown = (event) => {
        const {onKeyDown} = this.props;

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

    getPureInnerText = (elem) => {
        let textLines = [''];
        let lineIndex = 0;
        let curChild = elem.firstChild;

        while (curChild !== null) {
            if (curChild.nodeType === 1) {
                switch (curChild.tagName) {
                    case 'IMG':
                        textLines[lineIndex] += curChild.getAttribute('alt');
                        break;
                    case 'DIV':
                        textLines.push('');
                        lineIndex++;
                        break;
                    case 'BR':
                        if (chayns.env.browser.name.toLowerCase() !== 'chrome') {
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
                curChild = curChild.nextSibling
            }
        }

        return textLines.join('\n');
    };

    render() {
        const {id, hideBorder} = this.props;

        const messageInputClasses = classNames('input message--input', {
            'hide--border': hideBorder
        });

        return (
            <div className="message--input--box">
                <div
                    dangerouslySetInnerHTML={{__html: '<br />'}}
                    className={messageInputClasses}
                    onKeyDown={this.handleKeyDown}
                    ref={ref => this.input = ref}
                    onKeyUp={this.handleKeyUp}
                    onInput={this.handleInput}
                    contentEditable="true"
                    dir="auto"
                    id={id}
                />
                <div className="input--placeholder" ref={ref => this.placeholder = ref} />
            </div>
        );
    }
}