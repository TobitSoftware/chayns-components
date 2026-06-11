import type { ChaynsReactFunctions, ChaynsReactValues } from 'chayns-api';
import { calculateMaxComboBoxItemWidth } from '../../utils/calculate';
import type { IComboBoxItem, IComboBoxItems } from './ComboBox.types';
import {
    COMBO_BOX_ACTION_ICON_WIDTH_PX,
    COMBO_BOX_CLEAR_ICON_WIDTH_PX,
    COMBO_BOX_DROPDOWN_HORIZONTAL_PADDING_PX,
    COMBO_BOX_PREFIX_GAP_PX,
    COMBO_BOX_PREFIX_MIN_WIDTH_PX,
    COMBO_BOX_HEADER_HORIZONTAL_PADDING_PX,
    COMBO_BOX_HEADER_BORDER_WIDTH_PX,
    COMBO_BOX_ROUNDING_BUFFER_PX,
} from './ComboBox.constants';

export type ComboBoxWidthOptions = {
    functions: ChaynsReactFunctions;
    internalSelectedItem?: IComboBoxItem;
    lists: IComboBoxItems[];
    parentWidth: number;
    placeholder: string;
    prefix?: string;
    prefixMinWidth?: number;
    selectedItem?: IComboBoxItem;
    shouldDropDownUseMaxItemWidth?: boolean;
    shouldShowBigImage?: boolean;
    shouldShowClearIcon?: boolean;
    shouldUseCurrentItemWidth?: boolean;
    shouldUseFullWidth?: boolean;
    values: ChaynsReactValues;
};

export type ComboBoxWidthResult = {
    minWidth?: number;
    bodyMinWidth: number;
};

const getPrefixWidth = (
    prefix: ComboBoxWidthOptions['prefix'],
    prefixMinWidth: ComboBoxWidthOptions['prefixMinWidth'],
    functions: ChaynsReactFunctions,
    values: ChaynsReactValues,
) => {
    if (!prefix) {
        return 0;
    }

    const prefixTextWidth = calculateMaxComboBoxItemWidth({
        list: [{ text: prefix, value: 'prefix' }],
        functions,
        values,
    });

    return Math.max(
        prefixTextWidth + COMBO_BOX_PREFIX_GAP_PX,
        prefixMinWidth ?? COMBO_BOX_PREFIX_MIN_WIDTH_PX,
    );
};

const clampToParentWidth = (width: number, parentWidth: number) =>
    parentWidth > 0 ? Math.min(width, parentWidth) : width;

export const getComboBoxWidthResult = ({
    functions,
    internalSelectedItem,
    lists,
    parentWidth,
    placeholder,
    prefix,
    prefixMinWidth,
    selectedItem,
    shouldDropDownUseMaxItemWidth,
    shouldShowBigImage,
    shouldShowClearIcon,
    shouldUseCurrentItemWidth,
    shouldUseFullWidth,
    values,
}: ComboBoxWidthOptions): ComboBoxWidthResult => {
    const allItems = lists.flatMap((list) => list.list);
    const effectiveSelectedItem = selectedItem ?? internalSelectedItem;

    const maxItemWidth = calculateMaxComboBoxItemWidth({
        list: [
            ...allItems,
            { text: placeholder, value: 'placeholder' },
            ...(effectiveSelectedItem ? [effectiveSelectedItem] : []),
        ],
        functions,
        shouldShowBigImage,
        values,
    });

    const prefixWidth = getPrefixWidth(prefix, prefixMinWidth, functions, values);
    const triggerWidthBase =
        maxItemWidth +
        COMBO_BOX_HEADER_HORIZONTAL_PADDING_PX +
        COMBO_BOX_HEADER_BORDER_WIDTH_PX +
        COMBO_BOX_ACTION_ICON_WIDTH_PX +
        (shouldShowClearIcon ? COMBO_BOX_CLEAR_ICON_WIDTH_PX : 0) +
        COMBO_BOX_ROUNDING_BUFFER_PX +
        prefixWidth;

    const desiredBodyMinWidth = maxItemWidth + COMBO_BOX_DROPDOWN_HORIZONTAL_PADDING_PX;

    if (shouldDropDownUseMaxItemWidth) {
        const width = clampToParentWidth(desiredBodyMinWidth, parentWidth);

        return {
            minWidth: width,
            bodyMinWidth: width,
        };
    }

    if (shouldUseFullWidth) {
        const width = clampToParentWidth(parentWidth, parentWidth);

        return {
            minWidth: width,
            bodyMinWidth: clampToParentWidth(Math.max(desiredBodyMinWidth, width), parentWidth),
        };
    }

    if (shouldUseCurrentItemWidth && effectiveSelectedItem) {
        const selectedItemWidth = calculateMaxComboBoxItemWidth({
            list: [effectiveSelectedItem],
            functions,
            shouldShowBigImage,
            values,
        });

        const width = clampToParentWidth(
            selectedItemWidth +
                COMBO_BOX_HEADER_HORIZONTAL_PADDING_PX +
                COMBO_BOX_HEADER_BORDER_WIDTH_PX +
                COMBO_BOX_ACTION_ICON_WIDTH_PX +
                (shouldShowClearIcon ? COMBO_BOX_CLEAR_ICON_WIDTH_PX : 0) +
                COMBO_BOX_ROUNDING_BUFFER_PX +
                prefixWidth,
            parentWidth,
        );

        return {
            minWidth: width,
            bodyMinWidth: clampToParentWidth(Math.max(desiredBodyMinWidth, width), parentWidth),
        };
    }

    const width = clampToParentWidth(triggerWidthBase, parentWidth);

    return {
        minWidth: width,
        bodyMinWidth: clampToParentWidth(Math.max(desiredBodyMinWidth, width), parentWidth),
    };
};
