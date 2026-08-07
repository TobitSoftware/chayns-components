import React, { FC, useCallback, KeyboardEvent, useMemo, useRef } from 'react';
import textStrings from '../../constants/textStrings';
import { Icon, useFocusRingPortal, useKeyboardFocusHighlighting } from '@chayns-components/core';
import {
    StyledCommunicationTeamTalkHeader,
    StyledCommunicationTeamTalkHeaderActions,
    StyledCommunicationTeamTalkHeaderActionsSide,
    StyledCommunicationTeamTalkHeaderHint,
    StyledCommunicationTeamTalkHeaderSendButton,
} from './CommunicationTeamTalkHeader.styles';
import { CommunicationTeamTalkHeaderProps } from './CommunicationTeamTalkHeader.types';
import CommunicationInput from '../communication-input/CommunicationInput';
import {
    CommunicationInputCornerType,
    CommunicationInputDirection,
} from '../communication-input/CommunicationInput.types';
import CommunicationTeamTalkHeaderAction from './communication-team-talk-header-action/CommunicationTeamTalkHeaderAction';
import { Translation, useTranslation } from '@chayns/textstrings';

const CommunicationTeamTalkHeader: FC<CommunicationTeamTalkHeaderProps> = ({
    onAgree,
    value,
    onLeave,
    onSend,
    shouldShowInternalHint,
    onChange,
    onAdd,
    isInputDisabled,
    isAgreeDisabled,
    shouldEnableKeyboardHighlighting,
}) => {
    const { t } = useTranslation();
    const sendButtonRef = useRef<HTMLDivElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    const canSend = useMemo(() => {
        const checkValue = value.replaceAll('<br>', '').trim();

        return checkValue.length > 0;
    }, [value]);

    useFocusRingPortal(sendButtonRef, {
        isEnabled: canSend && shouldShowKeyboardHighlighting,
        padding: 5,
    });

    const handleInput = useCallback(
        (_: unknown, originalText: string) => {
            onChange(originalText);
        },
        [onChange],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (!event.shiftKey && event.key === 'Enter' && canSend) {
                onSend();
            }
        },
        [canSend, onSend],
    );

    return (
        <StyledCommunicationTeamTalkHeader>
            {shouldShowInternalHint && (
                <StyledCommunicationTeamTalkHeaderHint>
                    <Translation
                        textString={textStrings.CommunicationTeamTalkHeader.hint.heading}
                        tagName="b"
                    />
                    <Translation
                        textString={textStrings.CommunicationTeamTalkHeader.hint.text}
                        tagName="p"
                    />
                </StyledCommunicationTeamTalkHeaderHint>
            )}
            <StyledCommunicationTeamTalkHeaderActions>
                <CommunicationTeamTalkHeaderAction
                    icons={['fa fa-thumbs-up']}
                    onClick={onAgree}
                    label={t(textStrings.CommunicationTeamTalkHeader.agree)}
                    shouldShowLabel
                    isDisabled={isAgreeDisabled}
                    shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                />
                <StyledCommunicationTeamTalkHeaderActionsSide>
                    {typeof onLeave === 'function' && (
                        <CommunicationTeamTalkHeaderAction
                            icons={['fa fa-user-minus']}
                            onClick={onLeave}
                            label={t(textStrings.CommunicationTeamTalkHeader.leave)}
                            shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                        />
                    )}
                    {typeof onAdd === 'function' && (
                        <CommunicationTeamTalkHeaderAction
                            icons={['fa fa-user-plus']}
                            onClick={onAdd}
                            label={t(textStrings.CommunicationTeamTalkHeader.add)}
                            shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                        />
                    )}
                </StyledCommunicationTeamTalkHeaderActionsSide>
            </StyledCommunicationTeamTalkHeaderActions>
            <CommunicationInput
                inputConfig={{
                    value,
                    onInput: handleInput,
                    onKeyDown: handleKeyDown,
                    isDisabled: isInputDisabled,
                }}
                cornerType={CommunicationInputCornerType.ROUNDED}
                direction={CommunicationInputDirection.BOTTOM}
                shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                rightElement={
                    <StyledCommunicationTeamTalkHeaderSendButton
                        $isDisabled={!canSend}
                        onClick={canSend ? onSend : undefined}
                        onKeyDown={(event) => {
                            if (canSend && (event.key === 'Enter' || event.key === ' ')) {
                                event.preventDefault();
                                onSend();
                            }
                        }}
                        ref={sendButtonRef}
                        role="button"
                        tabIndex={canSend ? 0 : -1}
                    >
                        <Icon icons={['fa fa-paper-plane']} />
                    </StyledCommunicationTeamTalkHeaderSendButton>
                }
            />
        </StyledCommunicationTeamTalkHeader>
    );
};

CommunicationTeamTalkHeader.displayName = 'CommunicationTeamTalkHeader';

export default CommunicationTeamTalkHeader;
