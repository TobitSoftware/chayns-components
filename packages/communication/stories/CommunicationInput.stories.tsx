import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import {
    CommunicationButton,
    CommunicationInput,
    CommunicationInputSize,
    CommunicationInputCornerType,
    CommunicationInputRef,
    CommunicationInputDirection,
} from '../src';
import { Icon } from '@chayns-components/core';

export default {
    title: 'Communication/CommunicationInput',
    component: CommunicationInput,
    args: {
        placeholder: 'Nachricht schreiben',
        contextMenuItems: [{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }],
    },
} as Meta<typeof CommunicationInput>;

const RIGHT_ELEMENT = <Icon icons={['fa fa-paper-plane']} />;

const Template: StoryFn<typeof CommunicationInput> = (args) => {
    const [value, setValue] = useState('');
    const [personId, setPersonId] = useState<string>();

    const ref = useRef<CommunicationInputRef>(null);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            ref.current?.startAnimation();
            setPersonId('TKT-EEV5Q');
        }, 1500);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div
            style={{
                height: 800,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor, tortor at
                vehicula ultricies, lacus felis rutrum enim, ullamcorper aliquam sem orci non diam.
                Sed vulputate ullamcorper libero at molestie. Phasellus mi ipsum, dapibus a accumsan
                vel, efficitur quis quam. Etiam mollis turpis massa, eu volutpat dolor rhoncus eu.
                Vivamus vehicula, nulla ut posuere consectetur, dui massa pulvinar leo, condimentum
                semper quam massa vel nunc. Nullam dignissim ut sem a vulputate. Etiam eget sem
                orci. Nam et condimentum nunc, maximus auctor enim. Sed ultrices id sem ut pretium.
                Quisque luctus pellentesque erat. Nunc pharetra egestas massa, id laoreet lacus
                tempus et. Quisque ornare volutpat sem, nec fermentum nunc mattis sed. Nam aliquet
                mauris ut quam pellentesque efficitur. Nulla in justo dignissim, vulputate leo sit
                amet, suscipit felis. Aenean at orci tincidunt, placerat est quis, dapibus eros.
                Etiam tempor mollis ultrices.
            </p>

            <CommunicationInput
                rightElement={
                    <CommunicationButton
                        icons={['fa ts-sidekick']}
                        iconColor="white"
                        size={args.size}
                        personId={personId}
                    />
                }
                {...args}
                ref={ref}
                inputConfig={{
                    placeholder: 'Nachricht schreiben',
                    value,
                    onInput: (_, text) => setValue(text),
                }}
            />
        </div>
    );
};

const DownTemplate: StoryFn<typeof CommunicationInput> = (args) => {
    const [value, setValue] = useState('');

    return (
        <div
            style={{
                height: 800,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <CommunicationInput
                {...args}
                direction={CommunicationInputDirection.BOTTOM}
                inputConfig={{
                    placeholder: 'Nachricht schreiben',
                    value,
                    onInput: (_, text) => setValue(text),
                }}
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor, tortor at
                vehicula ultricies, lacus felis rutrum enim, ullamcorper aliquam sem orci non diam.
                Sed vulputate ullamcorper libero at molestie. Phasellus mi ipsum, dapibus a accumsan
                vel, efficitur quis quam. Etiam mollis turpis massa, eu volutpat dolor rhoncus eu.
                Vivamus vehicula, nulla ut posuere consectetur, dui massa pulvinar leo, condimentum
                semper quam massa vel nunc. Nullam dignissim ut sem a vulputate. Etiam eget sem
                orci. Nam et condimentum nunc, maximus auctor enim. Sed ultrices id sem ut pretium.
                Quisque luctus pellentesque erat. Nunc pharetra egestas massa, id laoreet lacus
                tempus et. Quisque ornare volutpat sem, nec fermentum nunc mattis sed. Nam aliquet
                mauris ut quam pellentesque efficitur. Nulla in justo dignissim, vulputate leo sit
                amet, suscipit felis. Aenean at orci tincidunt, placerat est quis, dapibus eros.
                Etiam tempor mollis ultrices.
            </p>
        </div>
    );
};

const ScrollTemplate: StoryFn<typeof CommunicationInput> = (args) => {
    const [value, setValue] = useState('');

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, []);

    return (
        <div
            style={{
                height: 800,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div
                ref={ref}
                style={{ overflowY: 'auto', flex: '1 1 0' }}
                className="chayns-scrollbar"
            >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam odio nisl,
                    consectetur non tellus sed, eleifend mattis lectus. Proin sodales dignissim
                    nunc, et pharetra lectus finibus eu. Nullam eu tincidunt odio. Integer non purus
                    felis. Fusce felis magna, scelerisque nec massa pulvinar, maximus interdum
                    augue. Morbi non fringilla libero. Ut eget justo vulputate, efficitur quam
                    vitae, accumsan sapien. Nullam ac erat posuere, fermentum libero nec, viverra
                    neque. Proin mattis vitae est dapibus lacinia. Quisque egestas viverra molestie.
                    Ut mollis gravida dapibus. Vivamus porttitor est nulla, at laoreet tellus
                    hendrerit at. Morbi nec sem vitae mi finibus interdum. Donec mollis nec erat ut
                    euismod. Etiam maximus, justo eu ullamcorper accumsan, velit massa feugiat
                    justo, quis porttitor lorem metus id risus. Donec at nibh in massa bibendum
                    accumsan a ac massa. Duis quis libero sed nulla commodo varius congue at urna.
                    Donec volutpat felis vitae nulla pretium tincidunt. Quisque tempor, est ut
                    dignissim ultricies, arcu urna facilisis orci, eget aliquam neque justo ac diam.
                    In blandit, ipsum ut pretium finibus, est sem ultricies risus, in sollicitudin
                    erat erat sed ex. Pellentesque tristique dictum justo, ac egestas erat faucibus
                    eu. Morbi pulvinar, ante commodo interdum posuere, eros arcu vestibulum nisi,
                    vitae varius sapien tortor sed tortor. Fusce cursus bibendum hendrerit.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                    turpis egestas. Nunc non dui id orci dapibus maximus. Donec sagittis eros purus,
                    id auctor risus mattis at. Nulla pellentesque, metus id dignissim feugiat, arcu
                    tortor tempor risus, eu fringilla arcu tellus eu lectus. Integer ullamcorper
                    arcu vitae ipsum dignissim, vitae condimentum ligula varius. Nam ut nibh sed dui
                    convallis condimentum suscipit sed nunc. Nulla facilisi. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Pellentesque fringilla elit quis consequat
                    gravida. Sed vulputate neque libero, sed commodo mi aliquet ac. Aliquam turpis
                    orci, tincidunt sit amet elit sit amet, fermentum efficitur tortor. In rutrum
                    mollis fringilla. Aenean ornare erat interdum augue varius, nec ultrices purus
                    laoreet. Nunc venenatis molestie luctus. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Proin in quam elementum, congue ligula vel, commodo dolor.
                    Maecenas congue erat tellus, non placerat orci consectetur ac. Nullam et
                    pharetra lectus. Aliquam eros quam, pharetra vitae turpis sit amet, elementum
                    eleifend nisi. Fusce consequat vestibulum aliquet. Vestibulum purus massa,
                    iaculis sed suscipit eu, facilisis at libero. Etiam consectetur nulla nec nisl
                    tempor, ac facilisis elit dapibus. Donec ut efficitur dolor, et viverra massa.
                    Pellentesque eget nisl quam. Mauris porttitor egestas ultricies. Vestibulum ante
                    ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                    Pellentesque et lacus leo.
                </p>
            </div>

            <CommunicationInput
                rightElement={RIGHT_ELEMENT}
                {...args}
                scrollContainerRef={ref}
                inputConfig={{
                    placeholder: 'Nachricht schreiben',
                    value,
                    onInput: (_, text) => setValue(text),
                }}
            />
        </div>
    );
};

export const Small = Template.bind({});
export const General = Template.bind({});
export const WithChips = Template.bind({});
export const WithContent = Template.bind({});
export const WithAnimation = Template.bind({});
export const WithAudioInput = Template.bind({});
export const DownDirection = DownTemplate.bind({});
export const WithRoundedCorners = Template.bind({});
export const DynamicScroll = ScrollTemplate.bind({});

General.args = {
    rightElement: null,
};

WithChips.args = {
    chips: [
        {
            label: 'Details',
            onClick: () => {},
        },
        {
            label: 'Offene Punkte',
            onClick: () => {},
        },
        {
            label: 'Statements',
            onClick: () => {},
        },
        {
            label: 'Stimmungsanalyse',
            onClick: () => {},
        },
        {
            label: 'Stimme zu!',
            onClick: () => {},
        },
    ],
    rightElement: RIGHT_ELEMENT,
};

WithRoundedCorners.args = {
    cornerType: CommunicationInputCornerType.ROUNDED,
    rightElement: RIGHT_ELEMENT,
};

Small.args = {
    size: CommunicationInputSize.SMALL,
    rightElement: RIGHT_ELEMENT,
};

WithAudioInput.args = {
    shouldUseAudioInput: true,
    rightElement: RIGHT_ELEMENT,
};

WithAnimation.args = {
    shouldUseInitialAnimation: true,
};

WithContent.args = {
    chips: [
        {
            icons: ['fa fa-file'],
            label: 'Anhänge',
            onRemove: () => {},
        },
    ],
    topContent: (
        <div style={{ padding: '6px', height: 50, backgroundColor: 'lightblue' }}>
            Hier wird super Content angezeigt
        </div>
    ),
    rightElement: RIGHT_ELEMENT,
};
