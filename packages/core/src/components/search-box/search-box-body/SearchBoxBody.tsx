import React, {
    forwardRef,
    MouseEvent,
    type ReactNode,
    UIEvent,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useElementSize } from '../../../hooks/element';
import { useUuid } from '../../../hooks/uuid';
import type { IFilterButtonItem } from '../../../types/filterButtons';
import { getCurrentGroupName } from '../../../utils/searchBox';
import FilterButtons from '../../filter-buttons/FilterButtons';
import {
    StyledSearchBoxBody,
    StyledSearchBoxBodyContent,
    StyledSearchBoxBodyHead,
    StyledSearchBoxBodyHeadGroupName,
} from './SearchBoxBody.styles';

export type SearchBoxBodyProps = {
    children: ReactNode;
    filterButtons?: IFilterButtonItem[];
    selectedGroups?: string[];
    height: number;
    onGroupSelect?: (keys: string[]) => void;
    shouldHideFilterButtons?: boolean;
    shouldShow: boolean;
};

const SearchBoxBody = forwardRef<HTMLDivElement, SearchBoxBodyProps>(
    (
        {
            filterButtons,
            selectedGroups,
            height,
            children,
            shouldShow,
            onGroupSelect,
            shouldHideFilterButtons,
        },
        ref,
    ) => {
        const [hasScrolled, setHasScrolled] = useState(false);
        const [currentGroupName, setCurrentGroupName] = useState<string>();

        const headRef = useRef<HTMLDivElement>(null);

        const headSize = useElementSize(headRef);

        const uuid = useUuid();

        const headHeight = useMemo(
            () => (headSize?.height ? headSize.height + 15 : 0),
            [headSize?.height],
        );

        const derivedGroupName = useMemo(() => {
            const element = document.getElementById(`searchBoxContent__${uuid}`);

            if (
                element &&
                ((selectedGroups?.length === 1 && selectedGroups[0] === 'all') ||
                    selectedGroups?.length !== 1)
            ) {
                return getCurrentGroupName(element);
            }
            return '';
        }, [selectedGroups, uuid]);

        const handlePreventDefault = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const handleScroll = useCallback(
            (event: UIEvent) => {
                const { scrollTop } = event.target as HTMLDivElement;

                setHasScrolled(scrollTop > 1);

                if (
                    (selectedGroups?.length === 1 && selectedGroups[0] === 'all') ||
                    selectedGroups?.length !== 1
                ) {
                    setCurrentGroupName(getCurrentGroupName(event.target as HTMLDivElement));
                }
            },
            [selectedGroups],
        );

        return useMemo(
            () => (
                <StyledSearchBoxBody
                    onClick={handlePreventDefault}
                    ref={ref}
                    inert={!shouldShow ? 'true' : undefined}
                >
                    {filterButtons && filterButtons?.length > 1 && (
                        <StyledSearchBoxBodyHead
                            ref={headRef}
                            $hasScrolled={hasScrolled}
                            $hasGroupName={!!(currentGroupName ?? derivedGroupName)}
                        >
                            {!shouldHideFilterButtons && (
                                <FilterButtons
                                    items={filterButtons}
                                    size={0}
                                    onSelect={onGroupSelect}
                                    selectedItemIds={selectedGroups}
                                />
                            )}
                            <StyledSearchBoxBodyHeadGroupName>
                                {(currentGroupName ?? derivedGroupName).replace('_', '')}
                            </StyledSearchBoxBodyHeadGroupName>
                        </StyledSearchBoxBodyHead>
                    )}
                    <StyledSearchBoxBodyContent
                        $height={height}
                        $headHeight={headHeight}
                        key="content"
                        id={`searchBoxContent__${uuid}`}
                        className="chayns-scrollbar"
                        tabIndex={0}
                        onScroll={handleScroll}
                    >
                        {children}
                    </StyledSearchBoxBodyContent>
                </StyledSearchBoxBody>
            ),
            [
                children,
                currentGroupName,
                derivedGroupName,
                filterButtons,
                handleScroll,
                hasScrolled,
                headHeight,
                height,
                onGroupSelect,
                ref,
                selectedGroups,
                shouldHideFilterButtons,
                shouldShow,
                uuid,
            ],
        );
    },
);

SearchBoxBody.displayName = 'SearchBoxBody';

export default SearchBoxBody;
