export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: string | number | NodeJS.Timeout | undefined;

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise((resolve) => {
            if (timeout) {
                clearTimeout(timeout);
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            timeout = setTimeout(() => resolve(func(...args)), waitFor);
        });
};
