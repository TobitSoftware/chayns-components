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

export const getHeightOfSingleTextLine = () => {
    const span = document.createElement('span');

    span.innerText = 'A';

    document.body.appendChild(span);

    const height = span.offsetHeight;

    document.body.removeChild(span);

    return height;
};
