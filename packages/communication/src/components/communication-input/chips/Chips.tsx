import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Chip from './chip/Chip';
import { CommunicationInputProps } from '../CommunicationInput.types';
import { StyledChips, StyledChipsArrow, StyledChipsFade, StyledChipsScroll } from './Chips.styles';
import { Icon } from '@chayns-components/core';

interface ChipsProps {
    chips: CommunicationInputProps['chips'];
}

const SCROLL_OFFSET = 120;

const Chips: FC<ChipsProps> = ({ chips }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
        const element = scrollRef.current;

        if (!element) {
            return;
        }

        const { scrollLeft, scrollWidth, clientWidth } = element;

        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }, []);

    const handleScrollLeft = useCallback(() => {
        scrollRef.current?.scrollBy({
            left: -SCROLL_OFFSET,
            behavior: 'smooth',
        });
    }, []);

    const handleScrollRight = useCallback(() => {
        scrollRef.current?.scrollBy({
            left: SCROLL_OFFSET,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        updateScrollState();

        const element = scrollRef.current;

        if (!element) {
            return undefined;
        }

        const resizeObserver = new ResizeObserver(updateScrollState);

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, [chips, updateScrollState]);

    const content = useMemo(
        () =>
            chips?.map(({ label, onClick, onRemove, icons }) => (
                <Chip
                    label={label}
                    onClick={onClick}
                    onRemove={onRemove}
                    icons={icons}
                    key={label}
                />
            )),
        [chips],
    );

    if (!chips) {
        return null;
    }

    return (
        <StyledChips>
            {canScrollLeft && (
                <>
                    <StyledChipsFade $side="left" />
                    <StyledChipsArrow $side="left" onClick={handleScrollLeft}>
                        <Icon icons={['fa fa-chevron-left']} size={12} />
                    </StyledChipsArrow>
                </>
            )}

            <StyledChipsScroll ref={scrollRef} onScroll={updateScrollState}>
                {content}
            </StyledChipsScroll>

            {canScrollRight && (
                <>
                    <StyledChipsFade $side="right" />
                    <StyledChipsArrow $side="right" onClick={handleScrollRight}>
                        <Icon icons={['fa fa-chevron-right']} size={12} />
                    </StyledChipsArrow>
                </>
            )}
        </StyledChips>
    );
};

Chips.displayName = 'Chips';

export default Chips;
