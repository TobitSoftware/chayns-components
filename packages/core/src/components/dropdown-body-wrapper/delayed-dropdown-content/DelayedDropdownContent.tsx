import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyledMotionDelayedDropdownContent } from './DelayedDropdownContent.styles';
import { DropdownCoordinates } from '../../../types/dropdown';

export type DelayedDropdownContentProps = {
    children: ReactNode;
    shouldShowContent: boolean;
    onMeasure: (rect: DOMRect) => void;
    coordinates: DropdownCoordinates;
};

const DelayedDropdownContent: FC<DelayedDropdownContentProps> = ({
    children,
    shouldShowContent,
    onMeasure,
    coordinates,
}) => {
    const [hasMeasured, setHasMeasured] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const initialRender = useRef(true);

    const shouldHideContent = useMemo(() => initialRender.current && !hasMeasured, [hasMeasured]);

    const measureElement = useCallback(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();

            setHasMeasured(true);

            onMeasure(rect);
        }
    }, [onMeasure]);

    useEffect(() => {
        if (!shouldShowContent) return () => {};

        const observer = new ResizeObserver(() => {
            setHasMeasured(false);
            initialRender.current = false;

            measureElement();
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [measureElement, shouldShowContent]);

    if (!shouldShowContent) {
        return null;
    }

    return (
        <StyledMotionDelayedDropdownContent
            $coordinates={coordinates}
            $shouldHideContent={shouldHideContent}
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0 }}
            animate={{ height: 'fit-content', opacity: shouldHideContent ? 0 : 1 }}
            transition={{
                duration: 0.2,
                type: 'tween',
            }}
        >
            {children}
        </StyledMotionDelayedDropdownContent>
    );
};

DelayedDropdownContent.displayName = 'DelayedDropdownContent';

export default DelayedDropdownContent;
