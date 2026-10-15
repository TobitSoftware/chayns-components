import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import EmojiPickerEmojis from './EmojiPickerEmojis';
import type { Category } from '../../../types/category';

const fixtures = vi.hoisted(() => ({
    emojis: [
        { emoji: '😀', name: 'grinning face', skin_tone_support: false },
        { emoji: '😃', name: 'smiling face', skin_tone_support: false },
        { emoji: '😄', name: 'laughing face', skin_tone_support: false },
        { emoji: '🐈', name: 'cat', skin_tone_support: false },
        { emoji: '👍', name: 'thumbs up', skin_tone_support: true },
        { emoji: '👎', name: 'thumbs down', skin_tone_support: true },
        { emoji: '👋', name: 'waving hand', skin_tone_support: true },
        { emoji: '🤝', name: 'handshake', skin_tone_support: true },
    ],
    addHistory: vi.fn(),
    history: [] as { emoji: string; name: string; skin_tone_support: boolean }[],
}));

vi.mock('unicode-emoji-json/data-by-group.json', () => ({
    default: [
        { slug: 'smileys_emotion', emojis: fixtures.emojis },
        { slug: 'people_body', emojis: fixtures.emojis.slice(4) },
    ],
}));
vi.mock('unicode-emoji-json/data-by-emoji.json', () => ({
    default: Object.fromEntries(fixtures.emojis.map(({ emoji, ...data }) => [emoji, data])),
}));
vi.mock('../../../hooks/emojiHistory', () => ({
    useEmojiHistory: () => ({
        addOrUpdateEmojiInHistory: fixtures.addHistory,
        historyEmojis: fixtures.history.slice(),
    }),
}));
vi.mock('@chayns-components/core', async () => {
    const { useRef } = await import('react');
    return {
        ...(await import('../../../../../core/src/hooks/ref')),
        useIsMeasuredClone: () => [false, useRef<HTMLDivElement>(null)] as const,
    };
});

const setup = async () => {
    const onSelect = vi.fn();
    const renderPicker = (searchString = '', selectedCategory: Category = 'smileys_emotion') => (
        <ThemeProvider theme={{ 'secondary-102': 'rgb(255, 0, 0)' }}>
            <input aria-label="Search" />
            <EmojiPickerEmojis
                onSelect={onSelect}
                searchString={searchString}
                selectedCategory={selectedCategory}
            />
        </ThemeProvider>
    );
    const view = render(renderPicker());
    await waitFor(() => expect(view.container.querySelectorAll('[data-emoji]')).toHaveLength(8));
    return {
        ...view,
        onSelect,
        update: (search = '', category?: Category) => view.rerender(renderPicker(search, category)),
    };
};

const key = (key: string, ctrlKey = false) => fireEvent.keyDown(document, { key, ctrlKey });
const navigate = () => {
    for (let index = 0; index < 7; index += 1) key('ArrowRight');
};
const selected = (element: Element) =>
    expect(getComputedStyle(element).backgroundColor).toBe('rgb(255, 0, 0)');

beforeEach(() => {
    fixtures.addHistory.mockReset();
    fixtures.history = [];
});

describe('EmojiPickerEmojis changing results', () => {
    it('resets to the first result before Enter after narrowing the search', async () => {
        const { onSelect, update } = await setup();
        navigate();
        screen.getByRole('textbox', { name: 'Search' }).focus();
        update('thumbs');
        key('Enter');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('👍', true);
        expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Search' }));
    });

    it('does not select the hint or throw on Enter and Ctrl+Enter without results', async () => {
        const { onSelect, update, container } = await setup();
        navigate();
        update('no-matching-emoji-9284');
        key('Enter');
        key('Enter', true);
        expect(onSelect).not.toHaveBeenCalled();
        expect(container.querySelector('[data-emoji]')).toBeNull();
        expect(container.querySelector('[tabindex="0"]')).toBeNull();
    });

    it.each(['thumbs', 'no-matching-emoji-9284'])(
        'handles every arrow after searching for %s',
        async (search) => {
            const { onSelect, update, container } = await setup();
            navigate();
            update(search);
            for (const direction of ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'])
                key(direction);
            key('Enter');
            if (search === 'thumbs') {
                expect(onSelect).toHaveBeenCalledTimes(1);
                expect(onSelect).toHaveBeenCalledWith('👍', true);
                selected(container.querySelector('[data-emoji="👍"]')!);
            } else expect(onSelect).not.toHaveBeenCalled();
        },
    );

    it('recovers after clearing an empty search', async () => {
        const { onSelect, update, container } = await setup();
        navigate();
        update('no-matching-emoji-9284');
        key('ArrowRight');
        update('');
        key('ArrowRight');
        key('Enter');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('😃', true);
        selected(container.querySelector('[data-emoji="😃"]')!);
    });

    it('resets on category changes and keeps an empty history unselectable', async () => {
        const { onSelect, update } = await setup();
        navigate();
        update('', 'people_body');
        key('Enter');
        expect(onSelect).toHaveBeenLastCalledWith('👍', true);
        onSelect.mockClear();
        update('', 'history');
        key('ArrowRight');
        key('ArrowDown');
        key('Enter');
        expect(onSelect).not.toHaveBeenCalled();
    });

    it('uses visible positions for highlight, keyboard selection, and mouse selection including index zero', async () => {
        const { onSelect, update, container } = await setup();
        update('thumbs');
        selected(container.querySelector('[data-emoji="👍"]')!);
        key('ArrowRight');
        selected(container.querySelector('[data-emoji="👎"]')!);
        key('Enter');
        expect(onSelect).toHaveBeenLastCalledWith('👎', true);
        fireEvent.click(container.querySelector('[data-emoji="👍"]')!);
        selected(container.querySelector('[data-emoji="👍"]')!);
        expect(onSelect).toHaveBeenLastCalledWith('👍', false);
    });

    it('opens the skin tone popup for the visible right-clicked emoji after filtering', async () => {
        const { update, onSelect, container } = await setup();
        update('thumbs');
        fireEvent.contextMenu(container.querySelector('[data-emoji="👎"]')!);
        selected(container.querySelector('[data-emoji="👎"]')!);
        key('ArrowRight');
        key('Enter');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('👎🏼', false);
    });

    it('closes a stale popup on result changes and resumes grid controls', async () => {
        const { update, onSelect, container } = await setup();
        update('thumbs');
        key('Enter', true);
        expect(container.querySelector('[data-skin-tone]')).not.toBeNull();
        update('cat');
        expect(container.querySelector('[data-skin-tone]')).toBeNull();
        key('ArrowRight');
        key('Enter');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('🐈', true);
    });

    it('dismisses the old popup even when its emoji remains in a smaller result list', async () => {
        const { update, onSelect, container } = await setup();
        update('thumbs');
        fireEvent.contextMenu(container.querySelector('[data-emoji="👍"]')!);
        expect(container.querySelector('[data-skin-tone]')).not.toBeNull();
        update('thumbs up');
        expect(container.querySelector('[data-skin-tone]')).toBeNull();
        selected(container.querySelector('[data-emoji="👍"]')!);
        key('Enter');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('👍', true);
    });

    it('does not carry an unsupported Ctrl+Enter popup request to the next emoji', async () => {
        const { update, onSelect, container } = await setup();
        update('cat');
        key('Enter', true);
        update('thumbs');
        expect(container.querySelector('[data-skin-tone]')).toBeNull();
        key('ArrowRight');
        key('Enter');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('👎', true);
    });

    it('keeps navigation stable when history is returned as a fresh array', async () => {
        fixtures.history = fixtures.emojis.slice(0, 3);
        const { update, onSelect, container } = await setup();
        update('', 'history');
        key('ArrowRight');
        update('', 'history');
        key('ArrowRight');
        selected(container.querySelector('[data-emoji="😄"]')!);
        expect(container.querySelectorAll('[data-emoji][tabindex="0"]')).toHaveLength(1);
        key('Enter');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('😄', true);
    });

    it('clears a search popup when returning to history with the same visible emoji', async () => {
        fixtures.history = [fixtures.emojis[4]!];
        const { update, container } = await setup();
        update('thumbs up', 'history');
        key('Enter', true);
        expect(container.querySelector('[data-skin-tone]')).not.toBeNull();
        update('', 'history');
        expect(container.querySelector('[data-skin-tone]')).toBeNull();
        key('Enter', true);
        expect(container.querySelector('[data-skin-tone]')).toBeNull();
    });

    it('keeps normal six-column keyboard navigation and history callbacks', async () => {
        const { onSelect, container } = await setup();
        key('ArrowDown');
        selected(container.querySelector('[data-emoji="👋"]')!);
        key('Enter');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith('👋', true);
        expect(fixtures.addHistory).toHaveBeenCalledTimes(1);
        expect(fixtures.addHistory).toHaveBeenCalledWith({
            emoji: '👋',
            name: 'waving hand',
            skin_tone_support: true,
        });
    });
});
