import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    StyledFilterComboboxInline,
    StyledFilterComboboxInlineComboboxWrapper,
    StyledFilterComboboxInlineLabel,
    StyledFilterComboboxWrapper,
    StyledFilterContent,
    StyledFilterSort,
    StyledFilterSortText,
} from './FilterContent.styles';
import Input, { InputRef } from '../../input/Input';
import Icon from '../../icon/Icon';
import FilterButtons from '../../filter-buttons/FilterButtons';
import {
    CheckboxConfig,
    ComboboxConfig,
    FilterButtonConfig,
    SearchConfig,
    SortConfig,
} from '../../../types/filter';
import ComboBox from '../../combobox/ComboBox';
import Checkbox from '../../checkbox/Checkbox';
import { IComboBoxItem } from '../../combobox/ComboBox.types';
import { Textstring, TextstringProvider, ttsToITextString } from '@chayns-components/textstring';
import textStrings from '../../../constants/textStrings';

export type FilterContentProps = {
    searchConfig?: SearchConfig;
    filterButtonConfig?: FilterButtonConfig;
    sortConfig?: SortConfig;
    checkboxConfig?: CheckboxConfig;
    comboboxConfig?: ComboboxConfig;
    shouldAutoFocus: boolean;
};

const FilterContent: FC<FilterContentProps> = ({
    searchConfig,
    sortConfig,
    filterButtonConfig,
    checkboxConfig,
    comboboxConfig,
    shouldAutoFocus,
}) => {
    const sortTextRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<InputRef>(null);

    const [sortTextWidth, setSortTextWidth] = useState(0);

    const ts = textStrings.components.filter.filterContent;

    const handleSelectSortItem = useCallback(
        (item: IComboBoxItem | undefined) => {
            if (!item) {
                return;
            }

            const { text, value } = item;

            if (sortConfig) {
                sortConfig.onSortChange({ text, id: value });
            }
        },
        [sortConfig],
    );

    useEffect(() => {
        if (sortTextRef.current) {
            setSortTextWidth(sortTextRef.current.clientWidth + 20);
        }
    }, []);

    useEffect(() => {
        if (shouldAutoFocus) {
            searchRef.current?.focus();
        }
    }, [shouldAutoFocus]);

    return useMemo(
        () => (
            <TextstringProvider libraryName="@chayns-components-core">
                <StyledFilterContent>
                    {searchConfig && (
                        <Input
                            ref={searchRef}
                            onChange={(ev) => searchConfig.onSearchChange(ev.target.value)}
                            placeholder={
                                <Textstring textstring={ttsToITextString(ts.input.placeholder)} />
                            }
                            value={searchConfig.searchValue}
                            shouldShowClearIcon={searchConfig.searchValue.length > 0}
                            leftElement={<Icon icons={['fa fa-search']} />}
                        />
                    )}
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {filterButtonConfig && <FilterButtons {...filterButtonConfig} />}
                    {sortConfig && (
                        <StyledFilterSort>
                            <StyledFilterSortText ref={sortTextRef}>
                                <Textstring textstring={ttsToITextString(ts.sort)} />
                            </StyledFilterSortText>
                            <StyledFilterComboboxWrapper $textWidth={sortTextWidth}>
                                <ComboBox
                                    lists={[
                                        {
                                            list: sortConfig.items.map(({ text, id }) => ({
                                                text,
                                                value: id,
                                            })),
                                        },
                                    ]}
                                    placeholder=""
                                    selectedItem={{
                                        text: sortConfig.selectedItem.text,
                                        value: sortConfig.selectedItem.id,
                                    }}
                                    onSelect={handleSelectSortItem}
                                />
                            </StyledFilterComboboxWrapper>
                        </StyledFilterSort>
                    )}
                    {comboboxConfig && (
                        <StyledFilterComboboxInline>
                            <StyledFilterComboboxInlineLabel>
                                {comboboxConfig.label}
                            </StyledFilterComboboxInlineLabel>
                            <StyledFilterComboboxInlineComboboxWrapper>
                                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                                <ComboBox shouldUseCurrentItemWidth {...comboboxConfig} />
                            </StyledFilterComboboxInlineComboboxWrapper>
                        </StyledFilterComboboxInline>
                    )}
                    {checkboxConfig && (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <Checkbox {...checkboxConfig} />
                    )}
                </StyledFilterContent>
            </TextstringProvider>
        ),
        [
            checkboxConfig,
            comboboxConfig,
            filterButtonConfig,
            handleSelectSortItem,
            searchConfig,
            sortConfig,
            sortTextWidth,
            ts.input.placeholder,
            ts.sort,
        ],
    );
};

FilterContent.displayName = 'FilterContent';

export default FilterContent;
