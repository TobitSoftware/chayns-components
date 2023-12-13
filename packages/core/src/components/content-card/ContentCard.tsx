import React, { FC, ReactNode } from 'react';
import { StyledContentCard } from './ContentCard.styles';

export type ContentCardProps = {
    /**
     * The content of the content card
     */
    children: ReactNode;
    /**
     * The onClick event handler
     */
    onClick?: () => void;
};

const ContentCard: FC<ContentCardProps> = ({ children, onClick }) => (
    <StyledContentCard onClick={onClick}>{children}</StyledContentCard>
);

ContentCard.displayName = 'ContentCard';

export default ContentCard;
