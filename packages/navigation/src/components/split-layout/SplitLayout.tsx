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

        setSizes((prev) =>
            distributeSizes({
                views,
                viewIds: viewIdsToDisplay,
                containerSize,
                handleSize,
                previousSizes: prev,
            }),
        );
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

        return viewIdsToDisplay.map((key, index) => {
            const view = views[key];

            if (!view) {
                return null;
            }

            return (
                <React.Fragment key={key}>
                    <StyledSplitLayoutPane
                        $direction={direction}
                        $size={sizes[key] ?? view.defaultSize ?? view.minSize ?? view.maxSize}
                    >
                        {view.component}
                    </StyledSplitLayoutPane>

                    {index < viewIdsToDisplay.length - 1 && (
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
