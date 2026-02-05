import { ChaynsProvider, ChaynsReactFunctions, ChaynsReactValues } from 'chayns-api';
import React, { type CSSProperties } from 'react';
import { renderToString } from 'react-dom/server';
import ColorSchemeProvider from '../components/color-scheme-provider/ColorSchemeProvider';
import type { IComboBoxItem } from '../components/combobox/ComboBox';
import type { SliderButtonItem } from '../types/slider-button';

interface CalculateMaxComboBoxItemWidthOptions {
    functions: ChaynsReactFunctions;
    list: IComboBoxItem[];
    shouldShowBigImage?: boolean;
    values: ChaynsReactValues;
}

export const calculateMaxComboBoxItemWidth = ({
    functions,
    list,
    shouldShowBigImage,
    values,
}: CalculateMaxComboBoxItemWidthOptions) => {
    const length: number[] = [];

    list.forEach(({ icons, imageUrl, rightElement, subtext, suffixElement, text, textStyles }) => {
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

        if (rightElement) {
            // ColorSchemeProvider is used to prevent missing scheme context error.
            // Due to the fact that the element is never rendered visible, the values are irrelevant.
            div.innerHTML += renderToString(
                <ChaynsProvider data={values} functions={functions} isModule>
                    <ColorSchemeProvider>{rightElement}</ColorSchemeProvider>
                </ChaynsProvider>,
            );
        }

        if (suffixElement) {
            // ColorSchemeProvider is used to prevent missing scheme context error.
            // Due to the fact that the element is never rendered visible, the values are irrelevant.
            div.innerHTML += renderToString(
                <ChaynsProvider data={values} functions={functions} isModule>
                    <ColorSchemeProvider>{suffixElement}</ColorSchemeProvider>
                </ChaynsProvider>,
            );
        }

        let width = div.offsetWidth;

        if (icons && icons.length > 0) {
            width += 20 + 10; // icon width + gap
        }

        if (imageUrl) {
            width +=
                (shouldShowBigImage || (typeof subtext === 'string' && subtext.trim() !== '')
                    ? 40
                    : 22) + 10; // image width + gap
        }

        length.push(width);

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

interface GetHeightOfSingleTextLineOptions {
    container: Element;
}

export const getHeightOfSingleTextLine = ({ container }: GetHeightOfSingleTextLineOptions) => {
    const div = document.createElement('div');

    div.style.visibility = 'hidden';
    div.style.position = 'absolute';
    div.style.whiteSpace = 'nowrap';

    div.innerText = 'Single text line';

    container.appendChild(div);

    const { height } = div.getBoundingClientRect();

    container.removeChild(div);

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
