import React, {
    CSSProperties,
    FC,
    KeyboardEventHandler,
    MouseEvent,
    useCallback,
    useMemo,
} from 'react';
import type { FilterButtonItemShape, FilterButtonSize } from '../../../types/filterButtons';
import { useKeyboardFocusHighlighting } from '../../../hooks/useKeyboardFocusHighlighting';
import Icon from '../../icon/Icon';
import {
    StyledFilterButtonItem,
    StyledFilterButtonItemBorder,
    StyledFilterButtonItemLabel,
    StyledFilterButtonItemLabelCount,
    StyledFilterButtonItemLabelText,
    StyledMotionFilterButtonItemBackground,
} from './FilterButton.styles';

export type FilterButtonProps = {
    color?: CSSProperties['color'];
    icons?: string[];
    isSelected: boolean;
    shape: FilterButtonItemShape;
    size: FilterButtonSize;
    count?: number;
    text: string;
    id: string;
    isDisabled?: boolean;
    shouldEnableKeyboardHighlighting?: boolean;
    tabIndex?: number;
    onFocus?: (id: string) => void;
    onArrowNavigate?: (id: string, direction: -1 | 1) => void;
    buttonRef?: (element: HTMLDivElement | null) => void;
    onSelect: (key: string) => void;
};

const FilterButton: FC<FilterButtonProps> = ({
    icons,
    size,
    shape,
    text,
    color,
    count,
    isSelected,
    id,
    isDisabled,
    shouldEnableKeyboardHighlighting = false,
    tabIndex,
    onFocus,
    onArrowNavigate,
    buttonRef,
    onSelect,
}) => {
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting && !isDisabled,
    );

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (isDisabled) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            onSelect(id);
        },
        [id, isDisabled, onSelect],
    );

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (isDisabled) {
                return;
            }

            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                onArrowNavigate?.(id, 1);
                return;
            }

            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                onArrowNavigate?.(id, -1);
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelect(id);
            }
        },
        [id, isDisabled, onArrowNavigate, onSelect],
    );

    const handleFocus = useCallback(() => {
        onFocus?.(id);
    }, [id, onFocus]);

    return useMemo(
        () => (
            <StyledFilterButtonItem
                ref={buttonRef}
                $isSelected={isSelected}
                $isDisabled={isDisabled}
                $shouldShowKeyboardHighlighting={shouldShowKeyboardHighlighting}
                $size={size}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                role={shouldEnableKeyboardHighlighting ? 'button' : undefined}
                tabIndex={!isDisabled ? (tabIndex ?? 0) : -1}
                aria-pressed={shouldEnableKeyboardHighlighting ? isSelected : undefined}
                aria-disabled={shouldEnableKeyboardHighlighting ? isDisabled : undefined}
            >
                <StyledFilterButtonItemLabel>
                    {icons && <Icon icons={icons} size={15} />}
                    <StyledFilterButtonItemLabelText>{text}</StyledFilterButtonItemLabelText>
                    {typeof count === 'number' && (
                        <StyledFilterButtonItemLabelCount>
                            {count.toLocaleString()}
                        </StyledFilterButtonItemLabelCount>
                    )}
                </StyledFilterButtonItemLabel>
                <StyledFilterButtonItemBorder
                    $isSelected={isSelected}
                    $shape={shape}
                    $color={color}
                />
                <StyledMotionFilterButtonItemBackground
                    $isSelected={isSelected}
                    $shape={shape}
                    $color={color}
                />
            </StyledFilterButtonItem>
        ),
        [
            color,
            buttonRef,
            count,
            handleClick,
            handleFocus,
            handleKeyDown,
            icons,
            isDisabled,
            isSelected,
            onFocus,
            shape,
            shouldEnableKeyboardHighlighting,
            shouldShowKeyboardHighlighting,
            size,
            tabIndex,
            text,
        ],
    );
};

FilterButton.displayName = 'FilterButton';

export default FilterButton;
