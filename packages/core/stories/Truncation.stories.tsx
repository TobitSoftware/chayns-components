import { Meta, StoryFn } from '@storybook/react';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import Accordion from '../src/components/accordion/Accordion';
import AccordionContent from '../src/components/accordion/accordion-content/AccordionContent';
import Button from '../src/components/button/Button';
import Truncation from '../src/components/truncation/Truncation';
import { ChaynsHost, initModuleFederationSharing, useFunctions, useValues } from 'chayns-api';
import { TruncationProps } from '../lib/types/components/truncation/Truncation';

const BASE_HTML_TEXT = (
    <div>
        <p id="isPasted">
            Der legendärste Abend: Homecoming at next! Studenten und Ausreißer, Urlauber und
            Daheimgebliebene, Partymäuse und Partymuffel – sie alle zieht es am Tag vor Heiligabend
            in die Heimat an einen zuvor ausgemachten Ort, um all die guten Freunde und alte
            Bekannte wiederzutreffen.
        </p>
        <p>
            Was damals vor vielen Jahren auf der StattAlm auf dem Campus in Ahaus begann, führen wir
            bei uns im next fort!&nbsp;
        </p>
        <p>Alle Infos und Tickets zum Event in Kürze.&nbsp;</p>
        <Button onClick={() => alert('hallo')}>test</Button>
    </div>
);

export default {
    title: 'Core/Truncation',
    component: Truncation,
    args: {
        collapsedHeight: 100,
        children: BASE_HTML_TEXT,
    },
} as Meta<typeof Truncation>;

const Template: StoryFn<typeof Truncation> = ({ children, ...args }) => (
    <>
        {' '}
        <Truncation {...args}>{children}</Truncation>Der legendärste Abend: Homecoming at next!
        Studenten und Ausreißer, Urlauber und Daheimgebliebene, Partymäuse und Partymuffel – sie
        alle zieht es am Tag vor Heiligabend in die Heimat an einen zuvor ausgemachten Ort, um all
        die guten Freunde und alte Bekannte wiederzutreffen.
    </>
);

export const General = Template.bind({});
export const AnimatedChildren = Template.bind({});

export const SmallText = Template.bind({});

export const JustText = Template.bind({});

AnimatedChildren.args = {
    children: (
        <>
            <p id="isPasted">
                Der legendärste Abend: Homecoming at next! Studenten und Ausreißer, Urlauber und
                Daheimgebliebene, Partymäuse und Partymuffel – sie alle zieht es am Tag vor
                Heiligabend in die Heimat an einen zuvor ausgemachten Ort, um all die guten Freunde
                und alte Bekannte wiederzutreffen.
            </p>
            <Accordion title="Lorem">
                <AccordionContent>
                    Der legendärste Abend: Homecoming at next! Studenten und Ausreißer, Urlauber und
                    Daheimgebliebene, Partymäuse und Partymuffel – sie alle zieht es am Tag vor
                    Heiligabend in die Heimat an einen zuvor ausgemachten Ort, um all die guten
                    Freunde und alte Bekannte wiederzutreffen.
                </AccordionContent>
            </Accordion>
            <p>
                Was damals vor vielen Jahren auf der StattAlm auf dem Campus in Ahaus begann, führen
                wir bei uns im next fort!&nbsp;
            </p>
            <p>Alle Infos und Tickets zum Event in Kürze.&nbsp;</p>
            <Button onClick={() => alert('hallo')}>test</Button>
        </>
    ),
};

SmallText.args = {
    children: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
};

JustText.args = {
    children: (
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia diam ut nisi
            lacinia vestibulum. Donec sit amet euismod nisl. Morbi orci ipsum, lacinia in eros sit
            amet, pulvinar vestibulum tellus. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Praesent non blandit ipsum. Aliquam libero quam,
            fermentum sit amet massa id, gravida hendrerit ex. Donec lectus felis, feugiat eget
            finibus eu, luctus id nunc. Nam at nibh magna. Integer congue aliquam turpis quis
            iaculis. Quisque vestibulum sodales placerat. Cras semper ex quis feugiat pharetra. Nam
            lacinia magna non vulputate ullamcorper. Vestibulum at orci nec ligula efficitur
            volutpat eu eget enim. Ut tempus aliquet arcu, sit amet fringilla mi elementum sodales.
            Nulla ut ullamcorper tortor, in hendrerit enim. Etiam vel vestibulum massa. Mauris
            placerat, turpis vitae pharetra dapibus, libero lacus bibendum metus, nec condimentum
            erat magna a neque. Ut euismod tincidunt tempus. Suspendisse ut velit id justo
            vestibulum ullamcorper nec sit amet risus. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            vestibulum, nibh eget efficitur venenatis, ipsum nibh rutrum massa, a posuere justo est
            a metus. Donec a feugiat diam. Aliquam scelerisque in magna euismod accumsan. Maecenas
            non vulputate nibh. Suspendisse scelerisque tristique augue, quis gravida felis tempor
            sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Phasellus id eros eu ante pellentesque iaculis. Nullam porttitor mattis
            lorem, a dapibus massa maximus nec. Maecenas consequat pharetra volutpat. Phasellus
            finibus nisi in felis posuere condimentum. Aenean congue ornare est, ac maximus nulla
            fermentum a. Etiam erat purus, ullamcorper ac dolor vel, pellentesque pellentesque
            tortor. Nulla vitae ligula id lectus commodo ornare sed ac dolor. Aenean tincidunt
            sodales quam a rutrum. Proin ac nisi eu justo ultrices iaculis vel eget nisi. Aliquam at
            mattis nisl. Nunc pellentesque eleifend vehicula. Cras convallis eget nisl non laoreet.
            Nulla facilisi. In ultrices massa a ornare interdum. Sed pellentesque odio posuere
            malesuada imperdiet. Duis ac dapibus orci. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Mauris volutpat in arcu ut laoreet.
            Donec a porta mauris. Nulla viverra congue nisl, ut lobortis mi consequat ut. Phasellus
            non eros ut erat venenatis dictum. Sed purus dui, consequat et malesuada nec, molestie
            ac odio.
        </p>
    ),
};

const FloatingImageTemplate: StoryFn<typeof Truncation> = ({ children, ...args }) => {
    const [content, setContent] = useState<ReactElement>(<></>);

    useEffect(() => {
        window.setTimeout(() => {
            setContent(children);
        }, 2000);
    }, []);

    return <Truncation {...args}>{content}</Truncation>;
};

export const FloatingImage = FloatingImageTemplate.bind({});
FloatingImage.args = {
    children: (
        <div>
            <img style={{ float: 'right' }} alt="" src="https://picsum.photos/200" />
            <div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia diam ut
                    nisi lacinia vestibulum. Donec sit amet euismod nisl. Morbi orci ipsum, lacinia
                    in eros sit amet, pulvinar vestibulum tellus. Orci varius natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Praesent non blandit
                    ipsum. Aliquam libero quam, fermentum sit amet massa id, gravida hendrerit ex.
                    Donec lectus felis, feugiat eget finibus eu, luctus id nunc. Nam at nibh magna.
                    Integer congue aliquam turpis quis iaculis. Quisque vestibulum sodales placerat.
                    Cras semper ex quis feugiat pharetra.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia diam ut
                    nisi lacinia vestibulum. Donec sit amet euismod nisl. Morbi orci ipsum, lacinia
                    in eros sit amet, pulvinar vestibulum tellus. Orci varius natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Praesent non blandit
                    ipsum. Aliquam libero quam, fermentum sit amet massa id, gravida hendrerit ex.
                    Donec lectus felis, feugiat eget finibus eu, luctus id nunc. Nam at nibh magna.
                    Integer congue aliquam turpis quis iaculis. Quisque vestibulum sodales placerat.
                    Cras semper ex quis feugiat pharetra.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia diam ut
                    nisi lacinia vestibulum. Donec sit amet euismod nisl. Morbi orci ipsum, lacinia
                    in eros sit amet, pulvinar vestibulum tellus. Orci varius natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Praesent non blandit
                    ipsum. Aliquam libero quam, fermentum sit amet massa id, gravida hendrerit ex.
                    Donec lectus felis, feugiat eget finibus eu, luctus id nunc. Nam at nibh magna.
                    Integer congue aliquam turpis quis iaculis. Quisque vestibulum sodales placerat.
                    Cras semper ex quis feugiat pharetra.
                </p>
            </div>
        </div>
    ),
    collapsedHeight: 350,
};

const TextEditorTemplate: StoryFn<TruncationProps & { content: string }> = ({
    content,
    ...truncationProps
}) => {
    initModuleFederationSharing({ name: 'chayns_components' });
    const [chaynsLoaded, setChaynsLoaded] = useState(false);

    const functions = useFunctions();
    const values = useValues();

    useEffect(() => {
        if (chaynsLoaded) return;
        const script = document.createElement('script');

        script.src = 'https://api.chayns-static.space/js/v4.0/chayns.min.js';
        script.async = true;
        script.onload = () => {
            setChaynsLoaded(true);
        };

        document.body.appendChild(script);
    }, [chaynsLoaded]);

    if (!chaynsLoaded) {
        return <div />;
    }

    return (
        <Truncation {...truncationProps}>
            <ChaynsHost
                type="client-module"
                system={{
                    url: 'https://tapp.chayns-static.space/chayns-text-editor/v2/remoteEntry.js',
                    scope: 'chayns_text_editor_2',
                    module: './TextComponent',
                }}
                functions={functions}
                {...values}
                customData={{ content }}
            />
        </Truncation>
    );
};

export const TextEditor = TextEditorTemplate.bind({});

TextEditor.args = {
    collapsedHeight: 100,
    content:
        '<p id="isPasted">Ungewohnte Hörerfahrungen machten die Besucher des Konzertes „Geordnetes Chaos“ im vollbesetzten Saal des LernWerkes. Mit höchster Könnerschaft und Präsenz trugen die vier Musiker des Chaos String Quartet Werke vor, die nach einem strengen Bauplan komponiert wurden, im Höreindruck jedoch etwas Ratlosigkeit hervorrufen, vor allem bei Beethovens Großer Fuge op. 133 und Ligetis 2. Streichquartett. Tröstlich erschienen u.a. die Stücke von Bach und spätestens nach der Zugabe eines Satzes von Dvorak war dann die Hörwelt wieder „in Ordnung“. Viel Beifall für die vier sympathischen Musiker und ihr ungewöhnliches Konzert.</p>',
};
