import React, { useCallback, useEffect, useMemo, useRef, useState, type FC } from 'react';
import ResizeHandle from './resize-handle/ResizeHandle';
import { StyledSplitLayout, StyledSplitLayoutPane } from './SplitLayout.styles';
import { SplitLayoutDirection, type SplitLayoutProps } from './SplitLayout.types';
import { getContainerSizeByDirection, getVisibleViewIds } from './SplitLayout.utils';

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

    const handleResize = useCallback(
        (key: string, delta: number) => {
            setSizes((prev) => {
                const nextSize = (prev[key] ?? views[key]?.defaultSize ?? 0) + delta;

                const minSize = views[key]?.minSize ?? 0;
                const maxSize = views[key]?.maxSize ?? Number.MAX_SAFE_INTEGER;

                const clampedSize = Math.min(Math.max(nextSize, minSize), maxSize);

                if (typeof onChange === 'function') {
                    onChange(key, clampedSize);
                }

                return {
                    ...prev,
                    [key]: clampedSize,
                };
            });
        },
        [onChange, views],
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
                            onDrag={(delta) => handleResize(key, delta)}
                        />
                    )}
                </React.Fragment>
            );
        });
    }, [direction, fullScreenViewId, handleResize, handleSize, sizes, viewIdsToDisplay, views]);

    return (
        <StyledSplitLayout ref={ref} $direction={direction}>
            {content}
        </StyledSplitLayout>
    );
};

SplitLayout.displayName = 'SplitLayout';

export default SplitLayout;
