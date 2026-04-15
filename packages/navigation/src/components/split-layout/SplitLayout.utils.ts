import { Children, isValidElement, ReactElement, ReactNode } from 'react';
import { NormalizedView } from './SplitLayout.types';

export const clamp = (value: number, min: number, max?: number): number => {
    if (max === undefined) {
        return Math.max(value, min);
    }

    return Math.min(Math.max(value, min), max);
};

export const normalizeViews = (children: ReactNode) =>
    Children.toArray(children)
        .filter(isSplitLayoutViewElement)
        .map((child) => ({
            id: child.props.id as string,
            node: child.props.children,
            defaultSize: child.props.defaultSize,
            minSize: child.props.minSize,
            maxSize: child.props.maxSize,
        })) as NormalizedView[];

export const getContainerSize = (
    element: HTMLDivElement,
    direction: SplitLayoutDirection,
): number =>
    direction === SplitLayoutDirection.HORIZONTAL ? element.clientWidth : element.clientHeight;

export const isSplitLayoutViewElement = (
    child: ReactNode,
): child is ReactElement<SplitLayoutViewProps> =>
    isValidElement<SplitLayoutViewProps>(child) && child.type === SplitLayoutView;

export const createInitialSizes = (
    views: NormalizedView[],
    containerSize: number,
): Record<string, number> => {
    if (!views.length || containerSize <= 0) {
        return {};
    }

    const explicitSizeSum = views.reduce((sum, view) => sum + (view.defaultSize ?? 0), 0);
    const viewsWithoutDefaultSize = views.filter((view) => view.defaultSize === undefined);
    const remainingSize = Math.max(containerSize - explicitSizeSum, 0);
    const fallbackSize = viewsWithoutDefaultSize.length
        ? remainingSize / viewsWithoutDefaultSize.length
        : 0;

    const rawSizes = views.reduce<Record<string, number>>((result, view) => {
        const nextSize = view.defaultSize ?? fallbackSize;
        result[view.id] = clamp(nextSize, view.minSize, view.maxSize);

        return result;
    }, {});

    const currentSum = Object.values(rawSizes).reduce((sum, size) => sum + size, 0);

    if (currentSum === 0) {
        const evenSize = containerSize / views.length;

        return views.reduce<Record<string, number>>((result, view) => {
            result[view.id] = clamp(evenSize, view.minSize, view.maxSize);

            return result;
        }, {});
    }

    if (Math.abs(currentSum - containerSize) < 1) {
        return rawSizes;
    }

    const factor = containerSize / currentSum;

    return views.reduce<Record<string, number>>((result, view) => {
        result[view.id] = clamp(rawSizes[view.id] * factor, view.minSize, view.maxSize);

        return result;
    }, {});
};

export const adjustSizesToContainer = (
    currentSizes: Record<string, number>,
    views: NormalizedView[],
    containerSize: number,
): Record<string, number> => {
    const ids = views.map((view) => view.id);

    if (!ids.length || containerSize <= 0) {
        return {};
    }

    const currentSum = ids.reduce((sum, id) => sum + (currentSizes[id] ?? 0), 0);

    if (currentSum <= 0) {
        return createInitialSizes(views, containerSize);
    }

    const factor = containerSize / currentSum;

    return views.reduce<Record<string, number>>((result, view) => {
        const scaledSize = (currentSizes[view.id] ?? 0) * factor;
        result[view.id] = clamp(scaledSize, view.minSize, view.maxSize);

        return result;
    }, {});
};
