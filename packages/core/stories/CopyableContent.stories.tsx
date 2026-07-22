import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import CopyableContent from '../src/components/copyable-content/CopyableContent';

export default {
    title: 'Core/CopyableContent',
    component: CopyableContent,
} as Meta<typeof CopyableContent>;

const Template: StoryFn<typeof CopyableContent> = (args) => <CopyableContent {...args} />;

const CHAT_HEADER_HEIGHT = 52;
const CHAT_VIEWPORT_HEIGHT = 420;

const ChatScrollContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
        style={{
            border: '1px solid #d4d4d4',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            height: `${CHAT_VIEWPORT_HEIGHT}px`,
            overflow: 'hidden',
        }}
    >
        <div
            style={{
                alignItems: 'center',
                background: '#fafafa',
                borderBottom: '1px solid #d4d4d4',
                display: 'flex',
                flexShrink: 0,
                fontWeight: 600,
                height: `${CHAT_HEADER_HEIGHT}px`,
                padding: '0 16px',
            }}
        >
            Projektgruppe Sommerfest
        </div>
        <div
            style={{
                minHeight: 0,
                overflowY: 'scroll',
                padding: '0 16px 16px',
            }}
        >
            <div style={{ paddingTop: '16px' }}>{children}</div>
        </div>
    </div>
);

const VirtualizedChatMessageFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
        className="message-row message-row--virtualized"
        style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'height, margin-top, opacity, transform',
        }}
    >
        <div className="message-bubble" style={{ filter: 'brightness(1)', overflow: 'clip' }}>
            <div className="message-bubble__content-wrapper" style={{ position: 'relative' }}>
                <div
                    className="message-bubble__content-wrapper__content"
                    style={{ overflow: 'clip' }}
                >
                    <div className="message-text" style={{ overflow: 'clip' }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const NestedScrollContainerTemplate: StoryFn<typeof CopyableContent> = (args) => (
    <ChatScrollContainer>
        <p>Neue Nachricht von Anna</p>
        <CopyableContent {...args} />
        <p>Ende der langen Nachricht</p>
    </ChatScrollContainer>
);

const VirtualizedChatMessageTemplate: StoryFn<typeof CopyableContent> = (args) => (
    <ChatScrollContainer>
        <p>Neue Nachricht vor dem langen Inhalt</p>
        <VirtualizedChatMessageFrame>
            <CopyableContent {...args} />
        </VirtualizedChatMessageFrame>
        <p>Ende der langen Nachricht</p>
    </ChatScrollContainer>
);

const ConversationTemplate: StoryFn<typeof CopyableContent> = (args) => (
    <ChatScrollContainer>
        {Array.from({ length: 20 }, (_, index) => {
            const messageNumber = index + 1;
            const hasCopyableContent = messageNumber % 4 === 0;

            return (
                <VirtualizedChatMessageFrame key={messageNumber}>
                    {hasCopyableContent ? (
                        <CopyableContent {...args} />
                    ) : (
                        <p>
                            Nachricht {messageNumber}: Die Abstimmung für den nächsten Termin läuft
                            weiter. Ich gebe Bescheid, sobald alle Rückmeldungen eingegangen sind.
                        </p>
                    )}
                </VirtualizedChatMessageFrame>
            );
        })}
    </ChatScrollContainer>
);

const PROJECT_UPDATE = `# Projekt-Update: Sommerfest

Die Vorbereitungen für das Sommerfest gehen in die letzte Runde. Das Organisationsteam hat die Rückmeldungen aus den einzelnen Gruppen zusammengeführt und den Ablauf für den Nachmittag angepasst.

## Was bereits feststeht

- Der Aufbau beginnt am Freitag um 16:30 Uhr am Bürgerhaus.
- Für Kinder gibt es eine Kreativstation, eine kleine Rallye und einen ruhigen Rückzugsbereich.
- Getränke und vegetarische Speisen werden vor Ort angeboten.

> Bitte gebt Rückmeldung, falls ihr beim Aufbau helfen könnt oder besondere Anforderungen an die Verpflegung habt.

Weitere Informationen stehen im [gemeinsamen Ablaufplan](https://example.com/veranstaltungen/sommerfest-2026/ablauf-und-helferinnen).`;

export const Short = Template.bind({});
export const Long = Template.bind({});
export const Markdown = Template.bind({});
export const LongUrl = Template.bind({});
export const Dark = Template.bind({});
export const NestedScrollContainer = NestedScrollContainerTemplate.bind({});
export const VirtualizedChatMessage = VirtualizedChatMessageTemplate.bind({});
export const Conversation = ConversationTemplate.bind({});

Short.args = {
    content:
        'Vielen Dank für eure Rückmeldungen. Der Termin für das gemeinsame Sommerfest steht nun fest: Samstag, 22. August, ab 15 Uhr.',
};
Long.args = {
    content: Array.from(
        { length: 8 },
        (_, index) =>
            `### Abschnitt ${index + 1}\n\nDas Planungsteam hat die Hinweise aus den Gesprächen aufgenommen und bereitet jetzt die nächsten Schritte vor. Bis Ende der Woche sammeln wir noch Rückmeldungen, damit alle Beteiligten zuverlässig informiert sind.`,
    ).join('\n\n'),
};
Markdown.args = { content: PROJECT_UPDATE };
LongUrl.args = {
    content:
        'Die vollständige Materialliste findet ihr unter https://example.com/veranstaltungen/sommerfest-2026/organisation/materialien/helferinnen-und-helfer/abstimmung-und-zeitplan.',
};
Dark.args = {
    content: `${PROJECT_UPDATE}\n\n---\n\nDiese Story bitte mit dunklem Storybook-Hintergrund prüfen.`,
};
NestedScrollContainer.args = {
    content: Array.from(
        { length: 12 },
        (_, index) =>
            `### Update ${index + 1}\n\nDas Organisationsteam hat die aktuelle Rückmeldung zusammengefasst. Bitte prüft die offenen Punkte und gebt bis Freitag Bescheid, falls sich bei eurer Planung noch etwas geändert hat.`,
    ).join('\n\n'),
};
VirtualizedChatMessage.args = NestedScrollContainer.args;
Conversation.args = {
    content: `### Nächster Schritt

Bitte prüft die **offenen Aufgaben** und ergänzt eure Rückmeldung bis Freitagmittag. Die vollständige Übersicht steht im [gemeinsamen Ablaufplan](https://example.com/ablaufplan).`,
};
