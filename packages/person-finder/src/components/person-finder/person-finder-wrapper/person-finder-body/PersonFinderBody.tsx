import React, { forwardRef, UIEvent, useMemo, useRef, useState } from 'react';
import { StyledPersonFinderBody, StyledPersonFinderBodyContent } from './PersonFinderBody.styles';
import { PersonFinderFilterTypes } from '../../PersonFinder.types';
import { BrowserName } from '@chayns-components/core';
import { usePersonFinder } from '../../PersonFinder.context';
import { useDevice } from 'chayns-api';
import { getGroupName } from '../../PersonFinder.utils';
import { useClosestElementAbove } from '../../PersonFinder.hooks';
import PersonFinderGroup from './person-finder-group/PersonFinderGroup';
import PersonFinderHeader from './person-finder-header/PersonFinderHeader';

export type PersonFinderBodyProps = {
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    filterTypes?: PersonFinderFilterTypes[];
};

const PersonFinderBody = forwardRef<HTMLDivElement, PersonFinderBodyProps>(
    ({ onAdd, filterTypes, onRemove }, ref) => {
        const { activeFilter, data } = usePersonFinder();

        const { browser } = useDevice();

        const [isScrollTop, setIsScrollTop] = useState(true);

        const contentRef = useRef<HTMLDivElement>(null);

        const currentGroupName = useClosestElementAbove(contentRef, 'person-finder-group-name');

        const shouldShowGroupNames = (activeFilter?.length ?? 0) !== 1;

        const defaultGroupName = getGroupName(Object.keys(data ?? {})[0] ?? '');

        const handleContentScroll = (event: UIEvent<HTMLDivElement>) => {
            setIsScrollTop((event.target as HTMLElement).scrollTop === 0);
        };

        const content = useMemo(
            () =>
                Object.entries(data ?? {}).map(([key, singleData], index) => {
                    const { count, entries, searchString } = singleData;

                    return (
                        <PersonFinderGroup
                            key={`person-finder-group--${key}`}
                            filterKey={key as PersonFinderFilterTypes}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            entries={entries}
                            count={count}
                            search={searchString}
                            shouldShowGroupName={shouldShowGroupNames && index !== 0}
                        />
                    );
                }),
            [data, onAdd, onRemove, shouldShowGroupNames],
        );

        return (
            <StyledPersonFinderBody ref={ref}>
                <PersonFinderHeader
                    filterTypes={filterTypes}
                    isScrollTop={isScrollTop}
                    shouldShowGroupNames={shouldShowGroupNames}
                    currentGroupName={currentGroupName}
                    defaultGroupName={defaultGroupName}
                />
                <StyledPersonFinderBodyContent
                    ref={contentRef}
                    $browser={browser?.name as BrowserName}
                    onScroll={handleContentScroll}
                >
                    {content}
                </StyledPersonFinderBodyContent>
            </StyledPersonFinderBody>
        );
    },
);

PersonFinderBody.displayName = 'PersonFinderBody';

export default PersonFinderBody;
