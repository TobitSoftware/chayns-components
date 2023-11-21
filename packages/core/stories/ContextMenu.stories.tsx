import { Meta, StoryFn } from '@storybook/react';
import Accordion from '../src/components/accordion/Accordion';
import AccordionContent from '../src/components/accordion/accordion-content/AccordionContent';
import ContextMenu from '../src/components/context-menu/ContextMenu';

export default {
    title: 'Core/ContextMenu',
    component: ContextMenu,
    args: {
        items: [
            {
                icons: ['fa fa-pencil'],
                key: 'rename',
                onClick: () => alert('Option "Umbenennen" wurde geklickt...'),
                text: 'Umbenennen',
            },
            {
                icons: ['fa fa-eye'],
                key: 'show',
                onClick: () => alert('Option "Einblenden" wurde geklickt...'),
                text: 'Einblenden',
            },
            {
                icons: ['fa fa-trash'],
                key: 'delete',
                onClick: () => alert('Option "Löschen" wurde geklickt...'),
                text: 'Löschen',
            },
        ],
    },
} as Meta<typeof ContextMenu>;

const Template: StoryFn<typeof ContextMenu> = ({ children, ...args }) => (
    <>
        <h1>Context Menu Example</h1>
        <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.
        </p>
        <Accordion
            rightElement={<ContextMenu {...args}>{children}</ContextMenu>}
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        >
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </AccordionContent>
        </Accordion>
    </>
);

export const General = Template.bind({});
