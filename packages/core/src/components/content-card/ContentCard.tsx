import React, { FC, ReactNode } from 'react';
import { ContentCardType } from '../../types/contentCard';
import { StyledContentCard } from './ContentCard.styles';

export type ContentCardProps = {
    /**
     * The content of the content card
     */
    children?: ReactNode;
    /**
     * The onClick event handler
     */
    onClick?: () => void;
    /**
     * The type of the content card
     */
    type?: ContentCardType;
};

const ContentCard: FC<ContentCardProps> = ({
    children,
    onClick,
    type = ContentCardType.Default,
}) => (
    <StyledContentCard onClick={onClick} $type={type}>
        {children}
    </StyledContentCard>
);

ContentCard.displayName = 'ContentCard';

export default ContentCard;
