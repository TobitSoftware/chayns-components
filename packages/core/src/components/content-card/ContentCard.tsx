import React, { FC, ReactNode, useContext, useMemo } from 'react';
import { ContentCardType } from '../../types/contentCard';
import AreaProvider, { AreaProviderContext } from '../area-provider/AreaProvider';
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
    const areaProvider = useContext(AreaProviderContext);

    const shouldChangeColor = useMemo(
        () => areaProvider.shouldChangeColor ?? false,
        [areaProvider.shouldChangeColor],
    );

    console.log(areaProvider);

    return (
        <StyledContentCard onClick={onClick} $type={type} $shouldChangeColor={shouldChangeColor}>
            {shouldChangeColor ? children : <AreaProvider>{children}</AreaProvider>}
        </StyledContentCard>
    );
};

ContentCard.displayName = 'ContentCard';

export default ContentCard;
