import React, { forwardRef, UIEvent, useMemo, useRef, useState } from 'react';
import {
    StyledMotionPersonFinderBody,
    StyledPersonFinderBodyContent,
} from './PersonFinderBody.styles';
import { PersonFinderFilterTypes } from '../../../../types/personFinder';
import { BrowserName } from '@chayns-components/core';
import { usePersonFinder } from '../../../PersonFinderProvider';
import { getDevice } from 'chayns-api';
import { getGroupName } from '../../../../utils/personFinder';
import { useClosestElementAbove } from '../../../../hooks/personFinder';
import PersonFinderGroup from './person-finder-group/PersonFinderGroup';
import PersonFinderHeader from './person-finder-header/PersonFinderHeader';

export type PersonFinderBodyProps = {
    onAdd: (id: string) => void;
    width: number;
    filterTypes?: PersonFinderFilterTypes[];
};

const PersonFinderBody = forwardRef<HTMLDivElement, PersonFinderBodyProps>(
    ({ onAdd, width, filterTypes }, ref) => {
        const { activeFilter, data } = usePersonFinder();

        const { browser } = getDevice();

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
                            entries={entries}
                            count={count}
                            search={searchString}
                            shouldShowGroupName={shouldShowGroupNames && index !== 0}
                        />
                    );
                }),
            [data, onAdd, shouldShowGroupNames],
        );

        return (
            <StyledMotionPersonFinderBody ref={ref} $width={width}>
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
            </StyledMotionPersonFinderBody>
        );
    },
);

PersonFinderBody.displayName = 'PersonFinderBody';

export default PersonFinderBody;
