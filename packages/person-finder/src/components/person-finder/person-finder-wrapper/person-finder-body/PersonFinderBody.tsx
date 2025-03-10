import React, { forwardRef, UIEvent, useMemo, useRef, useState } from 'react';
import {
    StyledMotionPersonFinderBody,
    StyledPersonFinderBodyContent,
    StyledPersonFinderBodyContentButtonWrapper,
    StyledPersonFinderBodyContentGroupName,
    StyledPersonFinderBodyHeader,
    StyledPersonFinderBodyHeaderFilter,
    StyledPersonFinderBodyHeaderGroupName,
} from './PersonFinderBody.styles';
import { PersonFinderFilterTypes } from '../../../../types/personFinder';
import {
    BrowserName,
    Button,
    FilterButtons,
    FilterButtonSize,
    List,
} from '@chayns-components/core';
import { usePersonFinder } from '../../../PersonFinderProvider';
import { IFilterButtonItem } from '@chayns-components/core/lib/types/types/filterButtons';
import PersonFinderItem from './person-finder-item/PersonFinderItem';
import { getDevice } from 'chayns-api';
import { getGroupName } from '../../../../utils/personFinder';
import { useClosestElementAbove } from '../../../../hooks/personFinder';

export type PersonFinderBodyProps = {
    onAdd: (id: string) => void;
    width: number;
    filterTypes?: PersonFinderFilterTypes[];
};

const PersonFinderBody = forwardRef<HTMLDivElement, PersonFinderBodyProps>(
    ({ onAdd, width, filterTypes }, ref) => {
        const { activeFilter, updateActiveFilter, data } = usePersonFinder();

        const { browser } = getDevice();

        const [isScrollTop, setIsScrollTop] = useState(true);

        const contentRef = useRef<HTMLDivElement>(null);

        const currentGroupName = useClosestElementAbove(contentRef, 'person-finder-group-name');

        const shouldShowGroupNames = (activeFilter?.length ?? 0) !== 1;

        const defaultGroupName = getGroupName(Object.keys(data ?? {})[0] ?? '');

        const handleFilterSelect = (keys: string[]) => {
            if (typeof updateActiveFilter === 'function') {
                updateActiveFilter(keys as PersonFinderFilterTypes[]);
            }
        };

        const handleContentScroll = (event: UIEvent<HTMLDivElement>) => {
            setIsScrollTop((event.target as HTMLElement).scrollTop === 0);
        };

        const handleLoadMore = (key: string) => {};

        const filter: IFilterButtonItem[] = Object.values(filterTypes ?? {}).map((type) => ({
            id: type,
            text: type.replace(/_/g, ' '),
        }));

        const content = useMemo(
            () =>
                Object.entries(data ?? {}).map(([key, entries], index) => (
                    <div key={`person-finder-group--${key}`}>
                        {shouldShowGroupNames && index !== 0 && (
                            <StyledPersonFinderBodyContentGroupName className="person-finder-group-name">
                                {getGroupName(key)}
                            </StyledPersonFinderBodyContentGroupName>
                        )}
                        <List>
                            {entries.map((entry) => (
                                <PersonFinderItem
                                    key={`person-finder-entry--${entry.id}`}
                                    entry={entry}
                                    onAdd={onAdd}
                                />
                            ))}
                        </List>
                        <StyledPersonFinderBodyContentButtonWrapper>
                            <Button onClick={() => handleLoadMore(key)}>
                                Mehr {getGroupName(key)}
                            </Button>
                        </StyledPersonFinderBodyContentButtonWrapper>
                    </div>
                )),
            [data, onAdd, shouldShowGroupNames],
        );

        return (
            <StyledMotionPersonFinderBody ref={ref} $width={width}>
                {filter.length > 1 && (
                    <StyledPersonFinderBodyHeader $isScrollTop={isScrollTop}>
                        <StyledPersonFinderBodyHeaderFilter>
                            <FilterButtons
                                size={FilterButtonSize.Small}
                                items={filter}
                                onSelect={handleFilterSelect}
                                selectedItemIds={activeFilter}
                            />
                        </StyledPersonFinderBodyHeaderFilter>
                        {shouldShowGroupNames && (
                            <StyledPersonFinderBodyHeaderGroupName>
                                {currentGroupName ?? defaultGroupName}
                            </StyledPersonFinderBodyHeaderGroupName>
                        )}
                    </StyledPersonFinderBodyHeader>
                )}
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
