import React, { forwardRef, useMemo, useRef, useState, UIEvent } from 'react';
import { FinderBodyProps } from './FinderBody.types';
import { StyledFinderBody, StyledFinderBodyContent } from './FinderBody.styles';
import { useFinderContext } from '../../Finder.context';
import { useClosestElementAbove, useFinderFilter } from './FinderBody.hooks';
import FinderHeader from './finder-header/FinderHeader';
import FinderGroup from './finder-group/FinderGroup';
import { FinderData } from '../../Finder.types';

const FinderBody = forwardRef<HTMLDivElement, FinderBodyProps>(({ shouldRenderInline }, ref) => {
    const [isScrollTop, setIsScrollTop] = useState(true);

    const { activeFilter, data } = useFinderContext();
    const { getGroupName } = useFinderFilter();

    const contentRef = useRef<HTMLDivElement>(null);

    const currentFilterName = useClosestElementAbove(contentRef, 'finder-group-name');

    const shouldDisplayNames = (activeFilter?.length ?? 0) !== 1;

    const defaultGroupName = getGroupName(Object.keys(data ?? {})[0] ?? '');

    const handleContentScroll = (event: UIEvent<HTMLDivElement>) => {
        setIsScrollTop((event.target as HTMLElement).scrollTop === 0);
    };

    const content = useMemo(
        () =>
            Object.entries(data ?? {}).map(([key, singleData], index) => {
                const { count, entries } = singleData as FinderData<{ id: string }>;

                return (
                    <FinderGroup
                        key={`finder-group--${key}`}
                        filterKey={key}
                        entries={entries}
                        count={count}
                        shouldDisplayName={shouldDisplayNames && index !== 0}
                    />
                );
            }),
        [data, shouldDisplayNames],
    );

    return (
        <StyledFinderBody ref={ref} $shouldRenderInline={shouldRenderInline}>
            <FinderHeader
                shouldDisplayNames={shouldDisplayNames}
                shouldUseShadow={!isScrollTop && !shouldRenderInline}
                currentFilterName={currentFilterName ?? defaultGroupName}
            />
            <StyledFinderBodyContent
                ref={contentRef}
                className="chayns-scrollbar"
                onScroll={handleContentScroll}
            >
                {content}
            </StyledFinderBodyContent>
        </StyledFinderBody>
    );
});

FinderBody.displayName = 'FinderBody';

export default FinderBody;
