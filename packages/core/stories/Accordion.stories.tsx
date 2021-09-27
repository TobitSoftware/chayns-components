import { ComponentStory, ComponentMeta } from '@storybook/react';

import Accordion from '../src/components/accordion/Accordion';

export default {
    title: 'Core/Accordion',
    component: Accordion,
    args: {},
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = ({ children, ...args }) => (
    <Accordion {...args}>{children}</Accordion>
);

export const General = Template.bind({});

General.args = {
    children: (
        <p>
            Ja. Öffne das Menü über das entsprechende Symbol oben links auf der Seite, tippe auf
            Deinen Namen und wähle dann den Bereich „chaynsID“. Hier kannst Du Deine persönlichen
            Daten anpassen. Bitte beachte, dass Deine chaynsID Dir persönlich gehört. Sie ist wie
            Dein Personalausweis. Du kannst sie nicht gemeinsam mit anderen Personen nutzen. Deshalb
            kannst Du Deine persönlichen Daten zwar korrigieren, aber nicht für eine andere Person
            überschreiben. Wenn Du eine chaynsID für eine andere Person benötigst, kannst Du für sie
            eine anlegen.
        </p>
    ),
    title: 'Kann ich meine Daten im chayns Konto nachträglich ändern?',
};
