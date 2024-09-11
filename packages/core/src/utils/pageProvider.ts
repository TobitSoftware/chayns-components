import { getEnvironment, getWindowMetrics } from 'chayns-api';
import { PAGE_BREAKPOINTS } from '../constants/pageProvider';

export const getPagePadding = () => {
    const { runtimeEnvironment } = getEnvironment();

    if (typeof runtimeEnvironment === 'number' && [4, 5].includes(runtimeEnvironment)) {
        return '0';
    }

    if (matchMedia(PAGE_BREAKPOINTS.desktop).matches) {
        return '35px 43px 30px';
    }

    return '15px 10px 20px';
};

type PaddingValues = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

const getPageProviderInformation = (customPadding?: string): PaddingValues => {
    const padding = (customPadding ?? getPagePadding()).split(' ');

    const parseValue = (value: string): number => {
        const parsed = parseInt(value.replace('px', ''), 10);
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    if (padding.length === 1) {
        const value = parseValue(padding[0] ?? '');
        return { top: value, right: value, bottom: value, left: value };
    }

    if (padding.length === 2) {
        const [vertical, horizontal] = padding.map(parseValue);
        return {
            top: vertical ?? 0,
            right: horizontal ?? 0,
            bottom: vertical ?? 0,
            left: horizontal ?? 0,
        };
    }

    if (padding.length === 3) {
        const [top, horizontal, bottom] = padding.map(parseValue);
        return {
            top: top ?? 0,
            right: horizontal ?? 0,
            bottom: bottom ?? 0,
            left: horizontal ?? 0,
        };
    }

    if (padding.length === 4) {
        const [top, right, bottom, left] = padding.map(parseValue);
        return { top: top ?? 0, right: right ?? 0, bottom: bottom ?? 0, left: left ?? 0 };
    }

    return { top: 0, right: 0, bottom: 0, left: 0 };
};

export const getUsableHeight = async (customPadding?: string) => {
    let usableHeight;

    const { bottomBarHeight, topBarHeight, windowHeight } = await getWindowMetrics();

    const { top, bottom } = getPageProviderInformation(customPadding);

    usableHeight = windowHeight - bottom - top;

    if (bottomBarHeight) {
        usableHeight -= bottomBarHeight;
    }

    if (topBarHeight) {
        usableHeight -= topBarHeight;
    }

    return usableHeight;
};
