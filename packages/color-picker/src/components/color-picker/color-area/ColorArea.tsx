import React, {
    MouseEvent,
    PointerEventHandler,
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
import { useDragControls, useMotionValue } from 'framer-motion';
import type { Scale } from '../../../types';
import {
    extractRgbValues,
    getColorFromCoordinates,
    getCoordinatesFromColor,
    rgbToHsv,
} from '../../../utils/color';
import { ColorPickerContext } from '../ColorPicker';

const ColorArea = () => {
    const {
        selectedColor,
        updateSelectedColor,
        updateIsPresetColor,
        isPresetColor,
        shouldGetCoordinates,
        updateShouldGetCoordinates,
        hueColor,
    } = useContext(ColorPickerContext);

    const [opacity, setOpacity] = useState<number>(1);
    const [scale, setScale] = useState<Scale>({ scaleX: 0, scaleY: 0 });

    const isPresetColorRef = useRef(false);
    const shouldGetCoordinatesRef = useRef(false);
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
        const xCord = x.get() + 25.5;
        const yCord = y.get() + 25.5;

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

    const handleStartDrag: PointerEventHandler = useCallback(
        (event) => {
            if (typeof updateShouldGetCoordinates === 'function') {
                updateShouldGetCoordinates(false);
            }

            dragControls.start(event, { snapToCursor: true });
        },
        [dragControls, updateShouldGetCoordinates],
    );

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
        (event: MouseEvent) => {
            if (typeof updateSelectedColor === 'function') {
                const color = getColorFromCoordinates({
                    coordinates: {
                        x: event.clientX,
                        y: event.clientY,
                    },
                    canvas: canvasRef,
                    opacity,
                    scale,
                });

                updateSelectedColor(color);
            }
        },
        [opacity, scale, updateSelectedColor],
    );

    const handlePointerUp = useCallback(() => {
        if (typeof updateShouldGetCoordinates === 'function') {
            updateShouldGetCoordinates(true);
        }
    }, [updateShouldGetCoordinates]);

    return useMemo(
        () => (
            <StyledColorArea>
                <StyledColorAreaCanvas
                    ref={canvasRef}
                    onPointerDown={handleStartDrag}
                    onPointerUp={handlePointerUp}
                    onClick={handleClick}
                />
                <StyledColorAreaPseudo ref={pseudoRef}>
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
        [dragControls, handleClick, handleDrag, handlePointerUp, handleStartDrag, x, y],
    );
};

ColorArea.displayName = 'ColorArea';

export default ColorArea;
