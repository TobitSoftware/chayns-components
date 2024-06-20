import { Meta, StoryFn } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { Icon } from '../src';
import Accordion from '../src/components/accordion/Accordion';
import AccordionContent from '../src/components/accordion/accordion-content/AccordionContent';
import AccordionGroup from '../src/components/accordion/accordion-group/AccordionGroup';
import AccordionItem from '../src/components/accordion/accordion-item/AccordionItem';
import Badge from '../src/components/badge/Badge';
import Button from '../src/components/button/Button';

export default {
    title: 'Core/Accordion',
    component: Accordion,
    args: {},
} as Meta<typeof Accordion>;

const Template: StoryFn<typeof Accordion> = ({ children, ...args }) => (
    <Accordion {...args} onTitleInputChange={undefined} onSearchChange={undefined}>
        {children}
    </Accordion>
);
const InputAsTitleTemplate: StoryFn<typeof Accordion> = ({ children, ...args }) => (
    <Accordion {...args} onSearchChange={undefined}>
        {children}
    </Accordion>
);

const MultipleAccordionsTemplate: StoryFn<typeof Accordion> = () => (
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

const WithSearchTemplate: StoryFn<typeof Accordion> = ({ children, ...args }) => {
    const [value, setValue] = useState(args.searchValue);

    const handleSearch = (event: ChangeEvent) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <Accordion
            {...args}
            searchValue={value}
            onTitleInputChange={undefined}
            onSearchChange={handleSearch}
        >
            {children}
        </Accordion>
    );
};

const ControlledAccordionTemplate: StoryFn<typeof Accordion> = ({ children, ...args }) => {
    const [isOpened, setIsOpened] = useState(false);

    const handleToggle = () => {
        setIsOpened((prev) => !prev);
    };

    return (
        <>
            <Button onClick={handleToggle}>Toggle</Button>
            <AccordionGroup>
                <Accordion {...args} isOpened={isOpened}>
                    {children}
                </Accordion>
                <Accordion {...args}>{children}</Accordion>
            </AccordionGroup>
        </>
    );
};

export const General = Template.bind({});

export const ControlledAccordion = ControlledAccordionTemplate.bind({});

export const MultipleAccordions = MultipleAccordionsTemplate.bind({});

export const WrappedAccordions = Template.bind({});

export const AccordionWithBadge = Template.bind({});

export const AccordionWithTitleElement = Template.bind({});

export const AccordionWithSearch = WithSearchTemplate.bind({});

export const AccordionWithBadgeAndSearch = WithSearchTemplate.bind({});

export const DisabledAccordion = Template.bind({});

export const ScrollableAccordion = Template.bind({});

export const WithAccordionItems = Template.bind({});

export const InputAsTitle = InputAsTitleTemplate.bind({});

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

InputAsTitle.args = {
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
    title: 'Lorem ipsum',
    onTitleInputChange: {},
    titleInputProps: {
        rightElement: (
            <div
                style={{
                    backgroundColor: '#3377b6',
                    height: '42px',
                    width: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Icon icons={['ts-calling-code']} size={25} color={'white'} />
            </div>
        ),
    },
};

ControlledAccordion.args = {
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
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor si amet.
        </AccordionContent>,
        <AccordionGroup isWrapped>
            <Accordion
                title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
            >
                <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </AccordionContent>
            </Accordion>
            <Accordion title="Justo duo dolores et ea rebum">
                <AccordionContent>
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </AccordionContent>
                <AccordionGroup isWrapped>
                    <Accordion title="At vero eos et accusam">
                        <AccordionContent>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua.
                        </AccordionContent>
                    </Accordion>
                    <Accordion title="Justo duo dolores et ea rebum">
                        <AccordionContent>
                            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                            gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                            ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua.
                        </AccordionContent>
                        <AccordionGroup isWrapped>
                            <Accordion title="At vero eos et accusam">
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                    aliquyam erat, sed diam voluptua.
                                </AccordionContent>
                            </Accordion>
                            <Accordion title="Justo duo dolores et ea rebum">
                                <AccordionContent>
                                    At vero eos et accusam et justo duo dolores et ea rebum. Stet
                                    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                                    dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                                    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                    labore et dolore magna aliquyam erat, sed diam voluptua.
                                </AccordionContent>
                            </Accordion>
                        </AccordionGroup>
                    </Accordion>
                </AccordionGroup>
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

ScrollableAccordion.args = {
    bodyMaxHeight: 200,
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum.
        </AccordionContent>
    ),
    onBodyScroll: console.debug,
    title: 'Lorem ipsum dolor sit amet',
};

WithAccordionItems.args = {
    children: (
        <>
            <AccordionItem>Lorem ipsum dolor sit amet</AccordionItem>
            <AccordionItem>Consetetur sadipscing elitr</AccordionItem>
            <AccordionItem>Sed diam nonumy eirmod tempor invidunt ut labore</AccordionItem>
            <AccordionItem>Et dolore magna aliquyam erat</AccordionItem>
            <AccordionGroup isWrapped>
                <Accordion title="At vero eos et accusam">
                    <AccordionItem>Consetetur sadipscing elitr</AccordionItem>
                    <AccordionItem>Sed diam nonumy eirmod tempor invidunt ut labore</AccordionItem>
                </Accordion>
            </AccordionGroup>
        </>
    ),
    title: 'Lorem ipsum dolor sit amet',
};
