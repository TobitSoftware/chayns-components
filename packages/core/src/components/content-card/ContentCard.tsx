import React, { FC, ReactNode } from 'react';
import { StyledContentCard } from './ContentCard.styles';

export type ContentCardProps = {
    /**
     * The content of the content card
     */
    children: ReactNode;
};

const ContentCard: FC<ContentCardProps> = ({ children }) => (
    <StyledContentCard>{children}</StyledContentCard>
);

ContentCard.displayName = 'ContentCard';

export default ContentCard;
