import { Meta, StoryFn } from '@storybook/react';
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
                name: 'Jannik Weise',
                shouldShowRoundImage: true,
            },
            {
                id: '132-22953',
                imageUrl: 'https://sub60.tobit.com/u/132-22953',
                name: 'Jakob Wensing',
                shouldShowRoundImage: true,
            },
            {
                id: '131-31077',
                imageUrl: 'https://sub60.tobit.com/u/131-31077',
                name: 'Jegor Schweizer',
                shouldShowRoundImage: true,
            },
            {
                id: '133-46566',
                imageUrl: 'https://sub60.tobit.com/u/133-46566',
                name: 'Leon Dankbar',
                shouldShowRoundImage: true,
            },
            {
                id: '368-48669',
                imageUrl: 'https://sub60.tobit.com/u/368-48669',
                name: 'Patrick Janning',
                shouldShowRoundImage: true,
            },
            {
                id: '126-52360',
                imageUrl: 'https://sub60.tobit.com/u/126-52360',
                name: 'Jannik Test',
                shouldShowRoundImage: true,
            },
            {
                id: '132-50444',
                imageUrl: 'https://sub60.tobit.com/u/132-50444',
                name: 'Günther Grütze',
                shouldShowRoundImage: true,
            },
            {
                id: 'CHA-YNSAI',
                imageUrl: 'https://sub60.tobit.com/u/CHA-YNSAI',
                name: 'chayns Assistant',
                shouldShowRoundImage: true,
            },
        ],
        popupAlignment: MentionFinderPopupAlignment.Bottom,
    },
} as Meta<typeof MentionFinder>;

const Template: StoryFn<typeof MentionFinder> = (args) => (
    <div style={{ height: '500px' }}>
        <MentionFinder {...args} />
    </div>
);

export const General = Template.bind({});
