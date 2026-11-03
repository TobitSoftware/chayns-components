import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React, { type ReactNode, StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { PopupAlignment } from '../../types/popup';
import Popup, { type PopupProps } from './Popup';

const measurement = vi.hoisted(() => ({ width: 250, height: 90 }));
vi.mock('../../hooks/element', () => ({
    useMeasuredClone: () => ({ ...measurement, measuredElement: null }),
}));
vi.mock('chayns-api', () => ({ useSite: () => ({ colorMode: 0 }) }));
vi.mock('./popup-content-wrapper/PopupContentWrapper', () => {
    const PopupSurface = React.forwardRef<
        HTMLDivElement,
        {
            children: ReactNode;
            coordinates: { x: number; y: number };
            offset: number;
            alignment: PopupAlignment;
            width: number;
        }
    >(({ children, coordinates, offset, alignment, width }, ref) => (
        <div
            ref={ref}
            data-surface
            data-x={coordinates.x}
            data-y={coordinates.y}
            data-offset={offset}
            data-alignment={alignment}
            data-width={width}
        >
            {children}
        </div>
    ));
    PopupSurface.displayName = 'PopupSurface';
    return { default: PopupSurface };
});

let container: HTMLDivElement;
let triggerLeft: number;
let containerWidth: number;
let containerLeft: number;
let zoom: number;
let getRect: MockInstance<[], DOMRect>;
const content = <p>Popup hint</p>;
const surface = () => {
    const element = document.querySelector<HTMLElement>('[data-surface]');
    if (!element) throw new Error('Popup surface missing');
    return element;
};
const number = (name: string) => Number(surface().dataset[name]);
const popup = (props: Partial<PopupProps> = {}, isControlled = true) => (
    <StrictMode>
        <Popup
            content={content}
            container={container}
            isOpen={isControlled ? true : undefined}
            shouldUseChildrenWidth
            alignment={props.alignment}
            boundaryInsets={props.boundaryInsets}
            shouldScrollWithContent={props.shouldScrollWithContent}
            onShow={props.onShow}
            onHide={props.onHide}
        >
            <button type="button">Trigger</button>
        </Popup>
    </StrictMode>
);

beforeEach(() => {
    triggerLeft = 270;
    containerWidth = 390;
    containerLeft = 0;
    zoom = 1;
    measurement.width = 250;
    measurement.height = 90;
    container = document.createElement('div');
    document.body.append(container);
    Object.defineProperty(container, 'offsetWidth', { get: () => containerWidth / zoom });
    Object.defineProperty(container, 'offsetHeight', { value: 800 });
    Object.defineProperty(container, 'clientHeight', { value: 800 });
    getRect = vi
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function getFixtureRect(this: HTMLElement) {
            if (this === container) return new DOMRect(containerLeft, 0, containerWidth, 800);
            return new DOMRect(triggerLeft, 20, 26, 26);
        });
});

afterEach(() => {
    container.remove();
    vi.restoreAllMocks();
});

describe('Popup boundary insets', () => {
    it('preserves the legacy position when omitted or zero', async () => {
        const { rerender } = render(popup());
        await waitFor(() => expect(number('x')).toBe(283));
        expect(number('offset')).toBe(0);
        const before = { ...surface().dataset };
        rerender(popup({ boundaryInsets: { left: 0, right: 0 } }));
        expect({ ...surface().dataset }).toEqual(before);
    });

    it('updates an open popup when only its insets change and restores its position', async () => {
        triggerLeft = 320;
        const onShow = vi.fn();
        const onHide = vi.fn();
        const { rerender } = render(popup({ onShow, onHide }));
        await waitFor(() => expect(number('x')).toBe(333));
        rerender(popup({ boundaryInsets: { left: 17, right: 43 }, onShow, onHide }));
        await waitFor(() => expect(number('x')).toBe(311));
        expect(number('alignment')).toBe(PopupAlignment.BottomLeft);
        expect(number('offset')).toBe(-22);
        expect(surface().firstElementChild).toHaveStyle({ maxWidth: '284px' });
        rerender(popup({ onShow, onHide }));
        await waitFor(() => expect(number('x')).toBe(333));
        expect(onShow).toHaveBeenCalledTimes(1);
        expect(onHide).not.toHaveBeenCalled();
    });

    it('shifts right-aligned popups left and keeps the arrow at the trigger', async () => {
        render(popup({ boundaryInsets: { right: 59 }, alignment: PopupAlignment.BottomRight }));
        await waitFor(() => expect(number('x')).toBe(71));
        expect(number('offset')).toBe(212);
        expect(number('x') + number('offset')).toBe(283);
    });

    it('repositions on scrolling and rotation in scaled, offset containers', async () => {
        zoom = 2;
        containerLeft = 100;
        containerWidth = 780;
        triggerLeft = 700;
        const { unmount } = render(popup({ boundaryInsets: { right: 59 } }));
        await waitFor(() => expect(number('x')).toBe(295));
        act(() => {
            container.scrollLeft = 80;
            fireEvent.scroll(container);
        });
        await waitFor(() => expect(number('x')).toBe(375));
        act(() => {
            containerWidth = 1000;
            fireEvent.resize(window);
        });
        await waitFor(() => expect(surface().firstElementChild).toHaveStyle({ maxWidth: '395px' }));
        const remove = vi.spyOn(window, 'removeEventListener');
        unmount();
        expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
        expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function), true);
    });

    it('uses body geometry for fixed popups', async () => {
        Object.defineProperty(document.body, 'offsetWidth', { configurable: true, value: 390 });
        Object.defineProperty(document.body, 'offsetHeight', { configurable: true, value: 800 });
        getRect.mockImplementation(function getBodyRect(this: HTMLElement) {
            return this === document.body
                ? new DOMRect(0, 0, 390, 800)
                : new DOMRect(320, 20, 26, 26);
        });
        render(popup({ shouldScrollWithContent: false, boundaryInsets: { right: 59 } }));
        await waitFor(() => expect(number('x')).toBe(295));
    });

    it('updates an uncontrolled open popup when insets change or are removed', async () => {
        triggerLeft = 320;
        const { getByRole, rerender } = render(popup({}, false));
        fireEvent.click(getByRole('button', { name: 'Trigger' }));
        await waitFor(() => expect(number('x')).toBe(333));
        rerender(popup({ boundaryInsets: { right: 59 } }, false));
        await waitFor(() => expect(number('x')).toBe(295));
        rerender(popup({}, false));
        await waitFor(() => expect(number('x')).toBe(333));
    });

    it('retains content when configured insets change between zero and nonzero', async () => {
        const { rerender } = render(popup({ boundaryInsets: { left: 0, right: 0 } }));
        await waitFor(() => expect(number('x')).toBe(283));
        const paragraph = surface().querySelector('p');
        rerender(popup({ boundaryInsets: { right: 59 } }));
        expect(surface().querySelector('p')).toBe(paragraph);
        rerender(popup({ boundaryInsets: { right: 0 } }));
        expect(surface().querySelector('p')).toBe(paragraph);
        expect(surface().firstElementChild?.getAttribute('style') ?? '').not.toContain('max-width');
    });
});
