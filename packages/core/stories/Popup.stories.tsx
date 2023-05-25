import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../src/components/button/Button';
import Popup from '../src/components/popup/Popup';

export default {
    title: 'Core/Popup',
    component: Popup,
    args: {
        content: (
            <span style={{ display: 'block', padding: '5px' }}>
                <h1 style={{ margin: 0 }}>Popup</h1>
                <p>Das ist ein Popup!</p>
            </span>
        ),
    },
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = ({ ...args }) => (
    <>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et dui eget sapien
            convallis tincidunt. Sed dictum vestibulum mi, quis euismod nunc suscipit vitae. Aenean
            quis nisi eu purus efficitur ullamcorper sed vitae est. Duis quis diam non orci
            facilisis mattis at a justo. Nam tempor lacinia nisl id sagittis. Nunc ultricies ex
            eros, ac lobortis nulla lobortis vel. Integer volutpat sem sem, id aliquam magna viverra
            nec. In tempus neque quis urna facilisis, vel pulvinar sapien pretium. Vivamus
            condimentum dignissim massa eu posuere. Sed rutrum, enim vel ullamcorper lobortis,
            libero turpis ultrices metus, in sodales lectus dui et lorem. Donec tincidunt arcu diam,
            et maximus nibh convallis sit amet. Aenean tristique et felis at dignissim. Nam a
            interdum risus, sit amet vestibulum turpis. Integer dolor risus, sodales a faucibus eu,
            iaculis dignissim augue.
        </p>
        <Popup {...args}>
            <Button onClick={() => {}}>Popup öffnen</Button>
        </Popup>
    </>
);

export const General = Template.bind({});
