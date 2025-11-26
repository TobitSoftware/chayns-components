import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    StyledFilter,
    StyledFilterContentWrapper,
    StyledFilterHead,
    StyledFilterHeadline,
    StyledFilterIcon,
    StyledFilterSearch,
    StyledMotionFilterBackground,
} from './Filter.styles';
import ExpandableContent from '../expandable-content/ExpandableContent';
import Icon from '../icon/Icon';
import FilterContent from './filter-content/FIlterContent';
import {
    FilterButtonConfig,
    FilterRef,
    FilterType,
    SearchConfig,
    SortConfig,
} from '../../types/filter';
import SearchInput from '../search-input/SearchInput';
import ContextMenu, { ContextMenuItem, ContextMenuRef } from '../context-menu/ContextMenu';

export type FilterProps = {
    headline: string;
    searchConfig?: SearchConfig;
    filterButtonConfig?: FilterButtonConfig;
    sortConfig?: SortConfig;
    onActiveChange: (isActive: boolean) => void;
};

const Filter = forwardRef<FilterRef, FilterProps>(
    ({ headline, searchConfig, sortConfig, filterButtonConfig, onActiveChange }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isSearchActive, setIsSearchActive] = useState(false);
        const [backgroundDistance, setBackgroundDistance] = useState(0);
        const [backgroundCoordinates, setBackgroundCoordinates] = useState({ top: 0, left: 0 });

        const contentRef = useRef<HTMLDivElement | null>(null);
        const iconRef = useRef<HTMLDivElement | null>(null);
        const filterRef = useRef<HTMLDivElement | null>(null);

        const contextMenuRef = useRef<ContextMenuRef>(null);

        const type = useMemo(() => {
            if (filterButtonConfig && !searchConfig && !sortConfig) {
                return FilterType.ONLY_FILTER;
            }

            if (!filterButtonConfig && !searchConfig && sortConfig) {
                return FilterType.ONLY_SORT;
            }

            if (!filterButtonConfig && searchConfig && !sortConfig) {
                return FilterType.ONLY_SEARCH;
            }

            return FilterType.MULTIPLE;
        }, [filterButtonConfig, searchConfig, sortConfig]);

        const icons = useMemo(() => {
            switch (type) {
                case FilterType.ONLY_FILTER:
                    return ['fa fa-filter'];
                case FilterType.ONLY_SORT:
                    return ['fa fa-arrow-up-arrow-down'];
                default:
                    return ['fa fa-search'];
            }
        }, [type]);

        useEffect(() => {
            if (typeof onActiveChange === 'function') {
                onActiveChange(isOpen);
            }
        }, [isOpen, onActiveChange]);

        const handleHide = useCallback(() => {
            setIsOpen(false);

            if (type === FilterType.ONLY_SORT && contextMenuRef.current) {
                contextMenuRef.current.hide();
            }

            if (type === FilterType.ONLY_SEARCH) {
                setIsSearchActive(false);
            }
        }, [type]);

        const handleShow = useCallback(() => {
            setIsOpen(true);

            if (type === FilterType.ONLY_SORT && contextMenuRef.current) {
                contextMenuRef.current.hide();
            }

            if (type === FilterType.ONLY_SEARCH) {
                setIsSearchActive(true);
            }
        }, [type]);

        useImperativeHandle(
            ref,
            () => ({
                hide: handleHide,
                show: handleShow,
            }),
            [handleHide, handleShow],
        );

        const handleIconClick = useCallback(() => {
            if (isOpen) {
                handleHide();
            } else {
                handleShow();
            }
        }, [handleHide, handleShow, isOpen]);

        useEffect(() => {
            if (headline && iconRef.current && contentRef.current && filterRef.current) {
                const iconRect = iconRef.current.getBoundingClientRect();
                const filterRect = filterRef.current.getBoundingClientRect();
                const contentRect = contentRef.current.getBoundingClientRect();

                const relativeTop = iconRect.bottom - filterRect.top;
                const relativeLeft = iconRect.left - filterRect.left;

                setBackgroundDistance(contentRect.top - iconRect.bottom);
                setBackgroundCoordinates({
                    top: relativeTop,
                    left: relativeLeft,
                });
            } else {
                setBackgroundDistance(0);
                setBackgroundCoordinates({ top: 0, left: 0 });
            }
        }, [headline]);

        const iconElement = useMemo(
            () => (
                <StyledFilterIcon onClick={handleIconClick} $isOpen={isOpen} ref={iconRef}>
                    <Icon icons={icons} size={18} />
                </StyledFilterIcon>
            ),
            [handleIconClick, icons, isOpen],
        );

        const backgroundElement = useMemo(
            () => (
                <StyledMotionFilterBackground
                    $top={backgroundCoordinates.top}
                    $left={backgroundCoordinates.left}
                    animate={{ height: isOpen ? `${backgroundDistance}px` : 0 }}
                    transition={{ duration: 0.1, delay: isOpen ? 0 : 0.2 }}
                />
            ),
            [backgroundDistance, isOpen, backgroundCoordinates],
        );

        const sortItems: ContextMenuItem[] = useMemo(() => {
            if (!sortConfig) {
                return [];
            }

            const { selectedItem, onSortChange } = sortConfig;

            return sortConfig.items.map(({ id, text }) => ({
                text,
                key: id.toString(),
                isSelected: id === selectedItem.id,
                icons: id === selectedItem.id ? ['fas fa-circle-small'] : [],
                onClick: () => onSortChange({ text, id }),
            }));
        }, [sortConfig]);

        return useMemo(
            () => (
                <StyledFilter ref={filterRef}>
                    <StyledFilterHead>
                        <StyledFilterHeadline isSearchActive={isSearchActive}>
                            {headline}
                        </StyledFilterHeadline>
                        {[FilterType.MULTIPLE, FilterType.ONLY_FILTER].includes(type) && (
                            <>
                                {iconElement}
                                {backgroundDistance > 0 && backgroundElement}
                            </>
                        )}
                        {type === FilterType.ONLY_SEARCH && searchConfig && (
                            <StyledFilterSearch>
                                <SearchInput
                                    onActiveChange={(isActive) => {
                                        setIsSearchActive(isActive);
                                        setIsOpen(isActive);
                                    }}
                                    isActive={isSearchActive}
                                    value={searchConfig.searchValue}
                                    onChange={(ev) => searchConfig.onSearchChange(ev.target.value)}
                                />
                            </StyledFilterSearch>
                        )}
                        {type === FilterType.ONLY_SORT && sortConfig && (
                            <ContextMenu ref={contextMenuRef} items={sortItems}>
                                {iconElement}
                            </ContextMenu>
                        )}
                    </StyledFilterHead>
                    {[FilterType.MULTIPLE, FilterType.ONLY_FILTER].includes(type) && (
                        <StyledFilterContentWrapper ref={contentRef}>
                            <ExpandableContent
                                isOpen={isOpen}
                                startDelay={backgroundDistance > 0 ? 0.1 : 0}
                            >
                                <FilterContent
                                    searchConfig={searchConfig}
                                    filterButtonConfig={filterButtonConfig}
                                    sortConfig={sortConfig}
                                />
                            </ExpandableContent>
                        </StyledFilterContentWrapper>
                    )}
                </StyledFilter>
            ),
            [
                isSearchActive,
                headline,
                type,
                iconElement,
                backgroundDistance,
                backgroundElement,
                searchConfig,
                sortConfig,
                sortItems,
                isOpen,
                filterButtonConfig,
            ],
        );
    },
);

Filter.displayName = 'Filter';

export default Filter;
