import React, {
    forwardRef,
    isValidElement,
    ReactNode,
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
    StyledFilterHeadlineElement,
    StyledFilterIcon,
    StyledFilterIconWrapper,
    StyledFilterSearch,
    StyledMotionFilterBackground,
} from './Filter.styles';
import ExpandableContent from '../expandable-content/ExpandableContent';
import Icon from '../icon/Icon';
import FilterContent from './filter-content/FIlterContent';
import {
    CheckboxConfig,
    FilterButtonConfig,
    FilterRef,
    FilterType,
    SearchConfig,
    SortConfig,
} from '../../types/filter';
import SearchInput from '../search-input/SearchInput';
import ContextMenu from '../context-menu/ContextMenu';
import Checkbox from '../checkbox/Checkbox';
import { InputRef } from '../input/Input';
import type { ContextMenuItem, ContextMenuRef } from '../context-menu/ContextMenu.types';

export interface FilterRightIcon {
    icons: string[];
    onClick: VoidFunction;
}

//
export type FilterProps = {
    headline: ReactNode;
    searchConfig?: SearchConfig;
    filterButtonConfig?: FilterButtonConfig;
    sortConfig?: SortConfig;
    checkboxConfig?: CheckboxConfig;
    onActiveChange?: (isActive: boolean) => void;
    shouldShowRoundedHoverEffect?: boolean;
    rightIcons?: FilterRightIcon[];
    shouldAutoFocus?: boolean;
};

const Filter = forwardRef<FilterRef, FilterProps>(
    (
        {
            headline,
            searchConfig,
            sortConfig,
            shouldAutoFocus = false,
            shouldShowRoundedHoverEffect = false,
            filterButtonConfig,
            checkboxConfig,
            onActiveChange,
            rightIcons,
        },
        ref,
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isSearchActive, setIsSearchActive] = useState(false);
        const [shouldFocus, setShouldFocus] = useState(false);
        const [backgroundDistance, setBackgroundDistance] = useState(0);
        const [backgroundCoordinates, setBackgroundCoordinates] = useState({ top: 0, left: 0 });

        const contentRef = useRef<HTMLDivElement | null>(null);
        const iconRef = useRef<HTMLDivElement | null>(null);
        const filterRef = useRef<HTMLDivElement | null>(null);
        const searchRef = useRef<InputRef | null>(null);

        const contextMenuRef = useRef<ContextMenuRef>(null);

        const type = useMemo(() => {
            if (filterButtonConfig && !searchConfig && !sortConfig && !checkboxConfig) {
                return FilterType.ONLY_FILTER;
            }

            if (!filterButtonConfig && !searchConfig && sortConfig && !checkboxConfig) {
                return FilterType.ONLY_SORT;
            }

            if (!filterButtonConfig && searchConfig && !sortConfig && !checkboxConfig) {
                return FilterType.ONLY_SEARCH;
            }

            if (!filterButtonConfig && !searchConfig && !sortConfig && checkboxConfig) {
                return FilterType.ONLY_CHECKBOX;
            }

            return FilterType.MULTIPLE;
        }, [checkboxConfig, filterButtonConfig, searchConfig, sortConfig]);

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

        useEffect(() => {
            if (shouldFocus) {
                searchRef.current?.focus();

                window.setTimeout(() => {
                    setShouldFocus(false);
                }, 200);
            }
        }, [shouldFocus]);

        const handleShow = useCallback(() => {
            setIsOpen(true);

            if (shouldAutoFocus) {
                setShouldFocus(true);
            }

            if (type === FilterType.ONLY_SORT && contextMenuRef.current) {
                contextMenuRef.current.hide();
            }

            if (type === FilterType.ONLY_SEARCH) {
                setIsSearchActive(true);
            }
        }, [shouldAutoFocus, type]);

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
                <StyledFilterIcon
                    onClick={handleIconClick}
                    $isOpen={isOpen}
                    ref={iconRef}
                    $shouldShowRoundedHoverEffect={shouldShowRoundedHoverEffect}
                >
                    <Icon icons={icons} size={18} />
                </StyledFilterIcon>
            ),
            [handleIconClick, icons, isOpen, shouldShowRoundedHoverEffect],
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
                        {!isValidElement(headline) ? (
                            <StyledFilterHeadline $isSearchActive={isSearchActive}>
                                {headline}
                            </StyledFilterHeadline>
                        ) : (
                            <StyledFilterHeadlineElement $isSearchActive={isSearchActive}>
                                {headline}
                            </StyledFilterHeadlineElement>
                        )}
                        {[FilterType.MULTIPLE, FilterType.ONLY_FILTER].includes(type) && (
                            <>
                                <StyledFilterIconWrapper>
                                    {rightIcons &&
                                        rightIcons.map(({ icons: rIcons, onClick }) => (
                                            <StyledFilterIcon
                                                onClick={onClick}
                                                $isOpen={false}
                                                $shouldShowRoundedHoverEffect={
                                                    shouldShowRoundedHoverEffect
                                                }
                                            >
                                                <Icon icons={rIcons} size={18} />
                                            </StyledFilterIcon>
                                        ))}
                                    {iconElement}
                                </StyledFilterIconWrapper>
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
                                    ref={searchRef}
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
                        {type === FilterType.ONLY_CHECKBOX && checkboxConfig && (
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            <Checkbox {...checkboxConfig} />
                        )}
                    </StyledFilterHead>
                    {[FilterType.MULTIPLE, FilterType.ONLY_FILTER].includes(type) && (
                        <StyledFilterContentWrapper ref={contentRef}>
                            <ExpandableContent
                                isOpen={isOpen}
                                startDelay={backgroundDistance > 0 ? 0.1 : 0}
                            >
                                <FilterContent
                                    shouldAutoFocus={shouldFocus}
                                    searchConfig={searchConfig}
                                    filterButtonConfig={filterButtonConfig}
                                    sortConfig={sortConfig}
                                    checkboxConfig={checkboxConfig}
                                />
                            </ExpandableContent>
                        </StyledFilterContentWrapper>
                    )}
                </StyledFilter>
            ),
            [
                headline,
                isSearchActive,
                type,
                rightIcons,
                iconElement,
                backgroundDistance,
                backgroundElement,
                searchConfig,
                sortConfig,
                sortItems,
                checkboxConfig,
                isOpen,
                shouldFocus,
                filterButtonConfig,
                shouldShowRoundedHoverEffect,
            ],
        );
    },
);

Filter.displayName = 'Filter';

export default Filter;
