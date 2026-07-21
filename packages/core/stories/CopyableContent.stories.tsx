import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import CopyableContent from '../src/components/copyable-content/CopyableContent';

export default {
    title: 'Core/CopyableContent',
    component: CopyableContent,
} as Meta<typeof CopyableContent>;

const Template: StoryFn<typeof CopyableContent> = (args) => <CopyableContent {...args} />;

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
