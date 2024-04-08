import React, { FC } from 'react';
import { StyledGroupName } from './GroupName.styles';

export type GroupNameProps = {
    name: string;
};

const GroupName: FC<GroupNameProps> = ({ name }) => (
    <StyledGroupName $groupName={name} data-isgroupname="true" id={`${name}`}>
        {name}
    </StyledGroupName>
);

GroupName.displayName = 'GroupName';

export default GroupName;
