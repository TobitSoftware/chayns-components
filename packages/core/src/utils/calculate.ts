import type { SliderButtonItem } from '../types/slider-button';

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

export const calculateBiggestWidth = (elements: SliderButtonItem[]) => {
    const container = document.createElement('div');

    container.style.visibility = 'hidden';
    container.style.position = 'absolute';
    container.style.width = 'auto';
    container.style.whiteSpace = 'nowrap';
    container.style.padding = '7px 12px';
    container.style.display = 'block';

    elements.forEach(({ text, id }) => {
        const element = document.createElement('div');

        element.accessKey = `slider-button-pseudo--${id}`;
        element.innerText = text;

        container.appendChild(element);
    });

    document.body.appendChild(container);

    const width = container.offsetWidth;

    document.body.removeChild(container);

    return width;
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

export const getHeightOfSingleTextLine = () => {
    const span = document.createElement('span');

    span.innerText = 'A';

    document.body.appendChild(span);

    const height = span.offsetHeight;

    document.body.removeChild(span);

    return height;
};
