import React, { forwardRef, UIEvent, useMemo, useRef, useState } from 'react';
import { StyledPersonFinderBody, StyledPersonFinderBodyContent } from './PersonFinderBody.styles';
import { PersonFinderFilterTypes } from '../../../../types/personFinder';
import { usePersonFinder } from '../../../PersonFinderProvider';
import { getGroupName } from '../../../../utils/personFinder';
import { useClosestElementAbove } from '../../../../hooks/personFinder';
import PersonFinderGroup from './person-finder-group/PersonFinderGroup';
import PersonFinderHeader from './person-finder-header/PersonFinderHeader';
import { StyledPersonFinderGroupErrorMessage } from './person-finder-group/PersonFinderGroup.styles';
import { getPersonFinderTextstringValue } from '../../../../utils/personFinder';
import textStrings from '../../../../constants/textStrings';

export type PersonFinderBodyProps = {
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    filterTypes?: PersonFinderFilterTypes[];
    shouldRenderInline?: boolean;
    shouldEnableKeyboardHighlighting?: boolean;
};

const PersonFinderBody = forwardRef<HTMLDivElement, PersonFinderBodyProps>(
    (
        { onAdd, filterTypes, onRemove, shouldRenderInline, shouldEnableKeyboardHighlighting },
        ref,
    ) => {
        const { activeFilter, data, search } = usePersonFinder();

        const [isScrollTop, setIsScrollTop] = useState(true);

        const contentRef = useRef<HTMLDivElement>(null);

        const currentGroupName = useClosestElementAbove(contentRef, 'person-finder-group-name');

        const shouldShowGroupNames = (activeFilter?.length ?? 0) !== 1;

        const defaultGroupName = getGroupName(Object.keys(data ?? {})[0] ?? '');
        const activeFilters = activeFilter?.length ? activeFilter : (filterTypes ?? []);
        const shouldShowSingleMinSearchLengthMessage =
            search !== undefined &&
            search.length <= 2 &&
            activeFilters.length > 1 &&
            activeFilters.every((filter) => !data?.[filter]?.entries.length);

        const handleContentScroll = (event: UIEvent<HTMLDivElement>) => {
            setIsScrollTop((event.target as HTMLElement).scrollTop === 0);
        };

        const content = useMemo(
            () =>
                Object.entries(data ?? {}).map(([key, singleData], index) => {
                    const { count, entries } = singleData;

                    return (
                        <PersonFinderGroup
                            key={`person-finder-group--${key}`}
                            filterKey={key as PersonFinderFilterTypes}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            entries={entries}
                            count={count}
                            shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                            shouldShowGroupName={shouldShowGroupNames && index !== 0}
                        />
                    );
                }),
            [data, onAdd, onRemove, shouldShowGroupNames],
        );

        const contentToRender = shouldShowSingleMinSearchLengthMessage ? (
            <StyledPersonFinderGroupErrorMessage>
                {getPersonFinderTextstringValue({
                    textstring:
                        textStrings.components.personFinder.wrapper.body.group.errorMessage
                            .minSearchLength,
                })}
            </StyledPersonFinderGroupErrorMessage>
        ) : (
            content
        );

        return (
            <StyledPersonFinderBody ref={ref} $shouldRenderInline={shouldRenderInline}>
                {!shouldShowSingleMinSearchLengthMessage && (
                    <PersonFinderHeader
                        currentGroupName={currentGroupName}
                        defaultGroupName={defaultGroupName}
                        filterTypes={filterTypes}
                        shouldShowGroupNames={shouldShowGroupNames}
                        shouldShowShadow={!isScrollTop && !shouldRenderInline}
                        shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                    />
                )}
                <StyledPersonFinderBodyContent
                    ref={contentRef}
                    className="chayns-scrollbar"
                    onScroll={handleContentScroll}
                >
                    {contentToRender}
                </StyledPersonFinderBodyContent>
            </StyledPersonFinderBody>
        );
    },
);

PersonFinderBody.displayName = 'PersonFinderBody';

export default PersonFinderBody;
