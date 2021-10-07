import React, { FC, MouseEventHandler, ReactNode } from 'react';
import {
    StyledListItemHead,
    StyledListItemHeadContent,
    StyledListItemHeadIcon,
    StyledListItemHeadImage,
    StyledListItemHeadImageWrapper,
    StyledListItemHeadSubtitle,
    StyledListItemHeadTitle,
    StyledMotionListItemHeadIndicator,
} from './ListItemHead.styles';
import Icon from '../../../icon/Icon';

type ListItemHeadProps = {
    icons?: [string, ...string[]];
    images?: string[];
    isAnyItemExpandable: boolean;
    isExpandable: boolean;
    isOpen: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    rightElements?: [ReactNode, ...ReactNode[]];
    subtitle?: ReactNode;
    shouldShowRoundImage?: boolean;
    title: ReactNode;
};

const ListItemHead: FC<ListItemHeadProps> = ({
    icons,
    images,
    isAnyItemExpandable,
    isExpandable,
    isOpen,
    onClick,
    rightElements,
    subtitle,
    shouldShowRoundImage,
    title,
}) => {
    return (
        <StyledListItemHead
            className="beta-chayns-list-item-head"
            isClickable={typeof onClick === 'function' || isExpandable}
            onClick={onClick}
        >
            {isAnyItemExpandable && (
                <StyledMotionListItemHeadIndicator
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    initial={false}
                >
                    {isExpandable && <Icon icons={['fa fa-chevron-right']} />}
                </StyledMotionListItemHeadIndicator>
            )}
            {icons && (
                <StyledListItemHeadIcon>
                    <Icon icons={icons} size={22} />
                </StyledListItemHeadIcon>
            )}
            {images && !icons && (
                <StyledListItemHeadImageWrapper shouldShowRoundImage={shouldShowRoundImage}>
                    <StyledListItemHeadImage src={images[0]} />
                </StyledListItemHeadImageWrapper>
            )}
            <StyledListItemHeadContent>
                <StyledListItemHeadTitle className="ellipsis">{title}</StyledListItemHeadTitle>
                {subtitle && (
                    <StyledListItemHeadSubtitle className="ellipsis">
                        {subtitle}
                    </StyledListItemHeadSubtitle>
                )}
            </StyledListItemHeadContent>
        </StyledListItemHead>
    );
};

ListItemHead.displayName = 'ListItemHead';

export default ListItemHead;
