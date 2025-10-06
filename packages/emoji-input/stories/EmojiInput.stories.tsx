import { Meta, StoryFn } from '@storybook/react';
import React, { ChangeEvent, useRef, useState } from 'react';
import Button from '../../core/src/components/button/Button';
import EmojiInput, { EmojiInputRef } from '../src/components/emoji-input/EmojiInput';

export default {
    title: 'EmojiInput/EmojiInput',
    component: EmojiInput,
    args: {
        placeholder: 'Nachricht schreiben',
    },
} as Meta<typeof EmojiInput>;

const Template: StoryFn<typeof EmojiInput> = ({ ...args }) => {
    const [text, setText] = useState('');
    const [prefix, setPrefix] = useState<string | undefined>();
    const [isDisabled, setIsDisabled] = useState(false);

    const ref = useRef<EmojiInputRef>(null);

    const handleInput = (event: ChangeEvent<HTMLDivElement>, originalText: string) => {
        setText(originalText);
    };

    const handlePrefixRemove = () => {
        setPrefix(undefined);
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
            <p onClick={() => setPrefix('[lc_mention id="MIC-HAEL1"]Michael[/lc_mention],&nbsp;')}>
                [lc_mention id="MIC-HAEL1"]Michael[/lc_mention]
            </p>
            <p
                onClick={() =>
                    ref.current?.replaceText(
                        '123',
                        `[lc_mention id="MIC-HAEL1"]Michael[/lc_mention],  `,
                    )
                }
            >
                [lc_mention id="CHA-YNSAI"]chayns Assistant[/lc_mention] fasse die letzten
                Nachrichten kurz zusammen.
            </p>
            <EmojiInput
                {...args}
                isDisabled={isDisabled}
                ref={ref}
                onInput={handleInput}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && event.shiftKey) {
                        event.preventDefault();
                        event.stopPropagation();

                        ref.current?.replaceText(
                            '123',
                            `[lc_mention id="MIC-HAEL1"]Michael[/lc_mention],  `,
                        );
                    }

                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        event.stopPropagation();

                        setIsDisabled(true);

                        setTimeout(() => {
                            setText('');
                            setIsDisabled(false);
                        }, 500);
                    }
                }}
                value={text}
                prefixElement={prefix}
                onPrefixElementRemove={handlePrefixRemove}
            />
        </>
    );
};

const TemplateWithProgress: StoryFn<typeof EmojiInput> = ({ ...args }) => {
    const [text, setText] = useState('');

    const handleInput = (event: ChangeEvent<HTMLDivElement>, originalText: string) => {
        setText(originalText);
    };

    const ref = useRef<EmojiInputRef>(null);

    const handleStartProgress = () => {
        ref.current.startProgress(15);
    };

    const handleStopProgress = () => {
        ref.current.stopProgress();
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
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 12 }}>
                <Button onClick={handleStartProgress}>Progress starten</Button>
                <Button onClick={handleStopProgress}>Progress stoppen</Button>
            </div>
            <EmojiInput {...args} onInput={handleInput} value={text} ref={ref} />
        </>
    );
};

export const General = Template.bind({});

export const EmojiInputWithProgress = TemplateWithProgress.bind({});
export const EmojiInputWithPrefixElement = Template.bind({});
EmojiInputWithPrefixElement.args = {
    prefixElement: '[lc_mention id="CHA-YNSAI"]Sidekick[/lc_mention],&nbsp;',
};
