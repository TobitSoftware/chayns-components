import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Truncation } from '../src';

const BASE_HTML_TEXT =
    '<p id="isPasted">Diese gebrauchte Samsung Galaxy Watch4 Classic, ' +
    '46 mm, schwarz mit LTE und grauen Armband hat einen deutlichen Kratzer auf dem Display.&nbsp;</p>' +
    '<p>Verkauf im Originalkarton komplett mit Zubehör.</p><p><strong>technische Daten:</strong></p><ul>' +
    '<li>Displaygröße 3,45 cm</li><li>UMTS, LTE</li><li>Akku 247 mAh</li><li>Farbe Schwarz</li>' +
    '<li>interner Speicher 16 GB</li><li>Abmessungen 45,5 x 45,5 x 11,0 mm</li></ul>';
export default {
    title: 'Truncation/Truncation',
    component: Truncation,
    args: {
        collapsedHeight: 100,
        children: BASE_HTML_TEXT,
    },
} as ComponentMeta<typeof Truncation>;

const Template: ComponentStory<typeof Truncation> = ({ children, ...args }) => (
    <Truncation {...args}>
        <div
            dangerouslySetInnerHTML={{
                __html: children,
            }}
        />
    </Truncation>
);

export const General = Template.bind({});

export const LargeText = Template.bind({});
LargeText.args = { children: BASE_HTML_TEXT.repeat(5) };
export const SmallText = Template.bind({});
SmallText.args = {
    children: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
};
