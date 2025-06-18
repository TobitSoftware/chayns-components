import { ChaynsProvider, ChaynsReactFunctions, ChaynsReactValues } from 'chayns-api';
import React, { type CSSProperties } from 'react';
import { renderToString } from 'react-dom/server';
import ColorSchemeProvider from '../components/color-scheme-provider/ColorSchemeProvider';
import type { IComboBoxItem } from '../components/combobox/ComboBox';
import type { SliderButtonItem } from '../types/slider-button';

export const calculateContentWidth = (
    list: IComboBoxItem[],
    functions: ChaynsReactFunctions,
    values: ChaynsReactValues,
) => {
    const length: number[] = [];

    list.forEach(({ suffixElement, text, textStyles }) => {
        const tagName = textStyles?.tagName ?? 'div';
        const styles = textStyles?.styles;

        const div = document.createElement(tagName);

        if (styles) {
            Object.assign(div.style, styles);
        }

        div.style.display = 'flex';
        div.style.gap = '10px';
        div.style.position = 'absolute';
        div.style.visibility = 'hidden';
        div.style.whiteSpace = 'nowrap';
        div.style.width = 'auto';

        document.body.appendChild(div);

        div.innerText = text;

        if (suffixElement) {
            // ColorSchemeProvider is used to prevent missing scheme context error.
            // Due to the fact that the element is never rendered visible, the values are irrelevant.
            div.innerHTML += renderToString(
                <ChaynsProvider data={values} functions={functions} isModule>
                    <ColorSchemeProvider color="#005EB8" colorMode={0}>
                        {suffixElement}
                    </ColorSchemeProvider>
                </ChaynsProvider>,
            );
        }

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
    const heights: number[] = [];

    elements.forEach((element: string) => {
        const div = document.createElement('div');

        div.style.visibility = 'hidden';
        div.style.position = 'absolute';
        div.style.width = 'auto';
        div.style.padding = '4px 10px';
        div.style.whiteSpace = 'nowrap';

        document.body.appendChild(div);

        div.innerText = element;

        heights.push(div.offsetHeight);

        document.body.removeChild(div);
    });

    return heights.reduce((partialSum, a) => partialSum + a, 0);
};

export const getHeightOfSingleTextLine = () => {
    const span = document.createElement('span');

    span.innerText = 'A';

    document.body.appendChild(span);

    const height = span.offsetHeight;

    document.body.removeChild(span);

    return height;
};

export const getMaxHeightInPixels = (
    maxHeight: CSSProperties['maxHeight'],
    rootElement: Element,
): number => {
    const tempElement = document.createElement('div');

    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.height = '100vh';
    tempElement.style.maxHeight = maxHeight as string;

    rootElement.appendChild(tempElement);

    const { height } = tempElement.getBoundingClientRect();

    rootElement.removeChild(tempElement);

    return height;
};
