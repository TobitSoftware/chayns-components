import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    StyledFilter,
    StyledFilterHead,
    StyledFilterHeadline,
    StyledFilterIcon,
    StyledFilterSearch,
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
import Popup from '../popup/Popup';
import { PopupRef } from '../../types/popup';
import FilterPopupContent from './filter-popup-content/FilterPopupContent';
import SearchInput from '../search-input/SearchInput';

export type FilterProps = {
    headline: string;
    searchConfig?: SearchConfig;
    filterButtonConfig?: FilterButtonConfig;
    sortConfig?: SortConfig;
};

const Filter = forwardRef<FilterRef, FilterProps>(
    ({ headline, searchConfig, sortConfig, filterButtonConfig }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isSearchActive, setIsSearchActive] = useState(false);

        const popupRef = useRef<PopupRef>(null);

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

        const handleHide = useCallback(() => {
            setIsOpen(false);

            if (type === FilterType.ONLY_SORT && popupRef.current) {
                popupRef.current.hide();
            }

            if (type === FilterType.ONLY_SEARCH) {
                setIsSearchActive(false);
            }
        }, [type]);

        const handleShow = useCallback(() => {
            setIsOpen(true);

            if (type === FilterType.ONLY_SORT && popupRef.current) {
                popupRef.current.hide();
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

        const iconElement = useMemo(
            () => (
                <StyledFilterIcon onClick={handleIconClick}>
                    <Icon icons={icons} size={18} />
                </StyledFilterIcon>
            ),
            [handleIconClick, icons],
        );

        return useMemo(
            () => (
                <StyledFilter>
                    <StyledFilterHead>
                        <StyledFilterHeadline isSearchActive={isSearchActive}>
                            {headline}
                        </StyledFilterHeadline>
                        {[FilterType.MULTIPLE, FilterType.ONLY_FILTER].includes(type) &&
                            iconElement}
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
                            <Popup
                                content={<FilterPopupContent sortConfig={sortConfig} />}
                                ref={popupRef}
                            >
                                {iconElement}
                            </Popup>
                        )}
                    </StyledFilterHead>
                    {[FilterType.MULTIPLE, FilterType.ONLY_FILTER].includes(type) && (
                        <ExpandableContent isOpen={isOpen}>
                            <FilterContent
                                searchConfig={searchConfig}
                                filterButtonConfig={filterButtonConfig}
                                sortConfig={sortConfig}
                            />
                        </ExpandableContent>
                    )}
                </StyledFilter>
            ),
            [
                isSearchActive,
                headline,
                type,
                iconElement,
                sortConfig,
                isOpen,
                searchConfig,
                filterButtonConfig,
            ],
        );
    },
);

Filter.displayName = 'Filter';

export default Filter;
