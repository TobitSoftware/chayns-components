import React, {
    forwardRef,
    type MouseEventHandler,
    type ReactNode,
    useCallback,
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
        const [currentGroupName, setCurrentGroupName] = useState('');

        const headRef = useRef<HTMLDivElement | null>(null);
        const contentRef = useRef<HTMLDivElement | null>(null);

        const headSize = useElementSize(headRef);

        const uuid = useUuid();

        const headHeight = headSize?.height ? headSize.height + 15 : 0;

        const shouldShowGroupName =
            (selectedGroups?.length === 1 && selectedGroups[0] === 'all') ||
            selectedGroups?.length !== 1;

        const updateCurrentGroupName = useCallback(() => {
            const element = contentRef.current;

            if (element && shouldShowGroupName) {
                setCurrentGroupName(getCurrentGroupName(element));
                return;
            }

            setCurrentGroupName('');
        }, [shouldShowGroupName]);

        const handlePreventDefault: MouseEventHandler<HTMLDivElement> = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const handleScroll = useCallback(
            (event: React.UIEvent<HTMLDivElement>) => {
                const { scrollTop } = event.currentTarget;

                setHasScrolled(scrollTop > 1);

                if (shouldShowGroupName) {
                    setCurrentGroupName(getCurrentGroupName(event.currentTarget));
                }
            },
            [shouldShowGroupName],
        );

        const handleContentRef = useCallback(
            (node: HTMLDivElement | null) => {
                contentRef.current = node;
                updateCurrentGroupName();
            },
            [updateCurrentGroupName],
        );

        return (
            <StyledSearchBoxBody
                onClick={handlePreventDefault}
                ref={ref}
                inert={!shouldShow ? 'true' : undefined}
            >
                {filterButtons && filterButtons?.length > 1 && (
                    <StyledSearchBoxBodyHead
                        ref={headRef}
                        $hasScrolled={hasScrolled}
                        $hasGroupName={!!currentGroupName}
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
                            {currentGroupName.replace('_', '')}
                        </StyledSearchBoxBodyHeadGroupName>
                    </StyledSearchBoxBodyHead>
                )}
                <StyledSearchBoxBodyContent
                    $height={height}
                    $headHeight={headHeight}
                    key="content"
                    id={`searchBoxContent__${uuid}`}
                    ref={handleContentRef}
                    className="chayns-scrollbar"
                    tabIndex={0}
                    onScroll={handleScroll}
                >
                    {children}
                </StyledSearchBoxBodyContent>
            </StyledSearchBoxBody>
        );
    },
);

SearchBoxBody.displayName = 'SearchBoxBody';

export default SearchBoxBody;
