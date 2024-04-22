import React, { FC, ReactNode, useContext, useMemo } from 'react';
import { ContentCardType } from '../../types/contentCard';
import AreaContextProvider, { AreaContext } from '../area-provider/AreaContextProvider';
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
}) => {
    const areaProvider = useContext(AreaContext);

    const shouldChangeColor = useMemo(
        () => areaProvider.shouldChangeColor ?? false,
        [areaProvider.shouldChangeColor],
    );

    return (
        <StyledContentCard onClick={onClick} $type={type} $shouldChangeColor={shouldChangeColor}>
            <AreaContextProvider shouldChangeColor={!shouldChangeColor}>
                {children}
            </AreaContextProvider>
        </StyledContentCard>
    );
};

ContentCard.displayName = 'ContentCard';

export default ContentCard;
