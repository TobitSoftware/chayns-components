import {Meta, StoryFn} from '@storybook/react';
import {Badge, Icon} from '../src';
import Button from '../src/components/button/Button';
import List from '../src/components/list/List';
import ListItemContent from '../src/components/list/list-item/list-item-content/ListItemContent';
import ListItem from '../src/components/list/list-item/ListItem';

export default {
    title: 'Core/List',
    component: List,
    args: {},
} as Meta<typeof List>;

const Template: StoryFn<typeof List> = ({children}) => <List>{children}</List>;

export const General = Template.bind({});

export const ListItemsWithImage = Template.bind({});

export const ListItemsWithGridImage = Template.bind({});

export const ListItemsWithRightElements = Template.bind({});

export const ListItemsWithSeparator = Template.bind({});

export const ListItemsWithButtonAsRightElements = Template.bind({});

export const ListItemsWithHoverItem = Template.bind({});

export const ListItemsWithIcon = Template.bind({});

export const ExpandableListItems = Template.bind({});

export const MixedListItems = Template.bind({});

export const ListItemWithTitleElement = Template.bind({});

export const ListItemWithGreyedTitle = Template.bind({});

export const ListItemWithHiddenBottomLines = Template.bind({});

const images = [
    'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
    'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
    'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
    'https://tsimg.cloud/77896-21884/fce5e30f68c75c8c524cc9ac0887832f263b79ff.png',
];

const locationImages = [
    'https://sub60.tobit.com/l/1',
    'https://sub60.tobit.com/l/2',
    'https://sub60.tobit.com/l/3',
];

const otherImages = [
    'https://tsimg.cloud/77896-21884/436c7140eb430a0fa486aa737a953626cc83c22a.jpg',
    'https://tsimg.cloud/77896-21884/2268d6644b6a24f0fed7378f7263c1ee3fdb6d01.jpg',
    'https://tsimg.cloud/77896-21884/8c380d25c782f88007f0acc923d465848bac49af.jpg',
    'https://tsimg.cloud/77896-21884/2b52c3fd7059aeacad23cd8c36779477cb25e902.jpg',
];

General.args = {
    children: [
        <ListItem
            subtitle="Stet clita kasd gubergren"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            subtitle="Lorem ipsum dolor sit amet"
            title="Stet clita kasd gubergren, no sea takimata sanctus est"
        />,
        <ListItem
            subtitle="Consetetur sadipscing elitr"
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor sea takimata sanctus est"
        />,
        <ListItem
            subtitle="No sea takimata sanctus est"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
    ],
};

ListItemsWithImage.args = {
    children: [
        <ListItem
            images={[images[0]]}
            subtitle="Sadipscing elitr dolor sit"
            shouldShowRoundImageOrIcon
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={[images[1]]}
            subtitle="Stet clita kasd gubergren"
            shouldShowRoundImageOrIcon
            title="Stet clita kasd gubergren, no sea takimata sanctus est"
        />,
        <ListItem
            images={[images[2]]}
            subtitle="At vero eos et accusam"
            shouldShowRoundImageOrIcon
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
        />,
        <ListItem
            images={[images[3]]}
            subtitle="Dolor sit ipsum amet"
            shouldShowRoundImageOrIcon
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
    ],
};

ListItemWithHiddenBottomLines.args = {
    children: [
        <ListItem
            images={[images[0]]}
            subtitle="Sadipscing elitr dolor sit"
            shouldHideBottomLine
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={[images[1]]}
            subtitle="Stet clita kasd gubergren"
            shouldHideBottomLine
            title="Stet clita kasd gubergren, no sea takimata sanctus est"
        />,
        <ListItem
            images={[images[2]]}
            subtitle="At vero eos et accusam"
            shouldHideBottomLine
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
        />,
        <ListItem
            images={[images[3]]}
            subtitle="Dolor sit ipsum amet"
            shouldHideBottomLine
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
    ],
};

ListItemsWithGridImage.args = {
    children: [
        <ListItem
            images={images}
            subtitle="Sadipscing elitr dolor sit"
            shouldShowRoundImageOrIcon
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={otherImages}
            subtitle="Dolor sit ipsum amet"
            shouldShowRoundImageOrIcon
            title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
        />,
    ],
};

ListItemsWithRightElements.args = {
    children: [
        <ListItem
            images={[locationImages[0]]}
            rightElements={{
                top: '09:01 Uhr',
                bottom: (
                    <Badge backgroundColor="red" fontColor="white">
                        1
                    </Badge>
                ),
            }}
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={[locationImages[1]]}
            rightElements="08:59 Uhr"
            title="No sea takimata sanctus est Lorem ipsum dolor sit amet"
        />,
        <ListItem
            images={[locationImages[1]]}
            rightElements={{
                top: (
                    <Badge backgroundColor="lightgreen" fontColor="white">
                        - 13,54%
                    </Badge>
                ),
                bottom: 'Bottom',
                center: <Icon icons={['fa fa-star']}/>,
            }}
            subtitle="Dolor sit ipsum amet"
            title="gubergren, no sea takimata"
        />,
        <ListItem
            images={[locationImages[2]]}
            rightElements={{
                top: '08:57 Uhr',
            }}
            subtitle="Dolor sit ipsum amet"
            title="sanctus est lorem ipsum dolor sit amet"
        />,
        <ListItem
            images={[locationImages[2]]}
            rightElements={{
                bottom: '08:57 Uhr',
            }}
            subtitle="Dolor sit ipsum amet"
            title="sanctus est lorem ipsum dolor sit amet"
        />,
        <ListItem
            images={[locationImages[2]]}
            rightElements={{
                top: 'Top',
                bottom: '08:57 Uhr',
                topAlignment: 'start',
            }}
            subtitle="Dolor sit ipsum amet"
            title="sanctus est lorem ipsum dolor sit amet"
        />,
    ],
};

ListItemWithGreyedTitle.args = {
    children: [
        <ListItem
            images={[locationImages[0]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
            isTitleGreyed
        ><ListItemContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet.
        </ListItemContent></ListItem>,
        <ListItem
            images={[locationImages[1]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        ><ListItemContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet.
        </ListItemContent></ListItem>,
        <ListItem
            images={[locationImages[2]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
            isTitleGreyed
        ><ListItemContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet.
        </ListItemContent></ListItem>,
        <ListItem
            images={[locationImages[0]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        ><ListItemContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet.
        </ListItemContent></ListItem>,
        <ListItem
            images={[locationImages[1]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
            isTitleGreyed
        ><ListItemContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet.
        </ListItemContent></ListItem>,
        <ListItem
            images={[locationImages[2]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        ><ListItemContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet.
        </ListItemContent></ListItem>,
    ],
}

ListItemsWithSeparator.args = {
    children: [
        <ListItem
            images={[locationImages[0]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={[locationImages[1]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={[locationImages[2]]}
            shouldShowSeparatorBelow
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={[locationImages[0]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={[locationImages[1]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            images={[locationImages[2]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
    ],
};

ListItemsWithButtonAsRightElements.args = {
    children: [
        <ListItem images={[otherImages[0]]} subtitle="Max Mustermann" title="Ballermann Hits">
            <List>
                <ListItem
                    images={[locationImages[0]]}
                    subtitle="Julian Sommer"
                    title="Oben Ohne"
                    rightElements={{
                        center: (
                            <Button icon="fa fa-plus" onClick={() => {
                            }}>
                                Hinzufügen
                            </Button>
                        ),
                    }}
                />
                <ListItem
                    images={[locationImages[1]]}
                    subtitle="Julian Sommer"
                    title="Morgen kickt der Kater"
                    rightElements={{
                        center: (
                            <Button icon="fa fa-plus" onClick={() => {
                            }}>
                                Hinzufügen
                            </Button>
                        ),
                    }}
                />
                <ListItem
                    images={[locationImages[2]]}
                    subtitle="Bierkapitän x Eko Fresh"
                    title="Ihr könnt mich alle"
                    rightElements={{center: <Badge>Hinzugefügt</Badge>}}
                />
            </List>
        </ListItem>,
        <ListItem images={[otherImages[1]]} subtitle="Doris Musterfrau" title="Vevo Top Hits"/>,
    ],
};

ListItemsWithHoverItem.args = {
    children: [
        <ListItem
            hoverItem={<Icon icons={['far fa-arrows-v']}/>}
            images={[locationImages[0]]}
            subtitle="Sadipscing elitr dolor sit"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            hoverItem={<Icon icons={['far fa-arrows-v']}/>}
            images={[locationImages[1]]}
            subtitle="Dolor sit ipsum amet"
            title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
        />,
    ],
};

ListItemsWithIcon.args = {
    children: [
        <ListItem
            icons={['ts-chayns']}
            subtitle="Sed diam voluptua"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            icons={['ts-chayns']}
            subtitle="At vero eos et accusam"
            title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
        />,
        <ListItem
            icons={['ts-chayns']}
            subtitle="Stet clita kasd gubergren"
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
        />,
        <ListItem
            icons={['ts-chayns']}
            subtitle="At vero eos et accusam et justo duo"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
    ],
};

ExpandableListItems.args = {
    children: [
        <ListItem
            images={[images[0]]}
            shouldShowRoundImageOrIcon
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        >
            <ListItemContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.
            </ListItemContent>
        </ListItem>,
        <ListItem
            images={[images[1]]}
            shouldShowRoundImageOrIcon
            title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
        >
            <ListItemContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
            </ListItemContent>
        </ListItem>,
        <ListItem
            images={[images[2]]}
            subtitle="Stet clita kasd gubergren, no sea takimata sanctus"
            shouldShowRoundImageOrIcon
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
        >
            <ListItemContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua.
            </ListItemContent>
        </ListItem>,
        <ListItem
            images={[images[3]]}
            subtitle="Labore et dolore magna aliquyam erat"
            shouldShowRoundImageOrIcon
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        >
            <ListItemContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum.
            </ListItemContent>
        </ListItem>,
    ],
};

MixedListItems.args = {
    children: [
        <ListItem
            icons={['ts-chayns']}
            subtitle="Stet clita kasd gubergren, no sea"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />,
        <ListItem
            icons={['fa fa-rocket']}
            subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
            title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
        >
            <ListItemContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum.
            </ListItemContent>
        </ListItem>,
        <ListItem
            icons={['ts-chayns']}
            subtitle="Consetetur sadipscing elitr, sed diam nonumy eirmod"
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
        />,
        <ListItem
            icons={['fa fa-rocket']}
            subtitle="Et justo duo dolores et ea rebum"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        >
            <ListItemContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
            </ListItemContent>
        </ListItem>,
    ],
};

ListItemWithTitleElement.args = {
    children: [
        <ListItem
            icons={['ts-chayns']}
            subtitle="Stet clita kasd gubergren, no sea"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
            titleElement={<Icon icons={['fa fa-rocket']}/>}
        />,
        <ListItem
            icons={['fa fa-rocket']}
            subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
            title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
            titleElement={<Icon icons={['ts-chayns']}/>}
        />,
        <ListItem
            icons={['ts-chayns']}
            subtitle="Consetetur sadipscing elitr, sed diam nonumy eirmod"
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
            titleElement={<Icon icons={['fa fa-rocket']}/>}
        />,
        <ListItem
            icons={['fa fa-rocket']}
            subtitle="Et justo duo dolores et ea rebum"
            title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
            titleElement={<Icon icons={['ts-chayns']}/>}
        />,
    ],
};
