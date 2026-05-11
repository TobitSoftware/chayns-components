import React, { FC, useCallback, KeyboardEvent, useMemo } from 'react';
import textStrings from '../../constants/textStrings';
import { Icon } from '@chayns-components/core';
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
}) => {
    const { t } = useTranslation();

    const canSend = useMemo(() => {
        const checkValue = value.replaceAll('<br>', '').trim();

        return checkValue.length > 0;
    }, [value]);

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
                />
                <StyledCommunicationTeamTalkHeaderActionsSide>
                    {typeof onLeave === 'function' && (
                        <CommunicationTeamTalkHeaderAction
                            icons={['fa fa-user-minus']}
                            onClick={onLeave}
                            label={t(textStrings.CommunicationTeamTalkHeader.leave)}
                        />
                    )}
                    {typeof onAdd === 'function' && (
                        <CommunicationTeamTalkHeaderAction
                            icons={['fa fa-user-plus']}
                            onClick={onAdd}
                            label={t(textStrings.CommunicationTeamTalkHeader.add)}
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
                rightElement={
                    <StyledCommunicationTeamTalkHeaderSendButton
                        $isDisabled={!canSend}
                        onClick={onSend}
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
