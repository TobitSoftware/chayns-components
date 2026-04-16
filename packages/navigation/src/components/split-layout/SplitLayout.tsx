import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type FC,
} from 'react';
import ResizeHandle from './resize-handle/ResizeHandle';
import { StyledSplitLayout, StyledSplitLayoutPane } from './SplitLayout.styles';
import {
    SplitLayoutDirection,
    type SplitLayoutProps,
    type SplitLayoutSizes,
    type SplitLayoutViewProps,
} from './SplitLayout.types';
import {
    adjustSplitLayoutSizesToContainer,
    createInitialSplitLayoutSizes,
    emitSplitLayoutResize,
    filterVisibleSplitLayoutViews,
    getSplitLayoutContainerSize,
    normalizeSplitLayoutViews,
    resizeSplitLayoutPair,
} from './SplitLayout.utils';

type SplitLayoutComponent = FC<SplitLayoutProps> & {
    View: FC<SplitLayoutViewProps>;
};

export const SplitLayoutView: FC<SplitLayoutViewProps> = ({ children }) => children;

SplitLayoutView.displayName = 'SplitLayout.View';

export const SplitLayout = (({
    children,
    direction = SplitLayoutDirection.HORIZONTAL,
    sizes: controlledSizes,
    defaultSizes,
    onResize,
    onResizeEnd,
    onResizeStart,
}: SplitLayoutProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sizesRef = useRef<SplitLayoutSizes>({});
    const isControlled = controlledSizes !== undefined;

    const allViews = useMemo(
        () => normalizeSplitLayoutViews(children, SplitLayoutView),
        [children],
    );

    const [internalSizes, setInternalSizes] = useState<SplitLayoutSizes>({});
    const [containerSize, setContainerSize] = useState(0);

    const activeSizes = isControlled ? controlledSizes : internalSizes;
    const visibleViews = useMemo(
        () => filterVisibleSplitLayoutViews(allViews, containerSize),
        [allViews, containerSize],
    );

    useEffect(() => {
        sizesRef.current = activeSizes ?? {};
    }, [activeSizes]);

    useLayoutEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        setContainerSize(getSplitLayoutContainerSize(container, direction));
    }, [direction, children]);

    useLayoutEffect(() => {
        if (isControlled) {
            return;
        }

        const container = containerRef.current;

        if (!container || !visibleViews.length) {
            return;
        }

        const nextContainerSize = getSplitLayoutContainerSize(container, direction);

        setContainerSize(nextContainerSize);

        setInternalSizes((currentSizes) => {
            if (Object.keys(currentSizes).length > 0) {
                return adjustSplitLayoutSizesToContainer(
                    currentSizes,
                    visibleViews,
                    nextContainerSize,
                    defaultSizes,
                );
            }

            return createInitialSplitLayoutSizes(visibleViews, nextContainerSize, defaultSizes);
        });
    }, [defaultSizes, direction, isControlled, visibleViews]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return () => {};
        }

        const resizeObserver = new ResizeObserver(() => {
            const nextContainerSize = getSplitLayoutContainerSize(container, direction);

            setContainerSize(nextContainerSize);

            if (!isControlled) {
                setInternalSizes((currentSizes) =>
                    adjustSplitLayoutSizesToContainer(
                        currentSizes,
                        filterVisibleSplitLayoutViews(allViews, nextContainerSize),
                        nextContainerSize,
                        defaultSizes,
                    ),
                );
            }
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [allViews, defaultSizes, direction, isControlled]);

    const updateSizes = useCallback(
        (nextSizes: SplitLayoutSizes) => {
            sizesRef.current = nextSizes;

            if (!isControlled) {
                setInternalSizes(nextSizes);
            }
        },
        [isControlled],
    );

    const handleResizeStart = useCallback(
        (handleIndex: number) => {
            const currentView = visibleViews[handleIndex];
            const nextView = visibleViews[handleIndex + 1];
            const currentSizes = sizesRef.current;

            if (!currentView || !nextView) {
                return;
            }

            emitSplitLayoutResize(onResizeStart, currentView.id, currentSizes);
            emitSplitLayoutResize(onResizeStart, nextView.id, currentSizes);
        },
        [onResizeStart, visibleViews],
    );

    const handleResize = useCallback(
        (handleIndex: number, delta: number) => {
            const currentView = visibleViews[handleIndex];
            const nextView = visibleViews[handleIndex + 1];
            const currentSizes = sizesRef.current;

            if (!currentView || !nextView) {
                return;
            }

            const nextSizes = resizeSplitLayoutPair(currentSizes, currentView, nextView, delta);

            updateSizes(nextSizes);

            emitSplitLayoutResize(onResize, currentView.id, nextSizes);
            emitSplitLayoutResize(onResize, nextView.id, nextSizes);
        },
        [onResize, updateSizes, visibleViews],
    );

    const handleResizeEnd = useCallback(
        (handleIndex: number) => {
            const currentView = visibleViews[handleIndex];
            const nextView = visibleViews[handleIndex + 1];
            const currentSizes = sizesRef.current;

            if (!currentView || !nextView) {
                return;
            }

            emitSplitLayoutResize(onResizeEnd, currentView.id, currentSizes);
            emitSplitLayoutResize(onResizeEnd, nextView.id, currentSizes);
        },
        [onResizeEnd, visibleViews],
    );

    return (
        <StyledSplitLayout ref={containerRef} $direction={direction}>
            {visibleViews.map((view, index) => (
                <React.Fragment key={view.id}>
                    <StyledSplitLayoutPane $direction={direction} $size={activeSizes?.[view.id]}>
                        {view.node}
                    </StyledSplitLayoutPane>

                    {index < visibleViews.length - 1 && (
                        <ResizeHandle
                            direction={direction}
                            onDragStart={() => handleResizeStart(index)}
                            onDrag={(delta) => handleResize(index, delta)}
                            onDragEnd={() => handleResizeEnd(index)}
                        />
                    )}
                </React.Fragment>
            ))}
        </StyledSplitLayout>
    );
}) as SplitLayoutComponent;

SplitLayout.View = SplitLayoutView;
SplitLayout.displayName = 'SplitLayout';

export default SplitLayout;
