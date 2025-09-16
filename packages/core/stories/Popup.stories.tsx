import { Meta, StoryFn } from '@storybook/react';
import Button from '../src/components/button/Button';
import Popup from '../src/components/popup/Popup';
import React from 'react';

export default {
    title: 'Core/Popup',
    component: Popup,
    args: {
        content: (
            <span style={{ display: 'block' }}>
                <h1 style={{ margin: 0 }}>Popup</h1>
                <p>Das ist ein Popup!</p>
            </span>
        ),
    },
} as Meta<typeof Popup>;

const Template: StoryFn<typeof Popup> = ({ ...args }) => (
    <>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan sagittis dolor,
            vitae iaculis lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Donec cursus, ipsum a consectetur pellentesque, leo tortor
            vestibulum diam, in elementum arcu dui vitae nibh.
        </p>
        <Popup {...args}>
            <Button onClick={() => {}}>Popup öffnen</Button>
        </Popup>
    </>
);

export const General = Template.bind({});

export const LongContent = Template.bind({});

LongContent.args = {
    content: (
        <div style={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div>A - Apfel</div>
            <div>B - Baum</div>
            <div>C - Computer</div>
            <div>D - Dach</div>
            <div>E - Elefant</div>
            <div>F - Fahrrad</div>
            <div>G - Gitarre</div>
            <div>H - Haus</div>
            <div>I - Insel</div>
            <div>J - Jaguar</div>
            <div>K - Känguru</div>
            <div>L - Lampe</div>
            <div>M - Mond</div>
            <div>N - Nase</div>
            <div>O - Orange</div>
            <div>P - Papier</div>
            <div>Q - Quelle</div>
            <div>R - Rakete</div>
            <div>S - Sonne</div>
            <div>T - Tiger</div>
            <div>U - Uhr</div>
            <div>V - Vogel</div>
            <div>W - Wasser</div>
            <div>X - Xylophon</div>
            <div>Y - Yacht</div>
            <div>Z - Zitrone</div>
        </div>
    ),
};
