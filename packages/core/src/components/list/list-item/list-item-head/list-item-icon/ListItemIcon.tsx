import React from 'react';
import Icon from '../../../../icon/Icon';
import { StyledListItemIcon } from './ListItemIcon.styles';

type ListItemIconProps = {
    icons: string[];
};

const ListItemIcon: React.FC<ListItemIconProps> = ({ icons }) => {
    return (
        <StyledListItemIcon>
            <Icon icons={icons} size={22} />
        </StyledListItemIcon>
    );
};

ListItemIcon.displayName = 'ListItemIcon';

export default ListItemIcon;
