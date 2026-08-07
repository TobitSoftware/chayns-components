import React, { FC, useRef } from 'react';
import { HeaderSubjectProps } from './HeaderSubject.types';
import {
    StyledHeaderSubject,
    StyledHeaderSubjectFullScreenWrapper,
    StyledHeaderSubjectTitle,
} from './HeaderSubject.styles';
import {
    Icon,
    Skeleton,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';

const HeaderSubject: FC<HeaderSubjectProps> = ({
    title,
    onFullScreenToggle,
    isFullScreen,
    isLoading,
    shouldEnableKeyboardHighlighting,
}) => {
    const { t } = useTranslation();
    const fullScreenRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(fullScreenRef, { isEnabled: shouldShowKeyboardHighlighting });

    return (
        <StyledHeaderSubject>
            {isLoading ? (
                <Skeleton.H2 />
            ) : (
                <StyledHeaderSubjectTitle>{title}</StyledHeaderSubjectTitle>
            )}
            {typeof onFullScreenToggle === 'function' && !isLoading && (
                <StyledHeaderSubjectFullScreenWrapper
                    aria-label={
                        isFullScreen
                            ? t(textStrings.communicationHeader.accessibility.exitFullscreen)
                            : t(textStrings.communicationHeader.accessibility.enterFullscreen)
                    }
                    onClick={() => onFullScreenToggle(!isFullScreen)}
                    ref={fullScreenRef}
                    type="button"
                >
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
};

HeaderSubject.displayName = 'HeaderSubject';

export default HeaderSubject;
