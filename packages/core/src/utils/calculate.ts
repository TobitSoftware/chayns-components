import type { HTMLAttributes, ReactElement } from 'react';

export const calculateContentWidth = (texts: string[]) => {
    const length: number[] = [];

    texts.forEach((text) => {
        const div = document.createElement('div');
        div.style.visibility = 'hidden';
        div.style.position = 'absolute';
        div.style.width = 'auto';
        div.style.whiteSpace = 'nowrap';
        document.body.appendChild(div);

        div.innerText = text;

        length.push(div.offsetWidth);

        document.body.removeChild(div);
    });

    return Math.max.apply(null, length);
};

export const calculateContentHeight = (elements: string[]) => {
    const length: number[] = [];

    elements.forEach((element: string) => {
        const div = document.createElement('p');
        div.style.visibility = 'hidden';
        div.style.position = 'absolute';
        div.style.width = 'auto';
        div.style.margin = '5px';
        div.style.whiteSpace = 'nowrap';
        document.body.appendChild(div);
        div.innerText = element;

        length.push(div.offsetHeight);

        document.body.removeChild(div);
    });

    return length.reduce((partialSum, a) => partialSum + a, 0);
};

export const getHeightOfSingleTextLine = (element: ReactElement) => {
    const isTextNode = typeof element === 'string';
    const isChildrenTextNode = !isTextNode
        ? // ToDo find a fix for this error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          !Array.isArray(element.props.children) && typeof element.props.children[0] === 'string'
        : false;

    if (isTextNode || isChildrenTextNode) {
        const span = document.createElement('span');

        if (isChildrenTextNode) {
            const elementStyles = (element.props as HTMLAttributes<HTMLSpanElement>).style;

            if (elementStyles) {
                Object.keys(elementStyles).forEach((styleKey) => {
                    // ToDo find a fix for these errors
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    span.style[styleKey] = elementStyles[styleKey];
                });
            }
        }

        span.innerText = 'A';

        document.body.appendChild(span);

        const height = span.offsetHeight;

        document.body.removeChild(span);

        return height;
    }

    return undefined;
};
