import React, { FC, useMemo, useRef } from 'react';
import { Skeleton } from '@chayns-components/core';
import { StyledHeaderActions, StyledHeaderActionsSide } from './HeaderActions.styles';
import { HeaderActionsProps } from './HeaderActions.types';
import HeaderAction from './header-action/HeaderAction';
import { useElementWidth } from './HeaderActions.hooks';

const ACTION_WIDTH = 24;
const ACTION_GAP = 4;
const OVERFLOW_ACTION_WIDTH = 24;

const HeaderActions: FC<HeaderActionsProps> = ({
    rightActions,
    maxActionCount,
    isRead,
    onReadToggle,
    onTeamTalkToggle,
    isTeamTalkActive,
    isLoading,
}) => {
    const rightSideRef = useRef<HTMLDivElement | null>(null);
    const rightSideWidth = useElementWidth(rightSideRef);

    const left = useMemo(() => {
        const items = [
            <HeaderAction
                key="read"
                label={isRead ? 'unread' : 'read'}
                icons={isRead ? ['fa fa-check', 'fa fa-slash'] : ['fa fa-check']}
                onClick={() => onReadToggle(!isRead)}
                shouldShowLabel
            />,
        ];

        if (typeof onTeamTalkToggle === 'function') {
            items.push(
                <HeaderAction
                    key="teamtalk"
                    label="TeamTalk"
                    icons={['fa fa-message-text']}
                    onClick={() => onTeamTalkToggle(!isTeamTalkActive)}
                    shouldShowLabel
                    shouldForceHover={isTeamTalkActive}
                />,
            );
        }

        return items;
    }, [isRead, isTeamTalkActive, onReadToggle, onTeamTalkToggle]);

    const right = useMemo(() => {
        const prioritizedActions = rightActions.filter(
            (action) => action.contextMenuItems && action.contextMenuItems.length > 0,
        );

        const normalActions = rightActions.filter(
            (action) => !action.contextMenuItems || action.contextMenuItems.length === 0,
        );

        let maxCount = rightActions.length;

        if (rightSideWidth > 0) {
            maxCount = Math.max(
                0,
                Math.floor((rightSideWidth - OVERFLOW_ACTION_WIDTH) / (ACTION_WIDTH + ACTION_GAP)),
            );
        }

        if (maxActionCount && maxCount > maxActionCount) {
            maxCount = maxActionCount;
        }

        const visibleActions = normalActions
            .slice(0, maxCount - prioritizedActions.length)
            .concat(prioritizedActions);

        const hiddenActions = rightActions.filter(
            (action) => !visibleActions.some((visibleAction) => visibleAction.id === action.id),
        );

        const items = visibleActions.map(
            ({ onClick, id, icons, label, contextMenuItems, isDisabled }) => (
                <HeaderAction
                    key={id}
                    label={label}
                    icons={icons}
                    onClick={onClick}
                    contextMenuItems={contextMenuItems}
                    isDisabled={isDisabled}
                />
            ),
        );

        if (hiddenActions.length > 0) {
            items.push(
                <HeaderAction
                    key="more"
                    label="Mehr"
                    icons={['fa fa-ellipsis-v']}
                    onClick={() => {}}
                    contextMenuItems={hiddenActions.map(
                        ({ id, isDisabled, onClick, label, icons }) => ({
                            key: id,
                            text: label,
                            icons,
                            onClick,
                            isDisabled,
                        }),
                    )}
                />,
            );
        }

        return items;
    }, [maxActionCount, rightActions, rightSideWidth]);

    if (isLoading) {
        return (
            <StyledHeaderActions>
                <StyledHeaderActionsSide>
                    <Skeleton.Box width={120} height={24} />
                    <Skeleton.Box width={100} height={24} />
                </StyledHeaderActionsSide>

                <StyledHeaderActionsSide>
                    <Skeleton.Box width={24} height={24} />
                    <Skeleton.Box width={24} height={24} />
                    <Skeleton.Box width={24} height={24} />
                    <Skeleton.Box width={24} height={24} />
                </StyledHeaderActionsSide>
            </StyledHeaderActions>
        );
    }

    return (
        <StyledHeaderActions>
            <StyledHeaderActionsSide>{left}</StyledHeaderActionsSide>
            <StyledHeaderActionsSide ref={rightSideRef} $isRightSide>
                {right}
            </StyledHeaderActionsSide>
        </StyledHeaderActions>
    );
};

HeaderActions.displayName = 'HeaderActions';

export default HeaderActions;
