import { SplitLayoutDirection, SplitLayoutView } from './SplitLayout.types';

interface GetVisibleViewIdsOptions {
    views: Record<string, SplitLayoutView>;
    containerSize: number;
}

export const getVisibleViewIds = ({ views, containerSize }: GetVisibleViewIdsOptions): string[] =>
    Object.entries(views)
        .filter(([, view]) => {
            if (view.isHidden) {
                return false;
            }

            if (typeof view.collapseBreakpoint !== 'number') {
                return true;
            }

            return containerSize >= view.collapseBreakpoint;
        })
        .map(([id]) => id);

export const clampViewSize = (view: SplitLayoutView | undefined, size: number): number => {
    const minSize = view?.minSize ?? 0;
    const maxSize = view?.maxSize ?? Number.MAX_SAFE_INTEGER;

    return Math.min(Math.max(size, minSize), maxSize);
};

interface DistributeSizesOptions {
    views: Record<string, SplitLayoutView>;
    viewIds: string[];
    containerSize: number;
    handleSize: number;
    previousSizes?: Record<string, number>;
    preserveViewIds?: string[];
}

/**
 * Distributes the available container size across all visible views so that the
 * views always fill the container exactly. Existing sizes are kept as close as
 * possible while respecting min/max constraints.
 */
export const distributeSizes = ({
    views,
    viewIds,
    containerSize,
    handleSize,
    previousSizes = {},
    preserveViewIds = [],
}: DistributeSizesOptions): Record<string, number> => {
    if (viewIds.length === 0 || containerSize <= 0) {
        return {};
    }

    const availableSize = containerSize - handleSize * Math.max(viewIds.length - 1, 0);

    if (availableSize <= 0) {
        return {};
    }

    const sizes: Record<string, number> = {};

    viewIds.forEach((id) => {
        const baseSize =
            previousSizes[id] ?? views[id]?.defaultSize ?? availableSize / viewIds.length;

        sizes[id] = clampViewSize(views[id], baseSize);
    });

    let diff = availableSize - viewIds.reduce((sum, id) => sum + (sizes[id] ?? 0), 0);

    // Distribute the remaining difference over all views that can still grow or
    // shrink. Multiple passes are needed because views may hit their min/max.
    for (let pass = 0; pass < viewIds.length && Math.abs(diff) > 0.5; pass++) {
        const currentDiff = diff;
        const adjustableIds = viewIds.filter(
            (id) =>
                !preserveViewIds.includes(id) &&
                (currentDiff > 0
                    ? (sizes[id] ?? 0) < (views[id]?.maxSize ?? Number.MAX_SAFE_INTEGER)
                    : (sizes[id] ?? 0) > (views[id]?.minSize ?? 0)),
        );

        if (adjustableIds.length === 0) {
            break;
        }

        const share = diff / adjustableIds.length;
        const sizesBeforePass = { ...sizes };

        adjustableIds.forEach((id) => {
            sizes[id] = clampViewSize(views[id], (sizesBeforePass[id] ?? 0) + share);
        });

        diff -= adjustableIds.reduce(
            (sum, id) => sum + (sizes[id] ?? 0) - (sizesBeforePass[id] ?? 0),
            0,
        );
    }

    return sizes;
};

interface ResizeViewSizesOptions {
    views: Record<string, SplitLayoutView>;
    viewIds: string[];
    key: string;
    delta: number;
    startSizes: Record<string, number>;
    mainViewId?: string;
}

export const resizeViewSizes = ({
    views,
    viewIds,
    key,
    delta,
    startSizes,
    mainViewId,
}: ResizeViewSizesOptions): Record<string, number> => {
    const index = viewIds.indexOf(key);
    let nextIds: string[] = [];

    if (index >= 0) {
        const hasMainView =
            typeof mainViewId === 'string' && viewIds.includes(mainViewId) && key !== mainViewId;
        nextIds = hasMainView ? [mainViewId] : viewIds.slice(index + 1);
    }
    const startSize = startSizes[key] ?? 0;
    const requestedSize = clampViewSize(views[key], startSize + delta);
    const requestedDelta = requestedSize - startSize;

    if (requestedDelta === 0 || nextIds.length === 0) {
        return { [key]: startSize };
    }

    const capacity = nextIds.reduce((sum, id) => {
        const size = startSizes[id] ?? 0;
        const limit =
            requestedDelta > 0
                ? (views[id]?.minSize ?? 0)
                : (views[id]?.maxSize ?? Number.MAX_SAFE_INTEGER);

        return sum + Math.max(requestedDelta > 0 ? size - limit : limit - size, 0);
    }, 0);
    const appliedDelta = Math.sign(requestedDelta) * Math.min(Math.abs(requestedDelta), capacity);
    const sizes: Record<string, number> = { [key]: startSize + appliedDelta };
    let remaining = Math.abs(appliedDelta);

    nextIds.forEach((id) => {
        const size = startSizes[id] ?? 0;
        const limit =
            requestedDelta > 0
                ? (views[id]?.minSize ?? 0)
                : (views[id]?.maxSize ?? Number.MAX_SAFE_INTEGER);
        const adjustment = Math.min(
            remaining,
            Math.max(requestedDelta > 0 ? size - limit : limit - size, 0),
        );

        sizes[id] = size - Math.sign(requestedDelta) * adjustment;
        remaining -= adjustment;
    });

    return sizes;
};

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
