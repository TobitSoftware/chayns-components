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

import { useDragControls, useMotionValue } from 'framer-motion';
import type { Coordinates, Scale } from '../../../types';
import { extractRgbValues, getColorFromCoordinates } from '../../../utils/color';
import { ColorPickerContext } from '../ColorPicker';

const ColorArea = () => {
    const { selectedColor, updateSelectedColor, hueColor } = useContext(ColorPickerContext);

    const [coordinates, setCoordinates] = useState<Coordinates>();
    const [opacity, setOpacity] = useState<number>(1);
    const [scale, setScale] = useState<Scale>({ scaleX: 0, scaleY: 0 });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pseudoRef = useRef<HTMLDivElement>(null);
    const tumbRef = useRef<HTMLDivElement>(null);

    const dragControls = useDragControls();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        if (selectedColor) {
            const { a } = extractRgbValues(selectedColor);

            setOpacity(a);
        }
    }, [selectedColor]);

    // useEffect(() => {
    //     if (color) {
    //         const cords = getCoordinatesFromColor({ color, canvas: canvasRef });
    //
    //         console.log("CORDS",cords)
    //
    //         if (!cords) {
    //             return;
    //
    //         }
    //
    //         setCoordinates(cords);
    //     }
    // }, [color]);

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

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        const colorGradiant = ctx.createLinearGradient(0, 0, 300, 0);
        colorGradiant.addColorStop(0, 'white');
        colorGradiant.addColorStop(1, hueColor ?? 'red');

        ctx.fillStyle = colorGradiant;
        ctx.fillRect(0, 0, 300, 150);

        const transparentGradiant = ctx.createLinearGradient(0, 0, 0, 150);

        transparentGradiant.addColorStop(0, 'transparent');
        transparentGradiant.addColorStop(1, '#000');

        ctx.fillStyle = transparentGradiant;
        ctx.fillRect(0, 0, 300, 150);
    }, [hueColor]);

    const handleStartDrag: PointerEventHandler = useCallback(
        (event) => {
            dragControls.start(event, { snapToCursor: true });
        },
        [dragControls],
    );

    const handleDrag = useCallback(() => {
        const xCord = x.get() + 25.5;
        const yCord = y.get() + 25.5;

        setCoordinates({ x: xCord, y: yCord });

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

    const handleClick = useCallback(
        (event: MouseEvent) => {
            setCoordinates({ x: event.clientX, y: event.clientY });

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

    return useMemo(
        () => (
            <StyledColorArea>
                <StyledColorAreaCanvas
                    ref={canvasRef}
                    onPointerDown={handleStartDrag}
                    onClick={handleClick}
                />
                <StyledColorAreaPseudo ref={pseudoRef}>
                    <StyledMotionColorAreaPointer
                        ref={tumbRef}
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
