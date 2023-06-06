import { useDragControls } from 'framer-motion';
import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    StyledColorArea,
    StyledColorAreaCanvas,
    StyledMotionColorAreaPointer,
} from './ColorArea.styles';

export type ColorAreaProps = {
    color: CSSProperties['color'];
    onChange?: (colorToSelect: CSSProperties['color']) => void;
};

const ColorArea: FC<ColorAreaProps> = ({ onChange, color }) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();
    const [isDragging, setIsDragging] = useState(false);
    const [coordinates, setCoordinates] = useState<{ left: number; top: number }>({
        left: 0,
        top: 0,
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dragControls = useDragControls();

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        const colorGradiant = ctx.createLinearGradient(0, 0, 300, 0);
        colorGradiant.addColorStop(0, 'white');
        colorGradiant.addColorStop(1, color ?? 'red');

        ctx.fillStyle = colorGradiant;
        ctx.fillRect(0, 0, 300, 150);

        const transparentGradiant = ctx.createLinearGradient(0, 0, 0, 150);

        transparentGradiant.addColorStop(0, 'transparent');
        transparentGradiant.addColorStop(1, '#000');

        ctx.fillStyle = transparentGradiant;
        ctx.fillRect(0, 0, 300, 150);
    }, [color]);

    const updatePointerPosition = (event: MouseEvent) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const left = event.clientX - rect.left;
            const top = event.clientY - rect.top;
            setCoordinates({ left, top });
        }
    };

    const handleMouseDown = useCallback((event: MouseEvent) => {
        setIsDragging(true);
        updatePointerPosition(event);
    }, []);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (isDragging) {
                updatePointerPosition(event);
            }
        },
        [isDragging]
    );

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);
            return () => {
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseup', handleMouseUp);
            };
        }

        return () => {};
    }, [handleMouseDown, handleMouseMove]);

    function startDrag(event) {
        dragControls.start(event, { snapToCursor: true });
    }

    return useMemo(
        () => (
            <StyledColorArea>
                <StyledColorAreaCanvas ref={canvasRef} onPointerDown={startDrag} />
                <StyledMotionColorAreaPointer
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={false}
                    dragMomentum={false}
                    dragControls={dragControls}
                />
            </StyledColorArea>
        ),
        [dragControls, startDrag]
    );
};

ColorArea.displayName = 'ColorArea';

export default ColorArea;
