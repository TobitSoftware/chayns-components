import React, { useCallback, useEffect, useMemo, useRef, useState, type FC } from 'react';
import ResizeHandle from './resize-handle/ResizeHandle';
import { StyledSplitLayout, StyledSplitLayoutPane } from './SplitLayout.styles';
import { SplitLayoutDirection, type SplitLayoutProps } from './SplitLayout.types';
import {
    clampViewSize,
    distributeSizes,
    getContainerSizeByDirection,
    getVisibleViewIds,
} from './SplitLayout.utils';

type ActivityComponent = (props: {
    mode: 'visible' | 'hidden';
    children: React.ReactNode;
}) => React.ReactElement | null;

const isReactVersionAtLeast = (version: string, major: number, minor: number): boolean => {
    const match = /^(\d+)\.(\d+)/.exec(version);

    if (!match) {
        return false;
    }

    const actualMajor = Number(match[1]);
    const actualMinor = Number(match[2]);

    return actualMajor > major || (actualMajor === major && actualMinor >= minor);
};

const Activity = isReactVersionAtLeast(React.version, 19, 2)
    ? (React as unknown as { Activity?: ActivityComponent }).Activity
    : undefined;

export const SplitLayout: FC<SplitLayoutProps> = ({
    direction = SplitLayoutDirection.HORIZONTAL,
    handleSize = 2,
    views,
    onChange,
    fullScreenViewId,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [sizes, setSizes] = useState<Record<string, number>>({});
    const [containerSize, setContainerSize] = useState(0);
    const dragStartSizesRef = useRef<Record<string, number>>({});
    const sizeHistoryRef = useRef<Record<string, number>>({});
    const visibleViewIdsRef = useRef<string[]>([]);

    useEffect(() => {
        if (!ref.current) {
            return () => {};
        }

        const element = ref.current;

        const updateSize = (): void => {
            setContainerSize(getContainerSizeByDirection(element, direction));
        };

        updateSize();

        const observer = new ResizeObserver(() => {
            updateSize();
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [direction]);

    const viewIdsToDisplay = useMemo(
        () =>
            getVisibleViewIds({
                views,
                containerSize,
            }),
        [views, containerSize],
    );

    // Keep the panes filling the container exactly - both initially and
    // whenever the container size or the visible views change.
    useEffect(() => {
        if (containerSize <= 0 || viewIdsToDisplay.length === 0) {
            return;
        }

        setSizes((prev) => {
            const previousSizes = { ...sizeHistoryRef.current, ...prev };
            const reappearedViewIds = viewIdsToDisplay.filter(
                (id) =>
                    !visibleViewIdsRef.current.includes(id) &&
                    typeof previousSizes[id] === 'number',
            );
            const nextSizes = distributeSizes({
                views,
                viewIds: viewIdsToDisplay,
                containerSize,
                handleSize,
                previousSizes,
                preserveViewIds: reappearedViewIds,
            });

            sizeHistoryRef.current = { ...sizeHistoryRef.current, ...nextSizes };
            visibleViewIdsRef.current = viewIdsToDisplay;

            return nextSizes;
        });
    }, [containerSize, handleSize, viewIdsToDisplay, views]);

    const handleDragStart = useCallback(() => {
        setSizes((prev) => {
            dragStartSizesRef.current = prev;

            return prev;
        });
    }, []);

    const handleResize = useCallback(
        (key: string, delta: number) => {
            setSizes((prev) => {
                const index = viewIdsToDisplay.indexOf(key);
                const nextKey = viewIdsToDisplay[index + 1];

                if (index < 0 || !nextKey) {
                    return prev;
                }

                // The delta is the total pointer movement since drag start, so
                // the calculation is based on the sizes captured at drag start.
                // This prevents an offset when the pointer moves beyond min/max
                // limits and then back again.
                const startSizes = dragStartSizesRef.current;

                const currentSize = startSizes[key] ?? prev[key] ?? 0;
                const nextSize = startSizes[nextKey] ?? prev[nextKey] ?? 0;

                // The pane can only grow as much as its neighbor can shrink and
                // vice versa, so the total size never exceeds the container.
                const clampedCurrent = clampViewSize(views[key], currentSize + delta);
                let appliedDelta = clampedCurrent - currentSize;

                const clampedNext = clampViewSize(views[nextKey], nextSize - appliedDelta);
                appliedDelta = nextSize - clampedNext;

                const newCurrentSize = clampViewSize(views[key], currentSize + appliedDelta);

                if (prev[key] === newCurrentSize && prev[nextKey] === clampedNext) {
                    return prev;
                }

                if (typeof onChange === 'function') {
                    onChange(key, newCurrentSize);
                    onChange(nextKey, clampedNext);
                }

                return {
                    ...prev,
                    [key]: newCurrentSize,
                    [nextKey]: clampedNext,
                };
            });
        },
        [onChange, viewIdsToDisplay, views],
    );

    const content = useMemo(() => {
        if (typeof fullScreenViewId === 'string' && views[fullScreenViewId]) {
            return views[fullScreenViewId].component;
        }

        const visibleViewIds = new Set(viewIdsToDisplay);
        let visibleIndex = 0;

        return Object.entries(views).map(([key, view]) => {
            const isVisible = visibleViewIds.has(key);
            const index = visibleIndex;

            if (isVisible) {
                visibleIndex += 1;
            }

            if (!isVisible && !Activity) {
                return null;
            }

            const pane = (
                <StyledSplitLayoutPane
                    $direction={direction}
                    $size={sizes[key] ?? view.defaultSize ?? view.minSize ?? view.maxSize}
                >
                    {view.component}
                </StyledSplitLayoutPane>
            );

            return (
                <React.Fragment key={key}>
                    {Activity ? (
                        <Activity mode={isVisible ? 'visible' : 'hidden'}>{pane}</Activity>
                    ) : (
                        pane
                    )}

                    {isVisible && index < viewIdsToDisplay.length - 1 && (
                        <ResizeHandle
                            size={handleSize}
                            direction={direction}
                            onDragStart={handleDragStart}
                            onDrag={(delta) => handleResize(key, delta)}
                        />
                    )}
                </React.Fragment>
            );
        });
    }, [
        direction,
        fullScreenViewId,
        handleDragStart,
        handleResize,
        handleSize,
        sizes,
        viewIdsToDisplay,
        views,
    ]);

    return (
        <StyledSplitLayout ref={ref} $direction={direction}>
            {content}
        </StyledSplitLayout>
    );
};

SplitLayout.displayName = 'SplitLayout';

export default SplitLayout;
