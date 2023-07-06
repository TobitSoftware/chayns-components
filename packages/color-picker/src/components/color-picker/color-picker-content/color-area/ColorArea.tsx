import { useDragControls } from 'framer-motion';
import React, {
    CSSProperties,
    FC,
    MouseEvent,
    PointerEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { Coordinates, Scale } from '../../../../types';
import { getColorFromCoordinates } from '../../../../utils/color';
import {
    StyledColorArea,
    StyledColorAreaCanvas,
    StyledMotionColorAreaPointer,
} from './ColorArea.styles';

export type ColorAreaProps = {
    color: CSSProperties['color'];
    hueColor: CSSProperties['color'];
    onChange: (colorToSelect: CSSProperties['color']) => void;
};

const ColorArea: FC<ColorAreaProps> = ({ onChange, color, hueColor }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [coordinates, setCoordinates] = useState<Coordinates>();
    const [opacity, setOpacity] = useState<number>(1);
    const [scale, setScale] = useState<Scale>({ scaleX: 0, scaleY: 0 });

    const dragControls = useDragControls();

    useEffect(() => {
        if (color) {
            const rgba = color.match(/[\d.]+/g);

            if (!rgba) {
                return;
            }

            setOpacity(Number(rgba[3]));
        }
    }, [color]);

    useEffect(() => {
        if (hueColor && coordinates) {
            onChange(
                getColorFromCoordinates({
                    coordinates: { x: coordinates.x, y: coordinates.y },
                    canvas: canvasRef,
                    opacity,
                    scale,
                })
            );
        }
    }, [coordinates, hueColor, onChange, opacity, scale]);

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
        [dragControls]
    );

    const handleDrag = useCallback(
        (event: DragEvent) => {
            setCoordinates({ x: event.clientX, y: event.clientY });

            onChange(
                getColorFromCoordinates({
                    coordinates: {
                        x: event.clientX,
                        y: event.clientY,
                    },
                    canvas: canvasRef,
                    opacity,
                    scale,
                })
            );
        },
        [onChange, opacity, scale]
    );

    const handleClick = useCallback(
        (event: MouseEvent) => {
            setCoordinates({ x: event.clientX, y: event.clientY });

            onChange(
                getColorFromCoordinates({
                    coordinates: { x: event.clientX, y: event.clientY },
                    canvas: canvasRef,
                    opacity,
                    scale,
                })
            );
        },
        [onChange, opacity, scale]
    );

    return useMemo(
        () => (
            <StyledColorArea>
                <StyledColorAreaCanvas
                    ref={canvasRef}
                    onPointerDown={handleStartDrag}
                    onClick={handleClick}
                />
                <StyledMotionColorAreaPointer
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={false}
                    dragMomentum={false}
                    dragControls={dragControls}
                    onDrag={handleDrag}
                />
            </StyledColorArea>
        ),
        [dragControls, handleClick, handleDrag, handleStartDrag]
    );
};

ColorArea.displayName = 'ColorArea';

export default ColorArea;
