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

export const useUsableHeight = () => {
    let usableHeight;

    const { bottomBarHeight, offsetTop, topBarHeight, windowHeight } = useWindowMetrics();

    usableHeight = windowHeight;

    if (bottomBarHeight) {
        usableHeight -= bottomBarHeight;
    }

    if (offsetTop) {
        usableHeight -= offsetTop;
    }

    if (topBarHeight) {
        usableHeight -= topBarHeight;
    }

    return usableHeight;
};
