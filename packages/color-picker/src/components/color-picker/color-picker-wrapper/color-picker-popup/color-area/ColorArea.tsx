import React, {
    MouseEvent,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    StyledColorArea,
    StyledColorAreaCanvas,
    StyledColorAreaPseudo,
    StyledMotionColorAreaPointer,
} from './ColorArea.styles';

import { hsvToHex } from '@chayns/colors';
import { setRefreshScrollEnabled } from 'chayns-api';
import { useDragControls, useMotionValue } from 'framer-motion';
import type { Scale } from '../../../../../types/colorPicker';
import {
    extractRgbValues,
    getColorFromCoordinates,
    getCoordinatesFromColor,
    rgbToHsv,
} from '../../../../../utils/color';
import { ColorPickerContext } from '../../../../ColorPickerProvider';

const ColorArea = () => {
    const {
        selectedColor,
        updateSelectedColor,
        updateIsPresetColor,
        isPresetColor,
        shouldGetCoordinates,
        updateShouldGetCoordinates,
        updateShouldCallOnSelect,
        hueColor,
    } = useContext(ColorPickerContext);

    const [opacity, setOpacity] = useState<number>(1);
    const [scale, setScale] = useState<Scale>({ scaleX: 0, scaleY: 0 });

    const isPresetColorRef = useRef(false);
    const shouldGetCoordinatesRef = useRef(false);
    const canDrag = useRef(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pseudoRef = useRef<HTMLDivElement>(null);

    const dragControls = useDragControls();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        isPresetColorRef.current = isPresetColor ?? false;
    }, [isPresetColor]);

    useEffect(() => {
        shouldGetCoordinatesRef.current = shouldGetCoordinates ?? true;
    }, [shouldGetCoordinates]);

    useEffect(() => {
        if (selectedColor) {
            const { a } = extractRgbValues(selectedColor);

            setOpacity(a);
        }
    }, [selectedColor]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        setScale({ scaleX, scaleY });
    }, []);

    const setColor = useCallback(() => {
        const xCord = x.get();
        const yCord = y.get();

        if (typeof updateSelectedColor === 'function') {
            const color = getColorFromCoordinates({
                coordinates: {
                    x: xCord,
                    y: yCord,
                },
                canvas: canvasRef,
                opacity,
                scale,
            });

            if (color === 'transparent') {
                return;
            }

            updateSelectedColor(color);
        }
    }, [opacity, scale, updateSelectedColor, x, y]);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        const hsv = rgbToHsv(hueColor);

        const hex = hsvToHex({ h: hsv?.h ?? 1, s: 1, v: 1 });

        const colorGradiant = ctx.createLinearGradient(0, 0, 300, 0);
        colorGradiant.addColorStop(0, '#fff');
        colorGradiant.addColorStop(1, hex ?? 'red');

        ctx.fillStyle = colorGradiant;
        ctx.fillRect(0, 0, 300, 150);

        const transparentGradiant = ctx.createLinearGradient(0, 0, 0, 150);

        transparentGradiant.addColorStop(0, 'transparent');
        transparentGradiant.addColorStop(1, '#000');

        ctx.fillStyle = transparentGradiant;
        ctx.fillRect(0, 0, 300, 150);

        if (isPresetColorRef.current) {
            if (typeof updateIsPresetColor === 'function') {
                updateIsPresetColor(false);
            }

            return;
        }

        setColor();
    }, [hueColor, setColor, updateIsPresetColor]);

    const handleStartDrag = useCallback(() => {
        if (typeof updateShouldGetCoordinates === 'function') {
            updateShouldGetCoordinates(false);
        }

        canDrag.current = true;
    }, [updateShouldGetCoordinates]);

    useEffect(() => {
        if (selectedColor && shouldGetCoordinatesRef.current) {
            const cords = getCoordinatesFromColor({
                color: selectedColor,
                canvas: canvasRef,
                tolerance: 10,
            });

            if (cords) {
                x.set(cords.x);
                y.set(cords.y);
            }
        }
    }, [selectedColor, x, y]);

    const handleDrag = useCallback(() => {
        setColor();
    }, [setColor]);

    const handleClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            if (typeof updateShouldGetCoordinates === 'function') {
                updateShouldGetCoordinates(false);
            }

            const { left, top } = (event.target as HTMLDivElement).getBoundingClientRect();

            x.set(event.clientX - left - 10);
            y.set(event.clientY - top - 10);

            setColor();
        },
        [setColor, updateShouldGetCoordinates, x, y],
    );

    const handlePointerUp = useCallback(() => {
        canDrag.current = false;

        void setRefreshScrollEnabled(true);

        if (typeof updateShouldGetCoordinates === 'function') {
            updateShouldGetCoordinates(true);
        }

        if (typeof updateShouldCallOnSelect === 'function') {
            updateShouldCallOnSelect(true);
        }
    }, [updateShouldCallOnSelect, updateShouldGetCoordinates]);

    const move = useCallback(
        (xCords: number, yCords: number) => {
            let newXCords = xCords;
            let newYCords = yCords;

            switch (true) {
                case xCords > 300:
                    newXCords = 300;
                    break;
                case xCords < 0:
                    newXCords = 0;
                    break;
                default:
                    break;
            }

            switch (true) {
                case yCords > 150:
                    newYCords = 150;
                    break;
                case yCords < 0:
                    newYCords = 0;
                    break;
                default:
                    break;
            }

            x.set(newXCords);
            y.set(newYCords);

            setColor();
        },
        [setColor, x, y],
    );

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (canDrag.current && pseudoRef.current) {
                const { left, top } = pseudoRef.current.getBoundingClientRect();

                const xCords = event.clientX - left - 10;
                const yCords = event.clientY - top - 10;

                move(xCords, yCords);
            }
        },
        [move],
    );

    const handleTouchMove = useCallback(
        (event: TouchEvent) => {
            if (canDrag.current && pseudoRef.current) {
                event.preventDefault();

                void setRefreshScrollEnabled(false);

                const { left, top } = pseudoRef.current.getBoundingClientRect();

                const xCords = event.changedTouches[0]
                    ? event.changedTouches[0].clientX - left - 10
                    : (event as unknown as { pageX: number }).pageX;
                const yCords = event.changedTouches[0]
                    ? event.changedTouches[0].clientY - top - 10
                    : (event as unknown as { pageY: number }).pageY;

                move(xCords, yCords);
            }
        },
        [move],
    );

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handlePointerUp);

        return () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handlePointerUp);
        };
    }, [handleMouseMove, handlePointerUp, handleTouchMove]);

    return useMemo(
        () => (
            <StyledColorArea>
                <StyledColorAreaCanvas ref={canvasRef} />
                <StyledColorAreaPseudo
                    ref={pseudoRef}
                    onPointerDown={handleStartDrag}
                    onClick={handleClick}
                >
                    <StyledMotionColorAreaPointer
                        drag
                        dragConstraints={pseudoRef}
                        style={{ x, y }}
                        dragElastic={false}
                        dragMomentum={false}
                        dragControls={dragControls}
                        onDrag={handleDrag}
                    />
                </StyledColorAreaPseudo>
            </StyledColorArea>
        ),
        [dragControls, handleClick, handleDrag, handleStartDrag, x, y],
    );
};

ColorArea.displayName = 'ColorArea';

export default ColorArea;