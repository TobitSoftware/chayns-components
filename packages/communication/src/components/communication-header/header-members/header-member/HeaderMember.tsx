import React, { FC } from 'react';
import { Member } from '../../CommunicationHeader.types';
import { StyledHeaderMember } from './HeaderMember.styles';
import { ContextMenu } from '@chayns-components/core';

const HeaderMember: FC<Omit<Member, 'id'>> = ({ name, actions }) => {
    const handleClick = () => {
        const firstAction = actions[0];

        if (!firstAction) {
            return;
        }

        firstAction.onClick();
    };

    if (actions.length > 1) {
        return (
            <StyledHeaderMember $isContextMenu>
                <ContextMenu
                    items={actions.map(({ onClick, label, icons }) => ({
                        onClick,
                        icons,
                        key: label,
                        text: label,
                    }))}
                >
                    {name}
                </ContextMenu>
            </StyledHeaderMember>
        );
    }

    return (
        <StyledHeaderMember onClick={handleClick}>
            <span>{name}</span>
        </StyledHeaderMember>
    );
};

HeaderMember.displayName = 'HeaderMember';

export default HeaderMember;
