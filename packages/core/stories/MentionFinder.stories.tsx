import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MentionFinderPopupAlignment } from '../src';
import MentionFinder from '../src/components/mention-finder/MentionFinder';

export default {
    title: 'Core/MentionFinder',
    component: MentionFinder,
    args: {
        inputValue: 'Kannst Du @j',
        members: [
            {
                id: 'JAN-NIK96',
                imageUrl: 'https://sub60.tobit.com/u/JAN-NIK96',
                info: 'chaynsID: JAN-NIK96',
                name: 'Jannik Weise',
            },
            {
                id: '132-22953',
                imageUrl: 'https://sub60.tobit.com/u/132-22953',
                info: 'chaynsID: 132-22953',
                name: 'Jakob Wensing',
            },
            {
                id: '131-31077',
                imageUrl: 'https://sub60.tobit.com/u/131-31077',
                info: 'chaynsID: 131-31077',
                name: 'Jegor Schweizer',
            },
            {
                id: '133-46566',
                imageUrl: 'https://sub60.tobit.com/u/133-46566',
                info: 'chaynsID: 133-46566',
                name: 'Leon Dankbar',
            },
            {
                id: '368-48669',
                imageUrl: 'https://sub60.tobit.com/u/368-48669',
                info: 'chaynsID: 368-48669',
                name: 'Patrick Janning',
            },
            {
                id: '126-52360',
                imageUrl: 'https://sub60.tobit.com/u/126-52360',
                info: 'chaynsID: 126-52360',
                name: 'Jannik Test',
            },
            {
                id: '132-50444',
                imageUrl: 'https://sub60.tobit.com/u/132-50444',
                info: 'chaynsID: 132-50444',
                name: 'Günther Grütze',
            },
            {
                id: 'CHA-YNSAI',
                imageUrl: 'https://sub60.tobit.com/u/CHA-YNSAI',
                info: 'chaynsID: CHA-YNSAI',
                name: 'chayns Assistant',
            },
        ],
        popupAlignment: MentionFinderPopupAlignment.Bottom,
    },
} as ComponentMeta<typeof MentionFinder>;

const Template: ComponentStory<typeof MentionFinder> = (args) => (
    <div style={{ height: '500px' }}>
        <MentionFinder {...args} />
    </div>
);

export const General = Template.bind({});
