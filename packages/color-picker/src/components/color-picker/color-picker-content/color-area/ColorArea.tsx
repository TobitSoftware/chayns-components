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
} from 'react';
import {
    StyledColorArea,
    StyledColorAreaCanvas,
    StyledMotionColorAreaPointer,
} from './ColorArea.styles';

interface Coordinates {
    x: number;
    y: number;
}

export type ColorAreaProps = {
    color: CSSProperties['color'];
    hueColor: CSSProperties['color'];
    onChange: (colorToSelect: CSSProperties['color']) => void;
};

const ColorArea: FC<ColorAreaProps> = ({ onChange, color, hueColor }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dragControls = useDragControls();

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
    }, [color, hueColor]);

    const getColorFromCoordinates = useCallback(
        (selectedCoordinates: Coordinates) => {
            const { offsetLeft, offsetTop } = canvasRef.current;
            const x = selectedCoordinates.x - offsetTop;
            const y = selectedCoordinates.y - offsetLeft;
            const c = canvasRef.current?.getContext('2d');
            const p = c?.getImageData(x, y, 1, 1).data;

            if (!p) {
                return;
            }

            // If transparency on the image
            if (p[0] === 0 && p[1] === 0 && p[2] === 0 && p[3] === 0) {
                return;
            }

            onChange(`rgba(${p[0] ?? 0}, ${p[1] ?? 0}, ${p[2] ?? 0}, ${p[3] ?? 0})`);
        },
        [onChange]
    );

    const handleStartDrag: PointerEventHandler = useCallback(
        (event) => {
            dragControls.start(event, { snapToCursor: true });
        },
        [dragControls]
    );

    const handleDrag = useCallback(
        (event: DragEvent) => {
            getColorFromCoordinates({ x: event.clientX, y: event.clientY });
        },
        [getColorFromCoordinates]
    );

    const handleClick = useCallback(
        (event: MouseEvent) => {
            getColorFromCoordinates({ x: event.clientX, y: event.clientY });
        },
        [getColorFromCoordinates]
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
                    dragConstraints={{
                        top: canvasRef.current?.offsetTop + 50,
                        left: canvasRef.current?.offsetLeft,
                        right: canvasRef.current?.offsetWidth,
                        bottom: canvasRef.current?.offsetHeight,
                    }}
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
