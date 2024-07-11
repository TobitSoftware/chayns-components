import { Meta, StoryFn } from '@storybook/react';
import { useRef } from 'react';
import { SignatureRef } from '../lib/types';
import { Button } from '../src';
import Signature from '../src/components/signature/Signature';

export default {
    title: 'Core/Signature',
    component: Signature,
    args: {
        buttonText: 'Unterschreiben',
    },
} as Meta<typeof Signature>;

const Template: StoryFn<typeof Signature> = (args) => {
    const ref = useRef<SignatureRef>(null);

    return (
        <>
            <Button onClick={() => ref.current.edit()}>2</Button>
            <Button onClick={() => ref.current.delete()}>1</Button>
            <Signature {...args} ref={ref} />
        </>
    );
};

export const General = Template.bind({});
