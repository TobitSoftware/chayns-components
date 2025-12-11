import React, { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import type { IListItemRightElement, IListItemRightElements } from '../../../../../types/list';
import {
    StyledListItemHeadTitleElement,
    StyledListItemHeadTitleText,
    StyledListItemTitle,
    StyledListItemTitleLeftWrapper,
    StyledListItemTopRightElement,
} from './ListItemTitle.styles';
import { getElementClickEvent } from '../../../../../utils/accordion';

type ListItemTitleProps = {
    rightElements?: IListItemRightElements;
    title: ReactNode;
    titleElement?: ReactNode;
    shouldShowMultilineTitle: boolean;
    isOpen: boolean;
    onResize?: (entries: ResizeObserverEntry[]) => void;
    onTitleWidthChange: (width: number) => void;
};

const ListItemTitle: FC<ListItemTitleProps> = ({
    rightElements,
    titleElement,
    title,
    shouldShowMultilineTitle,
    isOpen,
    onResize,
    onTitleWidthChange,
}) => {
    const titleWrapperRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const elementWrapperRef = useRef<HTMLDivElement>(null);
    const topElementWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = titleWrapperRef?.current;
        if (!element || typeof onResize !== 'function') return undefined;

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, [onResize]);

    useEffect(() => {
        if (wrapperRef.current && elementWrapperRef.current) {
            const fullWidth = wrapperRef.current.clientWidth;
            const rightElementWidth = elementWrapperRef.current.clientWidth;
            const topElementWidth = topElementWrapperRef.current?.clientWidth;

            let width = fullWidth;

            if (rightElementWidth > 0) {
                width -= rightElementWidth + 8;
            }

            if (topElementWidth) {
                width -= topElementWidth + 12;
            }

            onTitleWidthChange(width);
        }
    }, [onTitleWidthChange]);

    const handlePreventClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const topElement = useMemo(() => {
        if (typeof rightElements === 'object' && rightElements && 'top' in rightElements) {
            return (rightElements as unknown as IListItemRightElement).top;
        }

        return undefined;
    }, [rightElements]);

    const shouldPreventRightElementClick = useMemo(() => {
        if (topElement) {
            return getElementClickEvent(topElement);
        }

        return false;
    }, [topElement]);

    return (
        <StyledListItemTitle ref={wrapperRef}>
            <StyledListItemTitleLeftWrapper>
                <StyledListItemHeadTitleText
                    $isEllipsis={!isOpen}
                    ref={titleWrapperRef}
                    $shouldShowMultilineTitle={shouldShowMultilineTitle}
                >
                    {title}
                </StyledListItemHeadTitleText>
                <StyledListItemHeadTitleElement ref={elementWrapperRef}>
                    {titleElement}
                </StyledListItemHeadTitleElement>
            </StyledListItemTitleLeftWrapper>
            {topElement && (
                <StyledListItemTopRightElement
                    ref={topElementWrapperRef}
                    onClick={shouldPreventRightElementClick ? handlePreventClick : undefined}
                >
                    {topElement}
                </StyledListItemTopRightElement>
            )}
        </StyledListItemTitle>
    );
};

ListItemTitle.displayName = 'ListItemTitle';

export default ListItemTitle;
