import React, {
    FC,
    useRef,
    useMemo,
    useCallback,
    useEffect,
    useState,
    useLayoutEffect,
} from 'react';
import {
    SplitLayoutComponent,
    SplitLayoutDirection,
    SplitLayoutProps,
    SplitLayoutViewProps,
} from './SplitLayout.types';
import { StyledSplitLayout, StyledSplitLayoutPane } from './SplitLayout.styles';
import ResizeHandle from './resize-handle/ResizeHandle';
import {
    adjustSizesToContainer,
    clamp,
    createInitialSizes,
    getContainerSize,
    normalizeViews,
} from './SplitLayout.utils';

const SplitLayout = (({
    children,
    direction = SplitLayoutDirection.HORIZONTAL,
    onResize,
    onResizeEnd,
    onResizeStart,
}: SplitLayoutProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const views = useMemo(() => normalizeViews(children), [children]);
    const [sizes, setSizes] = useState<Record<string, number>>({});

    useLayoutEffect(() => {
        const container = containerRef.current;

        if (!container || !views.length) {
            return;
        }

        const containerSize = getContainerSize(container, direction);

        setSizes((currentSizes) => {
            if (Object.keys(currentSizes).length === views.length) {
                return adjustSizesToContainer(currentSizes, views, containerSize);
            }

            return createInitialSizes(views, containerSize);
        });
    }, [direction, views]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return () => {};
        }

        const resizeObserver = new ResizeObserver(() => {
            const containerSize = getContainerSize(container, direction);

            setSizes((currentSizes) => adjustSizesToContainer(currentSizes, views, containerSize));
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [direction, views]);

    const handleResizeStart = useCallback(
        (handleIndex: number) => {
            const currentView = views[handleIndex];
            const nextView = views[handleIndex + 1];

            if (!currentView || !nextView) {
                return;
            }

            if (typeof onResizeStart === 'function') {
                onResizeStart(currentView.id, sizes[currentView.id] ?? 0, sizes);
                onResizeStart(nextView.id, sizes[nextView.id] ?? 0, sizes);
            }
        },
        [onResizeStart, sizes, views],
    );

    const handleResize = useCallback(
        (handleIndex: number, delta: number) => {
            const currentView = views[handleIndex];
            const nextView = views[handleIndex + 1];

            if (!currentView || !nextView) {
                return;
            }

            setSizes((currentSizes) => {
                const currentSize = currentSizes[currentView.id];
                const nextSize = currentSizes[nextView.id];

                if (currentSize === undefined || nextSize === undefined) {
                    return currentSizes;
                }

                const combinedSize = currentSize + nextSize;

                let nextCurrentSize = clamp(
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

                nextCurrentSize = clamp(nextCurrentSize, currentView.minSize, currentView.maxSize);
                nextNextSize = clamp(nextNextSize, nextView.minSize, nextView.maxSize);

                const nextSizes = {
                    ...currentSizes,
                    [currentView.id]: nextCurrentSize,
                    [nextView.id]: nextNextSize,
                };

                if (typeof onResize === 'function') {
                    onResize(currentView.id, nextSizes[currentView.id] ?? 0, nextSizes);
                    onResize(nextView.id, nextSizes[nextView.id] ?? 0, nextSizes);
                }

                return nextSizes;
            });
        },
        [onResize, views],
    );

    const handleResizeEnd = useCallback(
        (handleIndex: number) => {
            const currentView = views[handleIndex];
            const nextView = views[handleIndex + 1];

            if (!currentView || !nextView) {
                return;
            }

            if (typeof onResizeEnd === 'function') {
                onResizeEnd(currentView.id, sizes[currentView.id] ?? 0, sizes);
                onResizeEnd(nextView.id, sizes[nextView.id] ?? 0, sizes);
            }
        },
        [onResizeEnd, sizes, views],
    );

    const content = useMemo(
        () =>
            views.map((view, index) => (
                <React.Fragment key={view.id}>
                    <StyledSplitLayoutPane
                        $direction={direction}
                        $size={sizes[view.id]}
                        $defaultSize={view.defaultSize}
                    >
                        {view.node}
                    </StyledSplitLayoutPane>

                    {index < views.length - 1 && (
                        <ResizeHandle
                            direction={direction}
                            onDragStart={() => handleResizeStart(index)}
                            onDrag={(delta) => handleResize(index, delta)}
                            onDragEnd={() => handleResizeEnd(index)}
                        />
                    )}
                </React.Fragment>
            )),
        [direction, handleResize, handleResizeEnd, handleResizeStart, sizes, views],
    );

    return (
        <StyledSplitLayout ref={containerRef} $direction={direction}>
            {content}
        </StyledSplitLayout>
    );
}) as SplitLayoutComponent;

const SplitLayoutView: FC<SplitLayoutViewProps> = ({ children }) => children;

SplitLayoutView.displayName = 'SplitLayout.View';

SplitLayout.displayName = 'SplitLayout';
SplitLayout.View = SplitLayoutView;

export default SplitLayout;
