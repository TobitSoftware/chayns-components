import type { Browser } from 'detect-browser';
import React, {
    forwardRef,
    UIEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { useElementSize } from '../../../hooks/useElementSize';
import { useUuid } from '../../../hooks/uuid';
import type { IFilterButtonItem } from '../../../types/filterButtons';
import { getCurrentGroupName } from '../../../utils/searchBox';
import FilterButtons from '../../filter-buttons/FilterButtons';
import {
    StyledMotionSearchBoxBody,
    StyledSearchBoxBodyContent,
    StyledSearchBoxBodyHead,
    StyledSearchBoxBodyHeadGroupName,
} from './SearchBoxBody.styles';

export type SearchBoxBodyProps = {
    children: ReactNode;
    filterbuttons?: IFilterButtonItem[];
    selectedGroups?: string[];
    height: number;
    width: number;
    browser: Browser | 'bot' | null | undefined;
    onGroupSelect?: (keys: string[]) => void;
    coordinates: { x: number; y: number };
};

const SearchBoxBody = forwardRef<HTMLDivElement, SearchBoxBodyProps>(
    (
        {
            filterbuttons,
            coordinates,
            selectedGroups,
            width,
            browser,
            height,
            children,
            onGroupSelect,
        },
        ref,
    ) => {
        const [hasScrolled, setHasScrolled] = useState(false);
        const [currentGroupName, setCurrentGroupName] = useState('');

        const headRef = useRef<HTMLDivElement>(null);

        const headSize = useElementSize(headRef);

        const uuid = useUuid();

        const headHeight = useMemo(
            () => (headSize?.height ? headSize.height + 15 : 0),
            [headSize?.height],
        );

        useEffect(() => {
            const element = document.getElementById(`searchbox-content__${uuid}`);

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
                <StyledMotionSearchBoxBody
                    ref={ref}
                    $width={width}
                    style={{ left: coordinates.x, top: coordinates.y }}
                    initial={{ height: 0, opacity: 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    animate={{ height: 'fit-content', opacity: 1 }}
                    transition={{
                        duration: 0.2,
                        type: 'tween',
                    }}
                >
                    {filterbuttons && filterbuttons?.length > 1 && (
                        <StyledSearchBoxBodyHead
                            ref={headRef}
                            $hasScrolled={hasScrolled}
                            $hasGroupName={!!currentGroupName}
                        >
                            <FilterButtons
                                items={filterbuttons}
                                size={0}
                                onSelect={onGroupSelect}
                                selectedItemIds={selectedGroups}
                            />
                            <StyledSearchBoxBodyHeadGroupName>
                                {currentGroupName}
                            </StyledSearchBoxBodyHeadGroupName>
                        </StyledSearchBoxBodyHead>
                    )}
                    <StyledSearchBoxBodyContent
                        $height={height}
                        $headHeight={headHeight}
                        key="content"
                        id={`searchbox-content__${uuid}`}
                        $browser={browser}
                        tabIndex={0}
                        onScroll={handleScroll}
                    >
                        {children}
                    </StyledSearchBoxBodyContent>
                </StyledMotionSearchBoxBody>
            ),
            [
                browser,
                children,
                coordinates.x,
                coordinates.y,
                currentGroupName,
                filterbuttons,
                handleScroll,
                hasScrolled,
                headHeight,
                height,
                onGroupSelect,
                ref,
                selectedGroups,
                uuid,
                width,
            ],
        );
    },
);

SearchBoxBody.displayName = 'SearchBoxBody';

export default SearchBoxBody;
