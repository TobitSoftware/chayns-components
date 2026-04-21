import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import UserImage from '../src/components/user-image/UserImage';
import { Icon } from '@chayns-components/core';

const meta: Meta<typeof UserImage> = {
    title: 'Navigation/UserImage',
    component: UserImage,
    args: {},
};

export default meta;

const Template: StoryFn<typeof UserImage> = (args) => <UserImage {...args} />;

export const General = Template.bind({});

export const WithPopup = Template.bind({});

WithPopup.args = {
    popupContent: (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    height: 40,
                    padding: '0 16px',
                }}
            >
                <Icon icons={['fa ts-fingerprint']} />
                <span>chayns.ID</span>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    height: 40,
                    padding: '0 16px',
                }}
            >
                <Icon icons={['fa ts-euro']} />
                <span>money</span>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    height: 40,
                    padding: '0 16px',
                }}
            >
                <Icon icons={['fa ts-wallet']} />
                <span>cards</span>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    height: 40,
                    padding: '0 16px',
                }}
            >
                <Icon icons={['fa ts-space']} />
                <span>space</span>
            </div>
        </div>
    ),
};
