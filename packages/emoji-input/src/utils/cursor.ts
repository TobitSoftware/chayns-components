// https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div

export const getCurrentCursorPosition = (parentElement: any) => {
    const selection = window.getSelection();
    let charCount = -1;
    let node;

    if (selection?.focusNode) {
        if (isChildOf(selection.focusNode, parentElement)) {
            node = selection.focusNode;
            charCount = selection.focusOffset;

            while (node) {
                if (node === parentElement) {
                    break;
                }

                if (node.previousSibling) {
                    node = node.previousSibling;
                    charCount += (node.textContent || '').length;
                } else {
                    node = node.parentNode;
                    if (node === null) {
                        break;
                    }
                }
            }
        }
    }

    return charCount;
};

export const setCurrentCursorPosition = (chars: any, element: any) => {
    if (chars >= 0) {
        const selection = window.getSelection();

        let range = createRange(element, { count: chars });

        if (range && selection) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};

export const setCursorToEnd = (target: HTMLDivElement) => {
    const range = document.createRange();
    const sel = window.getSelection();
    if (sel && range) {
        range.selectNodeContents(target);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        target.focus();
        range.detach();

        target.scrollTop = target.scrollHeight;
    }
};

const createRange = (node: any, chars: any, range: any | null = null) => {
    if (!range) {
        range = document.createRange();
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
            for (let lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                    break;
                }
            }
        }
    }

    return range;
};

const isChildOf = (node: any, parentElement: any) => {
    while (node !== null) {
        if (node === parentElement) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
};
