import type { Browser } from 'detect-browser';
import React, { FC, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { useElementSize } from '../../../hooks/useElementSize';
import type { IFilterButtonItem } from '../../../types/filterButtons';
import FilterButtons from '../../filter-buttons/FilterButtons';
import {
    StyledMotionSearchBoxBody,
    StyledMotionSearchBoxBodyContent,
    StyledSearchBoxBodyHead,
    StyledSearchBoxBodyHeadGroupName,
} from './SearchBoxBody.styles';

export type SearchBoxBodyProps = {
    children: ReactNode;
    currentGroupName: string;
    groups?: IFilterButtonItem[];
    height: number;
    width: number;
    browser: Browser | 'bot' | null | undefined;
    ref: RefObject<HTMLDivElement>;
    onGroupSelect?: (keys: string[]) => void;
};

const SearchBoxBody: FC<SearchBoxBodyProps> = ({
    currentGroupName,
    groups,
    width,
    browser,
    height,
    children,
    onGroupSelect,
    ref,
}) => {
    const headRef = useRef<HTMLDivElement>(null);

    const headSize = useElementSize(headRef);

    const headHeight = useMemo(
        () => (headSize?.height ? headSize.height + 15 : 0),
        [headSize?.height],
    );
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
                {groups && groups?.length > 1 && (
                    <StyledSearchBoxBodyHead ref={headRef}>
                        <FilterButtons
                            items={groups}
                            size={0}
                            onSelect={onGroupSelect}
                            // selectedItemIds={groups.map(({ id }) => id)}
                        />
                        <StyledSearchBoxBodyHeadGroupName>
                            {currentGroupName}
                        </StyledSearchBoxBodyHeadGroupName>
                    </StyledSearchBoxBodyHead>
                )}
                <StyledMotionSearchBoxBodyContent
                    $height={height}
                    $headHeight={headHeight}
                    key="content"
                    $browser={browser}
                    ref={ref}
                    tabIndex={0}
                >
                    {children}
                </StyledMotionSearchBoxBodyContent>
            </StyledMotionSearchBoxBody>
        ),
        [
            browser,
            children,
            currentGroupName,
            groups,
            headHeight,
            height,
            onGroupSelect,
            ref,
            width,
        ],
    );
};

SearchBoxBody.displayName = 'SearchBoxBody';

export default SearchBoxBody;
