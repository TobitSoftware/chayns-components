import { useEffect } from 'react';

export interface UseGlobalUserSelectOptions {
    isDisabled: boolean;
}

export const useGlobalUserSelect = ({ isDisabled }: UseGlobalUserSelectOptions): void => {
    useEffect(() => {
        if (!isDisabled || typeof document === 'undefined') {
            return undefined;
        }

        const elements = [document.documentElement, document.body];
        const previousStyles = elements.map((element) => ({
            element,
            userSelect: element.style.userSelect,
            webkitUserSelect: element.style.getPropertyValue('-webkit-user-select'),
        }));

        previousStyles.forEach(({ element }) => {
            const { style } = element;

            style.userSelect = 'none';
            style.setProperty('-webkit-user-select', 'none');
        });

        return () => {
            previousStyles.forEach(({ element, userSelect, webkitUserSelect }) => {
                const { style } = element;

                style.userSelect = userSelect;

                if (webkitUserSelect) {
                    style.setProperty('-webkit-user-select', webkitUserSelect);
                } else {
                    style.removeProperty('-webkit-user-select');
                }
            });
        };
    }, [isDisabled]);
};

interface ClampSideBarWidthOptions {
    width: number;
    minWidth: number;
    maxWidth: number;
}

export const clampSideBarWidth = ({
    width,
    minWidth,
    maxWidth,
}: ClampSideBarWidthOptions): number => {
    const normalizedMinWidth = Math.min(minWidth, maxWidth);
    const normalizedMaxWidth = Math.max(minWidth, maxWidth);

    return Math.min(Math.max(width, normalizedMinWidth), normalizedMaxWidth);
};

interface GetNearestSideBarWidthOptions {
    width: number;
    minWidth: number;
    maxWidth: number;
}

interface GetSideBarCompactBreakpointOptions {
    minWidth: number;
    maxWidth: number;
}

export const getNearestSideBarWidth = ({
    width,
    minWidth,
    maxWidth,
}: GetNearestSideBarWidthOptions): number => {
    const normalizedMinWidth = Math.min(minWidth, maxWidth);
    const normalizedMaxWidth = Math.max(minWidth, maxWidth);
    const halfWidth = getSideBarCompactBreakpoint({ minWidth, maxWidth });

    return width < halfWidth ? normalizedMinWidth : normalizedMaxWidth;
};

export const getSideBarCompactBreakpoint = ({
    minWidth,
    maxWidth,
}: GetSideBarCompactBreakpointOptions): number => {
    const normalizedMinWidth = Math.min(minWidth, maxWidth);
    const normalizedMaxWidth = Math.max(minWidth, maxWidth);

    return normalizedMinWidth + (normalizedMaxWidth - normalizedMinWidth) / 2;
};
