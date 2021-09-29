import { ComponentStory, ComponentMeta } from '@storybook/react';

import Accordion from '../src/components/accordion/Accordion';
import AccordionContent from '../src/components/accordion/accordion-content/AccordionContent';
import Badge from '../src/components/badge/Badge';

export default {
    title: 'Core/Accordion',
    component: Accordion,
    args: {},
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = ({ children, ...args }) => (
    <Accordion {...args}>{children}</Accordion>
);

const MultipleAccordionsTemplate: ComponentStory<typeof Accordion> = () => (
    <>
        <Accordion
            group="root"
            title="Wie genau sind Schnelltests und muss ich selbst etwas dabei beachten?"
        >
            <AccordionContent>
                Mit so genannten PoC Schnelltests können Corona-Infektionen ziemlich gut
                nachgewiesen werden. Ihre Genauigkeit hängt von der Art des Tests und der
                fachgerechten Durchführung ab. Aber auch Du kannst etwas zur Genauigkeit Deines
                Ergebnisses beitragen: Da Nahrungsmittel, Zahncreme oder Mundwasser das Ergebnis
                beeinflussen können, solltest Du mindestens 15 Minuten vor dem Test nichts davon in
                Deinem Mund gehabt haben. Einige Teststellen bieten auch so genannte „Lollitests“
                unter fachlicher Aufsicht an. Zu beachten ist dabei, dass sie zwar angenehmer als
                die üblichen Nasen-/Rachen-Abstrichtests sind, aber auch fehleranfälliger.
                Insbesondere Nahrungsmittel können vermehrt falsch positive Ergebnisse hervor rufen.
                Umgekehrt können auch tatsächliche Infektionen eher unentdeckt bleiben, wenn die
                Tests nicht fachgerecht angewendet werden. Mindestens 90 Sekunden intensives
                Lutschen sind für ein qualifiziertes Ergebnis Voraussetzung. Schnelltests, die mit
                einem Nasen-/Rachenabstrich durchgeführt werden, können auch keine Hundertprozentige
                Sicherheit gewährleisten, sind aber weniger fehleranfällig. Im Interesse einer
                wirksamen Pandemiebekämpfung empfehlen wir im Zweifel den genaueren Test zu wählen.
            </AccordionContent>
        </Accordion>
        <Accordion group="root" title="Kann ich einen Termin auch wieder absagen?">
            <AccordionContent>
                Ja. Das geht genauso einfach wie die Buchung. Auf Deiner Terminbestätigungsseite
                findest Du den Punkt „Absagen“.
            </AccordionContent>
        </Accordion>
        <Accordion group="root" title="Kann ich mich mehrmals testen lassen?">
            <AccordionContent>
                Ja. Bei Teststellen, die bei corona.chayns.de angeschlossen sind, kannst Du Dich so
                oft testen lassen, wie Du magst. Und zwar grundsätzlich kostenlos! Es war wohl eine
                missverständliche Formulierung der Bundesregierung, die für Verunsicherung gesorgt
                hat. (Sie hat es ja auch gerade nicht leicht, sich richtig zu erklären...). Bei der
                Aussage, jeder Bundesbürger könne sich ab sofort mindestens einmal pro Woche
                kostenlos auf Corona testen lassen, ging es um das Versprechen. Man hat dadurch also
                ganz offiziell einen Rechtsanspruch. Und dank der vielen Teststellen, die ihre
                Kapazitäten dynamisch anpassen, wird er auch locker erfüllt.
            </AccordionContent>
        </Accordion>
    </>
);

export const General = Template.bind({});

export const MultipleAccordions = MultipleAccordionsTemplate.bind({});

export const WrappedAccordions = Template.bind({});

export const AccordionWithBadge = Template.bind({});

General.args = {
    children: (
        <AccordionContent>
            Ja. Öffne das Menü über das entsprechende Symbol oben links auf der Seite, tippe auf
            Deinen Namen und wähle dann den Bereich „chaynsID“. Hier kannst Du Deine persönlichen
            Daten anpassen. Bitte beachte, dass Deine chaynsID Dir persönlich gehört. Sie ist wie
            Dein Personalausweis. Du kannst sie nicht gemeinsam mit anderen Personen nutzen. Deshalb
            kannst Du Deine persönlichen Daten zwar korrigieren, aber nicht für eine andere Person
            überschreiben. Wenn Du eine chaynsID für eine andere Person benötigst, kannst Du für sie
            eine anlegen.
        </AccordionContent>
    ),
    title: 'Kann ich meine Daten im chayns Konto nachträglich ändern?',
};

WrappedAccordions.args = {
    children: (
        <>
            <AccordionContent>
                Die Domain für das Smartphone-Zeitalter: Mit chayns calling codes lassen sich
                einfach Informationen und Anwendungen aufrufen und sogar komplexe Funktionen direkt
                ausführen. Damit können Personen z.B. einfach per QR-Code-Scan ein Fahrrad
                reservieren, ihr Lieblingsgetränk an den Tisch bestellen oder am Markt ihre Einkäufe
                mit ihrer chaynsID bezahlen.
            </AccordionContent>
            <Accordion group="callingCodes" isWrapped title="Rückverfolgung">
                <AccordionContent>
                    Für die Rückverfolgung eventueller Infektionsketten können alle calling
                    code-Scans für bis zu 4 Wochen gespeichert werden. Über den Namen oder die
                    chaynsID der Person lassen sich so alle Kontakte herausfinden, die im Zeitraum
                    den selben Code wie die erkrankte Person gescannt haben.
                </AccordionContent>
            </Accordion>
            <Accordion group="callingCodes" isWrapped title="Meine Codes">
                <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                    vero eos et accusam et justo duo dolores et ea rebum.
                </AccordionContent>
            </Accordion>
        </>
    ),
    title: 'calling codes',
};

AccordionWithBadge.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
        </AccordionContent>
    ),
    right: <Badge>noch 10.000 Euro</Badge>,
    title: 'Bonus Aktion',
};
