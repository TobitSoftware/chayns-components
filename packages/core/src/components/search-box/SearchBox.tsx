import React, {
    ChangeEventHandler,
    Context,
    FC,
    FocusEventHandler,
    forwardRef,
    KeyboardEventHandler,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import { useTheme } from 'styled-components';
import type { ISearchBoxItem, ISearchBoxItems } from '../../types/searchBox';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import Icon from '../icon/Icon';
import type { TagInputProps } from '../tag-input/TagInput';
import type { DropdownDirection } from '../../types/dropdown';
import Finder from '../finder/Finder';
import { FinderContext, FinderRef, InputType } from '../finder/Finder.types';
import { getFinderProviderType } from '../finder/Finder.utils';
import SearchBoxProvider, {
    SearchBoxContext,
    SearchBoxEntry,
    SearchBoxLeftElement,
    SearchBoxProviderProps,
} from './SearchBox.context';
import { StyledSearchBoxIcon } from './SearchBox.styles';

export interface SearchBoxRef {
    clear: VoidFunction;
}

export interface TagInputSettings {
    onAdd?: TagInputProps['onAdd'];
    onRemove?: TagInputProps['onRemove'];
    shouldAllowMultiple?: TagInputProps['shouldAllowMultiple'];
    tags?: TagInputProps['tags'];
}

export type SearchBoxProps = {
    /**
     * The element where the content of the `ComboBox` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * An optional callback function to filter the elements to be displayed
     */
    customFilter?: (item: ISearchBoxItem) => boolean;
    /**
     * The direction in which the dropdown should be displayed. By default, it is displayed below the input.
     */
    dropdownDirection?: DropdownDirection;
    /**
     * If true, the input field is marked as invalid
     */
    isInvalid?: boolean;
    /**
     * An optional icon that is displayed inside the left side of the input.
     */
    leftIcons?: string[];
    /**
     * List of groups with items that can be searched. It is possible to give only one list; if multiple lists are provided, the 'group name' parameter becomes mandatory.
     */
    lists: ISearchBoxItems[];
    /**
     * Function to be executed when the input lost focus.
     */
    onBlur?: FocusEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when the input is changed.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when a letter is pressed
     */
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    /**
     * Function to be executed when an item is selected.
     */
    onSelect?: (item: ISearchBoxItem) => void;
    /**
     * The placeholder that should be displayed.
     */
    placeholder?: string;
    /**
     * Set an input for the search box - it is not an item of a list, just a string.
     */
    presetValue?: string;
    /**
     * Control the selected item. If you use this prop, make sure to update it when the user selects an item.
     */
    selectedId?: string;
    /**
     * If true, the value in the Input is displayed in the list.
     */
    shouldAddInputToList: boolean;
    /**
     * If true, the filter buttons are hidden.
     */
    shouldHideFilterButtons?: boolean;
    /**
     * Whether the full list of items should be displayed if the input is empty.
     */
    shouldShowContentOnEmptyInput?: boolean;
    /**
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
    /**
     * Whether the icon to open and close the list should be displayed.
     */
    shouldShowToggleIcon?: boolean;
    /**
     * Settings for the TagInput.
     */
    tagInputSettings?: TagInputSettings;
    /**
     * A text that should be displayed if no results are found.
     */
    hintText?: string;
};

const SearchBox: FC<SearchBoxProps> = forwardRef<SearchBoxRef, SearchBoxProps>(
    (
        {
            container,
            customFilter,
            dropdownDirection,
            isInvalid = false,
            leftIcons,
            lists,
            onBlur,
            onChange,
            onKeyDown,
            onSelect,
            placeholder,
            presetValue,
            hintText,
            selectedId,
            shouldAddInputToList = true,
            shouldHideFilterButtons = false,
            shouldShowContentOnEmptyInput = true,
            shouldShowRoundImage,
            shouldShowToggleIcon = false,
            tagInputSettings,
        },
        ref,
    ) => {
        const finderRef = useRef<FinderRef>(null);

        const theme = useTheme() as Theme;

        const rightElement = useMemo(() => {
            if (!shouldShowToggleIcon) {
                return undefined;
            }

            return (
                <StyledSearchBoxIcon>
                    <Icon icons={['fa fa-chevron-down']} color={theme['006'] as string} />
                </StyledSearchBoxIcon>
            );
        }, [shouldShowToggleIcon, theme]);

        useImperativeHandle(
            ref,
            () => ({
                clear: () => finderRef.current?.clearInput(),
            }),
            [],
        );

        const provider = useMemo(
            () => (
                <SearchBoxProvider
                    customFilter={customFilter}
                    hintText={hintText}
                    leftIcons={leftIcons}
                    lists={lists}
                    onSelect={onSelect}
                    presetValue={presetValue}
                    selectedId={selectedId}
                    shouldAddInputToList={shouldAddInputToList}
                    shouldHideFilterButtons={shouldHideFilterButtons}
                    shouldShowContentOnEmptyInput={shouldShowContentOnEmptyInput}
                    shouldShowRoundImage={shouldShowRoundImage}
                    tagInputSettings={tagInputSettings}
                />
            ),
            [
                customFilter,
                hintText,
                leftIcons,
                lists,
                onSelect,
                presetValue,
                selectedId,
                shouldAddInputToList,
                shouldHideFilterButtons,
                shouldShowContentOnEmptyInput,
                shouldShowRoundImage,
                tagInputSettings,
            ],
        );

        return (
            <Finder<SearchBoxEntry, SearchBoxProviderProps>
                Context={
                    SearchBoxContext as unknown as Context<FinderContext<SearchBoxEntry> | null>
                }
                Provider={getFinderProviderType(provider)}
                container={container}
                dropdownDirection={dropdownDirection}
                inputType={tagInputSettings ? InputType.TagInput : InputType.Input}
                isInvalid={isInvalid}
                leftElement={<SearchBoxLeftElement leftIcons={leftIcons} />}
                onInputBlur={onBlur}
                onInputChange={onChange}
                onInputKeyDown={onKeyDown}
                onTagAdd={tagInputSettings?.onAdd}
                placeholder={placeholder}
                ref={finderRef}
                rightElement={rightElement}
                shouldAllowMultiple={tagInputSettings?.shouldAllowMultiple}
                shouldToggleOnRightElementClick={shouldShowToggleIcon}
            />
        );
    },
);

SearchBox.displayName = 'SearchBox';

export default SearchBox;
