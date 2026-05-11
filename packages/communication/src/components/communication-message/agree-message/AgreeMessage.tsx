import React, { FC } from 'react';
import { Icon } from '@chayns-components/core';
import { Translation, useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';
import { StyledAgreeMessage } from './AgreeMessage.styles';
import CommunicationMessage from '../CommunicationMessage';
import { CommunicationMessageProps } from '../CommunicationMessage.types';

const AgreeMessage: FC<Omit<CommunicationMessageProps, 'content'>> = ({
    alignment,
    shouldShowStatus,
    shouldShowAuthorName,
    shouldShowAuthorImage,
    shouldShowTimestamp,
    metadata,
    options,
}) => {
    const { t } = useTranslation();

    return (
        <CommunicationMessage
            alignment={alignment}
            metadata={{
                ...metadata,
                plainText: t(textStrings.communicationMessage.agreeMessage.text),
            }}
            shouldShowStatus={shouldShowStatus}
            shouldShowAuthorName={shouldShowAuthorName}
            options={options}
            shouldShowAuthorImage={shouldShowAuthorImage}
            shouldShowTimestamp={shouldShowTimestamp}
            content={
                <StyledAgreeMessage>
                    <Icon icons={['fa fa-thumbs-up']} size={15} />
                    <Translation textString={textStrings.communicationMessage.agreeMessage.text} />
                </StyledAgreeMessage>
            }
        />
    );
};

AgreeMessage.displayName = 'CommunicationMessage.Agree';

export default AgreeMessage;
