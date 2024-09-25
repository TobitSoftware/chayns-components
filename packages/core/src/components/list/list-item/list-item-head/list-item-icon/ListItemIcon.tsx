import React from 'react';
import Icon from '../../../../icon/Icon';
import { StyledListItemIcon } from './ListItemIcon.styles';

type ListItemIconProps = {
    icons: string[];
    shouldHideBackground: boolean;
    shouldShowRoundIcon: boolean;
};

const ListItemIcon: React.FC<ListItemIconProps> = ({
    icons,
    shouldHideBackground,
    shouldShowRoundIcon,
}) => (
    <StyledListItemIcon
        $shouldHideBackground={shouldHideBackground}
        $shouldShowRoundIcon={shouldShowRoundIcon}
    >
        <Icon icons={icons} size={22} />
    </StyledListItemIcon>
);

ListItemIcon.displayName = 'ListItemIcon';

export default ListItemIcon;
