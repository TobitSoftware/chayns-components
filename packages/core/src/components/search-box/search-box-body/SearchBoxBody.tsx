import React, {
    forwardRef,
    MouseEvent,
    UIEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
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
import { useDevice } from 'chayns-api';
import { BrowserName } from '../../../types/chayns';

export type SearchBoxBodyProps = {
    children: ReactNode;
    filterButtons?: IFilterButtonItem[];
    selectedGroups?: string[];
    height: number;
    onGroupSelect?: (keys: string[]) => void;
    shouldHideFilterButtons?: boolean;
};

const SearchBoxBody = forwardRef<HTMLDivElement, SearchBoxBodyProps>(
    (
        { filterButtons, selectedGroups, height, children, onGroupSelect, shouldHideFilterButtons },
        ref,
    ) => {
        const [hasScrolled, setHasScrolled] = useState(false);
        const [currentGroupName, setCurrentGroupName] = useState('');

        const headRef = useRef<HTMLDivElement>(null);

        const { browser } = useDevice();

        const headSize = useElementSize(headRef);

        const uuid = useUuid();

        const headHeight = useMemo(
            () => (headSize?.height ? headSize.height + 15 : 0),
            [headSize?.height],
        );

        useEffect(() => {
            const element = document.getElementById(`searchBoxContent__${uuid}`);

            if (
                element &&
                ((selectedGroups?.length === 1 && selectedGroups[0] === 'all') ||
                    selectedGroups?.length !== 1)
            ) {
                setCurrentGroupName(getCurrentGroupName(element));
            } else {
                setCurrentGroupName('');
            }
        }, [uuid, children, selectedGroups]);

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
                <StyledSearchBoxBody onClick={handlePreventDefault} ref={ref}>
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
                        $browser={(browser as { name: BrowserName })?.name}
                        tabIndex={0}
                        onScroll={handleScroll}
                    >
                        {children}
                    </StyledSearchBoxBodyContent>
                </StyledSearchBoxBody>
            ),
            [
                browser,
                children,
                currentGroupName,
                filterButtons,
                handleScroll,
                hasScrolled,
                headHeight,
                height,
                onGroupSelect,
                ref,
                selectedGroups,
                shouldHideFilterButtons,
                uuid,
            ],
        );
    },
);

SearchBoxBody.displayName = 'SearchBoxBody';

export default SearchBoxBody;
