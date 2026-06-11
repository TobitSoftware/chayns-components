import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import {
    StyledFilterContentControlWrapper,
    StyledFilterContentLabel,
    StyledFilterContentLabeledRow,
    StyledFilterContent,
} from './FilterContent.styles';
import Input, { InputRef } from '../../input/Input';
import Icon from '../../icon/Icon';
import FilterButtons from '../../filter-buttons/FilterButtons';
import ComboBox from '../../combobox/ComboBox';
import Checkbox from '../../checkbox/Checkbox';
import { Textstring, TextstringProvider, ttsToITextString } from '@chayns-components/textstring';
import textStrings from '../../../constants/textStrings';
import type { IComboBoxItem } from '../../combobox/ComboBox.types';
import type { FilterContentProps } from './FilterContent.types';
import { getSortComboBoxLists } from './FilterContent.utils';

const FilterContent: FC<FilterContentProps> = ({
    searchConfig,
    sortConfig,
    filterButtonConfig,
    checkboxConfig,
    comboboxConfig,
    shouldAutoFocus,
}) => {
    const searchRef = useRef<InputRef>(null);

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
                        <StyledFilterContentLabeledRow>
                            <StyledFilterContentLabel>
                                <Textstring textstring={ttsToITextString(ts.sort)} />
                            </StyledFilterContentLabel>
                            <StyledFilterContentControlWrapper>
                                <ComboBox
                                    lists={getSortComboBoxLists(sortConfig)}
                                    placeholder=""
                                    selectedItem={{
                                        text: sortConfig.selectedItem.text,
                                        value: sortConfig.selectedItem.id,
                                    }}
                                    onSelect={handleSelectSortItem}
                                />
                            </StyledFilterContentControlWrapper>
                        </StyledFilterContentLabeledRow>
                    )}
                    {comboboxConfig && (
                        <StyledFilterContentLabeledRow>
                            <StyledFilterContentLabel>
                                {comboboxConfig.label}
                            </StyledFilterContentLabel>
                            <StyledFilterContentControlWrapper>
                                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                                <ComboBox {...comboboxConfig} />
                            </StyledFilterContentControlWrapper>
                        </StyledFilterContentLabeledRow>
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
            ts.input.placeholder,
            ts.sort,
        ],
    );
};

FilterContent.displayName = 'FilterContent';

export default FilterContent;
