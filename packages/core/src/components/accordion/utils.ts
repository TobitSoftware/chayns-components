interface GetAccordionHeadHeightOptions {
    isWrapped?: boolean;
    title: string;
    width: number;
}

interface GetAccordionHeadHeightResult {
    closed: number;
    open: number;
}

export const getAccordionHeadHeight = ({
    isWrapped,
    title,
    width,
}: GetAccordionHeadHeightOptions): GetAccordionHeadHeightResult => {
    const element = document.createElement('div');

    element.style.fontSize = '1rem';
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
    element.style.whiteSpace = 'nowrap';
    element.style.width = `${width}px`;

    element.innerText = title;

    document.body.appendChild(element);

    const closedHeight = Math.max(element.clientHeight + 8, 33);

    if (isWrapped) {
        element.style.fontWeight = 'bold';
    } else {
        element.style.fontSize = '1.3rem';
    }

    element.style.whiteSpace = 'normal';

    const openHeight = Math.max(element.clientHeight + 8, 33);

    document.body.removeChild(element);

    return { closed: closedHeight, open: openHeight };
};
