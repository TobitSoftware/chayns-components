import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from '../src';
import Accordion from '../src/components/accordion/Accordion';
import AccordionContent from '../src/components/accordion/accordion-content/AccordionContent';
import AccordionGroup from '../src/components/accordion/accordion-group/AccordionGroup';
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
    <AccordionGroup>
        <Accordion title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr">
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.
            </AccordionContent>
        </Accordion>
        <Accordion title="Stet clita kasd gubergren, no sea takimata sanctus est dolor sit amet">
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
            </AccordionContent>
        </Accordion>
        <Accordion title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor">
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua.
            </AccordionContent>
        </Accordion>
    </AccordionGroup>
);

export const General = Template.bind({});

export const MultipleAccordions = MultipleAccordionsTemplate.bind({});

export const WrappedAccordions = Template.bind({});

export const AccordionWithBadge = Template.bind({});

export const AccordionWithTitleElement = Template.bind({});

export const AccordionWithSearch = Template.bind({});

export const AccordionWithBadgeAndSearch = Template.bind({});

export const DisabledAccordion = Template.bind({});

General.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum.
        </AccordionContent>
    ),
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
};

WrappedAccordions.args = {
    children: [
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet.
        </AccordionContent>,
        <AccordionGroup>
            <Accordion isWrapped title="At vero eos et accusam">
                <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </AccordionContent>
            </Accordion>
            <Accordion isWrapped title="Justo duo dolores et ea rebum">
                <AccordionContent>
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </AccordionContent>
            </Accordion>
        </AccordionGroup>,
    ],
    title: 'Lorem ipsum dolor sit amet',
};

AccordionWithBadge.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
        </AccordionContent>
    ),
    rightElement: <Badge>10.000 Euro</Badge>,
    title: 'Lorem ipsum dolor sit amet',
};

AccordionWithTitleElement.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
        </AccordionContent>
    ),
    title: 'Lorem ipsum dolor sit amet',
    titleElement: <Icon icons={['fa fa-download']} />,
};

AccordionWithSearch.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
        </AccordionContent>
    ),
    onSearchChange: () => {},
    searchIcon: ['fa fa-search'],
    searchPlaceholder: 'Suchen',
    title: 'Lorem ipsum dolor sit amet',
};

AccordionWithBadgeAndSearch.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
        </AccordionContent>
    ),
    onSearchChange: () => {},
    rightElement: <Badge>124</Badge>,
    searchPlaceholder: 'Suchen',
    title: 'Lorem ipsum dolor sit amet',
};

DisabledAccordion.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
        </AccordionContent>
    ),
    isDisabled: true,
    title: 'Lorem ipsum dolor sit amet',
};
