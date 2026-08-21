import React, { useCallback, useEffect, useMemo, useRef, useState, type FC } from 'react';
import ResizeHandle from './resize-handle/ResizeHandle';
import { StyledSplitLayout, StyledSplitLayoutPane } from './SplitLayout.styles';
import { SplitLayoutDirection, type SplitLayoutProps } from './SplitLayout.types';
import {
    distributeSizes,
    getContainerSizeByDirection,
    getVisibleViewIds,
    resizeViewSizes,
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
    mainView,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [sizes, setSizes] = useState<Record<string, number>>({});
    const [containerSize, setContainerSize] = useState(0);
    const sizesRef = useRef<Record<string, number>>({});
    const viewsRef = useRef(views);
    viewsRef.current = views;
    const dragStartSizesRef = useRef<Record<string, number>>({});
    const isDraggingRef = useRef(false);
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

    const visibleViewConfigKey = Object.entries(views)
        .map(([id, view]) => [id, view.isHidden, view.collapseBreakpoint].join(':'))
        .join('|');
    const viewIdsToDisplay = useMemo(() => {
        void visibleViewConfigKey;

        return getVisibleViewIds({
            views: viewsRef.current,
            containerSize,
        });
    }, [containerSize, visibleViewConfigKey]);
    const viewLayoutKey = viewIdsToDisplay
        .map((id) => {
            const view = views[id];

            return [id, view?.minSize, view?.maxSize].join(':');
        })
        .join('|');
    const visibleViewIdsKey = viewIdsToDisplay.join('|');

    // Keep the panes filling the container exactly - both initially and
    // whenever the container size or the visible views change.
    useEffect(() => {
        if (isDraggingRef.current || containerSize <= 0 || viewIdsToDisplay.length === 0) {
            return;
        }

        setSizes((prev) => {
            const previousSizes = { ...sizeHistoryRef.current, ...sizesRef.current, ...prev };
            const reappearedViewIds = viewIdsToDisplay.filter(
                (id) =>
                    !visibleViewIdsRef.current.includes(id) &&
                    typeof previousSizes[id] === 'number',
            );
            const nextSizes = distributeSizes({
                views: viewsRef.current,
                viewIds: viewIdsToDisplay,
                containerSize,
                handleSize,
                previousSizes,
                preserveViewIds: reappearedViewIds,
            });

            sizeHistoryRef.current = { ...sizeHistoryRef.current, ...nextSizes };
            visibleViewIdsRef.current = viewIdsToDisplay;

            const hasChanged = viewIdsToDisplay.some(
                (id) => Math.abs((prev[id] ?? 0) - (nextSizes[id] ?? 0)) > 0.01,
            );

            if (hasChanged) {
                sizesRef.current = nextSizes;
            }

            return hasChanged ? nextSizes : prev;
        });
    }, [containerSize, handleSize, viewIdsToDisplay, viewLayoutKey, visibleViewIdsKey]);

    const handleDragStart = useCallback(() => {
        isDraggingRef.current = true;
        dragStartSizesRef.current = { ...sizesRef.current };
    }, []);

    const handleDragEnd = useCallback(() => {
        isDraggingRef.current = false;
    }, []);

    const handleResize = useCallback(
        (key: string, delta: number) => {
            setSizes((prev) => {
                if (!isDraggingRef.current) {
                    return prev;
                }

                const startSizes = dragStartSizesRef.current;
                const nextSizes = resizeViewSizes({
                    views: viewsRef.current,
                    viewIds: viewIdsToDisplay,
                    key,
                    delta,
                    startSizes,
                    mainViewId: mainView,
                });
                const changedIds = Object.keys(nextSizes);

                if (changedIds.every((id) => prev[id] === nextSizes[id])) {
                    return prev;
                }

                if (typeof onChange === 'function') {
                    changedIds.forEach((id) => {
                        const size = nextSizes[id];

                        if (typeof size === 'number') {
                            onChange(id, size);
                        }
                    });
                }

                const updatedSizes = { ...dragStartSizesRef.current, ...nextSizes };
                sizesRef.current = updatedSizes;
                sizeHistoryRef.current = { ...sizeHistoryRef.current, ...updatedSizes };

                return updatedSizes;
            });
        },
        [mainView, onChange, viewIdsToDisplay],
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
                            onDragEnd={handleDragEnd}
                            onDrag={(delta) => handleResize(key, delta)}
                        />
                    )}
                </React.Fragment>
            );
        });
    }, [
        direction,
        fullScreenViewId,
        handleDragEnd,
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
