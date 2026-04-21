import { SplitLayoutDirection, SplitLayoutView } from './SplitLayout.types';

interface GetVisibleViewIdsOptions {
    views: Record<string, SplitLayoutView>;
    containerSize: number;
}

export const getVisibleViewIds = ({ views, containerSize }: GetVisibleViewIdsOptions): string[] =>
    Object.entries(views)
        .filter(([, view]) => {
            if (typeof view.collapseBreakpoint !== 'number') {
                return true;
            }

            return containerSize >= view.collapseBreakpoint;
        })
        .map(([id]) => id);

export const getContainerSizeByDirection = (
    element: HTMLDivElement | null,
    direction: SplitLayoutDirection,
): number => {
    if (!element) {
        return 0;
    }

    return direction === SplitLayoutDirection.HORIZONTAL
        ? element.clientWidth
        : element.clientHeight;
};
