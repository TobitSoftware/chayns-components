import React, { FC } from 'react';
import { HeaderSubjectProps } from './HeaderSubject.types';
import {
    StyledHeaderSubject,
    StyledHeaderSubjectFullScreenWrapper,
    StyledHeaderSubjectTitle,
} from './HeaderSubject.styles';
import { Icon, Skeleton } from '@chayns-components/core';

const HeaderSubject: FC<HeaderSubjectProps> = ({
    title,
    onFullScreenToggle,
    isFullScreen,
    isLoading,
}) => (
    <StyledHeaderSubject>
        {isLoading ? <Skeleton.H2 /> : <StyledHeaderSubjectTitle>{title}</StyledHeaderSubjectTitle>}
        {typeof onFullScreenToggle === 'function' && !isLoading && (
            <StyledHeaderSubjectFullScreenWrapper onClick={() => onFullScreenToggle(!isFullScreen)}>
                <Icon
                    icons={[
                        isFullScreen
                            ? 'fa fa-down-left-and-up-right-to-center'
                            : 'fa fa-up-right-and-down-left-from-center',
                    ]}
                    size={16}
                />
            </StyledHeaderSubjectFullScreenWrapper>
        )}
    </StyledHeaderSubject>
);

HeaderSubject.displayName = 'HeaderSubject';

export default HeaderSubject;
