import { getDevice } from 'chayns-api';
import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from 'react';
import { ComboBoxDirection } from '../../types/comboBox';
import { calculateContentHeight, calculateContentWidth } from '../../utils/calculate';
import Icon from '../icon/Icon';
import ComboBoxItem from './combobox-item/ComboBoxItem';
import {
    StyledComboBox,
    StyledComboBoxHeader,
    StyledComboBoxIconWrapper,
    StyledComboBoxPlaceholder,
    StyledComboBoxPlaceholderImage,
    StyledMotionComboBoxBody,
} from './ComboBox.styles';

export interface IComboBoxItem {
    imageUrl?: string;
    text: string;
    value: string | number;
}

export type ComboBoxProps = {
    /**
     * The direction in which the combobox should open.
     */
    direction?: ComboBoxDirection;
    /**
     * Whether the combobox should be disabled.
     */
    isDisabled?: boolean;
    /**
     * The list of the items that should be displayed.
     */
    list: IComboBoxItem[];
    /**
     * The maximum height of the combobox content.
     */
    maxHeight?: CSSProperties['maxHeight'];
    /**
     * Function that should be executed when an item is selected.
     */
    onSelect?: (comboboxItem: IComboBoxItem) => void;
    /**
     * A text that should be displayed when no item is selected.
     */
    placeholder: string;
    /**
     * An item that should be preselected.
     */
    selectedItem?: IComboBoxItem;
    /**
     * If true, the images of the items are displayed in a round shape.
     */
    shouldShowRoundImage?: boolean;
};

const ComboBox: FC<ComboBoxProps> = ({
    direction = ComboBoxDirection.BOTTOM,
    isDisabled = false,
    list,
    maxHeight = '300px',
    onSelect,
    placeholder,
    selectedItem,
    shouldShowRoundImage,
}) => {
    const [item, setItem] = useState<IComboBoxItem>();
    const [isAnimating, setIsAnimating] = useState(false);
    const [minWidth, setMinWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const { browser } = getDevice();

    const { isMobile } = chayns.env;

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsAnimating(false);
            }
        },
        [ref],
    );

    /**
     * This function adds an event listener to the document to close the combobox when the user clicks outside of it
     */
    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick, ref]);

    /**
     * This function sets the selected item
     */
    const handleSetSelectedItem = useCallback(
        (itemToSelect: IComboBoxItem) => {
            setItem(itemToSelect);
            setIsAnimating(false);

            if (onSelect) {
                onSelect(itemToSelect);
            }
        },
        [onSelect],
    );

    /**
     * This function calculates the greatest width
     */
    useEffect(() => {
        const isAtLeastOneItemWithImageGiven = list.some(({ imageUrl }) => imageUrl);

        const textArray = list.map(({ text }) => text);

        setHeight(calculateContentHeight(textArray));

        textArray.push(placeholder);

        // 45px = padding left + padding right + border left + border right + arrow icon width + arrow icon margin left
        // 32px = image width + flex gap
        setMinWidth(
            calculateContentWidth(textArray) + 45 + (isAtLeastOneItemWithImageGiven ? 32 : 0),
        );
    }, [list, placeholder]);

    /**
     * This function sets the external selected item
     */
    useEffect(() => {
        if (selectedItem) {
            setItem(selectedItem);
            setIsAnimating(false);
        }
    }, [selectedItem]);

    const placeholderImageUrl = useMemo(() => {
        if (selectedItem) {
            return selectedItem.imageUrl;
        }

        if (item) {
            return item.imageUrl;
        }

        return undefined;
    }, [item, selectedItem]);

    /**
     * This function resets the placeholder
     */
    const placeholderText = useMemo(() => {
        let text = placeholder;

        if (selectedItem) {
            text = selectedItem.text;
        } else if (item) {
            text = item.text;
        }

        return text;
    }, [item, placeholder, selectedItem]);

    /**
     * This function opens the content of the combobox
     */
    const handleHeaderClick = useCallback(() => {
        if (!isDisabled) {
            setIsAnimating((prevState) => !prevState);
        }
    }, [isDisabled]);

    const comboBoxBody = useMemo(() => {
        const items = list.map(({ imageUrl, text, value }) => (
            <ComboBoxItem
                imageUrl={imageUrl}
                isSelected={selectedItem ? value === selectedItem.value : false}
                key={value}
                onSelect={handleSetSelectedItem}
                shouldShowRoundImage={shouldShowRoundImage}
                text={text}
                value={value}
            />
        ));

        const animate = isAnimating
            ? { height: 'fit-content', opacity: 1 }
            : { height: 0, opacity: 0 };

        const style =
            direction === ComboBoxDirection.TOP ? { transform: 'translateY(-100%)' } : undefined;

        return (
            <StyledMotionComboBoxBody
                browser={browser?.name}
                animate={animate}
                height={height}
                initial={{ height: 0, opacity: 0 }}
                maxHeight={maxHeight}
                minWidth={minWidth}
                style={style}
                direction={direction}
                transition={{ duration: 0.2 }}
            >
                {items}
            </StyledMotionComboBoxBody>
        );
    }, [
        browser?.name,
        direction,
        handleSetSelectedItem,
        height,
        isAnimating,
        list,
        maxHeight,
        minWidth,
        selectedItem,
        shouldShowRoundImage,
    ]);

    return useMemo(
        () => (
            <StyledComboBox ref={ref}>
                {direction === ComboBoxDirection.TOP && comboBoxBody}
                <StyledComboBoxHeader
                    direction={direction}
                    minWidth={minWidth}
                    onClick={handleHeaderClick}
                    isOpen={isAnimating}
                    isMobile={isMobile}
                    isDisabled={isDisabled}
                >
                    <StyledComboBoxPlaceholder>
                        {placeholderImageUrl && (
                            <StyledComboBoxPlaceholderImage
                                src={placeholderImageUrl}
                                shouldShowRoundImage={shouldShowRoundImage}
                            />
                        )}
                        {placeholderText}
                    </StyledComboBoxPlaceholder>
                    <StyledComboBoxIconWrapper>
                        <Icon icons={['fa fa-chevron-down']} />
                    </StyledComboBoxIconWrapper>
                </StyledComboBoxHeader>
                {direction === ComboBoxDirection.BOTTOM && comboBoxBody}
            </StyledComboBox>
        ),
        [
            comboBoxBody,
            direction,
            handleHeaderClick,
            isAnimating,
            isDisabled,
            isMobile,
            minWidth,
            placeholderImageUrl,
            placeholderText,
            shouldShowRoundImage,
        ],
    );
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
