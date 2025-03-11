import { Meta, StoryFn } from '@storybook/react';
import { ChangeEvent, useRef, useState } from 'react';
import { Icon } from '../src';
import Accordion from '../src/components/accordion/Accordion';
import AccordionContent from '../src/components/accordion/accordion-content/AccordionContent';
import AccordionGroup from '../src/components/accordion/accordion-group/AccordionGroup';
import AccordionItem from '../src/components/accordion/accordion-item/AccordionItem';
import Badge from '../src/components/badge/Badge';
import Button from '../src/components/button/Button';
import List from '../src/components/list/List';
import ListItemContent from '../src/components/list/list-item/list-item-content/ListItemContent';
import ListItem from '../src/components/list/list-item/ListItem';

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

const locationImages = [
    'https://sub60.tobit.com/l/1',
    'https://sub60.tobit.com/l/2',
    'https://sub60.tobit.com/l/3',
];

const MultipleAccordionsTemplate: StoryFn<typeof Accordion> = () => (
    <AccordionGroup>
        <Accordion key="first" title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr">
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
        <Accordion
            key="second"
            title="Stet clita kasd gubergren, no sea takimata sanctus est dolor sit amet"
        >
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
            </AccordionContent>
        </Accordion>
        <Accordion
            key="third"
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
        >
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
                <Accordion key="first" {...args} isOpened={isOpened}>
                    {children}
                </Accordion>
                <Accordion key="second" {...args}>
                    {children}
                </Accordion>
            </AccordionGroup>
        </>
    );
};

const HiddenBottomLinesTemplate: StoryFn<typeof Accordion> = ({ children, ...args }) => {
    return (
        <>
            <AccordionGroup>
                <Accordion
                    key="first"
                    {...args}
                    title="1"
                    shouldHideBottomLine
                    onTitleInputChange={undefined}
                >
                    {children}
                </Accordion>
                <Accordion
                    key="second"
                    {...args}
                    title="2"
                    shouldHideBottomLine
                    onTitleInputChange={undefined}
                >
                    {children}
                </Accordion>
            </AccordionGroup>
        </>
    );
};

export const DynamicLoadingTemplate: StoryFn<typeof Accordion> = () => {
    const [items, setItems] = useState<{ id: number; name: string }[]>([]);

    let countRef = useRef(0);

    const handleCreateItems = () => {
        const newItems = Array.from({ length: 10 }, (_, index) => ({
            id: index + countRef.current,
            name: `Item ${index + countRef.current}`,
        }));

        setItems((current) => [...current, ...newItems]);

        countRef.current += 10;
    };

    return (
        <>
            <Button onClick={handleCreateItems}>Create Items</Button>
            <Accordion key="global" title="Items">
                <AccordionGroup isWrapped>
                    {items.map((item) => (
                        <Accordion key={item.id} title={item.name}>
                            <AccordionContent>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                                no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            </AccordionContent>
                        </Accordion>
                    ))}
                </AccordionGroup>
            </Accordion>
        </>
    );
};

export const General = Template.bind({});

export const ControlledAccordion = ControlledAccordionTemplate.bind({});

export const MultipleAccordions = MultipleAccordionsTemplate.bind({});

export const DynamicLoading = DynamicLoadingTemplate.bind({});

export const WrappedAccordions = Template.bind({});

export const AccordionWithBadge = Template.bind({});

export const AccordionWithTitleElement = Template.bind({});

export const AccordionWithSearch = WithSearchTemplate.bind({});

export const AccordionWithBadgeAndSearch = WithSearchTemplate.bind({});

export const DisabledAccordion = Template.bind({});

export const ScrollableAccordion = Template.bind({});

export const WithAccordionItems = Template.bind({});

export const InputAsTitle = InputAsTitleTemplate.bind({});

export const WrappedAccordionWithListItems = Template.bind({});

export const HiddenBottomLines = HiddenBottomLinesTemplate.bind({});

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
        <AccordionGroup>
            <Accordion
                key="first"
                title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
            >
                <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </AccordionContent>
            </Accordion>
            <Accordion key="second" title="Justo duo dolores et ea rebum">
                <AccordionContent>
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </AccordionContent>
                <AccordionGroup>
                    <Accordion key="first_wrapped" title="At vero eos et accusam">
                        <AccordionContent>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua.
                        </AccordionContent>
                    </Accordion>
                    <Accordion key="second_wrapped" title="Justo duo dolores et ea rebum">
                        <AccordionContent>
                            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                            gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                            ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua.
                        </AccordionContent>
                        <AccordionGroup>
                            <Accordion key="first_deep_wrapped" title="At vero eos et accusam">
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                    aliquyam erat, sed diam voluptua.
                                </AccordionContent>
                            </Accordion>
                            <Accordion
                                key="first_deep_wrapped"
                                title="Justo duo dolores et ea rebum"
                            >
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
                <Accordion key="first" title="At vero eos et accusam">
                    <AccordionItem>Consetetur sadipscing elitr</AccordionItem>
                    <AccordionItem>Sed diam nonumy eirmod tempor invidunt ut labore</AccordionItem>
                </Accordion>
            </AccordionGroup>
        </>
    ),
    title: 'Lorem ipsum dolor sit amet',
};

WrappedAccordionWithListItems.args = {
    children: (
        <>
            <List>
                <ListItem images={[locationImages[0]]} title="Tolor tantem">
                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                </ListItem>
                <ListItem images={[locationImages[0]]} shouldHideIndicator title="Tolor tantem">
                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                </ListItem>
                <ListItem title="Tolor tantem">
                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                </ListItem>
                <ListItem shouldHideIndicator title="Tolor tantem">
                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                </ListItem>
            </List>
            <AccordionGroup isWrapped>
                <Accordion title="Lorem ipsum">
                    <List>
                        <ListItem images={[locationImages[0]]} title="Tolor tantem">
                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                        </ListItem>
                        <ListItem
                            images={[locationImages[0]]}
                            shouldHideIndicator
                            title="Tolor tantem"
                        >
                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                        </ListItem>
                        <ListItem title="Tolor tantem">
                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                        </ListItem>
                        <ListItem shouldHideIndicator title="Tolor tantem">
                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                        </ListItem>
                    </List>
                </Accordion>
                <Accordion title="Lorem ipsum sit dolor atem">
                    <AccordionGroup isWrapped>
                        <Accordion title="Dolor sit amet">
                            <List>
                                <ListItem images={[locationImages[0]]} title="Tolor tantem">
                                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                </ListItem>
                                <ListItem
                                    images={[locationImages[0]]}
                                    shouldHideIndicator
                                    title="Tolor tantem"
                                >
                                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                </ListItem>
                                <ListItem title="Tolor tantem">
                                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                </ListItem>
                                <ListItem shouldHideIndicator title="Tolor tantem">
                                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                </ListItem>
                            </List>
                        </Accordion>
                    </AccordionGroup>
                </Accordion>
            </AccordionGroup>
        </>
    ),
    title: 'Lorem ipsum dolor sit amet',
};
