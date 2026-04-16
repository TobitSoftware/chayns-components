import { Children, isValidElement, type FC, type ReactElement, type ReactNode } from 'react';
import {
    SplitLayoutDirection,
    type NormalizedSplitLayoutView,
    type SplitLayoutSizes,
    type SplitLayoutViewProps,
} from './SplitLayout.types';

export const DEFAULT_MIN_SIZE = 120;

export const clampSplitLayoutSize = (value: number, min: number, max?: number): number => {
    if (max === undefined) {
        return Math.max(value, min);
    }

    return Math.min(Math.max(value, min), max);
};

export const getSplitLayoutContainerSize = (
    element: HTMLDivElement,
    direction: SplitLayoutDirection,
): number =>
    direction === SplitLayoutDirection.HORIZONTAL ? element.clientWidth : element.clientHeight;

export const isSplitLayoutViewElement = (
    child: ReactNode,
    viewComponent: FC<SplitLayoutViewProps>,
): child is ReactElement<SplitLayoutViewProps> =>
    isValidElement<SplitLayoutViewProps>(child) && child.type === viewComponent;

export const normalizeSplitLayoutViews = (
    children: ReactNode,
    viewComponent: FC<SplitLayoutViewProps>,
): NormalizedSplitLayoutView[] =>
    Children.toArray(children)
        .filter((child): child is ReactElement<SplitLayoutViewProps> =>
            isSplitLayoutViewElement(child, viewComponent),
        )
        .map((child) => ({
            id: child.props.id,
            node: child.props.children,
            defaultSize: child.props.defaultSize,
            minSize: child.props.minSize ?? DEFAULT_MIN_SIZE,
            maxSize: child.props.maxSize,
            visibleFrom: child.props.visibleFrom,
            visibleUntil: child.props.visibleUntil,
        }));

export const filterVisibleSplitLayoutViews = (
    views: NormalizedSplitLayoutView[],
    containerSize: number,
): NormalizedSplitLayoutView[] =>
    views.filter((view) => {
        if (view.visibleFrom !== undefined && containerSize < view.visibleFrom) {
            return false;
        }

        return !(view.visibleUntil !== undefined && containerSize > view.visibleUntil);
    });

export const createInitialSplitLayoutSizes = (
    views: NormalizedSplitLayoutView[],
    containerSize: number,
    defaultSizes?: SplitLayoutSizes,
): SplitLayoutSizes => {
    if (!views.length || containerSize <= 0) {
        return {};
    }

    const explicitSizeSum = views.reduce((sum, view) => {
        const size = defaultSizes?.[view.id] ?? view.defaultSize ?? 0;

        return sum + size;
    }, 0);

    const viewsWithoutExplicitSize = views.filter(
        (view) => defaultSizes?.[view.id] === undefined && view.defaultSize === undefined,
    );

    const remainingSize = Math.max(containerSize - explicitSizeSum, 0);
    const fallbackSize = viewsWithoutExplicitSize.length
        ? remainingSize / viewsWithoutExplicitSize.length
        : 0;

    const rawSizes = views.reduce<SplitLayoutSizes>((result, view) => {
        const nextSize = defaultSizes?.[view.id] ?? view.defaultSize ?? fallbackSize;

        return {
            ...result,
            [view.id]: clampSplitLayoutSize(nextSize, view.minSize, view.maxSize),
        };
    }, {});

    const currentSum = Object.values(rawSizes).reduce((sum, size) => sum + size, 0);

    if (currentSum === 0) {
        const evenSize = containerSize / views.length;

        return views.reduce<SplitLayoutSizes>(
            (result, view) => ({
                ...result,
                [view.id]: clampSplitLayoutSize(evenSize, view.minSize, view.maxSize),
            }),
            {},
        );
    }

    if (Math.abs(currentSum - containerSize) < 1) {
        return rawSizes;
    }

    const factor = containerSize / currentSum;

    return views.reduce<SplitLayoutSizes>(
        (result, view) => ({
            ...result,
            [view.id]: clampSplitLayoutSize(
                (rawSizes[view.id] ?? 0) * factor,
                view.minSize,
                view.maxSize,
            ),
        }),
        {},
    );
};

export const adjustSplitLayoutSizesToContainer = (
    currentSizes: SplitLayoutSizes,
    views: NormalizedSplitLayoutView[],
    containerSize: number,
    defaultSizes?: SplitLayoutSizes,
): SplitLayoutSizes => {
    if (!views.length || containerSize <= 0) {
        return {};
    }

    const currentSum = views.reduce((sum, view) => sum + (currentSizes[view.id] ?? 0), 0);

    if (currentSum <= 0) {
        return createInitialSplitLayoutSizes(views, containerSize, defaultSizes);
    }

    const factor = containerSize / currentSum;

    return views.reduce<SplitLayoutSizes>((result, view) => {
        const scaledSize = (currentSizes[view.id] ?? 0) * factor;

        return {
            ...result,
            [view.id]: clampSplitLayoutSize(scaledSize, view.minSize, view.maxSize),
        };
    }, {});
};

export const resizeSplitLayoutPair = (
    sizes: SplitLayoutSizes,
    currentView: NormalizedSplitLayoutView,
    nextView: NormalizedSplitLayoutView,
    delta: number,
): SplitLayoutSizes => {
    const currentSize = sizes[currentView.id];
    const nextSize = sizes[nextView.id];

    if (currentSize === undefined || nextSize === undefined) {
        return sizes;
    }

    const combinedSize = currentSize + nextSize;

    let nextCurrentSize = clampSplitLayoutSize(
        currentSize + delta,
        currentView.minSize,
        currentView.maxSize,
    );

    let nextNextSize = combinedSize - nextCurrentSize;

    if (nextNextSize < nextView.minSize) {
        nextNextSize = nextView.minSize;
        nextCurrentSize = combinedSize - nextNextSize;
    }

    if (nextView.maxSize !== undefined && nextNextSize > nextView.maxSize) {
        nextNextSize = nextView.maxSize;
        nextCurrentSize = combinedSize - nextNextSize;
    }

    nextCurrentSize = clampSplitLayoutSize(
        nextCurrentSize,
        currentView.minSize,
        currentView.maxSize,
    );
    nextNextSize = clampSplitLayoutSize(nextNextSize, nextView.minSize, nextView.maxSize);

    return {
        ...sizes,
        [currentView.id]: nextCurrentSize,
        [nextView.id]: nextNextSize,
    };
};

export const emitSplitLayoutResize = (
    callback: ((id: string, size: number, sizes: SplitLayoutSizes) => void) | undefined,
    id: string,
    sizes: SplitLayoutSizes,
): void => {
    if (typeof callback !== 'function') {
        return;
    }

    callback(id, sizes[id] ?? 0, sizes);
};
