import { getWindowMetrics, useWindowMetrics } from 'chayns-api';

export const getUsableHeight = async () => {
    let usableHeight;

    const { bottomBarHeight, offsetTop, windowHeight } = await getWindowMetrics();

    usableHeight = windowHeight;

    if (bottomBarHeight) {
        usableHeight -= bottomBarHeight;
    }

    if (offsetTop) {
        usableHeight -= offsetTop;
    }

    return usableHeight;
};

interface UseUsableHeightOptions {
    shouldReduceByCoverHeight?: boolean;
}

export const useUsableHeight = ({ shouldReduceByCoverHeight }: UseUsableHeightOptions = {}) => {
    let usableHeight;

    const { bottomBarHeight, offsetTop, topBarHeight, windowHeight } = useWindowMetrics();

    usableHeight = windowHeight;

    if (bottomBarHeight) {
        usableHeight -= bottomBarHeight;
    }

    if (!shouldReduceByCoverHeight && topBarHeight) {
        usableHeight -= topBarHeight;
    } else if (shouldReduceByCoverHeight && offsetTop) {
        usableHeight -= offsetTop;
    }

    return usableHeight;
};
