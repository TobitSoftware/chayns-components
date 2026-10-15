import { fireEvent, render, screen } from '@testing-library/react';
import React, { StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it, vi } from 'vitest';
import Accordion from './Accordion';
import AccordionGroup from './accordion-group/AccordionGroup';
import type { AccordionHeadProps } from './accordion-head/AccordionHead';

// Observe the open state passed to the head without timing animation frames.
vi.mock('./accordion-head/AccordionHead', () => ({
    default: ({ title, isOpen, onClick }: AccordionHeadProps) => (
        <div role="button" aria-expanded={isOpen} onClick={onClick}>
            {title}
        </div>
    ),
}));

const Harness = ({
    first,
    second,
    grouped = true,
    skipAnimation = false,
    external = false,
}: {
    first?: boolean;
    second?: boolean;
    grouped?: boolean;
    skipAnimation?: boolean;
    external?: boolean;
}) => {
    const children = (
        <>
            <Accordion
                shouldIndex
                title="First"
                isOpened={first}
                shouldSkipAnimation={skipAnimation}
            >
                First body
            </Accordion>
            <Accordion
                shouldIndex
                title="Second"
                isOpened={second}
                shouldSkipAnimation={skipAnimation}
            >
                Second body
            </Accordion>
        </>
    );
    return (
        <ThemeProvider theme={{}}>
            {grouped ? (
                <AccordionGroup shouldDisableInternalHandling={external}>{children}</AccordionGroup>
            ) : (
                children
            )}
        </ThemeProvider>
    );
};

const expectOpen = (first: boolean, second: boolean) => {
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute(
        'aria-expanded',
        String(first),
    );
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute(
        'aria-expanded',
        String(second),
    );
};

describe('Accordion isOpened', () => {
    it('opens a grouped accordion initially', () => {
        render(<Harness first />);
        expectOpen(true, false);
    });

    it('reacts to subsequent grouped property updates in both directions', () => {
        const { rerender } = render(<Harness first={false} second={false} />);
        rerender(<Harness first second={false} />);
        expectOpen(true, false);
        rerender(<Harness first={false} second={false} />);
        expectOpen(false, false);
        rerender(<Harness first={false} second />);
        expectOpen(false, true);
    });

    it('opens only the last initially opened sibling, including in StrictMode', () => {
        render(
            <StrictMode>
                <Harness first second />
            </StrictMode>,
        );
        expectOpen(false, true);
    });

    it('opens only the last sibling when multiple props change to true', () => {
        const { rerender } = render(<Harness first={false} second={false} />);
        rerender(<Harness first second />);
        expectOpen(false, true);
    });

    it('does not let a false sibling close the opened sibling', () => {
        const { rerender } = render(<Harness first second />);
        rerender(<Harness first={false} second />);
        expectOpen(false, true);
    });

    it('does not reassert an unchanged true prop after a group click', () => {
        const { rerender } = render(<Harness first />);
        fireEvent.click(screen.getByRole('button', { name: 'Second' }));
        expectOpen(false, true);
        rerender(<Harness first />);
        expectOpen(false, true);
    });

    it('honors a newer opening request while a sibling prop stays true', () => {
        const { rerender } = render(<Harness first={false} second />);
        expectOpen(false, true);
        rerender(<Harness first second />);
        expectOpen(true, false);
    });

    it('preserves default-open grouping when animations are skipped', () => {
        render(
            <ThemeProvider theme={{}}>
                <AccordionGroup>
                    <Accordion key="first" title="First" isDefaultOpen shouldSkipAnimation>
                        First body
                    </Accordion>
                    <Accordion key="second" title="Second" isDefaultOpen shouldSkipAnimation>
                        Second body
                    </Accordion>
                </AccordionGroup>
            </ThemeProvider>,
        );
        expectOpen(false, true);
    });

    it('enforces the group constraint when animations are skipped', () => {
        render(<Harness first second skipAnimation />);
        expectOpen(false, true);
    });

    it('preserves fully controlled standalone rendering and prop updates', () => {
        const { rerender } = render(<Harness first grouped={false} />);
        fireEvent.click(screen.getByRole('button', { name: 'First' }));
        expectOpen(true, false);
        rerender(<Harness first={false} second grouped={false} />);
        expectOpen(false, true);
    });

    it('preserves the explicit opt-out of internal group handling', () => {
        render(<Harness first second external />);
        expectOpen(true, true);
    });

    it('preserves uncontrolled click and keyboard toggling', () => {
        render(<Harness />);
        fireEvent.click(screen.getByRole('button', { name: 'First' }));
        expectOpen(true, false);
        const second = screen
            .getByRole('button', { name: 'Second' })
            .closest('.beta-chayns-accordion')!;
        fireEvent.keyDown(second, { key: 'Enter', target: second });
        expectOpen(false, true);
    });
});
