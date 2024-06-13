import type { Browser } from 'detect-browser';
import React, {
    forwardRef,
    UIEvent,
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
};

const SearchBoxBody = forwardRef<HTMLDivElement, SearchBoxBodyProps>(
    ({ filterbuttons, selectedGroups, width, browser, height, children, onGroupSelect }, ref) => {
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

            if (element) {
                setCurrentGroupName(getCurrentGroupName(element));
            }
        }, [uuid, children]);

        const handleScroll = (event: UIEvent) => {
            const { scrollTop } = event.target as HTMLDivElement;

            setHasScrolled(scrollTop > 1);
            setCurrentGroupName(getCurrentGroupName(event.target as HTMLDivElement));
        };

        return useMemo(
            () => (
                <StyledMotionSearchBoxBody
                    $width={width}
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
                        ref={ref}
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
                currentGroupName,
                filterbuttons,
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
