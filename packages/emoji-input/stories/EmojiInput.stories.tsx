import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import EmojiInput from '../src/components/emoji-input/EmojiInput';

export default {
    title: 'EmojiInput/EmojiInput',
    component: EmojiInput,
    args: {
        placeholder: 'Nachricht schreiben',
    },
} as ComponentMeta<typeof EmojiInput>;

const Template: ComponentStory<typeof EmojiInput> = ({ ...args }) => {
    const [text, setText] = useState('');

    const handleInput = (event: ChangeEvent<HTMLDivElement>, originalText: string) => {
        setText(originalText);
    };

    return (
        <>
            <h1>Emoji Input Example</h1>
            <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est. Lorem ipsum dolor sit amet. Consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea rebum invidunt. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est. Lorem ipsum dolor sit amet. Consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua.
            </p>
            <p>[lc_mention id="MIC-HAEL1"]Michael[/lc_mention]</p>
            <p>[lc_mention id="DER-PROFI"]Simon[/lc_mention]</p>
            <EmojiInput {...args} onInput={handleInput} value={text} />
        </>
    );
};

export const General = Template.bind({});
