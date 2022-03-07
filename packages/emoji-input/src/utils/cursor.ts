// https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div

export const getCurrentCursorPosition = (parentElement: HTMLDivElement | null): number | null => {
    if (parentElement) {
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
                        console.log('node: ', node, node.textContent?.length);
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
    }
    return null;
};
export const insertBrAtCursor = () => {
    const sel = window.getSelection();
    if (sel) {
        const range = sel.getRangeAt(0);
        const br = document.createElement('br');

        range.deleteContents();

        range.insertNode(br);
        var newLine = document.createTextNode('\n');

        range.setStartAfter(br);
        range.setEndAfter(br);

        range.insertNode(newLine);

        sel.removeAllRanges();
        sel.addRange(range);
    }
};
export const setCurrentCursorPosition = (chars: number | null, element: HTMLDivElement | null) => {
    if (element && chars && chars >= 0) {
        const sel = window.getSelection();

        let range = createRange(element, { count: chars });

        if (range && sel) {
            // range.selectNodeContents(element);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            range.detach();

            // scroll to cursor if scrollbar ... ???
            //   element.scrollTop = element.scrollHeight;
        }
    }
};

export const setCursorToEnd = (target: HTMLDivElement | null) => {
    if (target) {
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
    }
};

type charCount = {
    count: number;
};

const createRange = (node: any, char: charCount, range: any | null = null) => {
    if (!range) {
        range = document.createRange();
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (char.count === 0) {
        range.setEnd(node, char.count);
    } else if (node && char.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent && node.textContent.length < char.count) {
                char.count -= node.textContent.length;
            } else {
                range.setEnd(node, char.count); // setEnd
                char.count = 0;
            }
        } else {
            for (let lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], char, range);

                if (char.count === 0) {
                    break;
                }
            }
        }
    }

    return range;
};

const isChildOf = (node: any, parentElement: HTMLDivElement) => {
    while (node !== null) {
        if (node === parentElement) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
};
